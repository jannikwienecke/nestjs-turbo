"use client";
import {
  createProjectController,
  deleteProjectController,
} from "@/app/api/createProject/controller";
import { usePageStore } from "@/app/lib/page-store";

import { atom, useSetAtom } from "jotai";
import React from "react";

interface State {
  projects: { title: string }[];
}

const stateAtom = atom<State>({
  projects: [],
});

export const Projectlist = ({ projects }: { projects: any[] }) => {
  const setStateAtom = useSetAtom(stateAtom);

  React.useEffect(() => {
    setStateAtom({ projects });
  }, [projects, setStateAtom]);

  return <ProjectListContent projects={projects} />;
};

const myAction = async (props: { title: string }) => {
  return createProjectController(null, {
    title: props.title,
  });
};

const _delete = async (props: { title: string }) => {
  return deleteProjectController({
    title: props.title,
  });
};

const ProjectListContent = ({ projects }: { projects: any[] }) => {
  const { atomState, execute, isLoading, error } = usePageStore({
    stateAtom,
    actions: {
      create: myAction,
      delete: _delete,
    },
  });

  const handleClick = ({ title }: { title: string }) => {
    execute("create", { title }, (state) => ({
      ...state,
      projects: [{ title }, ...state.projects],
    }));
  };

  const handleDelee = ({ title }: { title: string }) => {
    execute("delete", { title }, (state) => ({
      ...state,
      projects: state.projects.filter((project) => project.title !== title),
    }));
  };

  const projects_ = atomState.projects.length
    ? atomState.projects
    : projects || [];
  return (
    <>
      {error && <div>error...</div>}
      <form className="flex flex-col gap-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="border-2 border-gray-200 rounded-md p-2"
        />
        <button
          disabled={isLoading}
          formAction={async (formData) => {
            const title = formData.get("title") as string;
            handleClick({ title });
          }}
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2"
        >
          Add Project
        </button>
      </form>

      <ul>
        {projects_.map((project) => (
          <li key={project.title}>
            {project.title}
            <button
              disabled={isLoading}
              onClick={() => handleDelee({ title: project.title })}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
