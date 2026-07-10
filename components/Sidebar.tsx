import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-5">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard">🏠 Dashboard</Link>
        </li>

        <li>
          <Link href="/dashboard/chat">💬 Chat AI</Link>
        </li>

        <li>
          <Link href="/dashboard/profile">👤 Profile</Link>
        </li>
      </ul>
    </aside>
  );
}