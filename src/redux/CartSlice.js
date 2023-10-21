import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'Cart',
    initialState: [],
    reducers: {
        addToCart: (state,action) => {
            const productToAdd = action.payload;
            state.push(productToAdd);
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;