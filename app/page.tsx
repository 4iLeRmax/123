import { unstable_cache } from "next/cache";
import React from "react";
import prisma from "./lib/prisma";

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

const getPosts = unstable_cache(
  async () => {
    return prisma.post.findMany();
  },
  ["posts"],
  {
    tags: ["posts"],
  }
);

const PostsQuantity = async () => {
  // const comments: Comment[] = await fetch(
  //   "https://jsonplaceholder.typicode.com/comments",
  //   {
  //     cache: "force-cache",
  //   }
  // ).then((res) => res.json());
  const posts = await getPosts();
  return (
    <>
      <h1>Post quantity: {posts.length}</h1>
    </>
  );
};

export default async function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <div>
        <PostsQuantity />
      </div>
    </>
  );
}
