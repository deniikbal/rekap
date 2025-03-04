-- This SQL can be executed in the Supabase SQL Editor to create the users table

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
CREATE POLICY "Users are viewable by everyone" 
  ON users FOR SELECT 
  USING (true);

CREATE POLICY "Users can be inserted by authenticated users" 
  ON users FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can be updated by authenticated users" 
  ON users FOR UPDATE 
  USING (true);

CREATE POLICY "Users can be deleted by authenticated users" 
  ON users FOR DELETE 
  USING (true);