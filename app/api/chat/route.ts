import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    const chat = await prisma.chat.create({
      data: {
        title: "Chat Baru",
        userId: Number(payload.userId),
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal membuat chat" },
      { status: 500 }
    );
  }
}