import { Projectlist } from "@/components/ProjectList";
import { createClientForServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllProjects } from "@/api/api";

const p: Project = {
  title: "title",
  id: 12,
  created_at: "description",
};

console.log(p);

export default async function Index() {
  const cookieStore = cookies();
  const client = createClientForServer(cookieStore);
  const { data, error } = await client.auth.getUser();
  console.log(data);

  if (error || !data?.user) {
    redirect("/");
  }

  const projects = (await getAllProjects(client)).data;
  if (!projects) return null;
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Projectlist projects={projects} />
    </div>
  );
}
