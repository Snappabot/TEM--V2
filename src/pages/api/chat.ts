import type { APIRoute } from 'astro';
import { products, companyInfo } from '../../lib/chatbot/knowledge-base';
import { saveLead, saveConversation } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';

// ─── Product Knowledge Base ───────────────────────────────────────────────────

const PAGES: Record<string, string> = {
  marbellino: '/products/marbellino',
  tadellino: '/products/tadellino',
  concretum: '/products/concretum',
  rokka: '/products/rokka',
  earthenHemp: '/products/earthen-renders',
  metallics: '/products/metallics',
  antiqueStucco: '/products/antique-stucco',
  suppliers: '/suppliers',
  gallery: '/#gallery',
  contact: '/#contact',
  training: '/training',
};

const KB = {
  marbellino: {
    aliases: ['marbellino', 'venetian', 'polished plaster', 'marbled', 'marble', 'venetian plaster'],
    name: 'Marbellino',
    summary: 'Venetian-style polished plaster. Stone-like, marbled finish with real depth. The only TEM product approved for floors.',
    wetAreas: true, floors: true, exterior: true,
    description: 'Marbellino is our flagship polished plaster. Hand-applied in 4–5 coats to create a stone-like surface with genuine depth and movement. Every wall is completely unique. It\'s our most versatile product — walls, floors, ceilings, interior and exterior.',
    colours: 'Virtually unlimited custom colours. Most popular: warm creams (Ivory, Tusk), greys (Common Grey, Smokey), charcoals, and earthy tones. We can match any Dulux or Resene code.',
    application: '4–5 coat hand application + polishing. Full cure 5–7 days. Applied only by trained TEM applicators.',
    maintenance: 'Light clean every 12–18 months. Floor sealer reapplication every 24 months in high-traffic areas. pH-neutral cleaners only.',
    warranty: '10-Year Limited Warranty on residential applications.',
    substrate: 'Works on plasterboard (with primer), render, masonry, and concrete slab (floors). Existing tiles possible with correct prep.',
    bestFor: ['bathrooms', 'feature walls', 'floors', 'kitchens', 'stairwells', 'exterior facades', 'commercial spaces'],
    notFor: ['very high traffic floors without sealer maintenance'],
    approxCost: 'Premium — contact Matt for a quote based on m².',
    faq: [
      { q: 'shower bathroom wet waterproof', a: 'Yes — Marbellino works in showers and wet areas with appropriate sealing. It\'s not naturally water resistant like Tadellino, but with a quality sealer it performs beautifully in bathrooms.' },
      { q: 'floor', a: 'Yes — Marbellino is our only floor-approved product. Works on concrete slab or solid substrate. Floor sealer needs reapplication every ~2 years in high-traffic areas.' },
      { q: 'outside exterior outdoor', a: 'Yes — Marbellino is approved for exterior use. UV stable, weather-resistant. Very popular for external feature walls and facades.' },
      { q: 'microcement difference', a: 'Marbellino is lime-based — it breathes, has real visual depth and movement, and feels completely different to touch. Microcement is cement-based and tends to look flatter and more uniform.' },
      { q: 'colour custom match', a: 'Virtually unlimited. We can match any Dulux, Resene, or Porter\'s colour. Most popular are Ivory, Tusk, Common Grey, Smokey, and Giorgi (warm white).' },
    ]
  },
  tadellino: {
    aliases: ['tadellino', 'bathroom plaster', 'moroccan plaster', 'moroccan', 'lime plaster', 'hammam', 'water resistant plaster', 'tadelakt inspired'],
    name: 'Tadellino',
    summary: 'Tadellino — Tadelakt inspired. Naturally waterproof, seamless, no grout lines. Our signature bathroom and wet area finish.',
    wetAreas: true, floors: false, exterior: true,
    description: 'Tadellino is our signature bathroom finish — Tadelakt inspired. A high-performance water resistant plaster that becomes naturally water resistant through its application process. Seamless, antibacterial, no grout lines, no sealer needed. The Moroccan tradition reimagined for modern Australian projects.',
    colours: 'Earthy neutrals, warm whites, deep charcoals, terracottas, sages. Custom tinting available.',
    application: 'Traditional hand application with stone polishing. Finished with black soap. Requires a highly skilled applicator — this is the most technique-intensive product in our range.',
    maintenance: 'Mild pH-neutral soap cleaning. Can be re-polished with black soap to restore shine. No re-sealing needed.',
    warranty: '10-Year Limited Warranty.',
    substrate: 'Requires a render substrate — not suitable direct to plasterboard without render coat first. Waterproofing membrane under the render recommended.',
    bestFor: ['showers', 'baths', 'wet areas', 'splash zones', 'feature walls', 'pools', 'spas', 'hammams'],
    notFor: ['floors', 'very rough substrates without render prep'],
    approxCost: 'Premium — most labour-intensive product. Contact Matt for quote.',
    faq: [
      { q: 'waterproof sealer', a: 'Naturally waterproof — no sealer required. The lime reacts during application to form a water resistant surface.' },
      { q: 'grout lines grout', a: 'No grout lines at all — completely seamless. One of the biggest reasons clients choose it over tiles.' },
      { q: 'shower bathroom', a: 'This is where it excels. Used in Moroccan hammams for centuries. Looks incredible in a modern shower.' },
      { q: 'floor', a: 'Tadellino isn\'t approved for floor applications — not rated for foot traffic. Marbellino is our floor product.' },
      { q: 'tadellino difference tadelakt', a: 'Tadellino is Tadelakt inspired — it takes the traditional Moroccan waterproof lime plaster technique and brings it into modern Australian projects. Same naturally water resistant properties, same seamless no-grout finish.' },
    ]
  },
  concretum: {
    aliases: ['concretum', 'concrete look', 'concrete finish', 'industrial', 'raw concrete', 'concrete plaster'],
    name: 'Concretum',
    summary: 'Raw concrete aesthetic in a decorative plaster. Industrial, minimal, modern. Works on walls, ceilings, and floors.',
    wetAreas: true, floors: true, exterior: true,
    description: 'Concretum delivers a raw concrete aesthetic — industrial, modern, and understated. Not actual concrete, so it\'s lightweight and goes anywhere. Very popular for open-plan living, kitchens, and commercial spaces.',
    colours: 'Full range of greys, charcoals, warm concretes, off-whites. Custom tints available.',
    application: '2–3 coat system. Finished with a protective sealer. 5–7 day cure.',
    maintenance: 'Sealed surface — pH-neutral cleaner. Sealer reapplication every 2–3 years depending on wear.',
    warranty: '10-Year Limited Warranty.',
    substrate: 'Works on plasterboard, render, masonry. Sound stable surface required.',
    bestFor: ['feature walls', 'kitchens', 'living rooms', 'ceilings', 'bathrooms', 'commercial', 'exterior'],
    notFor: [],
    approxCost: 'Mid-premium range. Contact Matt for quote.',
    faq: [
      { q: 'actual concrete real', a: 'Not actual concrete — it\'s a decorative plaster that nails the concrete look without the structural requirements or weight.' },
      { q: 'bathroom wet', a: 'Yes — with appropriate sealing it works well in bathrooms. Not naturally water resistant like Tadellino, so needs a good quality sealer.' },
      { q: 'outside exterior', a: 'Yes — UV stable and weather-resistant. Very popular for exterior feature walls.' },
      { q: 'rokka difference', a: 'Concretum is smooth and industrial — like polished concrete. Rokka is rough and textural — like stone. Both are earthy and modern, completely different feel.' },
    ]
  },
  rokka: {
    aliases: ['rokka', 'stone texture', 'textured plaster', 'stone effect', 'rough plaster', 'stone finish'],
    name: 'Rokka',
    summary: 'Heavily textured stone-effect plaster. Deeply tactile, organic, earthy. Great for feature walls and exteriors.',
    wetAreas: false, floors: false, exterior: true,
    description: 'Rokka is a heavily textured decorative plaster — like running your hand along a natural stone wall. Applied 2–5mm thick for real depth and variation. Earthy, organic, premium.',
    colours: 'Stone tones — bone, pilbara red, warm grey, natural. Custom colours available.',
    application: '2–5mm thick hand application. Each wall is unique.',
    maintenance: 'Exterior: inspect sealants at substrate interfaces annually. Interior: light dust or wipe.',
    warranty: '10-Year Limited Warranty.',
    substrate: 'Render or masonry preferred. Can go over plasterboard with correct prep.',
    bestFor: ['feature walls', 'exterior facades', 'garden walls', 'commercial lobbies', 'hallways', 'stairwells'],
    notFor: ['wet areas', 'floors', 'splash zones'],
    approxCost: 'Mid-premium. Contact Matt for quote.',
    faq: [
      { q: 'bathroom wet shower', a: 'Not recommended for wet areas — the rough texture holds moisture. Better for dry bathroom walls away from the shower zone.' },
      { q: 'outside exterior', a: 'Yes — Rokka is excellent for exterior facades, garden walls, and feature walls. Very robust outdoors.' },
      { q: 'concretum difference', a: 'Rokka is rough and deeply textural — organic stone feel. Concretum is smooth and industrial — raw concrete look. Very different aesthetics.' },
    ]
  },
  earthenHemp: {
    aliases: ['earthen hemp', 'hemp render', 'rammed earth', 'hemp plaster', 'hemp', 'earth render', 'natural render'],
    name: 'Earthen Hemp Render',
    summary: 'Rammed earth look using sustainable hemp fibres. Earthy, organic, eco-friendly. Interior and exterior.',
    wetAreas: false, floors: false, exterior: true,
    description: 'Earthen Hemp Render creates a convincing rammed earth aesthetic using sustainable hemp fibres. The horizontal strata and earthy texture are hard to distinguish from actual rammed earth construction — at a fraction of the cost and structural complexity.',
    colours: 'Natural earth tones — sand, cream, charcoal, mocha, sage, ochre, grey. Wide range.',
    application: '3–5mm thick. Hemp fibres add structural strength. Made in Western Australia.',
    maintenance: 'Interior: light wipe. Exterior: inspect sealant interfaces annually.',
    warranty: '10-Year Limited Warranty.',
    substrate: 'Works on render, masonry, plasterboard with prep.',
    bestFor: ['feature walls', 'exterior facades', 'commercial interiors', 'restaurants', 'hotels', 'hospitality', 'sculptures', 'columns'],
    notFor: ['wet areas', 'floors'],
    approxCost: 'Mid-premium. Contact Matt for quote.',
    faq: [
      { q: 'eco sustainable green', a: 'Yes — contains sustainable hemp fibres, low VOC, Green Star compliant. Made in WA.' },
      { q: 'real rammed earth difference', a: 'Very convincing — the horizontal strata and texture are almost identical. Fraction of the cost of actual rammed earth construction, no structural requirements.' },
      { q: 'outside exterior', a: 'Yes — suitable for exterior walls and facades. Popular for commercial facades.' },
    ]
  },
  metallics: {
    aliases: ['metallic', 'copper', 'brass', 'bronze', 'steel', 'gold', 'verdigris', 'rust patina', 'metal finish', 'troweled metal'],
    name: 'Troweled Metal',
    summary: 'Real metal particles in a plaster base. Develops genuine patina over time. Copper, brass, bronze, steel, verdigris.',
    wetAreas: false, floors: false, exterior: false,
    description: 'Troweled Metal embeds real metal particles — copper, bronze, brass, steel, verdigris — into a plaster base. The surface develops real patina over time. A genuine statement finish for commercial and residential feature walls.',
    colours: 'Copper, Bronze, Brass, Gold, Steel, Scorched Copper, Verdigris, Rust Patina.',
    application: 'Specialist application — metal particles are worked into the surface and burnished. Very skilled technique.',
    maintenance: 'Sealed finish. Avoid harsh cleaners. The patina development is part of the beauty.',
    warranty: '10-Year Limited Warranty.',
    substrate: 'Stable interior walls — plasterboard or render.',
    bestFor: ['feature walls', 'reception areas', 'bar fronts', 'lift lobbies', 'restaurants', 'retail', 'commercial'],
    notFor: ['wet areas', 'floors', 'exterior (most finishes)'],
    approxCost: 'Premium. The most labour-intensive finish in our range.',
    faq: [
      { q: 'real metal actual', a: 'Yes — actual metal particles in the plaster. Copper and bronze develop genuine green/brown patina over time.' },
      { q: 'heavy weight', a: 'Not heavy — it\'s a plaster-based finish with metal particles. Goes on any standard wall.' },
      { q: 'outside exterior', a: 'Most metallic finishes are interior only. Some sealed finishes can go exterior — ask Matt for specifics.' },
    ]
  },
  antiqueStucco: {
    aliases: ['antique stucco', 'stucco', 'aged plaster', 'european plaster', 'old world', 'heritage plaster'],
    name: 'Antique Stucco',
    summary: 'Classic European aged plaster. Warm, timeless, slightly textured. Heritage homes, ornate interiors.',
    wetAreas: false, floors: false, exterior: true,
    description: 'Antique Stucco creates a warm, aged European plaster finish. Beautiful on heritage homes, ornate architecture, and any space that calls for classic elegance. Can be finished with gold or bronze patinas.',
    colours: 'Warm whites, aged creams, terracottas, ochres. Metallic patina finishes available.',
    application: 'Hand-applied with trowel. Metallic patina finishes add a second step.',
    maintenance: 'Light wipe with damp cloth. Very durable.',
    warranty: '10-Year Limited Warranty.',
    substrate: 'Plasterboard or render.',
    bestFor: ['heritage homes', 'ornate interiors', 'fireplaces', 'archways', 'feature walls', 'exterior facades'],
    notFor: ['wet areas'],
    approxCost: 'Mid-premium. Contact Matt for quote.',
    faq: [
      { q: 'gold metallic patina', a: 'Yes — we can apply gold, bronze, or copper patinas over Antique Stucco for a truly luxurious finish.' },
      { q: 'heritage', a: 'Perfect for heritage homes — complements period architecture beautifully.' },
    ]
  }
};

// ─── Conversation state ───────────────────────────────────────────────────────

interface ProjectBrief {
  name?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  projectType?: string;   // reno, new build, commercial
  spaces?: string[];      // bathroom, kitchen, feature wall, etc.
  products?: string[];    // marbellino, tadellino, etc.
  style?: string;         // warm/cool, industrial, organic, etc.
  substrate?: string;     // plasterboard, render, tiles, etc.
  sqm?: string;
  timeline?: string;
  budget?: string;
  notes?: string;
}

function extractBrief(history: { role: string; content: string }[]): ProjectBrief {
  const brief: ProjectBrief = { spaces: [], products: [] };
  const fullText = history.filter(m => m.role === 'user').map(m => m.content).join(' ').toLowerCase();
  const allText = history.map(m => m.content).join(' ').toLowerCase();

  // Name — check multiple patterns across all user messages
  const userMessages = history.filter(m => m.role === 'user');
  const botMessages = history.filter(m => m.role === 'assistant');

  // Pattern 1: explicit intro ("I'm Joe", "my name is Joe", "call me Joe") — search USER messages only
  const userText = userMessages.map(m => m.content).join(' ');
  const explicitName = userText.match(/(?:i'?m|i am|my name(?:'s| is)?|it'?s|call me|name'?s)\s+([A-Za-z]{2,14})\b/i);
  if (explicitName) {
    brief.name = explicitName[1].charAt(0).toUpperCase() + explicitName[1].slice(1);
  }

  // Pattern 2: bare name reply — single capitalised word sent after bot asked for name
  // Look for a user message that is just a name (1-2 words, no question marks, no product keywords)
  if (!brief.name) {
    const productKeywords = /bathroom|shower|floor|wall|exterior|marbellino|concretum|rokka|tadellino|metallic|stucco|hemp|price|cost|quote|colour|color|render|plaster|feature/i;
    const botAskedName = botMessages.some(m => /your name|what.*name|name.*you|who.*i.*speak/i.test(m.content));
    
    for (const msg of userMessages) {
      const trimmed = msg.content.trim();
      // Single word, starts with capital, 2-14 chars, no product keywords, not a common word
      const commonWords = /^(hi|hello|hey|yes|no|ok|okay|sure|thanks|great|good|fine|done|the|and|for|are|how|what|when|where|why|who|can|will|do|be|to|of|in|it|is|he|she|we|they|all|one|two|three|four|five|yes)$/i;
      if (/^[A-Z][a-z]{1,13}$/.test(trimmed) && !productKeywords.test(trimmed) && !commonWords.test(trimmed)) {
        brief.name = trimmed;
        break;
      }
      // "It's Joe" or "It is Joe" pattern
      const itsMatch = trimmed.match(/^(?:it'?s|it is)\s+([A-Z][a-z]{1,13})$/i);
      if (itsMatch) {
        brief.name = itsMatch[1].charAt(0).toUpperCase() + itsMatch[1].slice(1);
        break;
      }
    }
  }

  // Email
  const emailMatch = fullText.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/);
  if (emailMatch) brief.email = emailMatch[0];

  // Phone
  const phoneMatch = fullText.match(/(?:04|61 ?4|\+61 ?4)[\d\s]{8,}/);
  if (phoneMatch) brief.phone = phoneMatch[0].trim();

  // Suburb
  const suburbMatch = fullText.match(/(?:in|at|suburb|location|located in|based in|project(?:'s| is) in)\s+([a-z\s]+?)(?:\.|,|$|\s+(?:it|the|we|i|my|for|and))/);
  if (suburbMatch) brief.suburb = suburbMatch[1].trim();
  // Also catch direct suburb mentions
  const melbSuburbs = ['toorak','richmond','brunswick','fitzroy','collingwood','brighton','st kilda','south yarra','prahran','carlton','hawthorn','malvern','kew','camberwell','glen waverley','essendon','geelong','ballarat','bendigo','mornington','frankston','dandenong','bayside','albert park','port melbourne','south melbourne','docklands','williamstown','footscray','yarraville','newport','williamstown','northcote','thornbury','heidelberg','doncaster'];
  for (const suburb of melbSuburbs) {
    if (fullText.includes(suburb)) { brief.suburb = suburb.charAt(0).toUpperCase() + suburb.slice(1); break; }
  }

  // Project type
  if (fullText.match(/new build|brand new|building/)) brief.projectType = 'New Build';
  else if (fullText.match(/reno|renovation|renovating/)) brief.projectType = 'Renovation';
  else if (fullText.match(/commercial|restaurant|hotel|cafe|office|retail|hospitality/)) brief.projectType = 'Commercial';
  else if (fullText.match(/residential|home|house|apartment|unit/)) brief.projectType = 'Residential';

  // Spaces
  const spaceMap: [RegExp, string][] = [
    [/bathroom|shower|wet area/, 'Bathroom/Shower'],
    [/kitchen|splashback/, 'Kitchen'],
    [/floor|flooring/, 'Floors'],
    [/feature wall|lounge|living room|bedroom/, 'Feature Wall'],
    [/exterior|facade|outside|outdoor/, 'Exterior'],
    [/stairwell|staircase|stairs/, 'Stairwell'],
    [/ceiling/, 'Ceiling'],
    [/hallway|corridor/, 'Hallway'],
    [/pool|spa/, 'Pool/Spa'],
  ];
  for (const [regex, label] of spaceMap) {
    if (fullText.match(regex) && !brief.spaces!.includes(label)) brief.spaces!.push(label);
  }

  // Products
  for (const [key, prod] of Object.entries(KB)) {
    if (prod.aliases.some(a => allText.includes(a)) && !brief.products!.includes(prod.name)) {
      brief.products!.push(prod.name);
    }
  }

  // Style
  if (fullText.match(/industrial|raw|minimal|minimal/)) brief.style = 'Industrial/Minimal';
  else if (fullText.match(/warm|organic|earthy|natural/)) brief.style = 'Warm/Organic';
  else if (fullText.match(/polished|luxur|elegant|marble/)) brief.style = 'Polished/Luxury';
  else if (fullText.match(/classic|heritage|european|traditional/)) brief.style = 'Classic/Heritage';
  else if (fullText.match(/modern|contemporary|clean/)) brief.style = 'Modern/Contemporary';

  // Substrate
  if (fullText.match(/plasterboard|gyprock/)) brief.substrate = 'Plasterboard';
  else if (fullText.match(/render/)) brief.substrate = 'Render';
  else if (fullText.match(/tiles|tile/)) brief.substrate = 'Existing Tiles';
  else if (fullText.match(/concrete slab|slab/)) brief.substrate = 'Concrete Slab';
  else if (fullText.match(/masonry|brick|hebel/)) brief.substrate = 'Masonry';

  // Sqm
  const sqmMatch = fullText.match(/(\d+)\s*(?:sqm|m2|square met|m²)/);
  if (sqmMatch) brief.sqm = sqmMatch[1] + ' m²';

  // Timeline
  if (fullText.match(/asap|urgent|soon|this month|next month/)) brief.timeline = 'ASAP';
  else if (fullText.match(/(\d+)\s*weeks?/)) brief.timeline = fullText.match(/(\d+)\s*weeks?/)![0];
  else if (fullText.match(/(\d+)\s*months?/)) brief.timeline = fullText.match(/(\d+)\s*months?/)![0];
  else if (fullText.match(/end of year|later this year/)) brief.timeline = 'Later this year';
  else if (fullText.match(/next year/)) brief.timeline = 'Next year';

  // Budget
  if (fullText.match(/\$[\d,]+k?|\d+k budget|\d+,000/)) {
    const b = fullText.match(/\$?([\d,]+k?)\s*(?:budget|to spend)?/);
    if (b) brief.budget = '$' + b[1];
  } else if (fullText.match(/tight|low budget|cheap as/)) brief.budget = 'Budget-conscious';
  else if (fullText.match(/premium|high end|best|money no object|no budget/)) brief.budget = 'Premium / No limit';

  return brief;
}

function briefScore(brief: ProjectBrief): number {
  let score = 0;
  if (brief.name) score++;
  if (brief.email || brief.phone) score += 2;
  if (brief.spaces && brief.spaces.length > 0) score++;
  if (brief.products && brief.products.length > 0) score++;
  if (brief.suburb) score++;
  if (brief.projectType) score++;
  if (brief.substrate) score++;
  if (brief.timeline) score++;
  return score;
}

function findProduct(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [key, prod] of Object.entries(KB)) {
    if (prod.aliases.some(a => lower.includes(a))) return key;
  }
  return null;
}

// ─── Smart response generator ─────────────────────────────────────────────────

function respond(message: string, history: { role: string; content: string }[], brief: ProjectBrief): {
  reply: string;
  shouldEmail: boolean;
  collectEmail: boolean;
} {
  const lower = message.toLowerCase();
  const hi = brief.name ? `${brief.name}, ` : '';
  const msgs = history.length;
  let shouldEmail = false;
  let collectEmail = false;

  // ── Greeting only ─────────────────────────────────────────────────────────
  // Only show welcome if bot hasn't greeted yet AND it's a pure greeting message
  const alreadyGreeted = history.some(m => m.role === 'assistant' && m.content.includes("I'm Jose"));
  if (!alreadyGreeted && (msgs <= 1 || lower.match(/^(hi+|hello|hey|g'?day|yo|howdy|hiya|sup)[\s!.]*$/i))) {
    return { reply: `G'day! 👋 I'm Jose, the Troweled Earth assistant — I know the full product range inside out and I'm here to help.\n\nWhat can I help you with today? And what's your name?`, shouldEmail: false, collectEmail: false };
  }

  // ── First message is a product question (no greeting, straight to it) ─────
  // Answer the question first, then ask for name
  if (msgs <= 1 && !brief.name) {
    const firstProdKey = findProduct(lower);
    if (firstProdKey || lower.match(/bathroom|shower|floor|exterior|feature wall|price|cost|quote|colour|compare|difference/)) {
      // They asked a real question straight away — answer it, then ask their name
      // Fall through to the normal response logic below, but append name request
      // We handle this by setting a flag — answered below via answerThenAskName
    }
  }

  // ── Name + project together ───────────────────────────────────────────────
  const nameProject = message.match(/(?:i'?m|i am|my name(?:'s| is)?|it'?s|call me)\s+([A-Za-z]+)[,\s]+(.+)/i);
  if (nameProject && !brief.name) {
    const name = nameProject[1].charAt(0).toUpperCase() + nameProject[1].slice(1);
    const project = nameProject[2].toLowerCase();
    return { reply: buildProjectOpener(name, project, brief), shouldEmail: false, collectEmail: false };
  }

  // ── Name only ─────────────────────────────────────────────────────────────
  const productKeywordsRx = /bathroom|shower|floor|wall|exterior|marbellino|concretum|rokka|tadellino|metallic|stucco|hemp|price|cost|quote|colour|color|render|plaster|feature/i;
  const commonWordsRx = /^(hi|hello|hey|yes|no|ok|okay|sure|thanks|great|good|fine|done|the|and|for|are|how|what|when|where|why|who|can|will|do|be|to|of|in|it|is|he|she|we|they|all|one|two|three|four|five)$/i;
  const justNameRaw = message.trim();
  const isBareName = /^[A-Z][a-z]{1,13}$/.test(justNameRaw) && !productKeywordsRx.test(justNameRaw) && !commonWordsRx.test(justNameRaw);
  const justName = isBareName ? [justNameRaw, justNameRaw] :
    message.match(/^(?:i'?m\s+|it'?s\s+|my name(?:'s| is)?\s+|call me\s+|name'?s\s+)([A-Za-z]{2,14})[\s.,!?]*$/i) ||
    message.match(/(?:i'?m|i am|my name(?:'s| is)?|call me|name'?s)\s+([A-Za-z]+)/i);
  if (justName && !brief.name) {
    const name = (justName[1] || justName[0]).charAt(0).toUpperCase() + (justName[1] || justName[0]).slice(1).toLowerCase();
    // Update brief.name so hi prefix works in all subsequent logic
    brief.name = name;
    return { reply: `Great to meet you, ${name}! 😊 What are you working on? A bathroom, feature wall, floors, exterior, or something else?\n\nAnd is it a residential reno, new build, or commercial project?`, shouldEmail: false, collectEmail: false };
  }

  // ── Email capture ─────────────────────────────────────────────────────────
  const emailInMsg = message.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/);
  if (emailInMsg) {
    shouldEmail = true;
    const score = briefScore(brief);
    return {
      reply: `Perfect, thanks${brief.name ? ' ' + brief.name : ''}! I'm sending Matt a project brief right now so he can reach out with a proper quote. 🎯\n\nHe'll have your details and all the info we've covered — no need to repeat yourself.\n\nIs there anything else you'd like me to add to your brief before I send it?`,
      shouldEmail: true,
      collectEmail: false
    };
  }

  // ── Phone number ──────────────────────────────────────────────────────────
  if (message.match(/^(?:04|61\s*4|\+61\s*4)[\d\s]{8,}$/) || lower.match(/my (?:number|phone|mobile) is/)) {
    return {
      reply: `Got it${brief.name ? ', ' + brief.name : ''}! 📱 I've noted your number. Would you also like to share your email so Matt can send through some product visuals and a quote breakdown?`,
      shouldEmail: false,
      collectEmail: false
    };
  }

  // ── Product-specific deep questions ──────────────────────────────────────
  const prodKey = findProduct(lower);
  if (prodKey) {
    const prod = KB[prodKey as keyof typeof KB];

    // Substrate question
    if (lower.match(/plasterboard|gyprock|render|tile|slab|masonry|brick|hebel|substrate|surface|wall.*made|going on/)) {
      const substrateAnswers: Record<string, string> = {
        'plasterboard|gyprock': `${hi}${prod.name} goes on plasterboard — we prime and prep it first. For wet areas we apply a waterproofing membrane before the plaster. Nice stable substrate to work with.\n\nRoughly how many square metres is the area?`,
        'tile': `${hi}Going over existing tiles is possible with the right prep — they need to be clean, stable, and properly primed. Worth confirming with Matt that they\'re sound before committing. Would you like me to put you in touch with him?`,
        'render|masonry|brick|hebel': `${hi}Rendered masonry or brick is ideal for ${prod.name} — very stable surface. Are you plastering inside, outside, or both?`,
        'slab|concrete': `${hi}Concrete slab — ${prodKey === 'marbellino' ? 'perfect for Marbellino flooring!' : 'we\'d need to check what product works best for your scenario.'} ${prodKey === 'marbellino' ? 'Are you looking at the whole floor area or just a section?' : 'Can you tell me more about the space?'}`,
      };
      for (const [pattern, answer] of Object.entries(substrateAnswers)) {
        if (lower.match(new RegExp(pattern))) return { reply: answer, shouldEmail: false, collectEmail: false };
      }
      return { reply: `${hi}What substrate are we working with? (plasterboard, render, existing tiles, or concrete slab?) That affects prep and product selection.`, shouldEmail: false, collectEmail: false };
    }

    // Wet areas
    if (lower.match(/shower|bathroom|wet|waterproof/)) {
      const faq = prod.faq.find(f => f.q.match(/shower|bathroom|wet|waterproof/));
      if (prod.wetAreas) {
        return { reply: `${hi}${prod.name} works great in wet areas! ${faq?.a || ''}\n\nWhat's the substrate — plasterboard, render, or over existing tiles?`, shouldEmail: false, collectEmail: false };
      }
      return { reply: `${hi}${prod.name} isn't suited for wet areas — moisture would damage the finish over time.\n\nFor showers and bathrooms, **Tadellino** is the one — naturally water resistant, no sealer needed, completely seamless. No grout lines.\n\nShall I tell you more about Tadellino?`, shouldEmail: false, collectEmail: false };
    }

    // Floors
    if (lower.match(/\bfloor\b|\bflooring\b/)) {
      if (prod.floors) {
        const faq = prod.faq.find(f => f.q.includes('floor'));
        return { reply: `${hi}${faq?.a || prod.name + ' works on floors.'}\n\nIs it a residential or commercial space, and roughly what m²?`, shouldEmail: false, collectEmail: false };
      }
      return { reply: `${hi}${prod.name} isn't rated for floor use — it can\'t handle foot traffic over time.\n\n**Marbellino** is our only floor-approved product — polished stone-like finish, looks incredible. Suitable for residential and commercial floors.\n\nIs Marbellino an option for you?`, shouldEmail: false, collectEmail: false };
    }

    // Exterior
    if (lower.match(/outside|exterior|outdoor|facade/)) {
      const faq = prod.faq.find(f => f.q.match(/outside|exterior/));
      if (prod.exterior) {
        return { reply: `${hi}Yes — ${prod.name} works outdoors. ${faq?.a || 'UV stable and weather-resistant.'}\n\nIs this a wall, facade, feature wall, or something else?`, shouldEmail: false, collectEmail: false };
      }
      return { reply: `${hi}${prod.name} is an interior product. For exterior work, **Rokka** (textured stone) or **Earthen Hemp Render** (rammed earth aesthetic) are the best options — both weather-resistant.\n\nWhat's the exterior look you're going for?`, shouldEmail: false, collectEmail: false };
    }

    // Colour
    if (lower.match(/colour|color|shade|tint|white|grey|gray|black|cream|warm|cool/)) {
      return { reply: `${hi}**${prod.name} colours:** ${prod.colours}\n\nHave you got a specific tone in mind, or a colour you're matching to in the space? We can work from Dulux or Resene codes.`, shouldEmail: false, collectEmail: false };
    }

    // Cost / pricing
    if (lower.match(/price|cost|how much|quote|expensive|budget|affordable/)) {
      return { reply: `${hi}${prod.name} is ${prod.approxCost}\n\nFor an accurate number I'd need the square metres, suburb, and surface prep required. If you give me those details I can get Matt to put together a proper quote — usually turns around same day.\n\nWhat's the rough area size?`, shouldEmail: false, collectEmail: false, };
    }

    // Maintenance
    if (lower.match(/clean|maintain|maintenance|care|look after|last/)) {
      return { reply: `${hi}**${prod.name} care:** ${prod.maintenance}`, shouldEmail: false, collectEmail: false };
    }

    // Application / process
    if (lower.match(/apply|applied|application|process|how.*work|install|put on|diy/)) {
      return { reply: `${hi}**${prod.name} application:** ${prod.application}\n\nThis is trained applicator work — the technique is what creates the finish. We don't recommend DIY for this product.\n\nAre you looking to hire an applicator, or are you a tradesperson wanting to learn the technique?`, shouldEmail: false, collectEmail: false };
    }

    // Warranty
    if (lower.match(/warranty|guarantee|how long.*last|cover/)) {
      return { reply: `${hi}**${prod.name} warranty:** ${prod.warranty}\n\nCovers peeling, blistering, flaking, and delamination when applied by our trained applicators.`, shouldEmail: false, collectEmail: false };
    }

    // Substrate
    if (lower.match(/substrate|surface|what.*go on|plasterboard|render/)) {
      return { reply: `${hi}**${prod.name} substrate:** ${prod.substrate}`, shouldEmail: false, collectEmail: false };
    }

    // FAQs
    for (const faq of prod.faq) {
      const keywords = faq.q.split(' ');
      if (keywords.some(kw => lower.includes(kw))) {
        return { reply: `${hi}${faq.a}\n\nAnything else you'd like to know about ${prod.name}?`, shouldEmail: false, collectEmail: false };
      }
    }

    // General product info
    const pageUrl = PAGES[prodKey];
    const pageLink = pageUrl ? `\n\n👉 [See photos & full spec →](${pageUrl})` : '';
    return {
      reply: `${hi}Here's the full picture on **${prod.name}**:\n\n${prod.description}\n\n**Best for:** ${prod.bestFor.slice(0, 5).join(', ')}\n**Colours:** ${prod.colours}\n**Application:** ${prod.application}${pageLink}\n\nWhat's the space you're working with?`,
      shouldEmail: false,
      collectEmail: false
    };
  }

  // ── Comparisons ───────────────────────────────────────────────────────────
  if (lower.match(/difference|compare|vs\.?|versus|which.*better|which.*one|what.*best|should i (use|choose|go with)/)) {
    if (lower.match(/bathroom|shower|wet/)) {
      return { reply: `${hi}For wet areas, the two standout options:\n\n**Tadellino** (Tadelakt inspired) — naturally water resistant, no sealer needed, completely seamless, no grout lines. Warm and organic.\n👉 [See Tadellino →](/products/tadellino)\n\n**Marbellino** — polished stone look, works in bathrooms with sealing. More luxurious, polished finish.\n👉 [See Marbellino →](/products/marbellino)\n\nThe question is: do you want warm and organic (Tadellino) or polished and luxurious (Marbellino)?`, shouldEmail: false, collectEmail: false };
    }
    if (lower.match(/concrete|industrial|rokka|concretum/)) {
      return { reply: `${hi}**Concretum vs Rokka** — both earthy and modern, very different feel:\n\n**Concretum** — smooth, industrial, raw concrete look. Minimal and clean.\n👉 [See Concretum →](/products/concretum)\n\n**Rokka** — rough, deeply textured stone effect. Tactile and organic.\n👉 [See Rokka →](/products/rokka)\n\nIf you want people to run their hand along the wall → Rokka. If you want sleek industrial → Concretum.\n\nWhat's the space?`, shouldEmail: false, collectEmail: false };
    }
    if (lower.match(/marbellino|tadellino/)) {
      return { reply: `${hi}**Marbellino vs Tadellino:**\n\n**Marbellino** — polished stone look, can do floors, interior + exterior, enormous colour range. Needs sealing for wet areas.\n👉 [See Marbellino →](/products/marbellino)\n\n**Tadellino** — naturally water resistant, seamless, best for showers. Not for floors.\n👉 [See Tadellino →](/products/tadellino)\n\nKey question: is this for a wet area?`, shouldEmail: false, collectEmail: false };
    }
    return { reply: `${hi}Full comparison:\n\n• **Marbellino** — polished stone, floors OK, versatile ⭐ [View →](/products/marbellino)\n• **Tadellino** — naturally water resistant, seamless [View →](/products/tadellino)\n• **Concretum** — raw concrete look [View →](/products/concretum)\n• **Rokka** — stone texture, tactile [View →](/products/rokka)\n• **Earthen Hemp** — rammed earth look [View →](/products/earthen-renders)\n• **Troweled Metal** — copper, brass, bronze [View →](/products/metallics)\n• **Antique Stucco** — classic European [View →](/products/antique-stucco)\n\nTell me the space and the vibe and I'll narrow it down for you.`, shouldEmail: false, collectEmail: false };
  }

  // ── DIY question ──────────────────────────────────────────────────────────
  if (lower.match(/diy|do it myself|do it yourself|can i apply|self.apply|myself/)) {
    return { reply: `${hi}Honest answer — our products are designed for trained applicators. The technique is what creates the finish — it takes real skill to get right, especially Tadellino and Marbellino.\n\nThat said, if you're a tradesperson wanting to add decorative finishes to your skillset, we run hands-on training workshops. Matt and Jarrad teach the techniques directly.\n\nAre you a homeowner looking to hire, or a tradesperson keen to learn?`, shouldEmail: false, collectEmail: false };
  }

  // ── Timeline ──────────────────────────────────────────────────────────────
  if (lower.match(/how long|timeline|time.*(take|frame)|when.*done|turnaround/)) {
    return { reply: `${hi}Rough guide:\n\n• **Single room** — 2–4 days application + 5–7 days cure time\n• **Full home** — 2–4 weeks depending on scope\n• **Commercial** — project-dependent\n\nFor an accurate timeline I'd need to know the product, area, and surface prep required. What's the scope of your project?`, shouldEmail: false, collectEmail: false };
  }

  // ── Melbourne location ────────────────────────────────────────────────────
  if (lower.match(/melbourne|toorak|richmond|brunswick|fitzroy|brighton|st kilda|south yarra|hawthorn|malvern|geelong|ballarat|mornington|bayside/)) {
    return { reply: `${hi}We're Melbourne-based and work across Greater Melbourne and regional VIC. We do a lot in Toorak, Brighton, Richmond, Brunswick — all over.\n\nWhere's your project? I can let Matt know when he follows up.`, shouldEmail: false, collectEmail: false };
  }

  // ── Pricing / quote ───────────────────────────────────────────────────────
  if (lower.match(/price|cost|how much|quote|expensive|budget/)) {
    return { reply: `${hi}Our products are at the premium end — this is hand-applied artisan plasterwork, not paint.\n\nTo give you a realistic number Matt needs:\n• Product\n• Area (m²)\n• Suburb\n• Surface prep\n\nShare those details here and I'll put together a brief for him — usually gets back to you same day. What's the product you're looking at?`, shouldEmail: false, collectEmail: false };
  }

  // ── Contact request ───────────────────────────────────────────────────────
  if (lower.match(/contact|call|email|phone|speak to|talk to|get in touch|reach matt|reach out/)) {
    return { reply: `${hi}Absolutely — you can reach Matt directly:\n\n📞 **0439 243 055**\n📧 **matt-troweledearth@outlook.com**\n📱 **@troweled_earth_melbourne**\n\nOr if you want to save time — drop your email here and I'll send him a brief with everything we've covered so far. He can call you ready to go.`, shouldEmail: false, collectEmail: true };
  }

  // ── Training ──────────────────────────────────────────────────────────────
  if (lower.match(/training|workshop|course|learn|applicator|tradesperson/)) {
    return { reply: `${hi}We run hands-on training workshops for plasterers, builders, and tradespeople. Matt and Jarrad teach the application techniques directly — you actually apply the product on the day.\n\nFollow **@troweled_earth_melbourne** on Instagram for upcoming dates, or call Matt:\n📞 **0439 243 055**`, shouldEmail: false, collectEmail: false };
  }

  // ── Suppliers / where to buy ───────────────────────────────────────────────
  if (lower.match(/supplier|stockist|where.*buy|buy|purchase|store|distributor|stock/)) {
    return { reply: `${hi}Our products are available from these stockists:\n\n🏪 **Render Supply Co** — [shop online](https://store.rendersupplyco.com.au/interior-and-exterior-coatings/surface-coating/troweled-earth.html)\n🏪 **Colour World Geelong** — [colourworld.com.au](https://colourworld.com.au/)\n🏪 **Wet Trades** — [wettrades.com.au](https://wettrades.com.au/)\n🏪 **Metro Build Suppliers** — [metrobuildsuppliers.com.au](https://metrobuildsuppliers.com.au/)\n\n👉 [Full stockist details →](/suppliers)`, shouldEmail: false, collectEmail: false };
  }

  // ── Sustainability / eco ──────────────────────────────────────────────────
  if (lower.match(/eco|sustainable|green|voc|environment|natural/)) {
    return { reply: `${hi}All TEM products are low VOC and Green Star compliant. The standout eco product is **Earthen Hemp Render** — contains real sustainable hemp fibres, made in WA, and creates a convincing rammed earth look.\n\n👉 [View Earthen Hemp Render →](/products/earthen-renders)\n\nMarbellino and Tadellino are lime-based — naturally breathable and non-toxic.\n\nIs sustainability a key factor for your project?`, shouldEmail: false, collectEmail: false };
  }

  // ── Substrate question standalone ────────────────────────────────────────
  if (lower.match(/plasterboard|gyprock|render|existing tile|concrete slab|masonry|substrate/)) {
    const subMap: [RegExp, string][] = [
      [/plasterboard|gyprock/, `${hi}Plasterboard is a very common substrate for our products — it just needs the right primer. For wet areas we apply a waterproofing membrane first.\n\nWhich product are you thinking, and is it a dry or wet area?`],
      [/existing tile/, `${hi}Going over tiles is possible but needs careful prep — the tiles need to be sound, clean, and properly primed. Our applicators assess on-site.\n\nWhat product were you thinking of?`],
      [/concrete slab/, `${hi}Concrete slab is ideal for **Marbellino** flooring — very stable base. Is it residential or commercial?`],
      [/render|masonry/, `${hi}Render or masonry is an excellent base for most of our products — great stability. Which finish are you looking at?`],
    ];
    for (const [regex, answer] of subMap) {
      if (lower.match(regex)) return { reply: answer, shouldEmail: false, collectEmail: false };
    }
  }

  // ── Thanks / done ─────────────────────────────────────────────────────────
  if (lower.match(/thank|thanks|cheers|appreciate|perfect|great|that'?s all/)) {
    return { reply: `${hi}No worries at all! If you think of anything else or want to get a quote moving, reach out anytime. 😊\n\nMatt's number is **0439 243 055** — he's the expert and loves talking product.`, shouldEmail: false, collectEmail: false };
  }

  // ── Proactive contact offer after enough info ─────────────────────────────
  const score = briefScore(brief);
  if (score >= 4 && !brief.email && !lower.match(/email|contact/)) {
    collectEmail = true;
    return {
      reply: `${hi}I've got a good picture of your project now. The fastest way to get this moving is if you drop your email — I'll send Matt a full brief with everything we've covered (spaces, products, style, substrate) so he can come back to you with a proper quote, no back and forth.\n\nWhat's your email?`,
      shouldEmail: false,
      collectEmail: true
    };
  }

  // ── Project type / general intent ────────────────────────────────────────
  if (lower.match(/bathroom|shower/)) return { reply: `${hi}Bathrooms are one of our specialties. Two standout options:\n\n• **Tadellino** — naturally water resistant, seamless, no grout lines. [View Tadellino →](/products/tadellino)\n• **Marbellino** — polished stone look, works in wet areas with sealing. [View Marbellino →](/products/marbellino)\n\nAre you after warm and organic, or polished and luxurious? And what's the substrate?`, shouldEmail: false, collectEmail: false };
  if (lower.match(/\bfloor\b/)) return { reply: `${hi}For floors, **Marbellino** is the one — only TEM product approved for foot traffic. Polished stone-like finish, incredible result.\n\n👉 [View Marbellino →](/products/marbellino)\n\nResidential or commercial? And roughly what m²?`, shouldEmail: false, collectEmail: false };
  if (lower.match(/exterior|outside|facade/)) return { reply: `${hi}Great options for exterior:\n\n• **Rokka** — textured stone effect, very robust [View →](/products/rokka)\n• **Earthen Hemp Render** — rammed earth look, sustainable [View →](/products/earthen-renders)\n• **Concretum** — raw concrete, UV stable [View →](/products/concretum)\n• **Marbellino** — polished, also approved exterior [View →](/products/marbellino)\n\nWhat style is the property?`, shouldEmail: false, collectEmail: false };
  if (lower.match(/feature wall|living|lounge/)) return { reply: `${hi}Feature walls — what aesthetic are you after?\n\n• Polished & luxurious → **Marbellino** [View →](/products/marbellino)\n• Raw concrete → **Concretum** [View →](/products/concretum)\n• Stone texture → **Rokka** [View →](/products/rokka)\n• Earthy/rammed earth → **Earthen Hemp** [View →](/products/earthen-renders)\n• Metallic statement → **Troweled Metal** [View →](/products/metallics)\n• Classic European → **Antique Stucco** [View →](/products/antique-stucco)\n\nAny colour direction?`, shouldEmail: false, collectEmail: false };

  // ── Default ───────────────────────────────────────────────────────────────
  return {
    reply: `${hi}I want to make sure I give you exactly the right answer! Tell me:\n\n• What space is this for? (bathroom, feature wall, floor, exterior?)\n• What look are you after?\n• Residential or commercial?\n\nI know every product in the range inside out — let's find the right one for you. 😊`,
    shouldEmail: false,
    collectEmail: false
  };
}

// ─── Email brief builder ──────────────────────────────────────────────────────

async function sendProjectBrief(brief: ProjectBrief, conversation: { role: string; content: string }[]): Promise<void> {
  const conversationText = conversation
    .map(m => `${m.role === 'user' ? '👤 Client' : '🤖 Bot'}: ${m.content}`)
    .join('\n\n');

  const rows = (label: string, value: string | undefined) =>
    value ? `<tr><td style="padding:8px 0;font-weight:bold;color:#8b7355;width:140px;vertical-align:top">${label}</td><td style="padding:8px 0;color:#1a1a1a">${value}</td></tr>` : '';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#1a1a1a;padding:24px;text-align:center">
        <h1 style="color:#f5f5f0;margin:0;font-size:22px;font-weight:400;letter-spacing:0.05em">🏗️ NEW LEAD — PROJECT BRIEF</h1>
        <p style="color:#8b7355;margin:8px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">Troweled Earth Melbourne Chatbot</p>
      </div>

      <div style="background:#f5f5f0;padding:32px">
        <h2 style="color:#1a1a1a;border-bottom:2px solid #8b7355;padding-bottom:10px;margin-top:0">Contact Details</h2>
        <table style="width:100%;border-collapse:collapse">
          ${rows('Name', brief.name)}
          ${rows('Email', brief.email ? `<a href="mailto:${brief.email}" style="color:#8b7355">${brief.email}</a>` : undefined)}
          ${rows('Phone', brief.phone ? `<a href="tel:${brief.phone}" style="color:#8b7355">${brief.phone}</a>` : undefined)}
          ${rows('Suburb / Location', brief.suburb)}
        </table>

        <h2 style="color:#1a1a1a;border-bottom:2px solid #8b7355;padding-bottom:10px;margin-top:28px">Project Brief</h2>
        <table style="width:100%;border-collapse:collapse">
          ${rows('Project Type', brief.projectType)}
          ${rows('Spaces', brief.spaces?.join(', '))}
          ${rows('Products Interested', brief.products?.join(', '))}
          ${rows('Style / Aesthetic', brief.style)}
          ${rows('Substrate', brief.substrate)}
          ${rows('Area Size', brief.sqm)}
          ${rows('Timeline', brief.timeline)}
          ${rows('Budget Signal', brief.budget)}
          ${rows('Notes', brief.notes)}
        </table>

        ${conversation.length > 0 ? `
        <h2 style="color:#1a1a1a;border-bottom:2px solid #8b7355;padding-bottom:10px;margin-top:28px">Full Conversation</h2>
        <div style="background:#fff;border-radius:6px;padding:16px;font-size:13px;white-space:pre-wrap;line-height:1.7;color:#333;max-height:400px;overflow:hidden">
${conversationText}
        </div>` : ''}
      </div>

      <div style="background:#1a1a1a;padding:16px;text-align:center">
        <p style="color:#f5f5f0;margin:0;font-size:12px">Troweled Earth Melbourne Website Chatbot</p>
      </div>
    </div>`;

  await sendLeadNotification({
    name: brief.name,
    email: brief.email,
    phone: brief.phone,
    productsInterested: brief.products,
    conversationSummary: conversationText
  });
}

// ─── API Handler ──────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, sessionId, conversationHistory = [] } = body;

    if (!message || !sessionId) {
      return new Response(JSON.stringify({ error: 'Message and sessionId required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const brief = extractBrief([...conversationHistory, { role: 'user', content: message }]);
    let { reply, shouldEmail, collectEmail } = respond(message, conversationHistory, brief);

    // If first message and no name yet, and they asked a real question (not just a greeting),
    // append a name request after answering their question
    const isFirstRealMessage = conversationHistory.length <= 1 && !brief.name;
    const isJustGreeting = message.toLowerCase().match(/^(hi+|hello|hey|g'?day|yo|howdy|hiya|sup)[\s!.]*$/i);
    if (isFirstRealMessage && !isJustGreeting && !reply.includes("What's your name") && !reply.includes("what's your name") && !reply.includes("your name")) {
      reply = reply + `\n\n---\nBy the way, I'd love to know your name and what you're working on so I can give you more tailored advice! 😊`;
    }

    if (shouldEmail) {
      sendProjectBrief(brief, [...conversationHistory, { role: 'user', content: message }]).catch(console.error);
    }

    saveConversation({
      session_id: sessionId,
      messages: [{ role: 'user', content: message }, { role: 'assistant', content: reply }],
      products_mentioned: brief.products || []
    }).catch(console.error);

    return new Response(JSON.stringify({
      response: reply,
      sessionId,
      collectEmail,
      brief: shouldEmail ? brief : undefined,
      promptContact: collectEmail
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process', response: "Sorry, I'm having trouble. Call Matt directly: 0439 243 055" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

// ─── Lead save ────────────────────────────────────────────────────────────────

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, sessionId, productsInterested, conversationSummary } = body;
    if (!email) return new Response(JSON.stringify({ error: 'Email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    const result = await saveLead({ name, email, phone, products_interested: productsInterested, source: 'chatbot_form' });
    if (result.error) throw result.error;

    await sendLeadNotification({ name, email, phone, productsInterested, conversationSummary });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save lead' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function buildProjectOpener(name: string, project: string, brief: ProjectBrief): string {
  if (project.match(/bathroom|shower/)) return `Thanks ${name}! A bathroom project — love it. 🛁\n\nFor wet areas we have two standout finishes:\n\n• **Tadellino** *(Tadelakt inspired)* — naturally water resistant, no sealer needed, completely seamless, no grout lines. Warm and organic.\n• **Marbellino** — polished Venetian plaster, stone-like finish, works in wet areas with sealing. More luxurious.\n\nAre you after a warm, organic feel or a polished stone look? And what's the substrate — plasterboard, render, or over existing tiles?`;
  if (project.match(/kitchen|splashback/)) return `Thanks ${name}! Kitchen work — great choice for a statement. 🍳\n\nFor kitchens we'd usually look at:\n\n• **Marbellino** — polished stone, handles the environment beautifully with sealing\n• **Concretum** — raw concrete aesthetic, very popular in modern kitchens\n• **Metallics** — copper or brass near a rangehood can be stunning\n\nWhat's the vibe — modern and minimal, warm and organic, or something with drama?`;
  if (project.match(/floor/)) return `Thanks ${name}! Floor project — **Marbellino** is the answer, it's our only floor-approved product. Polished stone-like finish, looks incredible.\n\nResidential or commercial floor? And roughly what m²?`;
  if (project.match(/exterior|outside|outdoor/)) return `Thanks ${name}! Exterior work — here's what works best outside:\n\n• **Rokka** — heavily textured stone effect, very robust\n• **Earthen Hemp Render** — rammed earth look, sustainable\n• **Concretum** — raw concrete, UV stable\n• **Marbellino** — polished, also exterior-approved\n\nWhat style is the property?`;
  if (project.match(/feature wall|lounge|living/)) return `Thanks ${name}! Feature walls are where we really get to show off. ✨\n\n• **Polished & luxurious** → Marbellino\n• **Raw concrete** → Concretum\n• **Stone texture** → Rokka\n• **Earthy/rammed earth** → Earthen Hemp\n• **Metallic statement** → Copper, Brass, Bronze\n\nAny colour direction, or a style reference?`;
  if (project.match(/commercial|restaurant|hotel|cafe|office/)) return `Thanks ${name}! Commercial projects are a big part of what we do — restaurants, hotels, lobbies, retail. 🏢\n\nMarbellino and Rokka are our most popular for commercial, but it depends on the vibe.\n\nWhat's the space, and what atmosphere are you creating?`;
  return `Thanks ${name}! That sounds like a great project.\n\nTo point you in the right direction — which spaces are you plastering? (Bathroom, feature wall, floors, exterior?) And what look are you going for?`;
}
