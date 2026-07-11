import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ai } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const chatId = Number(body.chatId);
    const content = body.content;


    // Simpan pesan user
    await prisma.message.create({
      data: {
        role: "user",
        content,
        chatId,
      },
    });


    // Ambil riwayat percakapan
    const history = await prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });


    const conversation = history
      .map((message) => {
        return `${message.role}: ${message.content}`;
      })
      .join("\n");


    let aiReply = "";


    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `
Kamu adalah NEXORA AI, asisten AI buatan Indonesia.

Aturan:
- Selalu jawab menggunakan Bahasa Indonesia.
- Gunakan bahasa yang ramah dan profesional.
- Ingat konteks percakapan sebelumnya.
- Jangan mengaku sebagai manusia.

Riwayat percakapan:
${conversation}

Jawab pesan terakhir pengguna.
`,
      });


      aiReply =
        response.text ||
        "Maaf, saya belum mendapatkan jawaban.";

    } catch (error) {

      console.error(
        "Gemini error:",
        error
      );


      return NextResponse.json(
        {
          message:
            "NEXORA AI sedang sibuk. Silakan coba lagi beberapa saat.",
        },
        {
          status: 503,
        }
      );
    }



    // Simpan jawaban AI
    const aiMessage = await prisma.message.create({
      data: {
        role: "assistant",
        content: aiReply,
        chatId,
      },
    });


    return NextResponse.json(aiMessage);


  } catch (error) {

    console.error(
      "API message error:",
      error
    );


    return NextResponse.json(
      {
        message: "Gagal mengirim pesan",
      },
      {
        status: 500,
      }
    );
  }
}