
import { CATEGORIES_ICON } from '@/constant'
import type { IExpense } from '@/types/expense'
import { format } from 'date-fns';
import { SquarePen, Trash2 } from 'lucide-react'


const ExpenseList = ({expenses,setEditedExpense,setShowAddExpenseModal,handleDeleteExpense}:{
    expenses:IExpense[];
    setEditedExpense:(expense:IExpense)=>void;
    setShowAddExpenseModal:(show:boolean)=>void;
    handleDeleteExpense:(id:string)=>void;
}
) => {
  return (
    <div className='flex flex-col gap-4'>
        {expenses.map((expense) => (
            <div className='flex w-full justify-between items-center rounded-xl border hover:shadow-md p-4 group'>
                <div
                key={expense._id}
                className='flex gap-3 items-center'
                >
                    <p
                    className='text-sm font-medium text-store-gray' 
                    >{expense.category?CATEGORIES_ICON[expense.category]:null}</p>
                    <div>
                        <h3 className='font-medium truncate'>{expense.title}</h3>
                        <p className='text-sm text-store-gray capitalize'>{expense.category} . {format(expense.date,"yyyy-MM-dd")}</p>
                    </div>
                </div>
                <div className='flex gap-8'>
                    <p className='font-semibold text-lg tabular-nums'>${expense.amount?.toFixed(2)}</p>
                    <div className='flex gap-2 opacity-0 group-hover:opacity-100'>
                        <button className='cursor-pointer'
                        onClick={()=>{
                            setShowAddExpenseModal(true);
                            setEditedExpense(expense)}
                        }
                        >
                            <SquarePen className='text-blue-500' size={18} />
                        </button>
                        <button className='cursor-pointer'
                        onClick={()=>handleDeleteExpense(expense._id!)}
                        >
                            <Trash2 className='text-red-500' size={18} />
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ExpenseList