import type { APIRoute } from 'astro';
import { saveLead, saveConversation } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { chat as ollamaChat, isAvailable as ollamaAvailable } from '../../lib/ollama';

// Store conversation history per session (in-memory for now)
const conversationHistory = new Map<string, {role: string, content: string}[]>();

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
    
    // Get conversation history for this session
    let history = conversationHistory.get(sessionId) || [];
    
    // Get response from Ollama
    let response: string;
    const available = await ollamaAvailable();
    
    if (available) {
      response = await ollamaChat(message, history);
    } else {
      // Fallback if Ollama isn't running
      response = "G'day! I'm having a small technical issue. Please contact us directly at 0439 243 055 or matt-troweledearth@outlook.com for immediate help!";
    }
    
    // Update history (keep last 10 exchanges to limit context size)
    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: response });
    if (history.length > 20) {
      history = history.slice(-20);
    }
    conversationHistory.set(sessionId, history);
    
    // Save to Supabase (non-blocking)
    saveConversation({
      session_id: sessionId,
      messages: history,
      products_mentioned: extractProducts(message + ' ' + response)
    }).catch(err => console.error('Failed to save conversation:', err));
    
    return new Response(JSON.stringify({ 
      response,
      sessionId 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process message',
      response: "Sorry, I'm having trouble right now. Please call us at 0439 243 055 for immediate assistance!"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Extract product names from text
function extractProducts(text: string): string[] {
  const products = ['Marbellino', 'Tadelakt', 'Tadelino', 'Concretum', 'Rokka', 'Antique Stucco', 'Hemp Earthen Render'];
  const lower = text.toLowerCase();
  return products.filter(p => lower.includes(p.toLowerCase()));
}

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
