import { z } from "zod";

export const transactionSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  amount: z
    .number()
    .positive("Amount must be greater than 0"),

  type: z
    .enum(["income", "expense"]),

  category: z
    .string()
    .min(2, "Category must be at least 2 characters"),

  date: z
    .string()
    .optional(),
});