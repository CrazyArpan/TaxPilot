# 🚀 TaxPilot - Your Smart Indian Tax Calculator

TaxPilot is a sleek, intuitive, and powerful web application designed to help users seamlessly calculate their tax liability for the financial year **2024-25** under both the **Old** and **New** tax regimes. 

Say goodbye to manual tax calculations—TaxPilot simplifies the process and even provides smart tax-saving suggestions! 🎯

---

## 🌟 Key Features

✅ **Dual Tax Regime Support** – Calculate taxes for both **Old & New** regimes effortlessly.

✅ **Side-by-Side Tax Comparison** – Instantly compare which regime benefits you the most.

✅ **Interactive Tax Breakdown** – Visualize your tax calculations with **beautiful charts**.

✅ **Smart Tax-Saving Tips** – Get personalized recommendations to reduce your tax liability.

✅ **Print & Share** – Generate a professional **tax summary** in one click.

---

## ⚡ Quick Start Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/CrazyArpan/TaxPilot.git
cd taxpilot
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add:
```ini
MONGODB_URI=your_mongodb_connection_string
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```

### 5️⃣ Open TaxPilot in Your Browser 🌍
[http://localhost:3000](http://localhost:3000)

---

## 📌 API Endpoints

### 🎯 Calculate Tax
**Endpoint:** `/api/calculate-tax`

**Method:** `POST`

**Content-Type:** `application/json`

#### 🔹 Request Body

| Field            | Type    | Description                                    |
|------------------|---------|------------------------------------------------|
| `annualIncome`   | number  | Your total annual income                      |
| `investments`    | number  | Investments under 80C, 80D, etc. (Old Regime) |
| `otherDeductions`| number  | Additional deductions like HRA, LTA (Old Regime) |
| `otherIncome`    | number  | Income from other sources                     |
| `regime`         | string  | Tax regime (`old` or `new`)                    |

#### 🔹 Example Request
```json
{
  "annualIncome": 1000000,
  "investments": 150000,
  "otherDeductions": 50000,
  "otherIncome": 50000,
  "regime": "old"
}
```

#### 🔹 Example Response
```json
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
```

---

## 🎯 How to Use TaxPilot

1️⃣ **Enter Your Details** – Fill in your annual income, deductions, and other applicable fields.

2️⃣ **Choose Your Regime** – Select between **Old** and **New** tax regimes.

3️⃣ **Calculate Tax** – Hit the **Calculate** button and let TaxPilot do the magic! ✨

4️⃣ **Visualize & Compare** – View an interactive tax breakdown and see which regime is better.

5️⃣ **Save & Share** – Print or download your tax summary for future reference.

---

## 🔧 Built With

🚀 **Next.js** – Fast, modern, and scalable web framework.

🎨 **React + TypeScript** – Type-safe and dynamic user experience.

💅 **Tailwind CSS** – Clean, responsive, and sleek UI.

📊 **Recharts** – Interactive tax visualization graphs.

🖥️ **shadcn/ui** – Beautiful, ready-to-use UI components.

---

## 🤝 Contribute & Collaborate

🚀 We welcome contributions! If you'd like to improve TaxPilot, feel free to **submit a Pull Request**.

Have suggestions or feedback? Open an **issue** on GitHub! 💡

