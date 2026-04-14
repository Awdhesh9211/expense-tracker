import Header from "@/components/Header"
import AddExpenseModal from "@/components/AddExpenseModal"
import { useEffect, useState } from "react"
import type { IExpense } from "./types/expense"
import ExpenseList from "./components/ExpenseList";
import CategoryFilter from "./components/CategoryFilter";
import StatsCard from "./components/StatsCard";
import SpendingChart from "./components/SpendingChart";
import TopCategories from "./components/TopCategories";
import { api } from "./api/expense";

const App = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [editedExpense, setEditedExpense] = useState<IExpense | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Fetch on mount
  useEffect(() => {
    api.getAll()
      .then(setExpenses)
      .finally(() => setLoading(false));
  }, []);

  const handleAddExpense = async (data: IExpense) => {
    if (editedExpense) {
      console.log("Updating expense with data:", data);
      const updated = await api.update(editedExpense._id, data);
      setExpenses(prev => prev.map(e => e._id === editedExpense._id ? updated : e));
      setEditedExpense(null);
    } else {
      const created = await api.create(data);
      setExpenses(prev => [created, ...prev]);
    }
    setShowAddExpenseModal(false);
  };

  const handleDeleteExpense = async (id: string) => {
    await api.delete(id);
    setExpenses(prev => prev.filter(e => e._id !== id));
  };

  const filteredExpenses = selectedCategory === "all" ? expenses : expenses.filter(expense => expense.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
       <Header 
       setShowAddExpenseModal={setShowAddExpenseModal}
       />

       <main className="max-w-7xl m-auto px-6 py-8">
         {/* Stats Card */}
         <StatsCard expenses={expenses} />
         <div className="grid grid-cols-3 mt-8 m-auto gap-8">
            <div className="flex flex-col  gap-6">
                <SpendingChart expenses={expenses} />
                <TopCategories expenses={expenses} />
            </div>

            <div className="p-6 col-span-2 bg-white rounded-2xl border border-mischka/50">
              {expenses.length > 0 ?(
                <>
                  <h1 className="text-sm font-semibold uppercase tracking-wider text-store-gray mb-5">Recent Transaction</h1> 
                  {/* Category Filter */}
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                  {/* Expense List */}
                  <ExpenseList 
                  expenses={filteredExpenses} 
                  setEditedExpense={setEditedExpense}
                  setShowAddExpenseModal={setShowAddExpenseModal}
                  handleDeleteExpense={handleDeleteExpense}
                  />
                </>
              ):(
                <div className="flex flex-col items-center gap-4 py-10">
                  <span className="text-sm text-muted-foreground">No expenses added yet.</span>
                </div>

               )}
            </div>
         </div> 
       </main>
       {
        showAddExpenseModal ? 
        <AddExpenseModal 
            showAddExpenseModal={showAddExpenseModal} 
            setShowAddExpenseModal={setShowAddExpenseModal} 
            handleAddExpense={handleAddExpense}
            editedExpense={editedExpense}
        /> : null
       }
      
    </div>
 
  )
}

export default App