type Props = {
  role: string;
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >

      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
          AI
        </div>
      )}


      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>


      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
          U
        </div>
      )}

    </div>
  );
}