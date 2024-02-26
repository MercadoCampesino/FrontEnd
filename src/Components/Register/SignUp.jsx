import React from 'react';
import './signUp.css';

export const SignUp = () => {
    return (
        <>
            <div className='cont_generalRegister'>
                <div className='title_merCampesinoRegister'>
                    <img src="/images/logo_mercadoCampesino.png" alt="" width={50} height={85} />
                    <div className='title_headerRegister'>
                        <div className='titleRegister'>
                            <h1>MERCADO CAMPESINO</h1>
                            <p>LA MEJOR CALIDAD</p>
                        </div>
                    </div>
                </div>

                <form action="">
                    <div>
                        <label className="digitar"> Nombre
                            <input name="name" type="text" placeholder='Ingresa tu nombre' required />
                        </label>

                        <div className="digitar">
                            <label htmlFor="lastName">Apellidos</label><br />
                            <input name="lastName" type="text" placeholder='Ingresa tus apellidos' required />
                        </div>

                        <div className="digitar">
                            <label htmlFor="born">Fecha de nacimiento</label><br />
                            <input name="born" type="date" placeholder='Ingresa tu fecha de nacimiento' required />
                        </div>

                        <div className="digitar">
                            <label htmlFor="password">Contraseña</label><br />
                            <input name="password" type="password" placeholder='Ingresa tu contraseña' required />
                        </div>
                    </div>
                    <div>
                        <div className="digitar">
                            <label htmlFor="phone">Telefono</label><br />
                            <input name="phone" type="number" placeholder='Ingresa tu numero de telefono' required />
                        </div>

                        <div className="digitar">
                            <label htmlFor="email">E-mail</label><br />
                            <input name="email" type="email" placeholder='Ingresa tu correo electronico' required />
                        </div>

                        <div>
                            <label htmlFor="">Ubicación</label>
                            <div className="digitar">
                                <select name="gender" id="gender" required>
                                    <option value="" disabled selected>Departamento</option>
                                    <option value="quindio">Quindio</option>
                                </select>
                            </div>

                            <div className="digitar">
                                <select name="gender" id="gender" required>
                                    <option value="" disabled selected>Municipio</option>
                                    <option value="quindio">Armenia</option>
                                </select>
                            </div>
                        </div>

                        <div className="digitar">
                            <label htmlFor="password">Confirmar contraseña</label><br />
                            <input name="password" type="password" placeholder='Confirma tu contraseña' required />
                        </div>

                    </div>

                    <a className="registras_button" href="/interfaz-login">
                        <input type="submit" value="Registrarse"></input>
                    </a>
                </form>

                <div className='backGround_img'></div>

            </div>

        </>
    )
}
