import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

// import { createClient } from "@/utils/supabase/server";

import type { Database } from "../types/db";

let client: SupabaseClient<Database> | undefined;

export function getSupabaseBrowserClient() {
  console.log("getSupabaseBrowserClient");

  if (client) {
    return client;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  console.log({ url, key });

  client = createBrowserClient<Database>(url, key);

  return client;
}
