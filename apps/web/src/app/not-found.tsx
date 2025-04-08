"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Página não encontrada</h2>
        <p className="mt-2 text-gray-600">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
        <Link href="/overview">
          <Button className="mt-6" variant="default">
            Voltar para o Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
