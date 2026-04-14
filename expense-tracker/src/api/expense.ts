import type { IExpense } from "@/types/expense";

const BASE = "http://localhost:5000/api/expenses";

const headers = { "Content-Type": "application/json" };

export const api = {
  getAll: (): Promise<IExpense[]> =>
    fetch(BASE).then(r => r.json()),

  create: (data: IExpense): Promise<IExpense> =>
    fetch(BASE, { method: "POST", headers, body: JSON.stringify(data) }).then(r => r.json()),

  update: (id: string, data: Omit<IExpense, "id">): Promise<IExpense> =>
    fetch(`${BASE}/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }).then(r => r.json()),

  delete: (id: string): Promise<void> =>
    fetch(`${BASE}/${id}`, { method: "DELETE" }).then(r => r.json()),
};