import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./db";

export const getAllProjects = async (client: SupabaseClient<Database>) => {
  return client.from("Project").select("*");
};
