import mongoose from "mongoose"

const TaxRecordSchema = new mongoose.Schema({
  userId: String,
  annualIncome: Number,
  investments: Number,
  otherDeductions: Number,
  otherIncome: Number,
  taxableIncome: Number,
  taxPayable: Number,
  regime: {
    type: String,
    enum: ["old", "new"],
    default: "new",
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.TaxRecord || mongoose.model("TaxRecord", TaxRecordSchema)

