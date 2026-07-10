import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";


export default async function DashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const payload = await verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: Number(payload.userId),
      },
    });

    if (!user) {
      redirect("/login");
    }

   return (
  <>
    <h1 className="text-3xl font-bold">
      Dashboard
    </h1>

    <p className="mt-4">
      Selamat datang, {user.name} 👋
    </p>

    <p>{user.email}</p>

    <div className="mt-6">
      <LogoutButton />
    </div>
  </>
);

  } catch {
    redirect("/login");
  }
}