import React, { useState, useRef, createContext } from 'react';
import './signUp.css';
import { useNavigate } from 'react-router-dom';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { onSellerRegisterSubmit, onClientRegisterSubmit } from "../../utils/submits";
import emailjs from 'emailjs-com';
import { uploadFile } from "../FireBase/config";
import { useDispatch } from 'react-redux';
import {setUserData} from '../../utils/registerSlice'


export const SignUp = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refForm = useRef();
    const [file, setFile] = useState(null);
    const [isClient, setIsClient] = useState(true);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const serviceId = "service_z7bkolg";
        const templateId = "template_3s3cvmq";
        const apikey = "OTjnJYtvrg9io6r9b";
    
        try {
          const result = await emailjs.sendForm(serviceId, templateId, refForm.current, apikey);
          console.log(result.text);
        } catch (error) {
          console.error(error);
        }

        const selectedRole = isClient ? "cliente" : "vendedor";

        if (selectedRole === "cliente") {
            onClientRegisterSubmit(event);
        } else {
            onSellerRegisterSubmit(event);
        }
    };

    // const sendConfirmationEmail = (email) => {
    //     const serviceId = "service_z7bkolg";
    //     const templateId = "template_3s3cvmq";
    //     const apikey = "YBzopxJUvovQi42vM-MnT";

    //     const templateParams = {
    //         to_email: email,
    //     };

    //     emailjs.send(serviceId, templateId, templateParams, apikey)
    //         .then((response) => {
    //             console.log('Email sent successfully:', response);
    //         })
    //         .catch((error) => {
    //             console.error('Email sending failed:', error);
    //         });
    // };

    const handleSudmiturl = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadFile(file);
            console.log(result);
            dispatch(setUserData({ imageUrl }));

        } catch (error) {
            console.error(error);
            setError('Fallo al subir, inténtelo más tarde');
        }
    };

    return (
            <main className='full-reg-content'>
                <div className='regresar'>
                    <button className='regresar_reg' onClick={() => navigate(-1)}> Regresar</button>
                </div>
    
                <section className="form-reg">

                <div className='reg-header'>
                <a className='logo_reg' href="/">
                    <img src="/images/logo_mercadoCampesino.png" alt="" width={35} height={65} />
                </a>
                <div className='title_header'>
                    <div className='title'>
                        <a className='a_title' href="/">
                            <h1>MERCADO CAMPESINO</h1>
                            <p>LA MEJOR CALIDAD</p>
                        </a>
                    </div>
                </div>
            </div>
    
                    <div className='checkboxs'>
                        <p>Elige como quieres registrarte</p>
                        <label>
                            <input
                                type="radio"
                                id="cliente"
                                name='role'
                                value="cliente"
                                onChange={() => { setIsClient(true) }}
                                defaultChecked
                            />
                            Cliente
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="vendedor"
                                name='role'
                                value="vendedor"
                                onChange={() => { setIsClient(false) }}
                            />
                            Vendedor
                        </label>
                    </div>
    
                    <section className='register-form'>
    
                        {isClient ? (
                            <form ref={refForm} onSubmit={(e) => {
                                onClientRegisterSubmit(e);
                                handleSubmit(e);
                                handleSudmiturl(e);
                            }} >
                                <label className='subir_img'>
                                    Subir imagen
                                    <img src="/images/add-photo.png" alt="" />
                                    <input type="file" name="profile-img" id=""/>
                                </label>

                                <section className='form-sections'>
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
                                </section>
    
                                <div className='buttonreg'>
                                    <p>¿Ya esta registrado? <a href="/login">Iniciar sesión</a></p>
                                    <input href="/" type="submit" value="Registrarse" className='submit' />
                             </div>
                            </form>
                        ) : (
                            <form className="seller-form" onSubmit={onSellerRegisterSubmit}>
                                <section className='form-sections'>
                                    <section className="form-section">
                                        <Input label="Correo" type='email' name='email' placeholder='Ingrese su correo' />
                                        <Input label="Nombre de la Tienda" type='text' name='storeName' placeholder='Ingrese el nombre de tu tienda' />
                                        <Input label="Telefono" type='tel' name='tel' placeholder='Ingrese su nombre' />
                                        <Input label="Dirección" type='text' name='address' placeholder='Ingrese su dirección' />
                                    </section>
                                    <section className="form-section">
                                        <Input label="Contraseña" type='password' name='password' placeholder='Ingrese su contraseña' />
                                        <Input label="Confirmar contraseña" type='password' name='confirmPassword' placeholder='Confirme su contraseña' />
                                <label className='subir_img'>
                                    Subir imagen
                                    <img src="/images/add-photo.png" alt="" />
                                    <input type="file" name="profile-img" id=""/>
                                </label>                                    </section>

                                </section>
                                <button href="/profile" type="submit" className='submit'> Registrarse</button>
                            </form>
    
                        )}
                    </section>
                </section>
                <section className="image-register" />
            </main>
    );
    
};

export default SignUp;




















// import React, { useState, useRef } from 'react';
// import './signUp.css';
// import { useNavigate } from 'react-router-dom'
// import { Input } from '../Input/Input';
// import { Select } from '../Select/Select';
// import { onSellerRegisterSubmit, onClientRegisterSubmit } from "../../utils/submits"
// import emailjs from 'emailjs-com';
// import { uploadFile } from "../FireBase/config";

// // import { FileState } from '../../utils/submits';

// export const SignUp = () => {

//     const navigate = useNavigate();
//     const refForm = useRef();
//     const [file, setFile] = useState(null);
//     const [isClient, setIsClient] = useState(true);
//     // const [imageUrl, setImageUrl] = useState(null);
//     let imageUrl;

//         const handleSubmit = async (event) => {
//         event.preventDefault();
//         const serviceId = "service_x94tdtc";
//         const templateId = "template_eutc2wi";
//         const apikey = "wCWtMpED59hJ9hMZi";

//         try {
//             const result = await emailjs.sendForm(serviceId, templateId, refForm.current, apikey);
//             console.log(result.text);
//         } catch (error) {
//             console.error(error);
//         }

//         const selectedRole = isClient ? "cliente" : "vendedor";

//         // if (selectedRole === "cliente") {
//         //     onClientRegisterSubmit(event, imageUrl);
//         // } else {
//         //     onSellerRegisterSubmit(event, imageUrl);
//         // }

//         if (selectedRole === "cliente") {
//             onClientRegisterSubmit(event);
//         } else {
//             onSellerRegisterSubmit(event);
//         }
          
          
//     };

//     const sendConfirmationEmail = (email) => {
//         const serviceId = "service_x94tdtc";
//         const templateId = "template_eutc2wi";
//         const apikey = "wCWtMpED59hJ9hMZi";

//         const templateParams = {
//             to_email: email,
//             // Add any additional parameters needed for the email template
//         };

//         emailjs.send(serviceId, templateId, templateParams, apikey)
//             .then((response) => {
//                 console.log('Email sent successfully:', response);
//             })
//             .catch((error) => {
//                 console.error('Email sending failed:', error);
//             });
//     };

//     const handleSudmiturl = async (e) => {
//         e.preventDefault();
//         try {
//             const result = await uploadFile(file);
//             console.log(result);
//             imageUrl = result;
//         } catch (error) {
//           console.error(error);
//           setError('Fallo al subir, inténtelo más tarde');
//         }
//       }


    
//     return (
//         <main className='full-reg-content'>
//             <div className='regresar'>
//                 <button className='regresar_reg' onClick={() => navigate(-1)}> Regresar</button>
//             </div>

//             <section className="form-reg">
//                 <header className='reg-header'>
//                     <img src="/images/logo_mercadoCampesino.png" alt="" width={40} height={70} />

//                     <section className='header-text'>
//                         <h1>MERCADO CAMPESINO</h1>
//                         <p>LA MEJOR CALIDAD</p>
//                     </section>
//                 </header>

//                 <div className='checkboxs'>
//                     <p>Elige como quieres registrarte</p>
//                     <label>
//                         <input
//                             type="radio"
//                             id="cliente"
//                             name='role'
//                             value="cliente"
//                             onChange={() => { setIsClient(true) }}
//                             defaultChecked
//                         />
//                         Cliente
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             id="vendedor"
//                             name='role'
//                             value="vendedor"
//                             onChange={() => { setIsClient(false) }}
//                         />
//                         Vendedor
//                     </label>
//                 </div>


//                 <section className='register-form'>

//                     {isClient ? (
//                         // <form onSubmit={onClientRegisterSubmit}>
//                         <form ref={refForm} onSubmit={(e) => {
//                                                         onClientRegisterSubmit(e);
//                                                         handleSubmit(e);
//                                                         handleSudmiturl(e);
//                                                     }} >
//                             <section className='form-sections'>
//                                 <section className='form-section'>

//                                 <label> Subir imagen:
//                                     <input type="file" name="" id="" onChange={e => setFile(e.target.files[0])} />
//                                 </label>
//                                     <Input label="Nombre" type='text' name='name' placeholder='Ingresa tu nombre' required />
//                                     <Input label="Apellidos" type='text' name='lastName' placeholder='Ingresa tus apellidos' required />
//                                     <Input label="Fecha de nacimiento" type='date' name='born' placeholder='Ingresa tu fecha de nacimiento' required />
//                                     <Input label="Contraseña" type='password' name='password' placeholder='Ingresa tu contraseña' required />
//                                 </section>
//                                 <section className='form-section'>
//                                     <Input label="Telefono" type='number' name='phone' placeholder='Ingresa tu numero de telefono' required />
//                                     <Input label="Correo" type='email' name='email' placeholder='Ingresa tu correo' required />
//                                     <section className="selections">
//                                         <Select label="Departamento" name="department" options={[{ value: "quindio", label: "Quindio" }]} />
//                                         <Select label="Municipio" name="municipality" options={[{ value: "Armenia", label: "Armenia" }]} />
//                                     </section>
//                                     <Input label="Confirmar contraseña" type='password' name='confirmPassword' placeholder='Confirma tu contraseña' required />
//                                 </section>
//                             </section>

//                             <div className='buttonreg'>
//                                 <p>¿Ya esta registrado? <a href="/login">Iniciar sesión</a></p>
//                                 <input type="submit" value="Registrarse" className='submit' />
//                             </div>
//                         </form>
//                     ) : (
//                         <form className="seller-form" onSubmit={onSellerRegisterSubmit}>
//                             <section className='form-sections'>
//                                 <section className="form-section">
//                                     <Input label="Correo" type='email' name='email' placeholder='Ingrese su correo' />
//                                     <Input label="Nombre de la Tienda" type='text' name='storeName' placeholder='Ingrese el nombre de tu tienda' />
//                                     <Input label="Telefono" type='tel' name='tel' placeholder='Ingrese su nombre' />
//                                     <Input label="Dirección" type='text' name='address' placeholder='Ingrese su dirección' />
//                                 </section>
//                                 <section className="form-section">
//                                     <Input label="Contraseña" type='password' name='password' placeholder='Ingrese su contraseña' />
//                                     <Input label="Confirmar contraseña" type='password' name='confirmPassword' placeholder='Confirme su contraseña' />
//                                     <Input label="Imagen del mercado" type='file' name='image' />
//                                 </section>
//                             </section>
//                             <button type="submit" className='submit'> Registrarse</button>
//                         </form>
                        
//                     )}
//                 </section>
//             </section>
//             <section className="image-register" />
//         </main>
//     );
// };

// export default SignUp;






// import React, { useState, useRef } from 'react';
// import './signUp.css';
// import { useNavigate } from 'react-router-dom'
// import { Input } from '../Input/Input';
// import { Select } from '../Select/Select';
// import { onSellerRegisterSubmit, onClientRegisterSubmit } from "../../utils/submits"
// import emailjs from 'emailjs-com';

// export const SignUp = () => {

//     const navigate = useNavigate();
//     const refForm = useRef();

//     const [isClient, setIsClient] = useState(true);


//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const serviceId = "service_x94tdtc";
//         const templateId = "template_eutc2wi";
//         const apikey = "wCWtMpED59hJ9hMZi";

//         try {
//             const result = await emailjs.sendForm(serviceId, templateId, refForm.current, apikey);
//             console.log(result.text);
//         } catch (error) {
//             console.error(error);
//         }

//         if (selectedRole === "cliente") {
//             handleSubmitCliente(event);
//         } else {
//             handleSubmitVendedor(event);
//         }
//     };

//     const sendConfirmationEmail = (email) => {
//         const serviceId = "service_x94tdtc";
//         const templateId = "template_eutc2wi";
//         const apikey = "wCWtMpED59hJ9hMZi";

//         const templateParams = {
//             to_email: email,
//             // Add any additional parameters needed for the email template
//         };

//         emailjs.send(serviceId, templateId, templateParams, apikey)
//             .then((response) => {
//                 console.log('Email sent successfully:', response);
//             })
//             .catch((error) => {
//                 console.error('Email sending failed:', error);
//             });
//     };
    
//     return (
//         <main className='full-reg-content'>
//             <section className="form-reg">
//                 <header className='reg-header'>
//                     <img src="/images/logo_mercadoCampesino.png" alt="" width={40} height={70} />
//                     <section className='header-text'>
//                         <h1>MERCADO CAMPESINO</h1>
//                         <p>LA MEJOR CALIDAD</p>
//                     </section>
//                 </header>
//                 <div className='regresar'>
//                     <button className='regresar_reg' onClick={() => navigate(-1)}>Regresar</button>
//                 </div>
//                 <section className='register-form'>
//                     <div className='checkboxs'>
//                         <p>Elige como quieres registrarte</p>
//                         <label>
//                             <input
//                                 type="radio"
//                                 id="cliente"
//                                 name='role'
//                                 value="cliente"
//                                 onChange={() => { setIsClient(true) }}
//                                 defaultChecked
//                             />
//                             Cliente
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 id="vendedor"
//                                 name='role'
//                                 value="vendedor"
//                                 onChange={() => { setIsClient(false) }}
//                             />
//                             Vendedor
//                         </label>
//                     </div>
//                     {isClient ? (
//                         <form ref={refForm} onSubmit={(e) => {
//                             onClientRegisterSubmit(e);
//                             handleSubmit(e);
//                         }} className='form-sections' >
//                             <section className='form-section'>
//                                 <section className='form-section'>
//                                     <Input label="Nombre" type='text' name='name' placeholder='Ingresa tu nombre' required />
//                                     <Input label="Apellidos" type='text' name='lastName' placeholder='Ingresa tus apellidos' required />
//                                     <Input label="Fecha de nacimiento" type='date' name='born' placeholder='Ingresa tu fecha de nacimiento' required />
//                                     <Input label="Contraseña" type='password' name='password' placeholder='Ingresa tu contraseña' required />
//                                 </section>
//                                 <section className='form-section'>
//                                     <Input label="Telefono" type='number' name='phone' placeholder='Ingresa tu numero de telefono' required />
//                                     <Input label="Correo" type='email' name='email' placeholder='Ingresa tu correo' required />
//                                     <section className="selections">
//                                         <Select label="Departamento" name="department" options={[{ value: "quindio", label: "Quindio" }]} />
//                                         <Select label="Municipio" name="municipality" options={[{ value: "Armenia", label: "Armenia" }]} />
//                                     </section>
//                                     <Input label="Confirmar contraseña" type='password' name='confirmPassword' placeholder='Confirma tu contraseña' required />
//                                 </section>

//                             </section>

//                             <div className='buttonreg'>
//                                 <p>¿Ya esta registrado? <a href="">Iniciar sesión</a></p>
//                                 <input type="submit" value="Registrarse" className='submit' />
//                             </div>
//                         </form>
//                     ) : (
//                         <form className="seller-form" onSubmit={onSellerRegisterSubmit}>
//                             <section className='form-sections'>
//                                 <section className="form-section">
//                                     <Input label="Correo" type='email' name='email' placeholder='Ingrese su correo' />
//                                     <Input label="Nombre de la Tienda" type='text' name='storeName' placeholder='Ingrese el nombre de tu tienda' />
//                                     <Input label="Telefono" type='tel' name='tel' placeholder='Ingrese su nombre' />
//                                     <Input label="Dirección" type='text' name='address' placeholder='Ingrese su dirección' />
//                                 </section>
//                                 <section className="form-section">
//                                     <Input label="Contraseña" type='password' name='password' placeholder='Ingrese su contraseña' />
//                                     <Input label="Confirmar contraseña" type='password' name='confirmPassword' placeholder='Confirme su contraseña' />
//                                     <Input label="Imagen del mercado" type='file' name='image' />
//                                 </section>
//                             </section>
//                             <button type="submit" className='submit'> Registrarse</button>
//                         </form>
//                     )}
//                 </section>
//             </section>
//             <section className="image-register" />
//         </main>
//     );
// };

// export default SignUp;
