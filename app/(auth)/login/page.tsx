import type { Metadata } from "next"
import Link from "next/link"

import { LoginForm } from "./login-form"
import { BrandLogo } from "@/components/layout/BrandLogo"

export const metadata: Metadata = {
  title: "Entrar — ClinicAI",
  description: "Acesse o painel da sua clínica.",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand/5 via-background to-background px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <BrandLogo href="/login" />
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre com seu email para acessar o painel.
          </p>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link href="/pricing" className="font-medium text-brand hover:underline">
            Ver planos
          </Link>
        </p>
      </div>
    </main>
  )
}
