import React from 'react';
import './Login.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Login = () => {
    return (
        <div>
            <Navbar />
            <div className="login-container">
                <h3 className="text-center">Inicia Sesión</h3>
                <p className="text-center">Accede a un sinfín de opciones de viaje con una sola cuenta en Manzanares.com</p>
                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email"
                               placeholder="Ingrese su correo electrónico"/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="password"
                               placeholder="Ingrese su contraseña"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                    <div className="form-group text-center mt-3">
                        <a href="#">¿Olvidó su contraseña?</a>
                    </div>
                    <div className="form-group text-center mt-2">
                        <a href="/Register">¿Aún no tienes cuenta?</a>
                    </div>
                </form>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default Login;
