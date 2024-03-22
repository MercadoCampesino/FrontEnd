//create a user slice with login and logout
import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            return [...state, action.payload];
        },
        removeFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
        
      
    },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;