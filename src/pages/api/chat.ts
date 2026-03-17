import type { APIRoute } from 'astro';
import { products, companyInfo } from '../../lib/chatbot/knowledge-base';
import { saveLead, saveConversation } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';

// ─── Product deep knowledge ───────────────────────────────────────────────────

const productDetails: Record<string, {
  aliases: string[];
  description: string;
  useCases: string[];
  notSuitableFor: string[];
  colours: string;
  application: string;
  faq: { q: string; a: string }[];
}> = {
  marbellino: {
    aliases: ['marbellino', 'venetian', 'polished plaster', 'marbled', 'marble look'],
    description: 'Marbellino is our flagship Venetian-style polished plaster. It creates a stone-like, slightly marbled finish with real depth and movement. Every wall is unique. It\'s our only product approved for floor applications.',
    useCases: ['feature walls', 'bathroom walls', 'kitchen splashbacks', 'floors', 'stairwells', 'commercial spaces', 'exterior walls'],
    notSuitableFor: ['very high-traffic floor areas without sealer reapplication'],
    colours: 'Virtually unlimited custom colours. Popular choices include warm creams, greys, charcoal, and earthy tones.',
    application: '4–5 coat system applied by hand. Full cure in 5–7 days. Applied by our trained applicators.',
    faq: [
      { q: 'Can it go in a shower?', a: 'Yes — Marbellino can be used in showers and wet areas with appropriate sealing.' },
      { q: 'Can it go on floors?', a: 'Yes — Marbellino is our only product suitable for floors. It needs a floor-grade sealer reapplied every 24 months in high-traffic areas.' },
      { q: 'Is it durable?', a: 'Very. It\'s repairable and patchable with no visible marks. 10-Year Limited Warranty.' },
      { q: 'Can it go outside?', a: 'Yes — Marbellino is suitable for interior and exterior applications.' },
      { q: 'How does it differ from microcement?', a: 'Marbellino is a lime-based Venetian plaster — it breathes, has real depth and movement, and feels completely different to the touch. Microcement is cement-based and tends to look flatter.' },
    ]
  },
  tadelakt: {
    aliases: ['tadelakt', 'tadellino', 'moroccan', 'waterproof', 'hammam', 'lime plaster'],
    description: 'Tadelakt is a traditional Moroccan lime plaster — naturally waterproof, seamless, and antibacterial. No grout lines. No sealer needed in wet areas. It\'s the real deal for showers, bathrooms, and pools.',
    useCases: ['showers', 'bathrooms', 'wet areas', 'pools', 'splashbacks', 'feature walls', 'hammams', 'spas'],
    notSuitableFor: ['floors (not approved for foot traffic)'],
    colours: 'Wide range — earthy neutrals, whites, deep charcoals, warm terracotta tones.',
    application: 'Traditional hand application and stone polishing. Finished with black soap. Requires a skilled applicator.',
    faq: [
      { q: 'Is it really waterproof?', a: 'Yes — naturally. The lime reacts during application to become waterproof. No sealer required in wet areas.' },
      { q: 'Does it need grout?', a: 'No — it\'s seamless. No grout lines at all, which is one of the biggest reasons clients choose it.' },
      { q: 'Can it go in a shower?', a: 'Absolutely — that\'s where it performs best. It\'s been used in Moroccan hammams for centuries.' },
      { q: 'What\'s Tadellino?', a: 'Tadellino is our modern interpretation of Tadelakt — same waterproof properties, slightly more contemporary finish.' },
      { q: 'Can it go outside?', a: 'Yes, with appropriate protection from direct weathering.' },
    ]
  },
  concretum: {
    aliases: ['concretum', 'concrete look', 'industrial', 'raw concrete', 'microcement', 'cement'],
    description: 'Concretum delivers a raw concrete aesthetic — industrial, modern, and understated. It\'s not actually concrete, so it\'s lightweight and goes on walls, ceilings, and floors.',
    useCases: ['feature walls', 'ceilings', 'commercial spaces', 'kitchens', 'bathrooms', 'exterior walls', 'floors'],
    notSuitableFor: [],
    colours: 'Greys, charcoals, warm concretes, off-whites. Custom tints available.',
    application: '2–3 coat system. Finished with a protective sealer. 5–7 day cure.',
    faq: [
      { q: 'Is it actual concrete?', a: 'No — it\'s a decorative plaster that achieves the concrete look without the weight or structural requirements.' },
      { q: 'Can it go in a bathroom?', a: 'Yes — with appropriate sealing it works well in bathrooms.' },
      { q: 'Can it go outside?', a: 'Yes — UV stable and weather-resistant.' },
      { q: 'How does it look?', a: 'Raw, industrial, minimal. Think exposed concrete in a high-end Melbourne apartment.' },
    ]
  },
  rokka: {
    aliases: ['rokka', 'roka', 'stone texture', 'textured', 'stone look', 'rough texture'],
    description: 'Rokka is a heavily textured stone-effect plaster. It has real depth and a tactile surface — like running your hand along a natural stone wall. Earthy, organic, premium.',
    useCases: ['feature walls', 'exterior facades', 'commercial spaces', 'hallways', 'stairwells', 'living rooms'],
    notSuitableFor: ['wet areas', 'floors'],
    colours: 'Earthy stone tones — bone, pilbara red, warm grey, natural. Custom colours available.',
    application: '2–5mm thick application. Hand-textured for organic variation.',
    faq: [
      { q: 'Can it go outside?', a: 'Yes — Rokka is excellent for exterior facades and garden walls.' },
      { q: 'Can it go in a bathroom?', a: 'Not ideal for wet areas due to the texture retaining moisture. Better for dry bathroom walls away from the shower.' },
      { q: 'How thick is it?', a: '2–5mm thick — gives real depth and a genuinely tactile surface.' },
      { q: 'What\'s the difference between Rokka and Concretum?', a: 'Rokka has a rough, organic stone texture. Concretum is smoother with an industrial concrete look. Both are premium, just very different aesthetics.' },
    ]
  },
  earthenHemp: {
    aliases: ['earthen hemp', 'hemp render', 'rammed earth', 'hemp', 'earthen', 'sustainable', 'eco', 'natural render'],
    description: 'Earthen Hemp Render creates an authentic rammed earth aesthetic using sustainable hemp fibres. Earthy, organic, textural — perfect for projects with a sustainability focus or a raw, natural aesthetic.',
    useCases: ['feature walls', 'exterior facades', 'commercial interiors', 'living rooms', 'hospitality spaces', 'columns', 'sculptural elements'],
    notSuitableFor: ['wet areas', 'floors'],
    colours: 'Natural earth tones — sand, cream, charcoal, mocha, sage, grey. Wide range available.',
    application: '3–5mm thick. Contains real hemp fibres for texture and durability. Made in Western Australia.',
    faq: [
      { q: 'Is it actually eco-friendly?', a: 'Yes — it contains sustainable hemp fibres, has low VOC, and is Green Star compliant.' },
      { q: 'Does it look like real rammed earth?', a: 'Very convincingly. The horizontal strata and earthy texture are hard to distinguish from actual rammed earth construction.' },
      { q: 'Can it go outside?', a: 'Yes — suitable for exterior walls and facades.' },
      { q: 'Is it durable?', a: 'Yes — the hemp fibres add structural strength. 10-Year Limited Warranty.' },
    ]
  },
  antiqueStucco: {
    aliases: ['antique stucco', 'stucco', 'aged', 'old world', 'classic', 'european'],
    description: 'Antique Stucco creates a timeless, aged European plaster finish. Works beautifully on ornate architecture, heritage homes, and any space that calls for classic elegance.',
    useCases: ['heritage homes', 'ornate interiors', 'fireplaces', 'archways', 'feature walls', 'exterior facades'],
    notSuitableFor: ['wet areas'],
    colours: 'Warm whites, aged creams, terracottas, ochres. Can be finished with gold patina.',
    application: 'Hand-applied with trowel. Can be finished with metallic patinas for added depth.',
    faq: [
      { q: 'What does it look like?', a: 'Think classic European plaster — slightly aged, warm, with beautiful undulations and depth. Very different from a flat painted wall.' },
      { q: 'Can it go outside?', a: 'Yes — excellent for exterior facades on heritage-style homes.' },
      { q: 'Can it be finished with gold?', a: 'Yes — we can apply gold or bronze patinas for a truly luxurious finish.' },
    ]
  },
  metallics: {
    aliases: ['metallic', 'copper', 'bronze', 'brass', 'steel', 'metal finish', 'metallic plaster'],
    description: 'Our Metallic finishes embed real metal particles — copper, bronze, brass, steel, verdigris — into a plaster base. The result is a wall surface that develops real patina over time.',
    useCases: ['feature walls', 'reception areas', 'commercial spaces', 'bars', 'restaurants', 'retail', 'lift lobbies'],
    notSuitableFor: ['wet areas', 'exterior (some finishes)'],
    colours: 'Copper, Bronze, Brass, Steel, Verdigris, Rust, Scorched Copper, Stainless Steel.',
    application: 'Specialist application — metal particles are worked into the surface and burnished.',
    faq: [
      { q: 'Does it actually age?', a: 'Yes — real metal particles in the plaster develop genuine patina over time, especially copper and bronze.' },
      { q: 'Is it heavy?', a: 'No — it\'s a plaster-based finish, not sheet metal. Goes on any wall surface.' },
      { q: 'What spaces does it work in?', a: 'Feature walls, reception desks, bar fronts, lift lobbies — anywhere you want a dramatic statement.' },
    ]
  }
};

// ─── Conversation state tracking ──────────────────────────────────────────────

interface ConversationState {
  hasName: boolean;
  userName?: string;
  hasProjectContext: boolean;
  projectContext?: string;
  productsDiscussed: string[];
  messageCount: number;
  offerContactMade: boolean;
}

function parseConversationState(history: { role: string; content: string }[]): ConversationState {
  const state: ConversationState = {
    hasName: false,
    hasProjectContext: false,
    productsDiscussed: [],
    messageCount: history.length,
    offerContactMade: false
  };

  const fullText = history.map(m => m.content).join(' ').toLowerCase();

  // Check if name was given (look for "I'm X", "my name is X", "it's X")
  const nameMatch = fullText.match(/(?:i'm|i am|my name is|it's|its|call me)\s+([a-z]+)/i);
  if (nameMatch) {
    state.hasName = true;
    state.userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
  }

  // Check project context
  if (fullText.match(/bathroom|shower|kitchen|living|exterior|commercial|renovation|reno|build|floor|wall|ceiling|outdoor/)) {
    state.hasProjectContext = true;
    state.projectContext = fullText;
  }

  // Check which products were discussed
  for (const [key, prod] of Object.entries(productDetails)) {
    if (prod.aliases.some(a => fullText.includes(a))) {
      state.productsDiscussed.push(key);
    }
  }

  // Check if contact was offered
  if (fullText.includes('email') || fullText.includes('contact matt') || fullText.includes('get in touch') || fullText.includes('quote')) {
    state.offerContactMade = true;
  }

  return state;
}

function findMatchingProduct(message: string): string | null {
  const lower = message.toLowerCase();
  for (const [key, prod] of Object.entries(productDetails)) {
    if (prod.aliases.some(a => lower.includes(a))) {
      return key;
    }
  }
  return null;
}

function buildProductResponse(productKey: string, question: string): string {
  const prod = productDetails[productKey];
  const lower = question.toLowerCase();

  // Check FAQs first
  for (const faq of prod.faq) {
    const keywords = faq.q.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    if (keywords.some(kw => lower.includes(kw))) {
      return faq.a;
    }
  }

  // General product info
  return `${prod.description}\n\n**Best for:** ${prod.useCases.slice(0, 4).join(', ')}\n**Colours:** ${prod.colours}\n\nWhat specifically are you looking to achieve?`;
}

function generateResponse(message: string, history: { role: string; content: string }[], state: ConversationState): string {
  const lower = message.toLowerCase();

  // ── First message / greeting ──────────────────────────────────────────────
  if (history.length <= 1 || lower.match(/^(hi|hello|hey|g'day|yo|howdy)/)) {
    return `G'day! 👋 Welcome to Troweled Earth Melbourne.\n\nBefore we dive in — what's your name, and what are you working on?`;
  }

  // ── Name capture ──────────────────────────────────────────────────────────
  const freshNameMatch = message.match(/(?:i'm|i am|my name is|it's|its|name's|call me)\s+([A-Za-z]+)/i) ||
    (history.length <= 3 && !state.hasName && message.match(/^([A-Z][a-z]+)$/));
  if (freshNameMatch) {
    const name = freshNameMatch[1].charAt(0).toUpperCase() + freshNameMatch[1].slice(1);
    return `Nice to meet you, ${name}! What are you working on — is this a residential reno, new build, or commercial project?`;
  }

  // ── Project type questions ────────────────────────────────────────────────
  if (!state.hasProjectContext && !lower.match(/marbellino|tadelakt|concretum|rokka|stucco|metallic|hemp/)) {
    if (lower.match(/bathroom|shower/)) {
      return `${state.userName ? state.userName + ', for' : 'For'} bathrooms and showers, we have two standout options:\n\n• **Tadelakt** — naturally waterproof, no sealer needed, seamless (no grout lines). A traditional Moroccan lime plaster used in hammams for centuries.\n• **Marbellino** — polished Venetian plaster, also suitable for wet areas with sealing. More of a marble/stone look.\n\nAre you after that warm, organic Moroccan feel, or more of a polished stone finish?`;
    }
    if (lower.match(/floor/)) {
      return `For floors, **Marbellino** is the one — it's our only product approved for floor applications. It creates a polished stone-like finish with real depth and movement.\n\nIs it a residential or commercial space? That affects the sealer spec.`;
    }
    if (lower.match(/exterior|outside|outdoor|facade/)) {
      return `For exterior work we have a few great options:\n\n• **Rokka** — heavily textured stone effect, earthy and robust\n• **Earthen Hemp Render** — rammed earth aesthetic, sustainable hemp fibres\n• **Concretum** — raw industrial concrete look\n• **Marbellino** — polished finish, also works exterior\n\nWhat's the style you're going for?`;
    }
    if (lower.match(/feature wall|living|bedroom|lounge/)) {
      return `Feature walls are where we really shine. What aesthetic are you after?\n\n• **Polished & luxurious** → Marbellino\n• **Raw concrete** → Concretum\n• **Stone texture** → Rokka\n• **Earthy, rammed earth** → Earthen Hemp Render\n• **Metallic statement** → Copper, Bronze, Brass finishes\n• **Classic European** → Antique Stucco`;
    }
    if (lower.match(/commercial|restaurant|hotel|office|cafe|retail|hospitality/)) {
      return `Commercial work is a big part of what we do — restaurants, hotels, retail, hospitality spaces. Marbellino and Rokka are our most popular for commercial.\n\nWhat's the space and what vibe are you after?`;
    }
  }

  // ── Specific product questions ────────────────────────────────────────────
  const matchedProduct = findMatchingProduct(lower);
  if (matchedProduct) {
    const prod = productDetails[matchedProduct];

    // Specific sub-questions
    if (lower.match(/shower|bathroom|wet|waterproof/)) {
      const wetOk = prod.useCases.some(u => u.match(/bathroom|shower|wet/));
      return wetOk
        ? `Yes — ${prod.description.split('.')[0]}. ${prod.faq.find(f => f.q.toLowerCase().includes('shower') || f.q.toLowerCase().includes('waterproof'))?.a || ''}`
        : `${Object.keys(productDetails).find(k => k === matchedProduct) === 'rokka' ? 'Rokka isn\'t ideal for wet areas due to the texture retaining moisture.' : `${prod.description.split('.')[0]} isn't recommended for wet areas.`} For showers, **Tadelakt** is the better choice — naturally waterproof, no sealer needed.`;
    }
    if (lower.match(/floor/)) {
      return matchedProduct === 'marbellino'
        ? `Yes! ${prod.faq.find(f => f.q.toLowerCase().includes('floor'))?.a}`
        : `${Object.values(productDetails)[0].description.split('.')[0]} isn't approved for floors. **Marbellino** is our only floor-approved product.`;
    }
    if (lower.match(/outside|exterior|outdoor/)) {
      const exteriorOk = prod.useCases.some(u => u.match(/exterior|outdoor|outside/));
      return exteriorOk
        ? `Yes — ${prod.aliases[0].charAt(0).toUpperCase() + prod.aliases[0].slice(1)} works well outside. ${prod.faq.find(f => f.q.toLowerCase().includes('outside'))?.a || ''}`
        : `${prod.aliases[0].charAt(0).toUpperCase() + prod.aliases[0].slice(1)} is primarily an interior product.`;
    }
    if (lower.match(/colour|color|shade|tint/)) {
      return `**${prod.aliases[0].charAt(0).toUpperCase() + prod.aliases[0].slice(1)} colours:** ${prod.colours}`;
    }
    if (lower.match(/how.*(apply|applied|put on)|application|install/)) {
      return `**Application:** ${prod.application}`;
    }
    if (lower.match(/durability|durable|last|long|warranty|guarantee/)) {
      return `All our products come with a **10-Year Limited Warranty** when applied by our trained applicators. ${prod.description.split('.')[0]}.`;
    }
    if (lower.match(/price|cost|how much|quote|expensive/)) {
      return `Pricing depends on the area size and project complexity. The best way to get an accurate number is a quick chat with Matt.\n\nWould you like me to connect you? I just need your name, email, and a rough project description.`;
    }

    // General product info
    return buildProductResponse(matchedProduct, lower);
  }

  // ── Comparison questions ──────────────────────────────────────────────────
  if (lower.match(/difference|compare|vs |versus|which one|what.*(best|suit|right)/)) {
    if (lower.match(/bathroom|shower|wet/)) {
      return `For wet areas, the main two are:\n\n**Tadelakt** — naturally waterproof, no sealer, seamless, Moroccan heritage technique. The purist's choice.\n**Marbellino** — polished stone look, works in bathrooms with sealing.\n\nTadelakt = organic and warm. Marbellino = polished and luxurious.`;
    }
    if (lower.match(/concrete|industrial/)) {
      return `**Concretum** is the industrial concrete look — smooth, raw, minimal.\n**Rokka** is the textured stone look — rough, tactile, organic.\n\nBoth are earthy and modern, just very different to touch and look at.`;
    }
    return `Quick comparison:\n\n• **Marbellino** — polished stone look, can do floors, very versatile\n• **Tadelakt** — naturally waterproof, best for showers\n• **Concretum** — raw concrete aesthetic\n• **Rokka** — textured stone, very tactile\n• **Earthen Hemp** — rammed earth look, sustainable\n• **Metallics** — copper, bronze, brass statement finishes\n• **Antique Stucco** — classic European aged plaster\n\nWhat space are you working with?`;
  }

  // ── Pricing ───────────────────────────────────────────────────────────────
  if (lower.match(/price|cost|how much|quote|expensive|cheap/)) {
    return `Pricing varies by product, area, and complexity. Our products are at the premium end — this is artisan plasterwork, not a paint job.\n\nFor a rough idea, it's best to have a quick conversation with Matt. Want me to set that up? I just need your email and a brief on the project.`;
  }

  // ── Contact / email ───────────────────────────────────────────────────────
  if (lower.match(/contact|call|email|phone|speak to|talk to|get in touch|matt/)) {
    return `You can reach Matt directly:\n\n📞 **0439 243 055**\n📧 **matt-troweledearth@outlook.com**\n📱 **@troweled_earth_melbourne**\n\nOr if you'd like, share your email and I'll make sure he gets your project details straight away.`;
  }

  // ── Training ─────────────────────────────────────────────────────────────
  if (lower.match(/training|workshop|course|learn|applicator/)) {
    return `We run hands-on training workshops for plasterers, builders, and serious DIY enthusiasts. Matt and Jarrad teach the application techniques directly.\n\nFollow **@troweled_earth_melbourne** on Instagram for upcoming dates, or contact us to register interest:\n📞 0439 243 055`;
  }

  // ── Warranty ─────────────────────────────────────────────────────────────
  if (lower.match(/warranty|guarantee|how long/)) {
    return `All Troweled Earth products carry a **10-Year Limited Warranty** when applied by one of our trained applicators. This covers peeling, blistering, flaking, and delamination.\n\nThe warranty applies to residential applications. Commercial terms can be discussed with Matt.`;
  }

  // ── Suppliers ─────────────────────────────────────────────────────────────
  if (lower.match(/supplier|stockist|where.*buy|buy|purchase|store|distributor/)) {
    return `Our products are available from these stockists:\n\n🏪 **Render Supply Co** — [shop online](https://store.rendersupplyco.com.au/interior-and-exterior-coatings/surface-coating/troweled-earth.html)\n🏪 **Colour World Geelong** — [colourworld.com.au](https://colourworld.com.au/)\n🏪 **Wet Trades** — [wettrades.com.au](https://wettrades.com.au/)\n🏪 **Metro Build Suppliers** — [metrobuildsuppliers.com.au](https://metrobuildsuppliers.com.au/)\n\nFor project orders and consultations, contact us directly.`;
  }

  // ── After several exchanges — offer contact ───────────────────────────────
  if (state.messageCount >= 6 && !state.offerContactMade) {
    return `Sounds like you've got a solid project on the go. Would you like me to connect you with Matt for a proper consultation? He can give you specific product recommendations and a quote.\n\nJust share your email and I'll pass on your project details.`;
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  const namePrefix = state.userName ? `${state.userName}, ` : '';
  return `${namePrefix}I want to make sure I give you the right answer. Could you tell me a bit more about:\n\n• What space is this for? (bathroom, feature wall, exterior, etc.)\n• What look are you going for?\n\nThat'll help me point you to exactly the right finish.`;
}

// ─── API Handler ──────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, sessionId, conversationHistory = [] } = body;

    if (!message || !sessionId) {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const state = parseConversationState(conversationHistory);
    const response = generateResponse(message, conversationHistory, state);

    // Determine if we should prompt for contact info
    const shouldPromptContact = state.messageCount >= 5 && 
      !state.offerContactMade && 
      state.hasProjectContext &&
      state.productsDiscussed.length > 0;

    // Save to Supabase (non-blocking)
    saveConversation({
      session_id: sessionId,
      messages: [
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ],
      products_mentioned: state.productsDiscussed
    }).catch(err => console.error('Failed to save conversation:', err));

    return new Response(JSON.stringify({ 
      response, 
      sessionId,
      promptContact: shouldPromptContact,
      userName: state.userName
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process message',
      response: "Sorry, I'm having trouble. Please call us at 0439 243 055!"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// ─── Lead save ────────────────────────────────────────────────────────────────

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, sessionId, productsInterested } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await saveLead({
      name,
      email,
      phone,
      products_interested: productsInterested,
      source: 'chatbot_form'
    });

    if (result.error) throw result.error;

    await sendLeadNotification({ name, email, phone, productsInterested });

    return new Response(JSON.stringify({ success: true, lead: result.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Lead save error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
