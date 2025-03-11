import { createClient } from '@supabase/supabase-js'; // Library to connect with Supabase

// Supabase Credentials constants
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
