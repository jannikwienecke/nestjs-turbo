"use client";
import { Card } from "@repo/ui/card";
import { useProjects } from "../components/use-supbase";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import React from "react";

export default function Page() {
  // const { data } = useProjects();
  const cookieStore = cookies();

  // const supabase = createClient(cookieStore);

  React.useEffect(() => {
    console.log(cookieStore);
  }, []);

  return (
    <div>
      <Card title="Hello" href="https://google.com">
        {JSON.stringify(data?.data, null, 2)}
      </Card>
    </div>
  );
}
