import { Plus, Wallet } from "lucide-react"

interface HeaderProps {
    setShowAddExpenseModal: (show: boolean) => void;
}

const Header = ({setShowAddExpenseModal}:HeaderProps) => {
  return (
    <div className="border-b border-athens-gray">
        <header className="flex justify-between py-4 px-6 max-w-7xl m-auto">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-eastern-blue flex justify-center items-center rounded-xl py-4">
                    <Wallet className="h-4 w-4 text-white" />
                
                </div>
                <h1 className="text-lg font-bold tracking-tight">Expense Tracker</h1>
            </div>
            <button
            onClick={() => setShowAddExpenseModal(true)}
            className="bg-eastern-blue text-white flex items-center shadow-lg font-medium text-sm px-8 rounded-md gap-2 py-3 cursor-pointer">
                        <Plus className="h-4 w-4" />
                        Add Expense
            </button>
        </header>
    </div>
  )
}

export default Header