import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema(
  {
    monthYear: String,
    totalIncome: Number,
    totalExpense: Number,
    note: String,
    transactions: [
      {
        title: String,
        amount: Number,
        type: {
          type: String,
          enum: ["income", "expense"],
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);
