import { CATEGORIES } from '@/constant'
import clsx from 'clsx';

const CategoryFilter = ({selectedCategory,setSelectedCategory}:{
    selectedCategory:string;
    setSelectedCategory:(category:string)=>void;
}) => {

    const options=[{label:"All",value:"all"},...CATEGORIES];

  return (
    <div className='flex flex-wrap gap-2 mb-5'>
        {
            options.map(option => (
                <button 
                key={option.value} 
                onClick={()=>setSelectedCategory(option.value)}
                className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium ",
                    option.value === selectedCategory ? "bg-eastern-blue text-white" : "bg-gray-200 text-gray-700"
                )}
                >
                    {option.label}
                </button>
            ))
        }
    </div>
  )
}

export default CategoryFilter