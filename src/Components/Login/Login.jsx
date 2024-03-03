import './Login.css'
import { Input } from '../Input/Input';
import { readToken } from '../../utils/readToken';
import { SERVER_URL } from '../../Constants';
import { store } from '../../store';
import { login } from '../../store/slices/user';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();


        const formData = new FormData(event.target);
        const data = {
            correo: formData.get('correo'),
            contrasenia: formData.get('contrasenia')
        }
        const url = `${SERVER_URL}Autenticar/${formData.get('role')}`;
        console.log(data)
        fetch(`${SERVER_URL}Autenticar/Cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())

            .then(data => {
                localStorage.setItem('token', data.token);
                const decoded = readToken(data.token);
                console.log(decoded)
                store.dispatch(login(decoded));
                navigate('/');
            })
            .catch(error => { alert("Usuario no encontrado"); console.error('Error:', error) });

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
                                        <label className="type">
                                            Eres un:
                                            <select name="role" required>
                                                <option value="cliente">Cliente</option>
                                                <option value="vendedor">Vendedor</option>
                                            </select>
                                        </label>

                                        <div className='start_olvidarContra'>
                                            <a className="link_olvidarContra" href="">¿Olvide mi contraseña? </a>
                                            <p className="link_registro">¿No te has registrado? <a className="a_registro" href="/Register"> Registrarse</a></p>
                                        </div>
                                        <div className="loguear">
                                            <button className='loguear_button'>Ingresar</button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

