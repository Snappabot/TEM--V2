-- Chatbot Schema for Troweled Earth
-- Run this in Supabase SQL Editor

-- Enable pgvector extension
create extension if not exists vector;

-- Knowledge base documents table
create table if not exists chatbot_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text, -- 'product', 'tds', 'sds', 'faq', 'general'
  product_name text, -- e.g., 'Marbellino', 'Rokka'
  embedding vector(1536), -- OpenAI ada-002 embeddings
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index for similarity search
create index if not exists chatbot_documents_embedding_idx 
on chatbot_documents 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Leads table
create table if not exists chatbot_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  location text,
  project_type text, -- 'bathroom', 'exterior', 'commercial', etc.
  products_interested text[], -- array of product names
  timeline text,
  budget_range text,
  notes text,
  source text default 'chatbot',
  conversation_id uuid,
  created_at timestamp with time zone default now()
);

-- Conversations table
create table if not exists chatbot_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  lead_id uuid references chatbot_leads(id),
  messages jsonb default '[]',
  products_mentioned text[],
  topics text[],
  sentiment text, -- 'positive', 'neutral', 'negative'
  lead_score integer default 0, -- 0-100 scoring
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Analytics/insights table
create table if not exists chatbot_analytics (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  total_conversations integer default 0,
  total_messages integer default 0,
  leads_captured integer default 0,
  popular_products jsonb default '{}',
  common_questions jsonb default '{}',
  avg_conversation_length numeric default 0,
  created_at timestamp with time zone default now()
);

-- Function to search similar documents
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id uuid,
  title text,
  content text,
  category text,
  product_name text,
  similarity float
)
language sql stable
as $$
  select
    chatbot_documents.id,
    chatbot_documents.title,
    chatbot_documents.content,
    chatbot_documents.category,
    chatbot_documents.product_name,
    1 - (chatbot_documents.embedding <=> query_embedding) as similarity
  from chatbot_documents
  where 1 - (chatbot_documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

-- RLS policies
alter table chatbot_documents enable row level security;
alter table chatbot_leads enable row level security;
alter table chatbot_conversations enable row level security;
alter table chatbot_analytics enable row level security;

-- Allow read access for authenticated users and anon for docs
create policy "Public can read documents" on chatbot_documents
  for select using (true);

-- Allow insert for conversations and leads from anon
create policy "Anyone can create conversations" on chatbot_conversations
  for insert with check (true);

create policy "Anyone can create leads" on chatbot_leads
  for insert with check (true);

-- Service role can do everything
create policy "Service role full access to documents" on chatbot_documents
  for all using (auth.role() = 'service_role');

create policy "Service role full access to leads" on chatbot_leads
  for all using (auth.role() = 'service_role');

create policy "Service role full access to conversations" on chatbot_conversations
  for all using (auth.role() = 'service_role');

create policy "Service role full access to analytics" on chatbot_analytics
  for all using (auth.role() = 'service_role');
