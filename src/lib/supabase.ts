import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL:", supabaseUrl ? "Set" : "Missing");
  console.error("Supabase Key:", supabaseAnonKey ? "Set" : "Missing");
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file and restart the dev server."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const RESUME_BUCKET = "resumes";
