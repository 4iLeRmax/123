"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export const createPost = async (formData: FormData) => {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/");
};
