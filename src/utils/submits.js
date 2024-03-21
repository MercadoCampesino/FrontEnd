import { SERVER_URL } from "../Constants";
import Swal from 'sweetalert2'

export const onSellerRegisterSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const form = new FormData(e.currentTarget);
        const contrasenia = form.get('password');
        const confirmContrasenia = form.get('confirmPassword');
        if (contrasenia !== confirmContrasenia) {
            Swal.fire({
                icon: "info",
                title: "Las contraseñas no coinciden",
            })
            return;
        }
        const data = {
            IDTienda: Math.floor(Math.random() * 1000000000) + 1,
            nombre: form.get('storeName'),
            telefono: form.get('tel'),
            correo: form.get('email'),
            contrasenia: form.get('password'),
            direccion: form.get('address'),
            imagen: "defaultImage",
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
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario Registrado correctamente",
                showConfirmButton: false,
                timer: 3000
              });
            console.log(responseData)
            setTimeout(() => {
                window.location.href = "/login";
            }, 4000);
            
        } else {
            throw new Error('Network response was not ok.');
        }   

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "El usuario no se pudo registrar",
            text: "Intentalo de nuevo!",
        });

    }
}

export const onClientRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
        const form = new FormData(e.currentTarget);
        const data = {
            IDCliente: Math.floor(Math.random() * 1000000000) + 1,
            nombre: form.get('name'),
            apellido: form.get('lastName'),
            fechaNacimiento: form.get('born'),
            telefono: form.get('phone'),
            correo: form.get('email'),
            contrasenia: form.get('password'),
            direccion: "defaultDirection",
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
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario Registrado correctamente",
                showConfirmButton: false,
                timer: 3000
              });
              console.log(responseData)
              setTimeout(() => {
                window.location.href = "/login";
              }, 4000);
            
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "El usuario no se pudo registrar correctamente",
            text: "Intentalo de nuevo!"
        });
    }
}
