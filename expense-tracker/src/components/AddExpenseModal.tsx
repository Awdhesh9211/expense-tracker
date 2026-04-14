import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type { IExpense } from '@/types/expense';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CATEGORIES } from '@/constant';

interface AddExpenseModalProps {
    showAddExpenseModal: boolean;
    setShowAddExpenseModal: (show: boolean) => void;
    handleAddExpense: (data: IExpense) => void;
    editedExpense: IExpense | null;
}


const AddExpenseModal = ({showAddExpenseModal,setShowAddExpenseModal,handleAddExpense,editedExpense}:AddExpenseModalProps) => {
   
   
    const {
        register, 
        control,
        handleSubmit,
        watch,
        formState:{errors}
    }=useForm<IExpense>(
     {defaultValues:editedExpense ? editedExpense:{
        title:"",
        amount:null,
        date:null,
        category:""
     }}
    );
    const handleClose = () => setShowAddExpenseModal(false);
    const wathedDate = watch("date");
    const onSubmit:SubmitHandler<IExpense> = (data) => handleAddExpense(data);
    const dialogTitle = editedExpense ? "Edit Expense" : "Add Expense";
    const submitButtonText = editedExpense ? "Update Expense" : "Add Expense";
    
  return (
    <Dialog open={showAddExpenseModal} onOpenChange={handleClose} >
        <DialogContent className='max-w-md'>
            <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>

                    {/* TITLE */}
                    <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium leading-none'>Title</label>
                        <Input 
                        placeholder='coffee, groceries, etc'
                        {...register("title",{required:"Title is required"})}
                        />
                        <div className='text-sm text-red-500'>
                            {errors.title?.message}
                        </div>
                    </div>

                    {/*AMOUNT  */}
                    <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium leading-none'>Amount</label>
                        <Input 
                        placeholder='0.00'
                        type='number'
                        step='0.01'
                        {...register("amount",{required:"Amount is required", min:{value:0.01,message:"Amount must be greater than 0"},valueAsNumber:true})}
                        />
                        <div className='text-sm text-red-500'>
                            {errors.amount?.message}    
                        </div>   
                    </div>
                    {/* DATE */}
                    <div className='flex flex-col gap-2 w-full'>
                    <label className='text-sm font-medium leading-none'>Date</label> 
                    <Controller
                    control={control}
                    name='date'
                    rules={{required:"Date is required"}}
                    render={({field})=>(
                        <Popover>
                             <PopoverTrigger asChild className='cursor-pointer'>
                                <Button 
                                data-empty={!wathedDate}
                                variant='outline'
                                className='data-[empty=true]:text-muted-foreground justify-start text-left font-normal'
                                >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {wathedDate ? format(wathedDate,"yyyy-MM-dd"): <span>Choose Date</span>}
                                </Button>
                             </PopoverTrigger>
                             <PopoverContent>
                                <Calendar 
                                mode={"single"}
                                selected={field.value ?? undefined}
                                onSelect={(date)=>field.onChange(date)}
                                />
                             </PopoverContent>
                        </Popover>
                    )}
                    />
                    <div>
                        {errors.date && (
                            <div className='text-sm text-red-500'>
                                {errors.date.message}
                            </div>
                        )}
                    </div>
                    </div>
                    </div>

                    {/* CATEGORY */}
                     {/* TITLE */}
                    <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium leading-none'>Category</label>
                       <Controller 
                       control={control}
                       name='category'
                       rules={{required:"Category is required"}}
                       render={({field})=>(
                        <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                            <SelectTrigger className='cursor-pointer w-full'>
                                <SelectValue placeholder='Select a category' />
                            </SelectTrigger>
                            <SelectContent position='popper'>
                                <SelectGroup>
                                    {CATEGORIES.map((category)=>(
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                       )}
                       />
                       <div className='text-sm text-red-500'>
                            {errors.category?.message}
                        </div>
                    </div>

                    {/* SUBMIT BUTTON  */}

                    <DialogFooter>
                    <Button type='submit' className='bg-eastern-blue shadow-lg font-medium text-sm px-8 rounded-md gap-2 py-3 w-full cursor-pointer mt-6' onClick={()=>console.log("submit")}>{submitButtonText}</Button>
                    </DialogFooter>

                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default AddExpenseModal