"use client"

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Period = "week" | "month" | "90days"

const labels: Record<Period, string> = {
  week: "Esta semana",
  month: "Este mês",
  "90days": "Últimos 90 dias",
}

export function PeriodFilter() {
  const [period, setPeriod] = useState<Period>("week")
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Período</span>
      <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder={labels[period]} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">{labels.week}</SelectItem>
          <SelectItem value="month">{labels.month}</SelectItem>
          <SelectItem value="90days">{labels["90days"]}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
