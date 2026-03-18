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

// ─── Personalised greeting helpers ───────────────────────────────────────────

function greetByProject(name: string, project: string): string {
  const n = name ? `Thanks ${name}! ` : '';
  if (project.match(/bathroom|shower/)) {
    return `${n}A bathroom project — great choice for a real transformation. 🛁\n\nFor wet areas you've got two standout options:\n\n• **Tadelakt** — naturally waterproof, seamless, no grout lines. Traditional Moroccan lime plaster used in hammams for centuries. Incredibly warm and organic.\n• **Marbellino** — polished Venetian plaster, stone-like finish. Also works in wet areas with sealing.\n\nAre you going for a warm, organic feel — or more of a luxurious polished stone look?\n\nAlso — what's the substrate? (Render, plasterboard, existing tiles?)`;
  }
  if (project.match(/kitchen|splashback/)) {
    return `${n}Kitchen splashbacks and feature walls look incredible in our finishes. 🍳\n\nFor kitchens I'd usually point you toward:\n\n• **Marbellino** — polished stone look, handles splashes well with sealing\n• **Concretum** — raw concrete aesthetic, very popular in modern kitchens\n• **Metallics** — copper or brass near a rangehood can be a real statement piece\n\nWhat's the vibe you're going for — modern and minimal, or something with warmth?`;
  }
  if (project.match(/floor/)) {
    return `${n}Floor project! **Marbellino** is your answer — it's the only one in our range approved for floor applications. Creates a beautiful polished stone look with real depth.\n\nIs it a residential or commercial space? And roughly how many square metres are we talking?`;
  }
  if (project.match(/exterior|outside|outdoor|facade/)) {
    return `${n}Exterior work is one of our specialties. 🏠\n\nTop picks for outside:\n\n• **Rokka** — heavily textured stone effect, very robust outdoors\n• **Earthen Hemp Render** — rammed earth look, sustainable, brilliant on facades\n• **Concretum** — raw concrete, UV stable and weather-resistant\n• **Marbellino** — polished, also approved for exterior use\n\nWhat style is the property — modern, heritage, or somewhere in between?`;
  }
  if (project.match(/feature wall|lounge|living|bedroom/)) {
    return `${n}Feature walls are where we really get to show off. ✨\n\nWhat aesthetic are you after?\n\n• **Polished & luxurious** → Marbellino\n• **Raw concrete** → Concretum\n• **Stone texture** → Rokka\n• **Earthy, rammed earth** → Earthen Hemp Render\n• **Metallic statement** → Copper, Bronze, Brass\n• **Classic European** → Antique Stucco\n\nAny colour direction in mind?`;
  }
  if (project.match(/commercial|restaurant|hotel|cafe|office|retail|hospitality/)) {
    return `${n}Commercial projects are a big part of what we do — restaurants, hotels, retail spaces, lobbies. 🏢\n\nMarbellino and Rokka are our most popular for commercial work, but it really depends on the vibe.\n\nWhat's the space, and what atmosphere are you trying to create?`;
  }
  if (project.match(/reno|renovati|new build|house|home/)) {
    return `${n}Sounds like a great project! We work with a lot of residential renovations and new builds across Melbourne.\n\nWhich spaces are you thinking of plastering? (Bathrooms, feature walls, floors, exterior?)`;
  }
  return `${n}That sounds like a great project! To point you in the right direction — which specific spaces are you working on, and what look are you going for?`;
}

function generateResponse(message: string, history: { role: string; content: string }[], state: ConversationState): string {
  const lower = message.toLowerCase();
  const hi = state.userName ? `${state.userName}, ` : '';

  // ── First message / greeting ──────────────────────────────────────────────
  if (history.length <= 1 || lower.match(/^(hi|hello|hey|g'day|yo|howdy|sup|hiya)/)) {
    return `G'day! 👋 Welcome to Troweled Earth Melbourne — I'm here to help you find the perfect finish for your project.\n\nWhat's your name, and what are you working on?`;
  }

  // ── Name + project in one message e.g. "I'm Joe, bathroom reno" ──────────
  const nameAndProject = message.match(/(?:i'?m|i am|my name(?:'s| is)?|it'?s|call me|name'?s)\s+([A-Za-z]+)[,\s]+(.+)/i);
  if (nameAndProject && !state.hasName) {
    const name = nameAndProject[1].charAt(0).toUpperCase() + nameAndProject[1].slice(1);
    const project = nameAndProject[2].toLowerCase();
    return greetByProject(name, project);
  }

  // ── Name only ─────────────────────────────────────────────────────────────
  const freshNameMatch = message.match(/(?:i'?m|i am|my name(?:'s| is)?|it'?s|call me|name'?s)\s+([A-Za-z]+)/i) ||
    (history.length <= 3 && !state.hasName && message.match(/^([A-Z][a-z]{1,14})\.?$/));
  if (freshNameMatch && !state.hasName) {
    const name = freshNameMatch[1].charAt(0).toUpperCase() + freshNameMatch[1].slice(1);
    return `Great to meet you, ${name}! 😊 What are you working on — bathroom, feature wall, floors, or something else? And is it residential or commercial?`;
  }

  // ── Short project description after name is known ─────────────────────────
  if (state.hasName && !state.hasProjectContext && history.length <= 5) {
    if (lower.match(/bathroom|shower|wet area/)) {
      return greetByProject(state.userName || '', 'bathroom');
    }
    if (lower.match(/kitchen|splashback/)) {
      return greetByProject(state.userName || '', 'kitchen');
    }
    if (lower.match(/floor/)) {
      return greetByProject(state.userName || '', 'floor');
    }
    if (lower.match(/exterior|outside|outdoor|facade/)) {
      return greetByProject(state.userName || '', 'exterior');
    }
    if (lower.match(/feature wall|lounge|living|bedroom/)) {
      return greetByProject(state.userName || '', 'feature wall');
    }
    if (lower.match(/commercial|restaurant|hotel|cafe|office/)) {
      return greetByProject(state.userName || '', 'commercial');
    }
    if (lower.match(/reno|renovati|new build|house|home/)) {
      return greetByProject(state.userName || '', 'reno');
    }
  }

  // ── Substrate questions ───────────────────────────────────────────────────
  if (lower.match(/plasterboard|gyprock|render|tiles|concrete slab|masonry|brick|hebel|substrate/)) {
    if (lower.match(/plasterboard|gyprock/)) {
      return `${hi}Good news — all our products go onto plasterboard with the right primer and prep. For wet areas on plasterboard, we apply a waterproofing membrane first before the plaster.\n\nAre you applying it yourself, or using a tradesperson?`;
    }
    if (lower.match(/tiles/)) {
      return `${hi}Going over existing tiles is possible with the right prep — the surface needs to be clean, stable, and properly primed. We'd recommend confirming with Matt for the specific product you're after.\n\nWould you like me to put you in touch with him directly?`;
    }
    if (lower.match(/render|masonry|brick|hebel/)) {
      return `${hi}Rendered masonry or brick is actually an ideal substrate for most of our products. Very stable surface to work with.\n\nWhich product are you thinking of going with?`;
    }
    if (lower.match(/concrete slab/)) {
      return `${hi}Concrete slab for flooring? **Marbellino** is the one — it's our only floor-approved product. Goes straight over a sound concrete slab with appropriate prep.\n\nHow large is the area roughly?`;
    }
    return `${hi}The substrate matters a lot for prep and product selection. What are you working with — plasterboard, render, existing tiles, or something else?`;
  }

  // ── DIY vs trade ──────────────────────────────────────────────────────────
  if (lower.match(/diy|do it myself|do it yourself|can i apply|self.apply/)) {
    return `${hi}Honest answer — our products are designed for trained applicators. Venetian plasters like Marbellino and Tadelakt take real skill to get right; the technique makes the finish.\n\nThat said, we do run hands-on training workshops if you're keen to learn. Matt and Jarrad teach the techniques directly.\n\nAre you a tradesperson looking to add this to your skillset, or a homeowner?`;
  }

  // ── Timeline / how long ───────────────────────────────────────────────────
  if (lower.match(/how long|timeline|time.*(take|frame)|days|weeks/)) {
    return `${hi}Good question. Most of our finishes cure in 5–7 days, but the full application process depends on the product and size of the job:\n\n• **Single room** — typically 2–3 days application + curing time\n• **Full home** — 1–3 weeks depending on scope\n• **Commercial** — project-dependent\n\nFor a proper timeline, it's best to chat with Matt once you have the scope locked in. Want me to connect you?`;
  }

  // ── Maintenance / cleaning ────────────────────────────────────────────────
  if (lower.match(/clean|maintain|maintenance|care|look after|seal/)) {
    const prod = findMatchingProduct(lower);
    if (prod === 'tadelakt') {
      return `Tadelakt is beautifully low-maintenance. Clean with a mild pH-neutral soap — avoid acidic cleaners. You can re-polish it with black soap periodically to restore the shine. No sealer needed in wet areas.`;
    }
    if (prod === 'marbellino') {
      return `Marbellino needs a light clean every 12–18 months. On floors, the sealer may need reapplication every 24 months in high-traffic areas. Use pH-neutral cleaners — no harsh chemicals.`;
    }
    return `${hi}All our products are low-maintenance by design. General rule:\n\n• **Damp cloth** for everyday cleaning\n• **pH-neutral cleaner** — avoid acidic or abrasive products\n• **Sealer reapplication** every 1–2 years for flooring products\n\nWhich specific product are you asking about?`;
  }

  // ── Colour questions ──────────────────────────────────────────────────────
  if (lower.match(/colour|color|shade|tint|palette|white|grey|gray|black|cream|warm|cool|dark|light/)) {
    const prod = findMatchingProduct(lower);
    if (prod) {
      return `**${productDetails[prod].aliases[0].charAt(0).toUpperCase() + productDetails[prod].aliases[0].slice(1)} colours:**\n\n${productDetails[prod].colours}\n\nWe work with you to match exact colours to your project. Have you got a specific tone in mind, or a colour from your interior scheme we could match to?`;
    }
    return `${hi}Colour is one of the best parts! Every product has a huge range — we can custom tint to match almost any palette.\n\nAre you working with a warm or cool tone? Any existing colours in the space we should work with?`;
  }

  // ── Size / area questions ─────────────────────────────────────────────────
  if (lower.match(/how much.*need|square met|sqm|m2|area|size|how big/)) {
    return `${hi}To give you an accurate material quantity I'd need the square metres of the area. Roughly:\n\n• **Marbellino:** ~0.5–0.8 kg per m² per coat (4–5 coats)\n• **Concretum:** ~1–1.5 kg per m² (2–3 coats)\n• **Rokka / Hemp Render:** ~2–4 kg per m² (thick application)\n\nDo you have an approximate area size? Happy to help estimate.`;
  }

  // ── Project type questions (without name context) ─────────────────────────
  if (!state.hasProjectContext && !lower.match(/marbellino|tadelakt|concretum|rokka|stucco|metallic|hemp/)) {
    if (lower.match(/bathroom|shower/)) {
      return greetByProject(state.userName || '', 'bathroom');
    }
    if (lower.match(/floor/)) {
      return greetByProject(state.userName || '', 'floor');
    }
    if (lower.match(/exterior|outside|outdoor|facade/)) {
      return greetByProject(state.userName || '', 'exterior');
    }
    if (lower.match(/feature wall|living|bedroom|lounge/)) {
      return greetByProject(state.userName || '', 'feature wall');
    }
    if (lower.match(/commercial|restaurant|hotel|office|cafe|retail|hospitality/)) {
      return greetByProject(state.userName || '', 'commercial');
    }
    if (lower.match(/kitchen|splashback/)) {
      return greetByProject(state.userName || '', 'kitchen');
    }
  }

  // ── Specific product questions ────────────────────────────────────────────
  const matchedProduct = findMatchingProduct(lower);
  if (matchedProduct) {
    const prod = productDetails[matchedProduct];
    const prodName = prod.aliases[0].charAt(0).toUpperCase() + prod.aliases[0].slice(1);

    if (lower.match(/shower|bathroom|wet|waterproof/)) {
      const wetOk = prod.useCases.some(u => u.match(/bathroom|shower|wet/));
      if (wetOk) {
        const faqAnswer = prod.faq.find(f => f.q.toLowerCase().includes('shower') || f.q.toLowerCase().includes('waterproof'))?.a || '';
        return `${hi}${prodName} works great in wet areas! ${faqAnswer}\n\nWhat's the substrate — plasterboard, render, or over existing tiles?`;
      } else {
        return `${hi}${prodName} isn't ideal for wet areas. For showers and bathrooms, **Tadelakt** is the standout choice — naturally waterproof, seamless, no grout lines.\n\nWant me to tell you more about Tadelakt?`;
      }
    }
    if (lower.match(/\bfloor\b/)) {
      if (matchedProduct === 'marbellino') {
        return `${hi}Yes! Marbellino is our only product approved for floors. ${prod.faq.find(f => f.q.toLowerCase().includes('floor'))?.a}\n\nIs this a residential or commercial floor, and roughly how many square metres?`;
      }
      return `${hi}${prodName} isn't designed for floor applications — foot traffic would damage it over time. **Marbellino** is the only one in our range approved for floors.\n\nWould Marbellino work for your project?`;
    }
    if (lower.match(/outside|exterior|outdoor/)) {
      const exteriorOk = prod.useCases.some(u => u.match(/exterior|outdoor|outside/));
      const faqAnswer = prod.faq.find(f => f.q.toLowerCase().includes('outside'))?.a || '';
      return exteriorOk
        ? `${hi}Yes — ${prodName} works great outdoors. ${faqAnswer}\n\nIs this a wall, facade, or something else?`
        : `${hi}${prodName} is primarily an interior product. For exterior work, **Rokka** or **Earthen Hemp Render** are your best options — both weather-resistant and UV stable.`;
    }
    if (lower.match(/colour|color|shade|tint/)) {
      return `${hi}${prodName} colours: ${prod.colours}\n\nHave you got a colour direction in mind, or a Dulux/Resene code we could work from?`;
    }
    if (lower.match(/how.*(apply|applied|put on)|application|install|process/)) {
      return `${hi}${prodName} application: ${prod.application}\n\nAll our work is done by trained applicators — this isn't a DIY product (the technique is what makes the finish special). Are you looking to hire an applicator, or do you want to learn the technique yourself?`;
    }
    if (lower.match(/durability|durable|last|long|warranty|guarantee/)) {
      return `${hi}${prodName} is extremely durable — all our products carry a **10-Year Limited Warranty** when applied by our trained applicators.\n\n${prod.description.split('.')[0]}.\n\nThe warranty covers peeling, blistering, flaking, and delamination.`;
    }
    if (lower.match(/price|cost|how much|quote|expensive/)) {
      return `${hi}Pricing for ${prodName} depends on the area size, surface prep, and project complexity. Our products are at the premium end — this is artisan plasterwork, not paint.\n\nThe best way to get an accurate quote is a quick chat with Matt. Want me to connect you? I just need your email and a rough project description.`;
    }
    if (lower.match(/difference|compare|vs|versus/)) {
      return buildProductResponse(matchedProduct, lower);
    }

    // General product info — then ask a follow-up
    const baseInfo = buildProductResponse(matchedProduct, lower);
    return `${baseInfo}\n\n${hi ? hi + 'w' : 'W'}hat's the space you're working on?`;
  }

  // ── Comparison questions ──────────────────────────────────────────────────
  if (lower.match(/difference|compare|vs |versus|which one|what.*(best|suit|right)/)) {
    if (lower.match(/bathroom|shower|wet/)) {
      return `${hi}For wet areas, the main two are:\n\n**Tadelakt** — naturally waterproof, no sealer, seamless. Traditional Moroccan lime plaster. Warm and organic.\n**Marbellino** — polished stone look, works in wet areas with sealing. More luxurious.\n\nTadelakt = organic warmth. Marbellino = polished luxury.\n\nWhat's the overall vibe of your bathroom?`;
    }
    if (lower.match(/concrete|industrial/)) {
      return `${hi}**Concretum** vs **Rokka** — both earthy and modern, very different textures:\n\n**Concretum** — smooth, industrial, raw concrete look. Clean and minimal.\n**Rokka** — rough, deeply textured stone effect. Very tactile and organic.\n\nIf you want people to run their hand along the wall, Rokka. If you want a sleek industrial feel, Concretum.`;
    }
    if (lower.match(/marbellino|tadelakt/)) {
      return `${hi}Great question:\n\n**Marbellino** — polished Venetian plaster, stone-like finish, can do floors, interior and exterior, wide colour range.\n**Tadelakt** — naturally waterproof (no sealer!), seamless, traditional Moroccan technique, best for wet areas.\n\nBoth are premium and hand-applied. The main decision is: do you need it in a wet area?`;
    }
    return `${hi}Here's the full range:\n\n• **Marbellino** — polished stone, can do floors, very versatile ⭐\n• **Tadelakt** — naturally waterproof, best for showers\n• **Concretum** — raw concrete aesthetic\n• **Rokka** — textured stone, very tactile\n• **Earthen Hemp** — rammed earth look, sustainable\n• **Metallics** — copper, bronze, brass statement finishes\n• **Antique Stucco** — classic European aged plaster\n\nWhat space are you working with and what's the vibe you're after?`;
  }

  // ── Pricing ───────────────────────────────────────────────────────────────
  if (lower.match(/price|cost|how much|quote|expensive|cheap|budget/)) {
    return `${hi}Our products are at the premium end of the market — this is hand-applied artisan plasterwork, not paint or wallpaper.\n\nPricing is driven by:\n• Product choice\n• Area size (m²)\n• Surface prep required\n• Location\n\nFor a ballpark, it's best to have a quick chat with Matt — he can give you a realistic number fast. Want me to put you in touch? I just need your email.`;
  }

  // ── Contact / email ───────────────────────────────────────────────────────
  if (lower.match(/contact|call|email|phone|speak to|talk to|get in touch|reach|matt/)) {
    return `${hi}You can reach Matt directly:\n\n📞 **0439 243 055**\n📧 **matt-troweledearth@outlook.com**\n📱 Instagram: **@troweled_earth_melbourne**\n\nOr share your email here and I'll make sure he gets your project details straight away — saves you time.`;
  }

  // ── Location / Melbourne ──────────────────────────────────────────────────
  if (lower.match(/melbourne|victoria|geelong|ballarat|bendigo|mornington|peninsula|bayside|richmond|toorak|brighton|st kilda|brunswick|fitzroy|collingwood/)) {
    return `${hi}Yes — we're Melbourne-based and work across Greater Melbourne and regional Victoria. Toorak, Brighton, Richmond, Brunswick — we do a lot of work right across the city.\n\nWhere's your project located?`;
  }

  // ── Instagram / social ────────────────────────────────────────────────────
  if (lower.match(/instagram|insta|social|portfolio|photos|examples|see.*work/)) {
    return `${hi}Check out our work on Instagram — **@troweled_earth_melbourne** — 7,000+ followers and hundreds of real project photos.\n\nYou'll get a great feel for the range of finishes and colour options. Anything specific you'd like to see?`;
  }

  // ── Training ─────────────────────────────────────────────────────────────
  if (lower.match(/training|workshop|course|learn|applicator|skill/)) {
    return `${hi}We run hands-on training workshops for plasterers, builders, and tradespeople who want to add decorative finishes to their skillset. Matt and Jarrad teach the techniques directly — you'll actually apply the product on the day.\n\nFollow **@troweled_earth_melbourne** on Instagram for upcoming dates, or call Matt directly:\n📞 **0439 243 055**`;
  }

  // ── Warranty ─────────────────────────────────────────────────────────────
  if (lower.match(/warranty|guarantee|how long.*(last|for)|cover/)) {
    return `${hi}All Troweled Earth products carry a **10-Year Limited Warranty** when applied by one of our trained applicators.\n\nCovers: peeling, blistering, flaking, delamination.\n\nResidential terms are standard. Commercial warranty terms are discussed on a project basis with Matt.`;
  }

  // ── Suppliers ─────────────────────────────────────────────────────────────
  if (lower.match(/supplier|stockist|where.*buy|buy|purchase|store|distributor|stock/)) {
    return `${hi}Our products are available from these stockists:\n\n🏪 **Render Supply Co** — [shop online](https://store.rendersupplyco.com.au/interior-and-exterior-coatings/surface-coating/troweled-earth.html)\n🏪 **Colour World Geelong** — [colourworld.com.au](https://colourworld.com.au/)\n🏪 **Wet Trades** — [wettrades.com.au](https://wettrades.com.au/)\n🏪 **Metro Build Suppliers** — [metrobuildsuppliers.com.au](https://metrobuildsuppliers.com.au/)\n\nFor project quotes and bulk orders, contact us directly.`;
  }

  // ── Yes / no / short affirmatives ────────────────────────────────────────
  if (lower.match(/^(yes|yeah|yep|sure|ok|okay|sounds good|perfect|great|definitely|absolutely)[\s!.]*$/)) {
    if (state.productsDiscussed.length > 0) {
      const prod = state.productsDiscussed[state.productsDiscussed.length - 1];
      return `${hi}Great! To help get you the right info — what's the substrate you're working with (plasterboard, render, existing tiles, concrete slab)?`;
    }
    return `${hi}Great! What would you like to know more about?`;
  }

  // ── Thanks ────────────────────────────────────────────────────────────────
  if (lower.match(/thank|thanks|cheers|appreciate/)) {
    return `${hi}No worries at all! If you have any more questions or want to get a quote, reach out anytime. 😊\n\nMatt's number is **0439 243 055** if you want to chat directly.`;
  }

  // ── After several exchanges — offer contact ───────────────────────────────
  if (state.messageCount >= 6 && !state.offerContactMade && state.hasProjectContext) {
    return `${hi}Sounds like you've got a great project on the go! Would you like me to connect you with Matt for a proper consultation and quote?\n\nHe can walk you through the right product, colour, and give you a realistic price. Just share your email and I'll pass on your details.`;
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  return `${hi}I want to make sure I point you in the right direction! Could you tell me:\n\n• What space is this for? (bathroom, feature wall, floors, exterior?)\n• What look are you going for?\n• Roughly what suburb is the project in?\n\nThat'll help me give you a specific recommendation. 😊`;
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
