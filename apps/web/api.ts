import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types/db";

export const getAllProjects = async (client: SupabaseClient<Database>) => {
  return client.from("projects").select();
};
