-- Chatbot Schema for Troweled Earth
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/djtxbohjjpkhzhwlnrtu/sql

-- Leads table
CREATE TABLE IF NOT EXISTS chatbot_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  project_type TEXT,
  products_interested TEXT[],
  timeline TEXT,
  budget_range TEXT,
  notes TEXT,
  source TEXT DEFAULT 'chatbot',
  conversation_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations table
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  lead_id UUID REFERENCES chatbot_leads(id),
  messages JSONB DEFAULT '[]',
  products_mentioned TEXT[],
  topics TEXT[],
  sentiment TEXT,
  lead_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon users (for the chatbot)
CREATE POLICY "Allow anonymous inserts on leads" ON chatbot_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on conversations" ON chatbot_conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous updates on conversations" ON chatbot_conversations
  FOR UPDATE USING (true);

-- Allow service role full access
CREATE POLICY "Service role full access leads" ON chatbot_leads
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access conversations" ON chatbot_conversations
  FOR ALL USING (auth.role() = 'service_role');

-- Index for faster session lookups
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON chatbot_leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON chatbot_leads(created_at DESC);
