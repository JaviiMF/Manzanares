import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-white absolute-bottom">
            <div className="container text-center">
                <p>Al continuar, aceptas los <a href="#">términos y condiciones</a> y la <a href="#">declaración de privacidad</a> de Manzanares.com</p>
            </div>
        </footer>
    );
}

export default Footer;
