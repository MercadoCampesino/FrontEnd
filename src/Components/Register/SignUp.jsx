import React from 'react';
import './signUp.css';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';


export const SignUp = () => {
    const handleSubmit = (e) => {
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
        } 
        
        const url = "https://localhost:7235";
        fetch(`${url}/Cliente/GuardarCliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => { alert("Usuario registrado"); window.location.href = "/Login" })
            .catch(error => console.log('Error:', error));

    }
    return (
        <main className='full-reg-content'>
            <section className="form-reg">

                <header className='reg-header'>
                    <img src="/images/logo_mercadoCampesino.png" alt="" width={50} height={85} />
                    <section className='header-text'>
                        <h1>MERCADO CAMPESINO</h1>
                        <p>LA MEJOR CALIDAD</p>
                    </section>
                </header>

                <form className='register-form' onSubmit={handleSubmit}>
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

                            <Input label="Confirmar contraseña" type='password' name='password' placeholder='Confirma tu contraseña' required />

                        </section>
                    </div>
                    <input type="submit" value="Registrarse" className='submit' />
                </form>
            </section>
            <section className="image-register">
                <img src="/images/img_login.jpg" alt="" />
            </section>
        </main>
    )
}
