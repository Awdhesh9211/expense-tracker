import type { ICategory } from "./types/expense"


const CATEGORIES=[
    {label:'Food', value:'food'},
    {label:'Transport', value:'transport'},
    {label:'shopping', value:'shopping'},
    {label:'Education', value:'education'},
    {label:'Entertainment', value:'entertainment'},
    {label:'Bills', value:'bills'},
    {label:'Health', value:'health'},
    {label:'Other', value:'other'},
]

const CATEGORIES_ICON:Record<ICategory, string> = {
    food:'🍔',
    transport:'🚗',
    shopping:'🛍️',
    education:'📚',
    entertainment:'🎮',
    bills:'🧾',
    health:'💊',
    other:'📦',
}

const CATEGORIES_COLOR:Record<ICategory, string> = {
    food:'bg-red-500',
    transport:'bg-blue-500',
    shopping:'bg-green-500',
    education:'bg-yellow-500',
    entertainment:'bg-purple-500',
    bills:'bg-indigo-500',
    health:'bg-pink-500',
    other:'bg-gray-500',
}

export {CATEGORIES, CATEGORIES_ICON, CATEGORIES_COLOR}