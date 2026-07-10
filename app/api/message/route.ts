import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = await prisma.message.create({
      data: {
        role: "user",
        content: body.content,
        chatId: Number(body.chatId),
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}