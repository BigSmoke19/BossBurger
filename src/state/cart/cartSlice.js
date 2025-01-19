import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: (localStorage.getItem("order"))?JSON.parse(localStorage.getItem("order")):[],
        count : localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")).length : 0
    },
    reducers: {
        addItem: (state, action) =>{
            state.cartItems.push(action.payload);
            state.count++;
        },
        removeItem: (state, action) =>{
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            state.count--;
        }
    }
});

export const {addItem,removeItem} = cartSlice.actions;

export default cartSlice.reducer;