import Projectlist from "@/components/ProjectList";
import { createClient } from "@/utils/supabase/server";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DevTools } from "jotai-devtools";
import { getAllProjects } from "@/api";

export default async function Index() {
  const cookieStore = cookies();
  const client = createClient(cookieStore);
  const { data, error } = await client.auth.getUser();
  console.log(data);

  if (error || !data?.user) {
    redirect("/");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => getAllProjects(client),
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projectlist />
      </HydrationBoundary>
    </div>
  );
}
