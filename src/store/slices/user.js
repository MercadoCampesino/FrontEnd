//create a user slice with login and logout
import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;