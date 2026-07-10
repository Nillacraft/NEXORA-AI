"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Chat = {
  id: number;
  title: string;
};

export default function ChatSidebar() {
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);

  async function loadChats() {
    const res = await fetch("/api/chat/list");

    const data = await res.json();

    setChats(data);
  }

  useEffect(() => {
    loadChats();
  }, []);

  async function createChat() {
    const res = await fetch("/api/chat", {
      method: "POST",
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/dashboard/chat/${data.id}`);
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="w-72 border-r p-4 bg-gray-100">

      <button
        onClick={createChat}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        + Chat Baru
      </button>


      <div className="mt-5 space-y-2">

        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/dashboard/chat/${chat.id}`}
            className="block bg-white rounded p-2 shadow hover:bg-gray-200"
          >
            {chat.title}
          </Link>
        ))}

      </div>

    </div>
  );
}