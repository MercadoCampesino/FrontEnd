import './Login.css'
import { Input } from '../Input/Input';
import { readToken } from '../../utils/readToken';
import { SERVER_URL } from '../../Constants';
import { store } from '../../store';
import { login } from '../../store/slices/user';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Login() {

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            correo: formData.get('correo'),
            contrasenia: formData.get('contrasenia')
        }
        const url = `${SERVER_URL}Autenticar/${formData.get('role')}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();
            localStorage.setItem('token', responseData.token);
            const decoded = readToken(responseData.token);
            console.log(decoded);
            store.dispatch(login(decoded));
            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: "info",
                position: "top-end",
                title: "Usuario no encontrado",
                timer: 1600,
                width: 250,
                height: 30

            })
            console.error('Error:', error);
        }
    };

    return (
        <section className='login'>
            <div className='div_img_login' />

            <div className='title_logo_merCampesino'>
                <div className='cont-regresar_login'>
                    <a className='regresar_login' href="/">Regresar</a>
                </div>

                <div className='title_logo_merCampesino'>

                    {/* cristian, cambie todo el bloque de header */}
                    <header className='reg-header'>
                        <img src="/images/logo_mercadoCampesino.png" alt="" width={40} height={70} />

                        <section className='header-text'>
                            <h1>MERCADO CAMPESINO</h1>
                            <p>LA MEJOR CALIDAD</p>
                        </section>
                    </header>

                    <section className='form_login'>
                        <div className='center_login'>

                            <form className='form_login_' onSubmit={handleSubmit}>
                                <div className='login_form'>
                                    <Input label="Correo" type='email' name='correo' placeholder='Ingresa tu correo' required />
                                    <Input label="Contraseña" type='password' name='contrasenia' placeholder='Ingresa tu contraseña' required />
                                    <label className="type">
                                        Eres un:
                                        <select name="role" required>
                                            <option value="cliente">Cliente</option>
                                            <option value="Tienda">Vendedor</option>
                                        </select>
                                    </label>

                                    <div className='start_olvidarContra'>
                                        <a className="link_olvidarContra" href="">¿Olvide mi contraseña? </a>
                                        <p className="link_registro">¿No te has registrado? <a className="a_registro" href="/register"> Registrarse</a></p>
                                    </div>
                                    <div className="loguear">
                                        <button className='loguear_button'>Ingresar</button>
                                    </div>
                                </div>

                            </form>
                        </div>

                    </section>
                </div>
            </div>
        </section>
    )
}

