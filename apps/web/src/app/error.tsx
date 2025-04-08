"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">Ops!</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Algo não saiu como esperado</h2>
        <p className="mt-2 text-gray-600">
          Não se preocupe, essas coisas acontecem! Vamos tentar novamente?
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Se o problema persistir, nossa equipe está sempre pronta para ajudar.
        </p>
        <Link href="/overview">
          <Button className="mt-6" variant="default">
            Voltar para o início
          </Button>
        </Link>
      </div>
    </div>
  );
}
