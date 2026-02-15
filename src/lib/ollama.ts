// Ollama integration for chatbot
// Uses local llama3.2:1b model - FREE, runs on server

const OLLAMA_URL = 'http://127.0.0.1:11434';
const MODEL = 'llama3.2:1b';

// System prompt with product knowledge
const SYSTEM_PROMPT = `You are Jose, a friendly and knowledgeable assistant for Troweled Earth Melbourne - specialists in premium decorative plaster finishes.

Key information about our products:

**Marbellino** - Our signature Venetian plaster. High-gloss marble-like finish, interior walls/ceilings, can be used on floors. Coverage: 2-3m²/kg. Repairable and patchable. Made in Australia.

**Tadelakt** - Traditional Moroccan waterproof plaster. Perfect for wet areas like bathrooms, showers, pools. Naturally antibacterial, seamless finish. Coverage: 1.5-2m²/kg.

**Tadelino** - Modern lime-based plaster with matte finish. Great for living spaces wanting natural texture. Breathable, eco-friendly.

**Concretum** - Industrial concrete-look finish. Raw, contemporary aesthetic. Interior/exterior use.

**Rokka** - Textured stone-effect plaster. Creates natural stone appearance. Interior/exterior.

**Antique Stucco** - Aged, weathered appearance. Old-world European charm.

**Earthen Renders** - Natural clay and lime renders. Sustainable, breathable.

**All products feature:**
- 10-Year Limited Warranty
- Made in Australia
- Eco-friendly, low VOC
- Applied by certified professionals

**Contact:**
- Phone: 0439 243 055
- Email: matt-troweledearth@outlook.com
- Website: troweledearthmelbourne.com.au
- Location: Melbourne, Victoria

Keep responses helpful, concise (2-3 sentences max unless asked for details), and friendly. If you don't know something specific, suggest contacting us directly for accurate info.`;

interface OllamaResponse {
  response: string;
  done: boolean;
}

export async function chat(message: string, history: {role: string, content: string}[] = []): Promise<string> {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message }
    ];

    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 256  // Keep responses short
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json() as { message: { content: string } };
    return data.message.content;

  } catch (error) {
    console.error('Ollama chat error:', error);
    // Fallback response if Ollama is down
    return "I'm having a bit of trouble right now. Please try again, or contact us directly at 0439 243 055 for immediate assistance!";
  }
}

export async function isAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`);
    return response.ok;
  } catch {
    return false;
  }
}
