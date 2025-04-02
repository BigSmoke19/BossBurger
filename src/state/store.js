import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./items/itemsSlice";
import cartReducer from "./cart/cartSlice";
import categoriesReducer from './categories/categoriesSlice'

export const store = configureStore({
    reducer:{
        items: itemsReducer,
        cart: cartReducer,
        categories: categoriesReducer
    }
});


export const RootState = store.getState();
export const AppDispatch = store.dispatch;