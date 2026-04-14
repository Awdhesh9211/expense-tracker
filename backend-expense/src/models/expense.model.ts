import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  date: string;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    title:    { type: String, required: true },
    amount:   { type: Number, required: true },
    category: { type: String, required: true },
    date:     { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
