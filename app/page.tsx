"use client"

import { useState } from "react"
import { Frame, Moon, Sun, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import { type TaxRegime, formatCurrency } from "@/utils/tax-utils"
import { TaxBreakdownChart } from "@/components/TaxBreakdownChart"
import { TaxSlabBreakdown } from "@/components/TaxSlabBreakdown"

export default function TaxCalculator() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [regime, setRegime] = useState<TaxRegime>("new")
  const [formData, setFormData] = useState({
    annualIncome: "",
    investments: "",
    otherDeductions: "",
    otherIncome: "",
  })
  const [result, setResult] = useState<any>(null)
  const [comparisonResult, setComparisonResult] = useState<any>(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/calculate-tax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, regime }),
      })
      const data = await response.json()
      setResult(data)

      // Calculate comparison with the other regime
      const otherRegime = regime === "old" ? "new" : "old"
      const comparisonResponse = await fetch("/api/calculate-tax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, regime: otherRegime }),
      })
      const comparisonData = await comparisonResponse.json()
      setComparisonResult(comparisonData)
    } catch (error) {
      console.error("Error calculating tax:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTaxBracketProgress = () => {
    if (!result) return 0
    const maxBracket = regime === "old" ? 1500000 : 1500000
    return Math.min((result.taxableIncome / maxBracket) * 100, 100)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center gap-2 text-lg font-semibold sm:text-base">
          <Frame className="w-6 h-6" />
          <span>TaxPilot</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-10 space-y-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Indian Tax Calculator (FY 2024-25)</CardTitle>
            <CardDescription>Calculate your tax liability under both old and new tax regimes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={regime} onValueChange={(value: TaxRegime) => setRegime(value)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="new">New Regime</TabsTrigger>
                <TabsTrigger value="old">Old Regime</TabsTrigger>
              </TabsList>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                  <Input
                    id="annualIncome"
                    name="annualIncome"
                    type="number"
                    placeholder="Enter your annual income"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {regime === "old" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="investments">Investments (80C, 80D, etc.) (₹)</Label>
                      <Input
                        id="investments"
                        name="investments"
                        type="number"
                        placeholder="Enter your investments"
                        value={formData.investments}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherDeductions">Other Deductions (HRA, LTA, etc.) (₹)</Label>
                      <Input
                        id="otherDeductions"
                        name="otherDeductions"
                        type="number"
                        placeholder="Enter other deductions"
                        value={formData.otherDeductions}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="otherIncome">Income from Other Sources (₹)</Label>
                  <Input
                    id="otherIncome"
                    name="otherIncome"
                    type="number"
                    placeholder="Enter income from other sources"
                    value={formData.otherIncome}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Calculating..." : "Calculate Tax"}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          {result && (
            <CardFooter>
              <div className="w-full space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tax Bracket Position</h3>
                  <Progress value={getTaxBracketProgress()} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your income falls in the {(getTaxBracketProgress() * 0.3).toFixed(1)}% tax bracket
                  </p>
                </div>

                <TaxBreakdownChart data={result} />

                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tax Calculation Summary</h3>
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span>Total Income:</span>
                        <span className="font-semibold">{formatCurrency(result.totalIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Income:</span>
                        <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Payable:</span>
                        <span className="font-semibold">{formatCurrency(result.taxPayable)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Tax:</span>
                        <span className="font-semibold">{formatCurrency(result.taxPayable / 12)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tax Slab Breakdown</h3>
                    <TaxSlabBreakdown slabwiseTax={result.slabwiseTax} />
                  </div>

                  {comparisonResult && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Regime Comparison</h3>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span>{regime.toUpperCase()} Regime Tax:</span>
                          <span className="font-semibold">{formatCurrency(result.taxPayable)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{regime === "old" ? "NEW" : "OLD"} Regime Tax:</span>
                          <span className="font-semibold">{formatCurrency(comparisonResult.taxPayable)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Difference:</span>
                          <span
                            className={
                              result.taxPayable < comparisonResult.taxPayable ? "text-green-500" : "text-red-500"
                            }
                          >
                            {formatCurrency(Math.abs(result.taxPayable - comparisonResult.taxPayable))}
                            {result.taxPayable < comparisonResult.taxPayable ? " (Savings)" : " (Extra)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {result.taxSavings && result.taxSavings.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Tax Savings Suggestions:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.taxSavings.map((suggestion, index) => (
                          <li key={index} className="text-sm">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Button onClick={handlePrint} className="w-full">
                  <Printer className="mr-2 h-4 w-4" /> Print Tax Summary
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  )
}

