// "use server";

// import { revalidatePath } from "next/cache";
// import postgres from "postgres";
// import { z } from "zod";

// let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
//   ssl: "allow",
// });

// // CREATE TABLE todos (
// //   id SERIAL PRIMARY KEY,
// //   text TEXT NOT NULL
// // );

// export async function createTodo(
//   prevState: {
//     message: string;
//   },
//   formData: FormData,
// ) {
//   const schema = z.object({
//     todo: z.string().min(1),
//   });
//   const parse = schema.safeParse({
//     todo: formData.get("todo"),
//   });

//   if (!parse.success) {
//     return { message: "Failed to create todo" };
//   }

//   const data = parse.data;

//   try {
//     await sql`
//       INSERT INTO todos (text)
//       VALUES (${data.todo})
//     `;

//     revalidatePath("/");
//     return { message: `Added todo ${data.todo}` };
//   } catch (e) {
//     return { message: "Failed to create todo" };
//   }
// }

// export async function deleteTodo(
//   prevState: {
//     message: string;
//   },
//   formData: FormData,
// ) {
//   const schema = z.object({
//     id: z.string().min(1),
//     todo: z.string().min(1),
//   });
//   const data = schema.parse({
//     id: formData.get("id"),
//     todo: formData.get("todo"),
//   });

//   try {
//     await sql`
//       DELETE FROM todos
//       WHERE id = ${data.id};
//     `;

//     revalidatePath("/");
//     return { message: `Deleted todo ${data.todo}` };
//   } catch (e) {
//     return { message: "Failed to delete todo" };
//   }
// }
"use server";

import { createClientForServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
// import postgres from "postgres";
// import { z } from "zod";

// let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
//   ssl: "allow",
// });

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

// export async function createTodo(
//   prevState: {
//     message: string;
//   },
//   formData: FormData
// ) {
//   const schema = z.object({
//     todo: z.string().min(1),
//   });
//   const parse = schema.safeParse({
//     todo: formData.get("todo"),
//   });

//   if (!parse.success) {
//     return { message: "Failed to create todo" };
//   }

//   const data = parse.data;

//   try {
//     await sql`
//       INSERT INTO todos (text)
//       VALUES (${data.todo})
//     `;

//     revalidatePath("/");
//     return { message: `Added todo ${data.todo}` };
//   } catch (e) {
//     return { message: "Failed to create todo" };
//   }
// }

export async function createProjectController(
  prevState: {
    title: string;
  } | null,
  data: { title: string }
) {
  //   const schema = z.object({
  //     id: z.string().min(1),
  //     todo: z.string().min(1),
  //   });
  //   const data = schema.parse({
  //     id: formData.get("id"),
  //     todo: formData.get("todo"),
  //   });
  //   try {
  //     await sql`
  //       DELETE FROM todos
  //       WHERE id = ${data.id};
  //     `;
  //     revalidatePath("/");
  //     return { message: `Deleted todo ${data.todo}` };
  //   } catch (e) {
  //     return { message: "Failed to delete todo" };
  //   }

  const cookie = cookies();
  const client = createClientForServer(cookie);

  // const title = formData.get("title") as string;
  const title = data.title;

  console.log({ title });
  if (!title) {
    return {
      title: "Failed to create project",
      error: true,
    };
  }

  const res = await client.from("Project").insert({
    title: title,
  });

  console.log(res);

  await waiFor(300);

  if (res.error) {
    return {
      title: "Failed to create project: Error: " + res.error.details,
      error: true,
    };
  }

  revalidatePath("/");

  return {
    title: "Project created",
    success: true,
  };
}

export async function deleteProjectController(data: { title: string }) {
  const cookie = cookies();
  const client = createClientForServer(cookie);

  // const title = formData.get("title") as string;
  const title = data.title;

  if (!title) {
    return {
      title: "Failed to create project",
      error: true,
    };
  }

  const res = await client.from("Project").delete().match({ title: title });

  console.log(res);

  await waiFor(300);

  if (res.error) {
    return {
      title: "Failed to create project: Error: " + res.error.details,
      error: true,
    };
  }

  revalidatePath("/");

  return {
    title: "Project deleted",
    success: true,
  };
}

const waiFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
