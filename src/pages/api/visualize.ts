import type { APIRoute } from 'astro';
import Replicate from 'replicate';
import { readDB, writeDB, findSessionByToken, findCodeByEmail, checkRateLimit } from '../../lib/db';

export const prerender = false;

interface Selection {
  location: string;
  textureName: string;
  textureCategory: string;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // TESTING BYPASS — skip auth checks
    const BYPASS_AUTH = true;
    
    if (!BYPASS_AUTH) {
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ 
        error: 'Authentication required' 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.substring(7);
    const db = readDB();
    const session = findSessionByToken(db, token);

    if (!session) {
      return new Response(JSON.stringify({ 
        error: 'Invalid or expired session' 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get user's access code
    const accessCode = findCodeByEmail(db, session.email);

    if (!accessCode) {
      return new Response(JSON.stringify({ 
        error: 'User not found' 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!accessCode.active) {
      return new Response(JSON.stringify({ 
        error: 'Your account has been deactivated' 
      }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check generation limit
    if (accessCode.usedGenerations >= accessCode.maxGenerations) {
      return new Response(JSON.stringify({ 
        error: 'You have used all your available generations. Contact us for more.' 
      }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Rate limit: max 3 requests per minute
    if (!checkRateLimit(session.email, 3, 60000)) {
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded. Please wait a moment before trying again.' 
      }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    } // end BYPASS_AUTH

    const apiToken = import.meta.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN;
    
    if (!apiToken) {
      return new Response(JSON.stringify({ 
        error: 'API token not configured' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { image, mask, selections } = body as {
      image: string;
      mask?: string;
      selections: Selection[];
    };

    if (!image || !selections || selections.length === 0) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: image and selections'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build a descriptive prompt from the selections
    const finishDescriptions = selections.map(s =>
      `${s.textureCategory} ${s.textureName} plaster finish on ${s.location}`
    ).join(', ');

    // Use trained Marbellino LoRA model when Marbellino is selected (img2img only — no inpainting support)
    const hasMarbellino = selections.some((s: any) => s.textureCategory?.toLowerCase().includes('marbellino'));

    const prompt = hasMarbellino
      ? `Professional architectural photo. MARBTEM polished Venetian plaster finish on the walls. ${finishDescriptions}. Hand-troweled, stone-like surface with natural mineral depth and subtle tonal variation. Photorealistic, high quality architectural photography, natural lighting.`
      : `Professional architectural visualization photo. A building/room with ${finishDescriptions}. The walls have a beautiful hand-troweled artisan plaster texture with natural mineral variations and subtle tonal depth. Photorealistic, high quality, professional architectural photography, natural lighting, detailed wall textures visible.`;

    const replicate = new Replicate({ auth: apiToken });

    let output;

    if (mask) {
      // Inpainting — only modifies the white masked area, preserves everything else
      output = await replicate.run(
        'stability-ai/stable-diffusion-inpainting',
        {
          input: {
            image: image,
            mask: mask,
            prompt: prompt,
            negative_prompt: 'ugly, blurry, low quality, distorted, deformed, cartoon, anime, illustration, painting, drawing, sketch, unrealistic, tiles, grout',
            num_inference_steps: 25,
            guidance_scale: 7.5,
            strength: 0.99,
          }
        }
      );
    } else {
      // No mask — img2img on full image (fallback)
      const modelVersion = hasMarbellino
        ? 'snappabot/marbellino-tem:9b83323cc7fdfdd9d7d91dc31dbeabdebe5eecb4b11e84c74bcf35afbbf2e4dd'
        : 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';

      output = await replicate.run(
        modelVersion,
        {
          input: {
            image: image,
            prompt: prompt,
            negative_prompt: 'ugly, blurry, low quality, distorted, deformed, cartoon, anime, illustration, painting, drawing, sketch, unrealistic, tiles, grout',
            prompt_strength: 0.65,
            num_inference_steps: 30,
            guidance_scale: 7.5,
            scheduler: 'K_EULER',
            refine: 'expert_ensemble_refiner',
            high_noise_frac: 0.8,
            num_outputs: 1,
          }
        }
      );
    }

    const rawOutput = Array.isArray(output) ? output[0] : output;
    // Replicate returns FileOutput objects - convert to string URL
    const outputUrl = rawOutput?.toString?.() || String(rawOutput);

    if (!outputUrl) {
      return new Response(JSON.stringify({ 
        error: 'No output generated from AI model' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Increment used generations (skip in bypass mode)
    if (!BYPASS_AUTH && accessCode) {
      accessCode.usedGenerations += 1;
      db.generationLog.push({
        email: session.email,
        timestamp: new Date().toISOString(),
        prompt: prompt,
        ip: clientAddress || 'unknown'
      });
      writeDB(db);
    }

    return new Response(JSON.stringify({ 
      success: true,
      imageUrl: outputUrl,
      prompt: prompt,
      remainingGenerations: 999
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Visualization API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(JSON.stringify({ 
      error: `Generation failed: ${errorMessage}` 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
