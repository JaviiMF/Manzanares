import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt,faComment, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import './Navbar.css';

const Navbar = () => {
    const [hasDNI, setHasDNI] = useState(false);

    useEffect(() => {
        const dni = localStorage.getItem('userDni');
        if (dni) {
            setHasDNI(true);
        } else {
            setHasDNI(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userDni');
        localStorage.removeItem('userTipo');
        window.location.href = '/'; // Redirecciona a la página de inicio
        window.location.reload(); // Recarga la página para reflejar el logout
    };

    const handleComment = () => {
        // Aquí puedes definir la lógica para manejar el comentario, por ejemplo abrir una ventana modal o navegar a una página de comentarios.
        // Por ahora, solo mostraremos un mensaje en consola.
        console.log('Abrir ventana de comentarios o navegar a página de comentarios');
    };

    return (
        <nav className="navbar navbar-light bg-white fixed-top border-bottom">
            <div className="container d-flex justify-content-between align-items-center">
                <div>
                    {!hasDNI && (
                        <a className="btn btn-link text-dark" href="/login">
                            Sign in <FontAwesomeIcon icon={faSignInAlt}/>
                        </a>
                    )}
                </div>
                <div className="text-center mx-auto">
                    <a className="navbar-brand text-dark" href="/">
                        <img src={logo} alt="Logo" height="60" className="mr-2"/>
                        <span className="brand-text-large">Manzanares</span>
                        <span className="brand-text-small">.com</span>
                    </a>
                </div>
                <div>
                    {hasDNI && (
                        <button
                            className="btn btn-link text-dark"
                            onClick={handleComment}
                        >
                            <FontAwesomeIcon icon={faComment} className="mr-2"/>
                        </button>
                    )}
                    {hasDNI && (
                        <button
                            className="btn btn-link text-dark"
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2"/>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
