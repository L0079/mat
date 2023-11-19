import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://kykxtddbrizjxqngrxuo.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5a3h0ZGRicml6anhxbmdyeHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxOTUzNDYsImV4cCI6MjAxNDc3MTM0Nn0.DU-ucsFso3hK3ytl2-zkMp1NiUD6tdAd8n_i-OlU_DI";
// Create a single supabase client for interacting with your database

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
