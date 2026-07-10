"use client";

import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export default function ChatInput({
  onSend,
}: Props) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  return (
    <div className="border-t p-4 flex gap-2">

      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Tulis pesan..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-5 rounded"
      >
        Kirim
      </button>

    </div>
  );
}