import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { Header } from "../(protected)/_blocks/layout/header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/overview");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {children}
    </div>
  );
}