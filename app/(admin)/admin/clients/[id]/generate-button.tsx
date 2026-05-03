"use client"

import { Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function GenerateDecisionButton({ clinicId }: { clinicId: string }) {
  return (
    <Button
      className="w-full"
      onClick={() =>
        toast.success(`Decisão disparada para ${clinicId} (mock — Fase 3)`)
      }
    >
      <Sparkles className="mr-2 h-4 w-4" />
      Gerar nova decisão
    </Button>
  )
}
