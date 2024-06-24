import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Home() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Bienvenido al Hotel XYZ</h1>
                        <p>Administra tu hotel de forma eficiente con nuestra plataforma de gestión.</p>
                    </div>
                    <div className="col-md-6">
                        <LoginForm />
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Navbar() {
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Hotel XYZ</Link> {/* Reemplaza <a> con <Link> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link> {/* Reemplaza href="#" con <Link> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">Acerca de</Link> {/* Añade un enlace a la vista Acerca de */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contacto</Link> {/* Añade un enlace a la vista de Contacto */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reservations">Reservas</Link> {/* Añade un enlace a la vista de Reservas */}
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Iniciar sesión</Link> {/* Reemplaza href="#" con <Link> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Registrarse</Link> {/* Reemplaza href="#" con <Link> */}
                        </li>
                    </ul>
                </div>
            </nav>
        );
}

function LoginForm() {
    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
        </div>
    );
}

function RegisterForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/add', formData); // Cambio de URL aquí
            console.log('Registro exitoso:', response.data);
            // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error al registrar:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    return (
        <div>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                    <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    );
}

export default Home;