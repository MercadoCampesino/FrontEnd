//create a simple store with  redux toolkit with login and logout
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
export const store =  configureStore({
    reducer: {
        user: userReducer,
    },
});
export default store.dispatch