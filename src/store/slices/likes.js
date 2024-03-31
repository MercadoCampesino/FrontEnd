import { createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../Constants";
export const likesSlice = createSlice({
    name: "likes",
    initialState: {
        likes: [],
    },
    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload;
        },
        updateLikes: async (state, action) => {
            try {
                const response2 = await fetch(`${SERVER_URL}Favoritos/ListarFavoritosPorPersona?FK_IDCliente1=${action.payload}`);
                const data2 = await response2.json();
                return data2.response
            } catch (error) {
                console.error('Hubo un error en la solicitud:', error);
                return state
            }

        }
    },
});
export const { setLikes, updateLikes } = likesSlice.actions;
export default likesSlice.reducer;