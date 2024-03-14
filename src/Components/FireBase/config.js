import { initializeApp } from "firebase/app";
import { getStorage, ref,  uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyB_LUf5Cbq1S_QENHNERF-y61mbvhwo8mE",
  authDomain: "mercado-campesino-a0d58.firebaseapp.com",
  projectId: "mercado-campesino-a0d58",
  storageBucket: "mercado-campesino-a0d58.appspot.com",
  messagingSenderId: "305108183583",
  appId: "1:305108183583:web:a8eda4814db633e7dbc32a",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadFile(file) {
  try {
    const uniqueFileName = uuidv4(); // Genera un nombre de archivo único
    const storageRef = ref(storage, uniqueFileName);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error al cargar el archivo:", error);
    throw error; // Re-lanza el error para que pueda ser manejado externamente si es necesario
  }
}