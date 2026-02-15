import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://djtxbohjjpkhzhwlnrtu.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdHhib2hqanBraHpod2xucnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNDgzMjEsImV4cCI6MjA4NjYyNDMyMX0.UWgOz-9ZAy0xxVH-VTTysFzvrbD1CX0a459rNC391Hw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface ChatLead {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  project_type?: string;
  products_interested?: string[];
  timeline?: string;
  notes?: string;
  source?: string;
  conversation_id?: string;
  created_at?: string;
}

export interface ChatConversation {
  id?: string;
  session_id: string;
  lead_id?: string;
  messages: Array<{role: string; content: string; timestamp: string}>;
  products_mentioned?: string[];
  topics?: string[];
  created_at?: string;
  updated_at?: string;
}

// Helper functions
export async function saveLead(lead: ChatLead): Promise<{data: any; error: any}> {
  const { data, error } = await supabase
    .from('chatbot_leads')
    .insert([lead])
    .select()
    .single();
  
  return { data, error };
}

export async function saveConversation(conversation: ChatConversation): Promise<{data: any; error: any}> {
  const { data, error } = await supabase
    .from('chatbot_conversations')
    .upsert([conversation], { onConflict: 'session_id' })
    .select()
    .single();
  
  return { data, error };
}

export async function updateConversation(sessionId: string, messages: any[]): Promise<{data: any; error: any}> {
  const { data, error } = await supabase
    .from('chatbot_conversations')
    .update({ 
      messages,
      updated_at: new Date().toISOString()
    })
    .eq('session_id', sessionId)
    .select()
    .single();
  
  return { data, error };
}
