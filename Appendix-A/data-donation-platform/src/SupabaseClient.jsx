import { createClient } from '@supabase/supabase-js'  // Library to connect with Supabase

// Supabase Credentials constants --CHANGE THIS FOR RESEARCHER'S CREDENTIALS--
const supabaseUrl = 'https://pokscockchipop.supabase.co'  // Replace with your actual URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB8" // Replace with your actual key

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials.');
  }

export const supabase = createClient(supabaseUrl, supabaseKey);