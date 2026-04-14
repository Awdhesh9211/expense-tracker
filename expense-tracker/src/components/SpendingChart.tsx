import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IExpense } from "@/types/expense";

const COLORS = ["#0ea5e9","#f97316","#ec4899","#a855f7","#22c55e","#eab308","#94a3b8"];

interface Props { expenses: IExpense[] }

const SpendingChart = ({ expenses }: Props) => {
  const data = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + Number(e.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!expenses.length) return null;

  return (
    <Card className="border-mischka/50 shadow-none rounded-2xl">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-store-gray">
          Spending Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="relative">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, ""]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "0.5px solid #e2e2e2",
                  boxShadow: "none",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] text-store-gray">Total</span>
            <span className="text-base font-semibold text-gray-900">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 mt-3">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-xs capitalize text-store-gray">{d.name}</span>
              </div>
              <span className="text-xs font-medium text-gray-800">
                {Math.round((d.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;