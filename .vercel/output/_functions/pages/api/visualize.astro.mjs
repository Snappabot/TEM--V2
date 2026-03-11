import Replicate from 'replicate';
import { r as readDB, b as findSessionByToken, f as findCodeByEmail, d as checkRateLimit, w as writeDB } from '../../chunks/db_g4la_CzZ.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, clientAddress }) => {
  try {
    const BYPASS_AUTH = true;
    if (!BYPASS_AUTH) ;
    const apiToken = "r8_60DWsHJmpLGXx2icDK5wa8vYgtrNjjM4E8n8P";
    if (!apiToken) ;
    const body = await request.json();
    const { image, selections } = body;
    if (!image || !selections || selections.length === 0) {
      return new Response(JSON.stringify({
        error: "Missing required fields: image and selections"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const finishDescriptions = selections.map(
      (s) => `${s.textureCategory} ${s.textureName} plaster finish on ${s.location}`
    ).join(", ");
    const prompt = `Professional architectural visualization photo. A building/room with ${finishDescriptions}. The walls have a beautiful hand-troweled artisan plaster texture with natural mineral variations and subtle tonal depth. Photorealistic, high quality, professional architectural photography, natural lighting, detailed wall textures visible.`;
    const replicate = new Replicate({ auth: apiToken });
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image,
          prompt,
          negative_prompt: "ugly, blurry, low quality, distorted, deformed, cartoon, anime, illustration, painting, drawing, sketch, unrealistic",
          prompt_strength: 0.65,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: "K_EULER",
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8,
          num_outputs: 1
        }
      }
    );
    const rawOutput = Array.isArray(output) ? output[0] : output;
    const outputUrl = rawOutput?.toString?.() || String(rawOutput);
    if (!outputUrl) {
      return new Response(JSON.stringify({
        error: "No output generated from AI model"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!BYPASS_AUTH && accessCode) ;
    return new Response(JSON.stringify({
      success: true,
      imageUrl: outputUrl,
      prompt,
      remainingGenerations: 999
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Visualization API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({
      error: `Generation failed: ${errorMessage}`
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
