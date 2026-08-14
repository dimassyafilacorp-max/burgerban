import { createClient } from '@supabase/supabase-js';

// Temukan URL & Anon Key ini di Supabase Dashboard -> Project Settings -> API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxxxxxxx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOi...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);