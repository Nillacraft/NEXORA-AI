import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const chat = await prisma.chat.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        messages: true,
      },
    });

    if (!chat) {
      return NextResponse.json(
        {
          message: "Chat tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(chat);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan",
      },
      {
        status: 500,
      }
    );
  }
}