import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('SUPABASE CREDENTIALS MISSING! API will fail.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
