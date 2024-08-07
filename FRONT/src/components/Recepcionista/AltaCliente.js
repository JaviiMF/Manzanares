import { useState } from "react";
import axios from 'axios';

export function AltaCliente() {
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [pais, setPais] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [genero, setGenero] = useState('masculino');
    const [tipo, setTipo] = useState('cliente');
    const [error, setError] = useState('');
    const [direccion, setDireccion] = useState('');
    const [activo, setActivo] = useState(true);

    // Función para validar si las contraseñas coinciden
    const validatePasswords = () => {
        return password === confPassword;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validatePasswords()) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const data = {
            nombre,
            dni,
            password,
            apellido,
            email,
            telefono,
            genero,
            direccion,
            tipo,
            activo
        };

        axios.post('http://localhost:8080/customer/createUsuario', data)
            .then(response => {
                alert('Usuario creado exitosamente');
                // Limpiar formulario después de la creación exitosa
                setNombre('');
                setDni('');
                setPassword('');
                setFechaNacimiento('');
                setPais('');
                setApellido('');
                setEmail('');
                setConfPassword('');
                setTelefono('');
                setGenero('masculino');
                setTipo("cliente");
                setDireccion('');
                setError('');
            })
            .catch(error => {
                console.error('Hubo un error al crear el usuario:', error);
                alert('Error al crear el usuario');
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3 className="form-title">Crear Clientes</h3>
                <h4 className="form-description">En esta página se crean las cuentas de los clientes</h4>

                {error && <p className="error-message">{error}</p>}

                <div className="wrapper">
                    <div className="izq">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre </label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dniIn">DNI </label>
                            <input
                                type="text"
                                name="dni"
                                id="dniIn"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Contraseña </label>
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fnac">Fecha Nacimiento </label>
                            <input
                                type="date"
                                name="fnac"
                                id="fnac"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pais">País </label>
                            <input
                                type="text"
                                name="pais"
                                id="pais"
                                value={pais}
                                onChange={(e) => setPais(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genero">Genero </label>
                            <select
                                name="genero"
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            >
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                                <option value="no_decir">Prefiero no decirlo</option>
                            </select>
                        </div>
                    </div>
                    <div className="der">
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos </label>
                            <input
                                type="text"
                                name="apellidos"
                                id="apellidos"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+">Email </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confpass">Confirmar Contraseña </label>
                            <input
                                type="password"
                                name="confpass"
                                id="confpass"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tlf" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>Telefono </label>
                            <input
                                type="tel"
                                name="tlf"
                                id="tlf"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Direccion </label>
                            <input
                                type="text"
                                name="direccion"
                                id="direccion"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>
                        {localStorage.getItem("userTipo") === "administrador" && (
                            <div className="form-group">
                                <label htmlFor="tipo">Tipo </label>
                                <select
                                    name="tipo"
                                    id="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                >
                                    <option value="cliente">Cliente</option>
                                    <option value="recepcionista">Recepcionista</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                <div className="submit-group">
                    <input type="submit" value="Crear" className="submit-button"/>
                </div>
            </form>
        </div>
    );
}
