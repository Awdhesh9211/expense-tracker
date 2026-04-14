import type { IExpense } from '@/types/expense'
import { DollarSign } from 'lucide-react';

const StatsCard = ({expenses}:{
    expenses:IExpense[]
}) => {

    const totalSpends= expenses.reduce((total, expense) => total + (expense.amount || 0), 0);
    const getThisMonthTotal= () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return expenses.filter(expense => {
            const expenseDate = new Date(expense.date!);
            return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
        }).reduce((total, expense) => total + (expense.amount || 0), 0);
    };
    const totalTransactions = expenses.length;
    const averageSpend = totalTransactions > 0 ? totalSpends / totalTransactions : 0;

    const stats=[
        {
            label:"Total Spends",
            icon:DollarSign,
            value:`$${totalSpends.toFixed(2)}`,
            sub:"ALL Time",
            accent:true
        },
        {
            label:"This Month",
            icon:DollarSign,
            value:`$${getThisMonthTotal().toFixed(2)}`,
            sub:"This Month",
            accent:false
        },
        {
            label:"Total Transactions",
            icon:DollarSign,
            value:totalTransactions.toString(),
            sub:"All Time",
            accent:false
        },
        {
            label:"Average Spend",
            icon:DollarSign,
            value:`$${averageSpend.toFixed(2)}`,
            sub:"Per Transaction",
            accent:false
        },
        
    ]

  return (
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
  {stats.map(({ label, icon: Icon, value, sub, accent }, i) => (
    <div
      key={i}
      className={`flex flex-col gap-2 p-4 rounded-xl border-l-[3px] border border-l-${
        accent ? "eastern-blue" : "mischka"
      } bg-white hover:border-l-eastern-blue transition-colors`}
    >
      {/* Label row */}
      <div className={`flex items-center gap-1.5 ${accent ? "text-eastern-blue" : "text-store-gray"}`}>
        <Icon size={15} />
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>

      {/* Value */}
      <p className="text-[22px] font-medium leading-tight">{value}</p>
    </div>
  ))}
</div>
  )
}
export default StatsCard