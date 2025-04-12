import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../cloudfare.js';

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_CONFIG.SUPABASE_URL, SUPABASE_CONFIG.SUPABASE_KEY);