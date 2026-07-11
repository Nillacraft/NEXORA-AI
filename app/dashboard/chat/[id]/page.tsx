"use client";

import { use, useEffect, useState } from "react";
import MessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "@/components/chat/ChatInput";

type Message = {
  id: number;
  role: string;
  content: string;
};

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);


  // Ambil riwayat chat
  useEffect(() => {
    async function loadChat() {
      try {
        const res = await fetch(`/api/chat/${id}`);

        const data = await res.json();

        setMessages(data.messages || []);

      } catch (error) {
        console.error(
          "Gagal mengambil chat:",
          error
        );
      }
    }

    loadChat();

  }, [id]);



  // Kirim pesan ke AI
  async function sendMessage(content: string) {

    if (!content.trim()) return;


    // tampilkan pesan user langsung
    const tempUserMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };


    setMessages((prev) => [
      ...prev,
      tempUserMessage,
    ]);


    setLoading(true);


    try {

      const res = await fetch("/api/message", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          chatId: Number(id),
          content,
        }),
      });



      const data = await res.json();



      if (!res.ok) {

        alert(
          data.message ||
          "Gagal mengirim pesan"
        );

        return;
      }



      // tambahkan jawaban AI
      setMessages((prev) => [
        ...prev,
        data,
      ]);


    } catch (error) {

      console.error(
        "Error mengirim pesan:",
        error
      );


      alert(
        "Terjadi kesalahan"
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <div className="p-6 flex flex-col min-h-screen">


      <h1 className="text-2xl font-bold mb-5">
        NEXORA AI Chat
      </h1>



      <div className="flex-1 space-y-3 overflow-y-auto mb-5">


        {messages
          .filter(Boolean)
          .map((message) => (

            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
            />

          ))}



        {loading && (

          <div className="text-gray-500">
            NEXORA sedang mengetik...
          </div>

        )}


      </div>



      <ChatInput
        onSend={sendMessage}
      />


    </div>

  );
}