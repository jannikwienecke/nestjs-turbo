import { useMemo } from "react";
import { getSupabaseBrowserClient } from "../hooks/supabase";
import { getAllProjects } from "../api";
import { useQuery } from "@tanstack/react-query";

function useSupabase() {
  //   return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;

export function useProjects() {
  const client = getSupabaseBrowserClient();
  const queryKey = ["projects"];

  const queryFn = async () => {
    return getAllProjects(client);
  };

  console.log("useProjects", queryKey, queryFn);
  return useQuery({ queryKey, queryFn });
}
