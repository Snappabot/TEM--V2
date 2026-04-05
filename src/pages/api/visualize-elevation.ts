import type { APIRoute } from 'astro';
import Replicate from 'replicate';
import { createClient } from '@supabase/supabase-js';

// ─── System prompt (never exposed to client) ──────────────────────────────────

const SYSTEM_PROMPT = `You are an architectural visualisation AI. Your task is to apply plaster finishes and textures to building elevation drawings.

STRICT RULES — follow all of these exactly:
1. This is an architectural elevation drawing. Treat it as a precise technical document.
2. NEVER change, move, add, or remove any part of the structure: roof shape, window positions/sizes, door positions/sizes, wall lines, heights, dimensions, annotations, labels, or any architectural geometry. These must remain 100% identical.
3. ONLY replace or overlay the exterior wall surfaces (and interior wall surfaces if visible) with the exact finishes, textures, colors, and material appearance from the provided reference images.
4. Match the provided finish samples as closely as possible in: color palette and variations, texture (layering, roughness, strata, smoothness), material feel, and how the material naturally wraps around corners, reveals, and features.
5. If multiple reference images are provided, the FIRST image is the elevation drawing. All subsequent images are material references to apply to the walls.
6. Produce a clean, high-resolution, professional visualization with the new finishes applied realistically and seamlessly.
7. Keep all dimension lines, text labels, and technical annotations exactly as they appear on the original drawing.
8. Match the lighting direction already present in the elevation drawing. If sun comes from the left, texture shading reflects that.
9. Scale the texture proportionally to the architecture — do not tile obviously or apply at wrong scale.
10. Preserve shadow and depth: window recesses, reveals, soffits — the finish wraps into these naturally, not painted flat over them.
11. For ambiguous surfaces (fascia, soffits, exposed slab edges, columns, piers): only apply finish to these if the user has explicitly requested it.
12. Output must be the exact same aspect ratio and resolution as the input elevation drawing. No cropping, no padding, no borders added.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert a base64 data URL to a Buffer suitable for Replicate */
function dataUrlToBuffer(dataUrl: string): Buffer {
  const base64 = dataUrl.split(',')[1];
  return Buffer.from(base64, 'base64');
}

/** Build a URL object from a base64 data URL for Replicate file input */
function base64ToBlob(dataUrl: string): Blob {
  const [meta, data] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

/** Build the user-facing prompt that FLUX sees */
function buildPrompt(
  teFinishName: string,
  userMaterials: Array<{ label: string }>,
  applyToAll: boolean,
  userNotes?: string
): string {
  // Action-first prompt — FLUX Kontext responds better when the main task leads
  const surfaceScope = applyToAll
    ? 'all rendered wall surfaces, fascias, columns, piers, and exposed concrete'
    : 'all rendered wall surfaces (leave fascias, soffits, and window frames unchanged)';

  let prompt = `Take the architectural elevation drawing in image 1 and apply the "${teFinishName}" plaster finish texture shown in image 2 to ${surfaceScope}. The finish should be applied boldly and visibly — make the texture and colour clearly apparent on the walls. Match the exact colour, texture, roughness, and material character from the reference sample.`;

  if (userMaterials.length > 0) {
    const materialsList = userMaterials.map((m, i) => `image ${i + 3} (${m.label})`).join(', ');
    prompt += ` Additional material references are provided: ${materialsList}. Apply each to the relevant surfaces contextually.`;
  }

  if (userNotes) {
    prompt += ` User instructions: ${userNotes}.`;
  }

  prompt += ' Preserve all structural lines, window positions and sizes, roof shape, dimension lines, text annotations, and labels exactly as they are — do not move or remove any drawn element. Output at the same aspect ratio and resolution as the input drawing.';

  return prompt;
}

// ─── Supabase fire-and-forget ─────────────────────────────────────────────────

function saveMaterialsAsync(
  materials: Array<{ image: string; label: string }>
) {
  const url = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || materials.length === 0) return;

  const supabase = createClient(url, key);

  const rows = materials.map((m) => ({
    label: m.label,
    image_data: m.image.substring(0, 1000), // store truncated preview; full data is large
    status: 'pending',
  }));

  supabase
    .from('user_materials')
    .insert(rows)
    .then(({ error }) => {
      if (error) console.error('[visualize-elevation] Supabase insert error:', error.message);
    });
}

// ─── API Route ────────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request }) => {
  const replicateToken = import.meta.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN;
  if (!replicateToken) {
    return new Response(JSON.stringify({ error: 'Replicate API token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: {
    elevationImage?: string;
    teFinishImage?: string;
    teFinishName?: string;
    userMaterials?: Array<{ image: string; label: string }>;
    applyToAllSurfaces?: boolean;
    userNotes?: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const {
    elevationImage,
    teFinishImage,
    teFinishName = 'TE Finish',
    userMaterials = [],
    applyToAllSurfaces = false,
    userNotes = '',
  } = body;

  if (!elevationImage || !teFinishImage) {
    return new Response(
      JSON.stringify({ error: 'elevationImage and teFinishImage are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Fire-and-forget: save user materials to Supabase
  if (userMaterials.length > 0) {
    saveMaterialsAsync(userMaterials);
  }

  // Build prompt
  let prompt = buildPrompt(teFinishName, userMaterials, applyToAllSurfaces);
  if (userNotes) {
    prompt += `\n\nAdditional instructions from the user: ${userNotes}`;
  }

  // Build Replicate input
  // FLUX Kontext Pro accepts input_image + optional extra images
  const elevationBlob = base64ToBlob(elevationImage);
  const finishBlob = base64ToBlob(teFinishImage);

  const replicateInput: Record<string, unknown> = {
    prompt,
    input_image: elevationBlob,
    extra_image_1: finishBlob,
    aspect_ratio: 'match_input_image',
    output_format: 'jpg',
    output_quality: 95,
    safety_tolerance: 6,
    prompt_upsampling: false,
  };

  // Add any user material images as extra inputs
  userMaterials.forEach((mat, i) => {
    if (i < 3) {
      replicateInput[`extra_image_${i + 2}`] = base64ToBlob(mat.image);
    }
  });

  try {
    const replicate = new Replicate({ auth: replicateToken });

    const output = await replicate.run('black-forest-labs/flux-kontext-pro', {
      input: replicateInput,
    });

    // output is typically a URL string or array
    const outputUrl = Array.isArray(output) ? output[0] : output;
    if (!outputUrl) throw new Error('Empty output from Replicate');

    // Proxy the image to avoid CORS issues with temporary Replicate CDN URLs
    const imageResponse = await fetch(outputUrl.toString());
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const dataUrl = `data:${contentType};base64,${base64}`;

    return new Response(JSON.stringify({ output: dataUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[visualize-elevation] Replicate error:', err?.message || err);
    const message = err?.message?.includes('rate limit')
      ? 'Rate limit reached. Please wait a moment and try again.'
      : err?.message || 'Generation failed. Please try again.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
