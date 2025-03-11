import { createClient } from '@supabase/supabase-js'  // Library to connect with Supabase

// Supabase Credentials constants
const supabaseUrl = 'https://pokscockcjadaffhipop.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBva3Njb2NrY2phZGFmZmhpcG9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3ODExMDksImV4cCI6MjA0MzM1NzEwOX0.L4Dx2JA0QiNeLC0_7m1jIe2SaZ1zHopG2cEbrh208A8"

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials.');
  }

export const supabase = createClient(supabaseUrl, supabaseKey);