import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";


export async function POST(request: Request) {
  const { workId, userId } = await request.json();

  const existing = await prisma.like.findUnique({
    where: { workId_userId: { workId, userId } },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    await prisma.work.update({ where: { id: workId }, data: { likesCount: { decrement: 1 } } });
    return NextResponse.json({ liked: false });
  } else {
    await prisma.like.create({ data: { workId, userId } });
    await prisma.work.update({ where: { id: workId }, data: { likesCount: { increment: 1 } } });
    return NextResponse.json({ liked: true });
  }
}
