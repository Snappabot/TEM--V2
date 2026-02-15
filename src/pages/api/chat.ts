import type { APIRoute } from 'astro';
import { products, companyInfo, faqs } from '../../lib/chatbot/knowledge-base';
import { supabase, saveLead, saveConversation } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';

// Simple keyword matching for MVP (replace with OpenAI embeddings later)
function findRelevantInfo(message: string): { response: string; productsFound: string[] } {
  const lowerMessage = message.toLowerCase();
  let responses: string[] = [];
  let productsFound: string[] = [];
  
  // Check for product mentions
  for (const product of products) {
    const productNameLower = product.name.toLowerCase();
    if (lowerMessage.includes(productNameLower)) {
      productsFound.push(product.name);
      responses.push(`**${product.name}** - ${product.overview}\n\n**Key Features:**\n${product.keyFeatures.map(f => `• ${f}`).join('\n')}\n\n**Applications:** ${product.applications.slice(0, 3).join(', ')}\n\n**Warranty:** ${product.warranty}`);
    }
  }
  
  // Check for category/use case mentions
  if (lowerMessage.includes('bathroom') || lowerMessage.includes('shower') || lowerMessage.includes('wet')) {
    const wetAreaProducts = products.filter(p => 
      p.applications.some(a => a.toLowerCase().includes('bathroom') || a.toLowerCase().includes('wet'))
    );
    if (wetAreaProducts.length > 0 && responses.length === 0) {
      productsFound.push(...wetAreaProducts.map(p => p.name));
      responses.push(`For bathrooms and wet areas, I recommend:\n\n${wetAreaProducts.map(p => `**${p.name}** - ${p.overview.split('.')[0]}.`).join('\n\n')}`);
    }
  }
  
  if (lowerMessage.includes('floor')) {
    productsFound.push('Marbellino');
    responses.push("For floor applications, **Marbellino** is our only product suitable for floors. It creates a beautiful stone-like finish and is unique among decorative plasters for its floor application capability.");
  }
  
  if (lowerMessage.includes('exterior') || lowerMessage.includes('outside') || lowerMessage.includes('outdoor')) {
    const exteriorProducts = products.filter(p => 
      p.applications.some(a => a.toLowerCase().includes('exterior') || a.toLowerCase().includes('external'))
    );
    if (exteriorProducts.length > 0 && responses.length === 0) {
      productsFound.push(...exteriorProducts.map(p => p.name));
      responses.push(`For exterior applications, we recommend:\n\n${exteriorProducts.map(p => `**${p.name}** - ${p.keyFeatures[0]}`).join('\n')}`);
    }
  }
  
  if (lowerMessage.includes('eco') || lowerMessage.includes('sustainable') || lowerMessage.includes('green') || lowerMessage.includes('environment')) {
    productsFound.push('Hemp Earthen Render');
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
    responses.push("All Troweled Earth products come with a **10-Year Limited Warranty** when applied by our approved applicators. This covers peeling, blistering, flaking, and delamination.");
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
  
  return {
    response: responses.join('\n\n---\n\n'),
    productsFound: [...new Set(productsFound)]
  };
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
    const { message, sessionId, conversationHistory = [], leadInfo: existingLeadInfo = {} } = body;
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const currentSessionId = sessionId || crypto.randomUUID();
    
    // Detect any lead information in the message
    const detectedLeadInfo = detectLeadInfo(message);
    const combinedLeadInfo = { ...existingLeadInfo, ...detectedLeadInfo };
    
    // Generate response based on knowledge base
    const { response, productsFound } = findRelevantInfo(message);
    
    // Save conversation to Supabase
    const newMessage = { role: 'user', content: message, timestamp: new Date().toISOString() };
    const assistantMessage = { role: 'assistant', content: response, timestamp: new Date().toISOString() };
    const allMessages = [...conversationHistory, newMessage, assistantMessage];
    
    try {
      // Save or update conversation
      await saveConversation({
        session_id: currentSessionId,
        messages: allMessages,
        products_mentioned: productsFound,
      });
      
      // If we have enough lead info (at least email), save the lead
      if (combinedLeadInfo.email) {
        const leadResult = await saveLead({
          ...combinedLeadInfo,
          products_interested: productsFound,
          source: 'chatbot',
          notes: `Products discussed: ${productsFound.join(', ')}`
        });
        console.log('Lead saved:', leadResult);
      }
    } catch (dbError) {
      console.error('Database error (non-blocking):', dbError);
      // Continue anyway - don't break the chat if DB fails
    }
    
    // Check if we should ask for contact info
    let followUp = '';
    const hasAskedAboutProduct = conversationHistory.length >= 2;
    const hasProvidedEmail = conversationHistory.some((m: any) => m.content?.includes('@')) || combinedLeadInfo.email;
    
    if (hasAskedAboutProduct && !hasProvidedEmail && Object.keys(detectedLeadInfo).length === 0) {
      followUp = "\n\n---\n\n💡 *Want us to send you more information or arrange a consultation? Just share your name and email!*";
    }
    
    return new Response(JSON.stringify({
      response: response + followUp,
      leadInfo: Object.keys(detectedLeadInfo).length > 0 ? detectedLeadInfo : null,
      sessionId: currentSessionId,
      productsFound
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
