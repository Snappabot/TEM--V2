import type { APIRoute } from 'astro';
import { products, companyInfo, faqs } from '../../lib/chatbot/knowledge-base';

// Simple keyword matching for MVP (replace with OpenAI embeddings later)
function findRelevantInfo(message: string): string {
  const lowerMessage = message.toLowerCase();
  let responses: string[] = [];
  
  // Check for product mentions
  for (const product of products) {
    const productNameLower = product.name.toLowerCase();
    if (lowerMessage.includes(productNameLower)) {
      responses.push(`**${product.name}** - ${product.overview}\n\n**Key Features:**\n${product.keyFeatures.map(f => `• ${f}`).join('\n')}\n\n**Applications:** ${product.applications.slice(0, 3).join(', ')}\n\n**Warranty:** ${product.warranty}`);
    }
  }
  
  // Check for category/use case mentions
  if (lowerMessage.includes('bathroom') || lowerMessage.includes('shower') || lowerMessage.includes('wet')) {
    const wetAreaProducts = products.filter(p => 
      p.applications.some(a => a.toLowerCase().includes('bathroom') || a.toLowerCase().includes('wet'))
    );
    if (wetAreaProducts.length > 0 && responses.length === 0) {
      responses.push(`For bathrooms and wet areas, I recommend:\n\n${wetAreaProducts.map(p => `**${p.name}** - ${p.overview.split('.')[0]}.`).join('\n\n')}`);
    }
  }
  
  if (lowerMessage.includes('floor')) {
    responses.push("For floor applications, **Marbellino** is our only product suitable for floors. It creates a beautiful stone-like finish and is unique among decorative plasters for its floor application capability.");
  }
  
  if (lowerMessage.includes('exterior') || lowerMessage.includes('outside') || lowerMessage.includes('outdoor')) {
    const exteriorProducts = products.filter(p => 
      p.applications.some(a => a.toLowerCase().includes('exterior') || a.toLowerCase().includes('external'))
    );
    if (exteriorProducts.length > 0 && responses.length === 0) {
      responses.push(`For exterior applications, we recommend:\n\n${exteriorProducts.map(p => `**${p.name}** - ${p.keyFeatures[0]}`).join('\n')}`);
    }
  }
  
  if (lowerMessage.includes('eco') || lowerMessage.includes('sustainable') || lowerMessage.includes('green') || lowerMessage.includes('environment')) {
    responses.push("All our products are environmentally friendly with low VOC (<50 g/L) and Green Star compliant. Our **Hemp Earthen Render** is particularly eco-friendly, containing sustainable hemp fibres for a beautiful rammed earth look.");
  }
  
  // Check for FAQs
  if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('how much')) {
    responses.push("Pricing depends on the product, area size, and project complexity. We'd love to provide you with a detailed quote! Can I get your details to arrange a consultation?");
  }
  
  if (lowerMessage.includes('quote') || lowerMessage.includes('consultation')) {
    responses.push(`Great! To arrange a quote or consultation:\n\n📞 Call Matt: ${companyInfo.contact.phone}\n📧 Email: ${companyInfo.contact.email}\n\nOr leave your details here and we'll get back to you!`);
  }
  
  if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
    responses.push("All Troweled Earth products come with a **7-Year Limited Warranty** when applied by our approved applicators. This covers peeling, blistering, flaking, and delamination.");
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
    responses.push(`You can reach us at:\n\n📞 ${companyInfo.contact.phone}\n📧 ${companyInfo.contact.email}\n📱 Instagram: ${companyInfo.contact.instagram}\n\nWe're based in Melbourne and service the greater Melbourne area.`);
  }
  
  if (lowerMessage.includes('training') || lowerMessage.includes('workshop') || lowerMessage.includes('learn')) {
    responses.push("Yes, we offer hands-on training workshops! Perfect for plasterers, builders, and DIY enthusiasts. Follow us on Instagram @troweled_earth_melbourne for upcoming workshop dates, or contact us to register your interest.");
  }
  
  if (lowerMessage.includes('difference') || lowerMessage.includes('compare') || lowerMessage.includes('vs')) {
    responses.push("Here's a quick comparison of our main finishes:\n\n**Marbellino** - Polished, stone-like, can be used on floors\n**Tadelakt** - Moroccan waterproof plaster, perfect for showers\n**Rokka** - Rustic textured finish, versatile\n**Concretum** - Industrial concrete look\n**Hemp Earthen Render** - Sustainable rammed earth aesthetic\n\nWhat type of look are you going for?");
  }
  
  // Greeting handling
  if (lowerMessage.match(/^(hi|hello|hey|g'day|good morning|good afternoon)/)) {
    responses.push(`G'day! 👋 Welcome to Troweled Earth Melbourne. I'm here to help you discover the perfect plaster finish for your project.\n\nWhat are you working on? A bathroom renovation, feature wall, or something else?`);
  }
  
  // Default response if nothing matched
  if (responses.length === 0) {
    responses.push(`Thanks for your question! I can help you with:\n\n• **Product information** - Marbellino, Rokka, Tadelakt, and more\n• **Application advice** - bathrooms, exteriors, floors\n• **Quotes & consultations**\n• **Training workshops**\n\nWhat would you like to know more about?`);
  }
  
  return responses.join('\n\n---\n\n');
}

// Detect if user is providing contact info
function detectLeadInfo(message: string): Record<string, string> {
  const info: Record<string, string> = {};
  
  // Email detection
  const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) info.email = emailMatch[0];
  
  // Phone detection (Australian format)
  const phoneMatch = message.match(/(?:04|\+614|0)[0-9]{8,9}/);
  if (phoneMatch) info.phone = phoneMatch[0];
  
  // Name detection (after "I'm", "my name is", "this is")
  const nameMatch = message.match(/(?:i'm|my name is|this is|i am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch) info.name = nameMatch[1];
  
  return info;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, sessionId, conversationHistory = [] } = body;
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Detect any lead information in the message
    const leadInfo = detectLeadInfo(message);
    
    // Generate response based on knowledge base
    const response = findRelevantInfo(message);
    
    // Check if we should ask for contact info
    let followUp = '';
    const hasAskedAboutProduct = conversationHistory.length >= 2;
    const hasProvidedEmail = conversationHistory.some((m: any) => m.content?.includes('@'));
    
    if (hasAskedAboutProduct && !hasProvidedEmail && Object.keys(leadInfo).length === 0) {
      followUp = "\n\n---\n\n💡 *Want us to send you more information or arrange a consultation? Just share your name and email!*";
    }
    
    return new Response(JSON.stringify({
      response: response + followUp,
      leadInfo: Object.keys(leadInfo).length > 0 ? leadInfo : null,
      sessionId: sessionId || crypto.randomUUID()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
