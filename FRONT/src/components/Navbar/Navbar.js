import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog,faUser,faSignInAlt,faComment, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import './Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import button from "bootstrap/js/src/button";

const Navbar = () => {
    const [hasDNI, setHasDNI] = useState(false);
    const [hasCliente, setHasCliente] = useState(false);
    const [hasRecepcionista, setHasRecepcionista] = useState(false);
    const [hasAdministrador, setHasAdministrador] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const dni = localStorage.getItem('userDni');
        const tipo = localStorage.getItem('userTipo');
        if (dni) {
            setHasDNI(true);
            if(tipo === "cliente"){
                setHasCliente(true);
            } else if(tipo === "recepcionista"){
                setHasRecepcionista(true);
            } else if(tipo === "administrador"){
                setHasAdministrador(true);
            }
        } else {
            setHasDNI(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userDni');
        localStorage.removeItem('userTipo');
        localStorage.clear();
        navigate("/");
        window.location.reload(); // Recarga la página para reflejar el logout
    };

    const handleComment = () => {
        navigate("/comentarios");
        console.log('Abrir ventana de comentarios o navegar a página de comentarios');
    };

    function handlePerfil() {
        navigate("/perfil");
    }

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
                    {hasCliente && (
                        <button
                            className="btn btn-link text-dark"
                            onClick={handlePerfil}
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2"/>
                        </button>
                    )}
                    {hasRecepcionista && (
                        <button className="btn btn-link text-dark"><Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <FontAwesomeIcon icon={faCog} className="mr-2"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/gestion-clientes">Gestionar Clientes</Dropdown.Item>
                                <Dropdown.Item href="/clientes">Listado Clientes</Dropdown.Item>
                                <Dropdown.Item href="/servicios">Listado Servicios</Dropdown.Item>
                                <Dropdown.Item href="/ListaReserva">Listado Reservas</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown></button>

                    )}
                    {hasAdministrador && (
                        <button className="btn btn-link text-dark"><Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <FontAwesomeIcon icon={faCog} className="mr-2"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/habitaciones">Gestionar Habitaciones</Dropdown.Item>
                                <Dropdown.Item href="/gestion-habitaciones">Crear Habitaciones</Dropdown.Item>
                                <Dropdown.Item href="/gestion-clientes">Gestionar Clientes</Dropdown.Item>
                                <Dropdown.Item href="/clientes">Listado Clientes</Dropdown.Item>
                                <Dropdown.Item href="/servicios">Listado Servicios</Dropdown.Item>
                                <Dropdown.Item href="/gestion-servicios">Gestionar Servicios</Dropdown.Item>
                                <Dropdown.Item href="/ListaReserva">Listado Reservas</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown></button>

                    )}
                    <button
                        className="btn btn-link text-dark"
                        onClick={handleComment}
                    >
                        <FontAwesomeIcon icon={faComment} className="mr-2"/>
                    </button>
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
