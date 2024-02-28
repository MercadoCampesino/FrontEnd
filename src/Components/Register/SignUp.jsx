import React, { useState } from 'react';
import './signUp.css';
import { useNavigate } from 'react-router-dom'
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

export const SignUp = () => {

    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState("cliente");

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }

    const handleSubmitCliente = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
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

        const url = "http://MercadoCampesinoBack.somee.com";
        fetch(`${url}/Cliente/GuardarCliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                alert("Usuario registrado");
                window.location.href = "/Login";
            //cambiar ventana

            })
            .catch(error => console.error('Error:', error));
    };

    const handleSubmitVendedor = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            IDCliente: Math.floor(Math.random() * 1000000000) + 1,
            nombre: form.get('storeName'),
            imagen: form.get(''),
            telefono: form.get('ownerId'),
            direccion: "defaultDirection",
            contrasenia: form.get('password'),
            FK_IDAdministrador: 1094880982
        }; 

        const url = "https://localhost:7235";
        fetch(`${url}/Tienda/GuardarTienda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response);
                // if (response.ok) {
                //     return response.json();
                // }
                // throw new Error('Network response was not ok.');
            })
            .then(data => {
                alert("Usuario registrado");
                // window.location.href = "/Login";
            //cambiar ventana

            })
            .catch(error => console.error('Error:', error));
    };

    

    return (
        <main className='full-reg-content'>
            <section className="form-reg">
                <header className='reg-header'>
                    <img src="/images/logo_mercadoCampesino.png" alt="" width={40} height={70} />
                    <section className='header-text'>
                        <h1>MERCADO CAMPESINO</h1>
                        <p>LA MEJOR CALIDAD</p>
                    </section>
                </header>
                <div className='regresar'>
                <button className='regresar_reg' onClick={() => navigate(-1)}>Regresar</button>
               </div>
                <form className='register-form' onSubmit={selectedRole === "cliente" ? handleSubmitCliente : handleSubmitVendedor}>
                    <div className='checkboxs'>
                        <p>Elige como quieres registrarte</p>
                        <input
                            type="radio"
                            id="cliente"
                            value="cliente"
                            checked={selectedRole === "cliente"}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="cliente">Cliente</label>
                        <input
                            type="radio"
                            id="vendedor"
                            value="vendedor"
                            checked={selectedRole === "vendedor"}
                            onChange={handleRoleChange}
                        />
                        <label htmlFor="vendedor">Vendedor</label>
                    </div>
                    {selectedRole === "cliente" && (
                        <div className="form-sections">
                            <section className='form-section'>
                                <Input label="Nombre" type='text' name='name' placeholder='Ingresa tu nombre' required />
                                <Input label="Apellidos" type='text' name='lastName' placeholder='Ingresa tus apellidos' required />
                                <Input label="Fecha de nacimiento" type='date' name='born' placeholder='Ingresa tu fecha de nacimiento' required />
                                <Input label="Contraseña" type='password' name='password' placeholder='Ingresa tu contraseña' required />
                            </section>
                            <section className='form-section'>
                                <Input label="Telefono" type='number' name='phone' placeholder='Ingresa tu numero de telefono' required />
                                <Input label="Correo" type='email' name='email' placeholder='Ingresa tu correo' required />
                                <section className="selections">
                                    <Select label="Departamento" name="department" options={[{ value: "quindio", label: "Quindio" }]} />
                                    <Select label="Municipio" name="municipality" options={[{ value: "Armenia", label: "Armenia" }]} />
                                </section>
                                <Input label="Confirmar contraseña" type='password' name='confirmPassword' placeholder='Confirma tu contraseña' required />
                            </section>
                            <div className='buttonreg'>
                                <p>¿Ya esta registrado? <a href="">Iniciar sesión</a></p>
                                <input type="submit" value="Registrarse" className='submit' />
                            </div>
                        </div>
                    )}
                    {selectedRole === "vendedor" && (
                        <div className="form-sections">
                            <section className='form-section'>
                                <Input label="Nombre de la Tienda" type='text' name='storeName' placeholder='Ingrese el nombre de tu tienda' required />
                                <Input label="Telefono" type='number' name='tel' placeholder='Ingrese su nombre' required />
                                <Input label="Dirección" type='text' name='defaultDirection' placeholder='Ingrese su dirección' required />
                                <Input label="Contraseña" type='password' name='password' placeholder='Ingrese su contraseña' required />
                                <Input label="Confirmar contraseña" type='password' name='password' placeholder='Confirme su contraseña' required />
                                <Input label="Imagen del mercado" type='file' name='image' required />
                            </section>
                            <div className='buttonreg'>
                                <input type="submit" value="Registrarse" className='submit' />
                            </div>
                        </div>
                    )}
                </form>
            </section>
            <section className="image-register">
                {/* <img src="/images/img_login.jpg" alt="" /> */}
            </section>
        </main>
    );
};

export default SignUp;
