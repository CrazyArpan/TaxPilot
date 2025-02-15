# TaxPilot

TaxPilot is a simple and intuitive Indian Tax Calculator web application that helps users calculate their tax liability under both old and new tax regimes for the financial year 2024-25.

## Features

- Calculate tax for both old and new tax regimes
- Compare tax liability between regimes
- Visualize tax breakdown with charts
- Receive tax savings suggestions
- Print tax summary

## Setup Instructions

1. Clone the repository:
   \`\`\`
   git clone [https://github.com/yourusername/taxpilot.git](https://github.com/CrazyArpan/TaxPilot)
   cd taxpilot
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add the following environment variables:
   \`\`\`
   MONGODB_URI=your_mongodb_connection_string
   \`\`\`

4. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Documentation

### Calculate Tax

Calculates tax based on the provided income details and tax regime.

- **URL**: `/api/calculate-tax`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

| Field           | Type   | Description                                     |
|-----------------|--------|-------------------------------------------------|
| annualIncome    | number | Total annual income                             |
| investments     | number | Investments under 80C, 80D, etc. (for old regime)|
| otherDeductions | number | Other deductions like HRA, LTA (for old regime) |
| otherIncome     | number | Income from other sources                       |
| regime          | string | Tax regime ("old" or "new")                     |

#### Response

| Field         | Type   | Description                               |
|---------------|--------|-------------------------------------------|
| totalIncome   | number | Total income including other sources      |
| taxableIncome | number | Income after applicable deductions        |
| taxPayable    | number | Calculated tax amount                     |
| taxSavings    | array  | List of tax saving suggestions            |
| slabwiseTax   | array  | Breakdown of tax calculation by slabs     |

#### Example Request

\`\`\`json
{
  "annualIncome": 1000000,
  "investments": 150000,
  "otherDeductions": 50000,
  "otherIncome": 50000,
  "regime": "old"
}
\`\`\`

#### Example Response

\`\`\`json
{
  "totalIncome": 1050000,
  "taxableIncome": 850000,
  "taxPayable": 82500,
  "taxSavings": [
    "Consider NPS contribution up to ₹50,000 under Section 80CCD(1B)"
  ],
  "slabwiseTax": [
    { "slab": { "start": 0, "end": 250000, "rate": 0 }, "tax": 0 },
    { "slab": { "start": 250000, "end": 500000, "rate": 0.05 }, "tax": 12500 },
    { "slab": { "start": 500000, "end": 750000, "rate": 0.1 }, "tax": 25000 },
    { "slab": { "start": 750000, "end": 1000000, "rate": 0.15 }, "tax": 45000 }
  ]
}
\`\`\`

## Usage

1. Open the application in your web browser.
2. Select the tax regime (Old or New).
3. Enter your annual income, investments, and other deductions (if applicable).
4. Click on "Calculate Tax" to see the results.
5. View the tax breakdown, comparison between regimes, and tax saving suggestions.
6. Use the "Print Tax Summary" button to print or save the results.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

