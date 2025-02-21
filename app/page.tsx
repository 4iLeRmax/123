import React from "react";
import prisma from "./lib/prisma";
import { createPost } from "./lib/actions";

export default async function HomePage() {
  const posts = await prisma.post.findMany();

  return (
    <>
      <div>HomePage</div>
      <div>
        <form
          action={createPost}
          className="flex flex-col gap-2 max-w-[400px] mb-2 text-black"
        >
          <input type="text" name="title" placeholder="Title..." />
          <input type="text" name="content" placeholder="Content..." />
          <button
            type="submit"
            className="bg-blue-500 rounded-md text-white py-2"
          >
            Create post
          </button>
        </form>
        <div className="grid grid-cols-2 gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-md p-2 bg-blue-500 text-white flex flex-col gap-1"
            >
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
