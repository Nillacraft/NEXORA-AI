import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Email tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    const isMatch = await bcrypt.compare(
        body.password,
        user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Password salah",
        },
        {
          status: 401,
        }
      );
    }

    const token = await createToken(user.id);

const response = NextResponse.json({
  message: "Login berhasil",
});

response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});

return response;

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