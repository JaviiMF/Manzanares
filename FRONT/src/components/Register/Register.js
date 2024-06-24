import React, { useState } from 'react';
import './Register.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        // Aquí es donde enviarías los datos al servidor
        console.log(formData);
    };

    return (
        <div>
            <Navbar />
            <div className="register-container">
                <h3 className="text-center">Regístrate</h3>
                <p className="text-center">Crea una cuenta en Manzanares.com</p>
                <form onSubmit={onSubmit} className="register-form">
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
                    <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                </form>
                <div className="form-group text-center mt-2">
                    <a href="/login">¿Ya tienes cuenta? Inicia sesión aquí</a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
