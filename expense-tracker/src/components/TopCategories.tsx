import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IExpense } from "@/types/expense";

const categoryConfig: Record<string, { emoji: string; bar: string }> = {
  food:          { emoji: "🍜", bar: "bg-orange-400" },
  transport:     { emoji: "🚌", bar: "bg-blue-400"   },
  shopping:      { emoji: "🛍️", bar: "bg-pink-400"   },
  entertainment: { emoji: "🎬", bar: "bg-purple-400" },
  health:        { emoji: "💊", bar: "bg-red-400"    },
  utilities:     { emoji: "⚡", bar: "bg-yellow-400" },
  other:         { emoji: "📦", bar: "bg-gray-400"   },
};

interface Props { expenses: IExpense[] }

const TopCategories = ({ expenses }: Props) => {
  const totals = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + Number(e.amount);
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const max = totals[0]?.[1] ?? 1;

  if (!expenses.length) return null;

  return (
    <Card className="border-mischka/50 shadow-none rounded-2xl">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-store-gray">
          Top Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 flex flex-col gap-3">
        {totals.map(([cat, amt]) => {
          const cfg = categoryConfig[cat] ?? categoryConfig["other"];
          return (
            <div key={cat} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{cfg.emoji}</span>
                  <span className="text-xs capitalize text-gray-700 font-medium">{cat}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">
                  ₹{amt.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cfg.bar} transition-all duration-500`}
                  style={{ width: `${(amt / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TopCategories;