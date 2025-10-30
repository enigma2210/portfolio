import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  artifact_type: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  skills: string[];
  order_index: number;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  rune_color: string;
  order_index: number;
  created_at: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  order_index: number;
  created_at: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};
