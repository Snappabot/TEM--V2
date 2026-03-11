import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const products = [
  {
    name: "Marbellino",
    category: "Polished Plaster",
    overview: "High-performance decorative coating creating surfaces with elevated aesthetic value and a stone-like, slightly marbled effect. Suitable for modern and classic architectural designs, including floors.",
    applications: [
      "Internal and external walls",
      "Internal floors (unique among TEM products)",
      "Bathrooms and wet areas",
      "Ceilings and landscaping features",
      "Hotels, restaurants, shops, showrooms"
    ],
    keyFeatures: [
      "Stone-like, marbled aesthetic",
      "Floor application available (unique!)",
      "Suitable for bathrooms",
      "Interior AND exterior use",
      "Low VOC (<50 g/L)",
      "Non-combustible",
      "Repairable and patchable with no visible marks",
      "Made in Australia"
    ],
    warranty: "10-Year Limited Warranty for residential applications",
    maintenance: "Clean every 12-18 months. Floor sealers may need reapplication every 24 months.",
    technicalSpecs: {
      "VOC": "<50 g/L (Green Star compliant)",
      "Flammability": "Non-combustible (AS 1530.1)",
      "Cure Time": "5-7 days full cure",
      "Package Sizes": "10kg & 20kg containers"
    }
  },
  {
    name: "Rokka",
    category: "Textured Finish",
    overview: "High-performance decorative wall coating for modern and classic architectural designs. Provides a smooth, slightly rustic finish with subtle undulations.",
    applications: [
      "Internal and external walls and ceilings",
      "Halls, stairways, bathrooms, living rooms",
      "Hotels, restaurants, shops, showrooms",
      "Class 1-10 buildings (NCC 2022 compliant)"
    ],
    keyFeatures: [
      "Versatile - modern AND classic designs",
      "Custom colour options available",
      "Rustic finish with subtle undulations",
      "Interior AND exterior use",
      "Low VOC",
      "Non-combustible",
      "Thick application (2-5mm)"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months. Inspect sealants at substrate interfaces.",
    technicalSpecs: {
      "Thickness": "2-5mm",
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible",
      "Cure Time": "5-7 days"
    }
  },
  {
    name: "Tadelakt",
    category: "Waterproof Plaster",
    overview: "Traditional Moroccan lime plaster known for its waterproof properties and luxurious appearance. Creates a seamless, naturally waterproof surface perfect for wet areas.",
    applications: [
      "Bathrooms and showers",
      "Wet areas and pools",
      "Kitchens and splashbacks",
      "Feature walls",
      "Hammams and spas"
    ],
    keyFeatures: [
      "Naturally waterproof - no sealer needed in wet areas",
      "Seamless surface - no grout lines",
      "Naturally antibacterial (high pH lime)",
      "Organic, warm aesthetic",
      "Traditional Moroccan technique",
      "Can be polished with stones and soap"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean with mild soap. Can be re-polished to restore shine.",
    technicalSpecs: {
      "Waterproof": "Yes - naturally",
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible",
      "Cure Time": "5-7 days"
    }
  },
  {
    name: "Tadelino",
    category: "Polished Plaster",
    overview: "A refined variation of Tadelakt offering a smoother, more contemporary finish while maintaining excellent water resistance. Perfect for modern bathrooms.",
    applications: [
      "Modern bathrooms",
      "Feature walls",
      "Wet areas",
      "Contemporary interiors"
    ],
    keyFeatures: [
      "Smoother than traditional Tadelakt",
      "Contemporary aesthetic",
      "Water resistant",
      "Seamless finish",
      "Low VOC"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months",
    technicalSpecs: {
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible"
    }
  },
  {
    name: "Concretum",
    category: "Concrete Look",
    overview: "Innovative product creating a unique washed patina finish on walls and surfaces. Provides depth and texture with the appearance of natural stone or concrete. UV stable, easy to apply.",
    applications: [
      "Interior and exterior walls",
      "Feature walls",
      "Commercial spaces",
      "Modern industrial designs"
    ],
    keyFeatures: [
      "Unique washed patina finish",
      "Natural stone or concrete look",
      "Industrial-style aesthetic",
      "UV stable",
      "Easy to apply",
      "Affordable without compromising quality"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months",
    technicalSpecs: {
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible"
    }
  },
  {
    name: "Antique Stucco",
    category: "Decorative Finish",
    overview: "Premium, trowel-applied decorative wall coating designed to provide a smooth, aged appearance reminiscent of Southern European architecture. Known to age beautifully over time.",
    applications: [
      "Internal and external walls, ceilings",
      "Landscaping features",
      "High-traffic areas: entries, hotels, restaurants",
      "Heritage restorations"
    ],
    keyFeatures: [
      "Southern European aged aesthetic",
      "Interior AND exterior use",
      "Low VOC, environmentally friendly",
      "Non-combustible",
      "Durable for high-traffic areas",
      "Custom colours available",
      "Ages beautifully"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months. Low-pressure water blast (<450 psi) at 45° angle.",
    technicalSpecs: {
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible (AS 1530.1-1994)",
      "Cure Time": "5-7 days"
    }
  },
  {
    name: "Hemp Earthen Render",
    category: "Sustainable Finish",
    overview: "High-performance decorative wall coating delivering modern, classic, or rustic rammed earth finishes. Contains hemp fibres for enhanced durability and sustainability.",
    applications: [
      "Internal and external walls, ceilings",
      "Bathrooms, hallways, stairways, living areas",
      "Outdoor features and landscaping",
      "Eco-conscious projects"
    ],
    keyFeatures: [
      "Sustainable hemp fibre content",
      "Authentic rammed earth aesthetic",
      "Interior AND exterior use",
      "Suitable for bathrooms",
      "Low VOC, eco-friendly",
      "Non-combustible",
      "Thicker application (3-5mm) for durability"
    ],
    warranty: "10-Year Limited Warranty",
    maintenance: "Clean every 12-18 months. Low-pressure water blast.",
    technicalSpecs: {
      "Thickness": "3-5mm",
      "VOC": "<50 g/L",
      "Flammability": "Non-combustible (AS 1530.1)"
    }
  }
];
const companyInfo = {
  contact: {
    phone: "0439 243 055",
    email: "matt-troweledearth@outlook.com",
    instagram: "@troweled_earth_melbourne"
  }};

const supabaseUrl = "https://djtxbohjjpkhzhwlnrtu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdHhib2hqanBraHpod2xucnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNDgzMjEsImV4cCI6MjA4NjYyNDMyMX0.UWgOz-9ZAy0xxVH-VTTysFzvrbD1CX0a459rNC391Hw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
async function saveLead(lead) {
  const { data, error } = await supabase.from("chatbot_leads").insert([lead]).select().single();
  return { data, error };
}
async function saveConversation(conversation) {
  const { data, error } = await supabase.from("chatbot_conversations").upsert([conversation], { onConflict: "session_id" }).select().single();
  return { data, error };
}

async function sendLeadNotification(lead) {
  {
    console.log("RESEND_API_KEY not set - skipping email notification");
    console.log("Lead captured:", lead);
    return false;
  }
}

function findRelevantInfo(message) {
  const lowerMessage = message.toLowerCase();
  let responses = [];
  let productsFound = [];
  for (const product of products) {
    const productNameLower = product.name.toLowerCase();
    if (lowerMessage.includes(productNameLower)) {
      productsFound.push(product.name);
      responses.push(`**${product.name}** - ${product.overview}

**Key Features:**
${product.keyFeatures.slice(0, 3).map((f) => `• ${f}`).join("\n")}

**Warranty:** ${product.warranty}`);
    }
  }
  if (lowerMessage.includes("bathroom") || lowerMessage.includes("shower") || lowerMessage.includes("wet")) {
    if (responses.length === 0) {
      productsFound.push("Tadelakt");
      responses.push("For bathrooms and wet areas, I recommend **Tadelakt** - it's our traditional Moroccan waterproof plaster. Naturally antibacterial, seamless finish, perfect for showers and around pools!");
    }
  }
  if (lowerMessage.includes("floor")) {
    productsFound.push("Marbellino");
    responses.push("For floors, **Marbellino** is your best choice - it's our only product suitable for floor applications. Creates a beautiful polished stone-like finish.");
  }
  if (lowerMessage.includes("exterior") || lowerMessage.includes("outside") || lowerMessage.includes("outdoor")) {
    if (responses.length === 0) {
      productsFound.push("Concretum", "Rokka");
      responses.push("For exterior applications, check out **Concretum** (industrial concrete look) or **Rokka** (textured stone effect). Both are weather-resistant and UV stable.");
    }
  }
  if (lowerMessage.includes("eco") || lowerMessage.includes("sustainable") || lowerMessage.includes("green")) {
    productsFound.push("Hemp Earthen Render");
    responses.push("All our products are eco-friendly with low VOC! Our **Hemp Earthen Render** is particularly sustainable - contains hemp fibres for a beautiful rammed earth aesthetic.");
  }
  if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("how much") || lowerMessage.includes("quote")) {
    responses.push(`Pricing depends on the product, area size, and project complexity.

**Where to buy:**
🏪 Render Supply Co
🏪 Geelong Colour World
🏪 Wet Trades Hyatt

For project quotes, contact Matt:
📞 ${companyInfo.contact.phone}
📧 ${companyInfo.contact.email}`);
  }
  if (lowerMessage.includes("warranty") || lowerMessage.includes("guarantee")) {
    responses.push("All Troweled Earth products come with a **10-Year Limited Warranty** when applied by our approved applicators. This covers peeling, blistering, flaking, and delamination.");
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email") || lowerMessage.includes("call")) {
    responses.push(`You can reach us at:

📞 ${companyInfo.contact.phone}
📧 ${companyInfo.contact.email}
📱 Instagram: ${companyInfo.contact.instagram}

We're based in Melbourne and service the greater Melbourne area.`);
  }
  if (lowerMessage.includes("training") || lowerMessage.includes("workshop") || lowerMessage.includes("learn") || lowerMessage.includes("course")) {
    responses.push("Yes, we offer hands-on training workshops! Perfect for plasterers, builders, and DIY enthusiasts. Follow us on Instagram @troweled_earth_melbourne for upcoming dates, or contact us to register your interest.");
  }
  if (lowerMessage.includes("supplier") || lowerMessage.includes("stockist") || lowerMessage.includes("where to buy") || lowerMessage.includes("buy") || lowerMessage.includes("purchase") || lowerMessage.includes("store")) {
    responses.push("You can find our products at these trusted suppliers:\n\n🏪 **Render Supply Co**\n🏪 **Geelong Colour World**\n🏪 **Wet Trades Hyatt**\n\nOr contact us directly for bulk orders and project consultations!");
  }
  if (lowerMessage.includes("difference") || lowerMessage.includes("compare") || lowerMessage.includes("vs") || lowerMessage.includes("which")) {
    responses.push("Quick comparison of our finishes:\n\n**Marbellino** - Polished, stone-like, can do floors\n**Tadelakt** - Waterproof, great for showers\n**Concretum** - Industrial concrete look\n**Rokka** - Textured stone effect\n\nWhat look are you going for?");
  }
  if (lowerMessage.match(/^(hi|hello|hey|g'day|good morning|good afternoon|howdy)/)) {
    responses = [`G'day! 👋 Welcome to Troweled Earth Melbourne. I can help you find the perfect plaster finish.

What are you working on? A bathroom, feature wall, or something else?`];
  }
  if (lowerMessage.match(/(thanks|thank you|cheers|ta)/)) {
    responses = ["You're welcome! Let me know if you have any other questions. 😊"];
  }
  if (responses.length === 0) {
    responses.push(`I'd love to help! Here are some things I can tell you about:

• **Marbellino** - Venetian plaster, polished finish
• **Tadelakt** - Waterproof, great for bathrooms
• **Concretum** - Industrial concrete look
• **Rokka** - Textured stone effect

Or ask about pricing, warranty, or training workshops!

For specific questions, call Matt: ${companyInfo.contact.phone}`);
  }
  return { response: responses.join("\n\n"), productsFound };
}
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, sessionId } = body;
    if (!message || !sessionId) {
      return new Response(JSON.stringify({ error: "Message and sessionId are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { response, productsFound } = findRelevantInfo(message);
    saveConversation({
      session_id: sessionId,
      messages: [{ role: "user", content: message }, { role: "assistant", content: response }],
      products_mentioned: productsFound
    }).catch((err) => console.error("Failed to save conversation:", err));
    return new Response(JSON.stringify({ response, sessionId }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({
      error: "Failed to process message",
      response: "Sorry, I'm having trouble. Please call us at 0439 243 055!"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, sessionId, productsInterested } = body;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await saveLead({
      name,
      email,
      phone,
      products_interested: productsInterested,
      source: "chatbot_form"
    });
    if (result.error) {
      throw result.error;
    }
    await sendLeadNotification({
      name,
      email,
      phone,
      productsInterested
    });
    return new Response(JSON.stringify({ success: true, lead: result.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Lead save error:", error);
    return new Response(JSON.stringify({ error: "Failed to save lead" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
