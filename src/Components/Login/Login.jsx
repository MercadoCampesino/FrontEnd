import React, { useState } from 'react';
import './Login.css'
import { Input } from '../Input/Input';

export default function Login() {

    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "https://localhost:7235";
        const formData = new FormData(event.target);
        const data = {
            correo: formData.get('correo'),
            contrasenia: formData.get('contrasenia')
        }
        console.log(data)
        fetch(`${url}/Autenticar/Cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => { alert("Usuario encontrado"); window.location.href = "/" })
            .catch(error => alert("Usuario no encontrado"));
    };

    return (
        <>
            <section className='login'>
                <div className='div_img_login'>
                    {/* <img className='imagen_login' src="/images/img_login.jpg" alt="" /> */}
                </div>

                <div className='title_logo_merCampesino'>
                    <a className='regresar_login' href="/">Regresar</a>
                    <div className='title_logo_merCampesino'>

                        <div className='title_merCampesino_login'>

                            <img src="/images/logo_mercadoCampesino.png" alt="" width={80} height={80} />
                            <div className='title_header'>

                                <div className='title_login'>
                                    <h1>MERCADO CAMPESINO</h1>
                                    <h3>LA MEJOR CALIDAD</h3>
                                </div>
                            </div>
                        </div>

                        <div className='form_login'>
                            <div className='center_login'>

                                <form className='form_login_' onSubmit={handleSubmit}>
                                    <div className='login_form'>
                                        <Input label="Correo" type='email' name='correo' placeholder='Ingresa tu correo' required />
                                        <Input label="Contraseña" type='password' name='contrasenia' placeholder='Ingresa tu contraseña' required />


                                        <div className='start_olvidarContra'>
                                            <a className="link_olvidarContra" href="">¿Olvide mi contraseña? </a>
                                            <p className="link_registro">¿No te has registrado? <a className="a_registro" href="/Registrarse"> Registrarse</a></p>
                                        </div>
                                        <div className="loguear">
                                            <button className='loguear_button'>Ingresar</button>
                                        </div>
                                    </div>

                                </form>
                                {/* 
                                <form className='form_login_' action="/login" method="post">
                                    <div class="login_form">

                                        <div className="login_center">

                                            <div class="digitar">
                                                <label>Correo</label><br />
                                                <input type="text" name="correo" placeholder='Ingresa tu correo' required ></input>
                                            </div>

                                            <div class="digitar">
                                                <label>Contraseña</label> <br />
                                                <input 
                                                type="password" 
                                                name="contrasenia" 
                                                placeholder='Ingresa tu contraseña' 
                                                required ></input>

                                            </div>

                                            <div className='start_olvidarContra'>
                                                <a className="link_olvidarContra" href="">¿Olvide mi contraseña? </a>
                                                <p className="link_registro">¿No te has registrado? <a className="a_registro" href="/Registrarse"> Registrarse</a></p>
                                            </div>
                                        </div>


                                    </div>
                                </form> */}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

