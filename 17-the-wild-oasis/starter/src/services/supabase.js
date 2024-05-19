import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dcbxkylcdoplxbrecsfz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjYnhreWxjZG9wbHhicmVjc2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNDY1MTAsImV4cCI6MjAzMTcyMjUxMH0.B7JjL07wME1c5SupZF9ul1tWvE9DKDTxkPFAbTuxb2g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase