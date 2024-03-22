//create a simple store with  redux toolkit with login and logout
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
export const store =  configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    },
});
export default store.dispatch