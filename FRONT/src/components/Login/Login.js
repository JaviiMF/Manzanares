import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/customer/login', {
                usuario: email,
                pass: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                // Almacenar el ID del usuario en la memoria local
                if (response.data !== "") {
                    localStorage.setItem('userDni', response.data.dni);
                    localStorage.setItem('userTipo', response.data.tipo);
                    console.log('Usuario ingresó con éxito');
                    navigate("/");
                    window.location.reload(); // Recarga la página para reflejar el logout
                } else {
                    localStorage.setItem('userDni', null);
                    alert("Usuario no encontrado");
                }

            } else {
                console.error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en la solicitud', error);
        }
    };

    return (
        <div>
            <div className="login-container">
                <h3 className="text-center">Inicia Sesión</h3>
                <p className="text-center">Accede a un sinfín de opciones de viaje con una sola cuenta en Manzanares.com</p>
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Ingrese su correo electrónico"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                    </div>
                    <div className="form-group text-center mt-3">
                        <a href="#">¿Olvidó su contraseña?</a>
                    </div>
                    <div className="form-group text-center mt-2">
                        <a href="/Register">¿Aún no tienes cuenta?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
