import { uploadFile } from "../Components/FireBase/config";
import { SERVER_URL } from "../Constants";

export const onSellerRegisterSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const form = new FormData(e.currentTarget);
        // const form = new FormData(e.target);
        const contrasenia = form.get('password');
        
        const image= form.get("profile-img")
        const urlImage = await uploadFile(image)

        const confirmContrasenia = form.get('confirmPassword');

        if (contrasenia !== confirmContrasenia) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        const data = {
            IDTienda: Math.floor(Math.random() * 1000000000) + 1,
            nombre: form.get('storeName'),
            telefono: form.get('tel'),
            correo: form.get('email'),
            contrasenia: form.get('password'),
            direccion: form.get('address'),
            imagen: urlImage,
            FK_IDAdministrador: 1094880982
        };

        console.log(data)

        const url = `${SERVER_URL}Tienda/GuardarTienda`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);
        if (response.ok) {
            const responseData = await response.json();
            alert("Mercado registrado");
            console.log(responseData)
            window.location.href = "/login";
        } else {
            throw new Error('Network response was not ok.');
        }   

    } catch (error) {
        console.error('Error:', error);
    }
}

export const onClientRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
        const form = new FormData(e.currentTarget);
        // const form = new FormData(e.target);
        // const state = useSelector(state => state);
        const image= form.get("profile-img")
        const urlImage = await uploadFile(image)

        const data = {
            IDCliente: Math.floor(Math.random() * 1000000000) + 1,
            nombre: form.get('name'),
            apellido: form.get('lastName'),
            fechaNacimiento: form.get('born'),
            telefono: form.get('phone'),
            correo: form.get('email'),
            contrasenia: form.get('password'),
            direccion: "defaultDirection",
            imagen: urlImage,
            FK_IDAdministrador: 1094880982
        };

        const url = `${SERVER_URL}Cliente/GuardarCliente`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);
        if (response.ok) {
            const responseData = await response.json();
            alert("Usuario registrado");
            console.log(responseData)
            window.location.href = "/login";
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



// import { uploadFile } from './Firebase/config'; // Importa la función para cargar archivos a Firebase
// import { SERVER_URL } from "../Constants";
// // y
// export const onSellerRegisterSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//         const form = new FormData(e.currentTarget);
//         const contrasenia = form.get('password');
//         const confirmContrasenia = form.get('confirmPassword');
//         if (contrasenia !== confirmContrasenia) {
//             alert("Las contraseñas no coinciden");
//             return;
//         }
        
//         // const file = form.get('file'); // Obtén el archivo del formulario
//         // const imageUrl = await uploadFile(file); // Carga la imagen a Firebase y obtén la URL de la imagen
        
//         const data = {
//             IDTienda: Math.floor(Math.random() * 1000000000) + 1,
//             nombre: form.get('storeName'),
//             telefono: form.get('tel'),
//             correo: form.get('email'),
//             contrasenia: form.get('password'),
//             direccion: form.get('address'),
//             // imagen: imageUrl, // Agrega la URL de la imagen cargada
//             FK_IDAdministrador: 1094880982
//         };

//         console.log(data)

//         const url = `${SERVER_URL}Tienda/GuardarTienda`;
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         };

//         const response = await fetch(url, options);
//         if (response.ok) {
//             const responseData = await response.json();
//             alert("Mercado registrado");
//             console.log(responseData)
//             window.location.href = "/login";
//         } else {
//             throw new Error('Network response was not ok.');
//         }   

//     } catch (error) {
//         console.error('Error:', error);
//     }
// }



// export const onClientRegisterSubmit = async (e) => {
//     e.preventDefault();
//     // Variable para almacenar la URL de la imagen
//     try {
//         const form = new FormData(e.currentTarget);

//         const data = {
//             IDCliente: Math.floor(Math.random() * 1000000000) + 1,
//             // imagen: imageUrl,
//             nombre: form.get('name'),
//             apellido: form.get('lastName'),
//             fechaNacimiento: form.get('born'),
//             telefono: form.get('phone'),
//             correo: form.get('email'),
//             contrasenia: form.get('password'),
//             direccion: "defaultDirection",
//             // imagen: imageUrl, // Agrega la URL de la imagen cargada
//             FK_IDAdministrador: 1094880982
//         };

//         const url = `${SERVER_URL}Cliente/GuardarCliente`;
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         };

//         const response = await fetch(url, options);
//         if (response.ok) {
//             const responseData = await response.json();
//             alert("Usuario registrado");
//             console.log(responseData)
//             window.location.href = "/login";
//         } else {
//             throw new Error('Network response was not ok.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
   
// }

