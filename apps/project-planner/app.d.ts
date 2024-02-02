// src/app.d.ts

import { SupabaseClient, Session } from "@supabase/supabase-js";
import { Database as DB } from "./types/db";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }

    interface Database {
      public: DB["public"];
    }
  }

  interface String {
    fancyFormat(opts: StringFormatOptions): string;
  }

  type Database = DB;
  type Project = DB["public"]["Tables"]["Project"]["Row"];
}
