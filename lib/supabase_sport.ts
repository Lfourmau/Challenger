// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Utilise tes clés d'API Supabase (url et clé publique)
const supabaseUrl = process.env.NEXT_PUBLIC_KYWO_SPORT_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_KYWO_SPORT_SUPABASE_KEY || "";

export const supabaseSport = createClient(supabaseUrl, supabaseKey);
