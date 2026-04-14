import { Request, Response } from "express";
import Expense from "../models/expense.model";

export const getExpenses = async (_req: Request, res: Response) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });
  res.json(expenses);
};

export const createExpense = async (req: Request, res: Response) => {
  const expense = await Expense.create(req.body);
  res.status(201).json(expense);
};

export const updateExpense = async (req: Request, res: Response) => {
  console.log(req.body,req.params.id);
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!expense) return res.status(404).json({ message: "Not found" });
  res.json(expense);
};

export const deleteExpense = async (req: Request, res: Response) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
