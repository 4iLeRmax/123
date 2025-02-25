import React from "react";
import { createPost, deletePost } from "../lib/actions";
import Link from "next/link";
import prisma from "../lib/prisma";
import { unstable_cache } from "next/cache";
import SubmitButton from "../UI/SubmitButton";

export default async function PostsPage() {
  const getPosts = unstable_cache(
    async () => await prisma.post.findMany(),
    ["posts"],
    {
      revalidate: 20,
      tags: ["posts"],
    }
  );

  const posts = await getPosts();
  // const posts = await prisma.post.findMany();
  if (posts === null) return null;

  return (
    <>
      <div>
        <form
          action={createPost}
          className="flex flex-col gap-1 max-w-[400px] mb-2"
        >
          <input type="text" name="title" placeholder="Title..." />
          <input type="text" name="content" placeholder="Content..." />
          <SubmitButton
            variants={{ primary: "Create post", pending: "Creating..." }}
          />
        </form>
        <div className="grid grid-cols-2 gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-md p-2 bg-blue-500 text-white flex items-center justify-between"
            >
              <div className="flex flex-col gap-1">
                <Link href={`/posts/${post.id}`} className="underline">
                  {post.title}
                </Link>
                <p>{post.content}</p>
              </div>
              <form action={deletePost.bind(null, post.id)}>
                <SubmitButton
                  variants={{ primary: "Delete", pending: "Deleting..." }}
                />
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
