"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "./prisma";

export const createPost = async (formData: FormData) => {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  revalidateTag("posts");
};

export const deletePost = async (id: string, formData: FormData) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidateTag("posts");
};
