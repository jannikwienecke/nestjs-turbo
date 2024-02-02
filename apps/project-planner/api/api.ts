import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/db";

export const getAllProjects = async (client: SupabaseClient<Database>) => {
  return client
    .from("Project")
    .select("*")
    .limit(10)
    .order("id", { ascending: false });
};
