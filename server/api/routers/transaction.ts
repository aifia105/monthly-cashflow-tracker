import { connectDB } from "@/server/db/mongoose";
import { procedure, router } from "../trpc";
import { Transaction } from "@/server/model/Transaction";
import { z } from "zod";

export const transactionRouter = router({
  getAll: procedure.query(async () => {
    await connectDB();
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return transactions;
  }),
  createMonthYear: procedure
    .input(
      z.object({
        monthYear: z.string(),
        totalIncome: z.number(),
        totalExpense: z.number(),
        note: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await connectDB();
      const transaction = await Transaction.create(input);
      return transaction;
    }),
  addTransaction: procedure
    .input(
      z.object({
        monthYear: z.string(),
        title: z.string(),
        amount: z.number(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await connectDB();
      const incField = input.type === "income" ? "totalIncome" : "totalExpense";
      const transaction = await Transaction.updateOne(
        { monthYear: input.monthYear },
        {
          $push: {
            transactions: {
              title: input.title,
              amount: input.amount,
              type: input.type,
            },
          },
          $inc: {
            [incField]: input.amount,
          },
        },
      );
      return transaction;
    }),
  deleteTransaction: procedure
    .input(
      z.object({
        monthYear: z.string(),
        id: z.string(),
        amount: z.number(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await connectDB();
      const decField = input.type === "income" ? "totalIncome" : "totalExpense";
      const transaction = await Transaction.updateOne(
        { monthYear: input.monthYear },
        {
          $pull: {
            transactions: { _id: input.id },
          },
          $inc: {
            [decField]: -input.amount,
          },
        },
      );
      return transaction;
    }),
});
