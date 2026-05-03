"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { SubscriptionPlan } from "@/types"

export function PricingCta({
  plan,
  highlighted,
}: {
  plan: SubscriptionPlan
  highlighted?: boolean
}) {
  return (
    <Button
      className="w-full"
      variant={highlighted ? "default" : "outline"}
      onClick={() => toast.success(`Checkout do plano ${plan} (mock)`)}
    >
      Assinar {plan}
    </Button>
  )
}
