import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";


export async function POST(request: Request) {
  const { workId, userId, content, parentId } = await request.json();

  const comment = await prisma.comment.create({
    data: { workId, userId, content, parentId },
    include: { profile: true, replies: { include: { profile: true } } },
  });

  await prisma.work.update({
    where: { id: workId },
    data: { commentsCount: { increment: 1 } },
  });

  return NextResponse.json(comment);
}
