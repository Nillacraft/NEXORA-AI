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

  useEffect(() => {
    async function loadChat() {
      const res = await fetch(`/api/chat/${id}`);
      const data = await res.json();

      setMessages(data.messages || []);
    }

    loadChat();
  }, [id]);

  async function sendMessage(content: string) {
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

    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }

    const message = await res.json();

    setMessages((prev) => [...prev, message]);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">
        NEXORA AI Chat
      </h1>

      <div className="space-y-3">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}