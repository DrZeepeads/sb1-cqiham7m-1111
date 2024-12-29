/*
  # Initial Schema Setup for NelsonGPT

  1. New Tables
    - `textbook_chunks`: Stores Nelson Textbook content with embeddings
      - `id` (uuid, primary key)
      - `content` (text): The actual text content
      - `embedding` (vector): OpenAI embedding for similarity search
      - `chapter` (text): Chapter reference
      - `page` (integer): Page number
      - `section` (text): Section title
      - `metadata` (jsonb): Additional metadata like edition, year
    
    - `chat_sessions`: Stores user chat sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid): Reference to auth.users
      - `title` (text): Chat session title
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `messages`: Stores chat messages
      - `id` (uuid, primary key)
      - `session_id` (uuid): Reference to chat_sessions
      - `role` (text): 'user' or 'assistant'
      - `content` (text): Message content
      - `citations` (jsonb): Array of citations
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create textbook_chunks table
CREATE TABLE IF NOT EXISTS textbook_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  embedding vector(1536),
  chapter text NOT NULL,
  page integer NOT NULL,
  section text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  citations jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE textbook_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to textbook_chunks for authenticated users"
  ON textbook_chunks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to manage their own chat sessions"
  ON chat_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to manage messages in their chat sessions"
  ON messages
  FOR ALL
  TO authenticated
  USING (
    session_id IN (
      SELECT id FROM chat_sessions WHERE user_id = auth.uid()
    )
  );