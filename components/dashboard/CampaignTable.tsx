import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatBRL, formatNumber } from "@/lib/format"
import type { Campaign } from "@/types"

export function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Campanhas no período</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campanha</TableHead>
              <TableHead className="text-right">Investimento</TableHead>
              <TableHead className="text-right">Leads</TableHead>
              <TableHead className="text-right">CPL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.campaign_name}</TableCell>
                <TableCell className="text-right">{formatBRL(c.spend)}</TableCell>
                <TableCell className="text-right">{formatNumber(c.leads)}</TableCell>
                <TableCell className="text-right">
                  {c.cost_per_lead != null ? formatBRL(c.cost_per_lead) : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
