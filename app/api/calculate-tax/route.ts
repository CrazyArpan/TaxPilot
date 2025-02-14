import { NextResponse } from "next/server"
import { calculateTotalTax, type TaxRegime } from "@/utils/tax-utils"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { annualIncome, investments, otherDeductions, otherIncome, regime } = body

    // Convert string inputs to numbers
    const totalIncome = Number(annualIncome) + Number(otherIncome)
    const totalDeductions = regime === "old" ? Number(investments) + Number(otherDeductions) : 0

    // Calculate taxable income
    const taxableIncome = Math.max(totalIncome - totalDeductions, 0)

    // Calculate tax based on selected regime
    const { totalTax: taxPayable, slabwiseTax } = calculateTotalTax(taxableIncome, regime as TaxRegime)

    // Generate tax savings suggestions
    const taxSavings = []
    if (regime === "old") {
      if (investments < 150000) {
        taxSavings.push(`Invest up to ₹${150000 - investments} more in 80C to maximize your tax deductions`)
      }
      if (otherDeductions < 50000) {
        taxSavings.push(`Consider NPS contribution up to ₹50,000 under Section 80CCD(1B)`)
      }
    } else {
      // Calculate tax in old regime for comparison
      const { totalTax: oldRegimeTax } = calculateTotalTax(totalIncome, "old")
      if (oldRegimeTax < taxPayable) {
        taxSavings.push(
          `You could save ₹${taxPayable - oldRegimeTax} by switching to the old regime and utilizing deductions`,
        )
      }
    }

    return NextResponse.json({
      totalIncome,
      taxableIncome,
      taxPayable,
      taxSavings,
      slabwiseTax,
    })
  } catch (error) {
    console.error("Error calculating tax:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

