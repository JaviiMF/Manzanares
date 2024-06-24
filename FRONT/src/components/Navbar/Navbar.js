import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.jpeg'; // Asegúrate de tener el logo en la carpeta assets
import './Navbar.css'; // Importa tus estilos CSS personalizados

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-white fixed-top border-bottom">
            <div className="container">
                <a className="navbar-brand text-dark" href="/">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                </a>
                <a className="navbar-brand mx-auto text-dark" href="/">
                    <img src={logo} alt="Logo" height="60" className="mr-2" />
                    <span className="brand-text-large">Manzanares</span>
                    <span className="brand-text-small">.com</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
