export type TaxRegime = "old" | "new"

export interface TaxSlabInfo {
  start: number
  end: number | null
  rate: number
  maxTax?: number
}

export const TAX_SLABS = {
  old: [
    { start: 0, end: 250000, rate: 0 },
    { start: 250000, end: 500000, rate: 0.05 },
    { start: 500000, end: 750000, rate: 0.1 },
    { start: 750000, end: 1000000, rate: 0.15 },
    { start: 1000000, end: 1250000, rate: 0.2 },
    { start: 1250000, end: 1500000, rate: 0.25 },
    { start: 1500000, end: null, rate: 0.3 },
  ],
  new: [
    { start: 0, end: 300000, rate: 0 },
    { start: 300000, end: 600000, rate: 0.05 },
    { start: 600000, end: 900000, rate: 0.1 },
    { start: 900000, end: 1200000, rate: 0.15 },
    { start: 1200000, end: 1500000, rate: 0.2 },
    { start: 1500000, end: null, rate: 0.3 },
  ],
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export const calculateTaxForSlab = (income: number, slab: TaxSlabInfo): number => {
  if (income <= slab.start) return 0
  const taxableInThisSlab = Math.min(income - slab.start, (slab.end ?? Number.POSITIVE_INFINITY) - slab.start)
  return taxableInThisSlab * slab.rate
}

export const calculateTotalTax = (
  taxableIncome: number,
  regime: TaxRegime,
): {
  totalTax: number
  slabwiseTax: { slab: TaxSlabInfo; tax: number }[]
} => {
  const slabs = TAX_SLABS[regime]
  const slabwiseTax = slabs.map((slab) => ({
    slab,
    tax: calculateTaxForSlab(taxableIncome, slab),
  }))
  const totalTax = slabwiseTax.reduce((sum, { tax }) => sum + tax, 0)
  return { totalTax, slabwiseTax }
}

