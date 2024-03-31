import { SERVER_URL } from "../Constants";
import { store } from "../store";
import { setLikes } from "../store/slices/likes";

export default async function updateLikes(userId) {
    console.log({ userId });
    try {
        const response = await fetch(`${SERVER_URL}Favoritos/ListarFavoritosPorPersona?FK_IDCliente1=${userId}`);
        const data = await response.json();
        store.dispatch(setLikes(data.response));
    } catch (error) {
        console.error('Hubo un error al obtener los favoritos:', await error);
    }

}