import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/utils/tax-utils"

export function TaxSlabBreakdown({ slabwiseTax }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Income Slab</TableHead>
          <TableHead>Tax Rate</TableHead>
          <TableHead>Tax Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {slabwiseTax.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              {formatCurrency(item.slab.start)} - {item.slab.end ? formatCurrency(item.slab.end) : "Above"}
            </TableCell>
            <TableCell>{(item.slab.rate * 100).toFixed(1)}%</TableCell>
            <TableCell>{formatCurrency(item.tax)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

