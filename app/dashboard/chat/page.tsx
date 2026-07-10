"use client";

import ChatSidebar from "@/components/chat/ChatSidebar";

export default function ChatPage() {
  return (
    <div className="flex h-[80vh] border rounded-lg overflow-hidden">

      <ChatSidebar />

      <div className="flex-1 flex flex-col">

        {/* Area Chat */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-blue-100 p-3 rounded w-fit">
            Halo! Saya NEXORA AI 👋
          </div>
        </div>

        {/* Input */}
        <div className="border-t p-4 flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Tulis pesan..."
          />

          <button className="bg-blue-600 text-white px-5 rounded">
            Kirim
          </button>
        </div>

      </div>

    </div>
  );
}