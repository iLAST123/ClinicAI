"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CplPoint } from "@/lib/mock/metrics"
import { formatBRL } from "@/lib/format"

export function CplChart({ data }: { data: CplPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Custo por lead — últimas 7 semanas</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={(v: number) => `R$ ${v.toFixed(0)}`}
            />
            <Tooltip
              formatter={(value) => [formatBRL(Number(value)), "CPL"]}
              cursor={{ stroke: "#4C5AFF", strokeWidth: 1, opacity: 0.2 }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
            />
            <Line
              type="monotone"
              dataKey="cpl"
              stroke="#4C5AFF"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#4C5AFF" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
