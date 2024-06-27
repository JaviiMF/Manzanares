import React, { useState } from 'react';
import './Register.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        telefono: '',
        dni: '',
        direccion: '',
        tipo: 'cliente',
        horario: null,
        activo: true,
        genero: '',
    });

    const { email, password, nombre, apellido, telefono, dni, direccion, tipo, horario, activo, genero } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/customer/createUsuario', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                // Procesar la respuesta exitosa aquí
                console.log('Usuario registrado con éxito');
                navigate("/");
            } else {
                // Manejar errores aquí
                console.error('Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="register-container">
                <h3 className="text-center">Regístrate</h3>
                <p className="text-center">Crea una cuenta en Manzanares.com</p>
                <form onSubmit={onSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={onChange}
                            placeholder="Ingrese su nombre"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            name="apellido"
                            value={apellido}
                            onChange={onChange}
                            placeholder="Ingrese su apellido"
                            required
                        />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telefono"
                            name="telefono"
                            value={telefono}
                            onChange={onChange}
                            placeholder="Ingrese su teléfono"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dni"
                            name="dni"
                            value={dni}
                            onChange={onChange}
                            placeholder="Ingrese su DNI"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            id="direccion"
                            name="direccion"
                            value={direccion}
                            onChange={onChange}
                            placeholder="Ingrese su dirección"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genero">Género</label>
                        <select
                            className="form-control"
                            id="genero"
                            name="genero"
                            value={genero}
                            onChange={onChange}
                            required
                        >
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>
                    <div className="container">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                        />
                        <label htmlFor="terms">
                            Acepto los <a href="#">términos y condiciones</a>
                        </label>
                    </div>
                    <div className="container">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                        />
                        <label htmlFor="terms">
                            Acepto la <a href="#">política de privacidad</a>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-2">Registrarse</button>
                </form>
                <div className="form-group text-center mt-5">
                    <a href="/login">¿Ya tienes cuenta? Inicia sesión aquí</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
