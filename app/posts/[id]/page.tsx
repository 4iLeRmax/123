import prisma from "@/app/lib/prisma";
import React from "react";

export const generateStaticParams = async () => {
  const posts = await prisma.post.findMany();

  return posts.map(({ id }) => ({ id }));
};

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await await prisma.post.findUnique({
    where: {
      id,
    },
  });

  // const post = await prisma.post.findUnique({
  //   where: {
  //     id,
  //   },
  // });

  if (post === null) return null;

  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <p>{post.title}</p>
        <p>{post.createdAt.toString()}</p>
      </div>
    </>
  );
}
