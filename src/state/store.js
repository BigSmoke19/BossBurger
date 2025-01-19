import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./items/itemsSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
    reducer:{
        items: itemsReducer,
        cart: cartReducer
    }
});


export const RootState = store.getState();
export const AppDispatch = store.dispatch;