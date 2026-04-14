type ICategory=
    'food' |
    'transport' |
    'shopping' |
    'education' |
    'entertainment' |
    'bills' |
    'health' |
    'other';

type IExpense={
    title:string,
    category:ICategory | string,
    amount:number | null,
    date:Date | null
    _id?:string
}

export  {IExpense, ICategory}