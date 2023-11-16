import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://lzbkmmebsqyknmnnqoez.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6YmttbWVic3F5a25tbm5xb2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3MDEyMTAsImV4cCI6MjAwNzI3NzIxMH0.eyOAJboMgjKHh0tRQ1wLw88kUJF5WqP4YLFfE7k0zNg"
)

export { supabase }
