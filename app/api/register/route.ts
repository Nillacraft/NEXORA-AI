import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    
    const body = await request.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      message: "User berhasil dibuat",
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal membuat user",
      },
      {
        status: 500,
      }
    );
  }
}