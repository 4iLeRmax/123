import prisma from "@/app/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await prisma.post.updateMany({
    where: {
      title: {
        contains: "post",
      },
    },
    data: {
      content: "Test Post",
    },
  });

  revalidateTag("posts");

  return NextResponse.json("Success");
};
