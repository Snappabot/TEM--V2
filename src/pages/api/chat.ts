import type { APIRoute } from 'astro';
import { products, companyInfo } from '../../lib/chatbot/knowledge-base';
import { saveLead, saveConversation } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';

// Simple keyword matching - fast and free
function findRelevantInfo(message: string): { response: string; productsFound: string[] } {
  const lowerMessage = message.toLowerCase();
  let responses: string[] = [];
  let productsFound: string[] = [];
  
  // Check for product mentions
  for (const product of products) {
    const productNameLower = product.name.toLowerCase();
    if (lowerMessage.includes(productNameLower)) {
      productsFound.push(product.name);
      responses.push(`**${product.name}** - ${product.overview}\n\n**Key Features:**\n${product.keyFeatures.slice(0,3).map(f => `• ${f}`).join('\n')}\n\n**Warranty:** ${product.warranty}`);
    }
  }
  
  // Wet areas
  if (lowerMessage.includes('bathroom') || lowerMessage.includes('shower') || lowerMessage.includes('wet')) {
    if (responses.length === 0) {
      productsFound.push('Tadelakt');
      responses.push("For bathrooms and wet areas, I recommend **Tadelakt** - it's our traditional Moroccan waterproof plaster. Naturally antibacterial, seamless finish, perfect for showers and around pools!");
    }
  }
  
  // Floors
  if (lowerMessage.includes('floor')) {
    productsFound.push('Marbellino');
    responses.push("For floors, **Marbellino** is your best choice - it's our only product suitable for floor applications. Creates a beautiful polished stone-like finish.");
  }
  
  // Exterior
  if (lowerMessage.includes('exterior') || lowerMessage.includes('outside') || lowerMessage.includes('outdoor')) {
    if (responses.length === 0) {
      productsFound.push('Concretum', 'Rokka');
      responses.push("For exterior applications, check out **Concretum** (industrial concrete look) or **Rokka** (textured stone effect). Both are weather-resistant and UV stable.");
    }
  }
  
  // Eco/sustainable
  if (lowerMessage.includes('eco') || lowerMessage.includes('sustainable') || lowerMessage.includes('green')) {
    productsFound.push('Hemp Earthen Render');
    responses.push("All our products are eco-friendly with low VOC! Our **Hemp Earthen Render** is particularly sustainable - contains hemp fibres for a beautiful rammed earth aesthetic.");
  }
  
  // Price/cost
  if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('how much') || lowerMessage.includes('quote')) {
    responses.push(`Pricing depends on the product, area size, and project complexity.\n\n**Where to buy:**\n🏪 Render Supply Co\n🏪 Geelong Colour World\n🏪 Wet Trades Hyatt\n\nFor project quotes, contact Matt:\n📞 ${companyInfo.contact.phone}\n📧 ${companyInfo.contact.email}`);
  }
  
  // Warranty
  if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
    responses.push("All Troweled Earth products come with a **10-Year Limited Warranty** when applied by our approved applicators. This covers peeling, blistering, flaking, and delamination.");
  }
  
  // Contact
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
    responses.push(`You can reach us at:\n\n📞 ${companyInfo.contact.phone}\n📧 ${companyInfo.contact.email}\n📱 Instagram: ${companyInfo.contact.instagram}\n\nWe're based in Melbourne and service the greater Melbourne area.`);
  }
  
  // Training
  if (lowerMessage.includes('training') || lowerMessage.includes('workshop') || lowerMessage.includes('learn') || lowerMessage.includes('course')) {
    responses.push("Yes, we offer hands-on training workshops! Perfect for plasterers, builders, and DIY enthusiasts. Follow us on Instagram @troweled_earth_melbourne for upcoming dates, or contact us to register your interest.");
  }
  
  // Suppliers / Where to buy
  if (lowerMessage.includes('supplier') || lowerMessage.includes('stockist') || lowerMessage.includes('where to buy') || lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('store')) {
    responses.push("You can find our products at these trusted suppliers:\n\n🏪 **Render Supply Co**\n🏪 **Geelong Colour World**\n🏪 **Wet Trades Hyatt**\n\nOr contact us directly for bulk orders and project consultations!");
  }
  
  // Comparison
  if (lowerMessage.includes('difference') || lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('which')) {
    responses.push("Quick comparison of our finishes:\n\n**Marbellino** - Polished, stone-like, can do floors\n**Tadelakt** - Waterproof, great for showers\n**Concretum** - Industrial concrete look\n**Rokka** - Textured stone effect\n\nWhat look are you going for?");
  }
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|g'day|good morning|good afternoon|howdy)/)) {
    responses = [`G'day! 👋 Welcome to Troweled Earth Melbourne. I can help you find the perfect plaster finish.\n\nWhat are you working on? A bathroom, feature wall, or something else?`];
  }
  
  // Thanks
  if (lowerMessage.match(/(thanks|thank you|cheers|ta)/)) {
    responses = ["You're welcome! Let me know if you have any other questions. 😊"];
  }
  
  // Default response
  if (responses.length === 0) {
    responses.push(`I'd love to help! Here are some things I can tell you about:\n\n• **Marbellino** - Venetian plaster, polished finish\n• **Tadelakt** - Waterproof, great for bathrooms\n• **Concretum** - Industrial concrete look\n• **Rokka** - Textured stone effect\n\nOr ask about pricing, warranty, or training workshops!\n\nFor specific questions, call Matt: ${companyInfo.contact.phone}`);
  }
  
  return { response: responses.join('\n\n'), productsFound };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, sessionId } = body;
    
    if (!message || !sessionId) {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { response, productsFound } = findRelevantInfo(message);
    
    // Save to Supabase (non-blocking)
    saveConversation({
      session_id: sessionId,
      messages: [{ role: 'user', content: message }, { role: 'assistant', content: response }],
      products_mentioned: productsFound
    }).catch(err => console.error('Failed to save conversation:', err));
    
    return new Response(JSON.stringify({ response, sessionId }), {
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

// Endpoint to save lead from form
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
    
    if (result.error) {
      throw result.error;
    }
    
    // Send email notification to Matt
    await sendLeadNotification({
      name,
      email,
      phone,
      productsInterested
    });
    
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
