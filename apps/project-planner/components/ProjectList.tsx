// app/posts.jsx
"use client";

import { getAllProjects } from "@/api";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { useHydrateAtoms } from "jotai/utils";

const userAtom = atomWithQuery((get) => ({
  queryKey: ["posts"],
  queryFn: getProjectsClient,
}));

const countAtom = atom<{ title: string }[]>([]);
countAtom.debugLabel = "count";

const projectCountAtom = atom((get) => {
  const projects = get(countAtom);
  return projects.length;
});

projectCountAtom.debugLabel = "projectCount";

export const getProjectsClient = async () => {
  const client = createClient();

  return getAllProjects(client);
};

export default function Projectlist() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getProjectsClient,
  });

  useHydrateAtoms(data?.data ? [[countAtom, data.data]] : []);

  return <Test />;
}

const Test = () => {
  const [count] = useAtom(countAtom);
  const [projectCount] = useAtom(projectCountAtom);

  console.log({ count: count.length });
  return (
    <div>
      <ul>
        {count.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <div>
        <h1>Project Count: {projectCount}</h1>
      </div>
    </div>
  );
};
