import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getProjects = async () => {
  const cookieStore = cookies();
  const client = createClient(cookieStore);

  const res = await client
    .from("Project")
    .select("*")
    .textSearch("title", "hello you is", {
      type: "websearch",
    })
    .order("id", { ascending: true });

  return res;
};
