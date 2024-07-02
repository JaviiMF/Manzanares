import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


export function EditaCliente() {
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
    const [error, setError] = useState('');
    const [direccion, setDireccion] = useState('');
    const { dniAux } = useParams();
    const navigate = useNavigate();
    const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [activoUsuario, setActivoUsuario] = useState('');

    useEffect(() => {
        // Fetch user data
        axios.get(`http://localhost:8080/customer/find/${dniAux}`)
            .then(response => {
                const cliente = response.data;
                setNombre(cliente.nombre);
                setDni(cliente.dni);
                setPassword(''); // Clear password fields
                setConfPassword('');
                setFechaNacimiento(cliente.fechaNacimiento);
                setPais(cliente.pais);
                setApellido(cliente.apellido);
                setEmail(cliente.email);
                setTelefono(cliente.telefono);
                setGenero(cliente.genero);
                setDireccion(cliente.direccion);
                setTipoUsuario(cliente.tipo);
                setActivoUsuario(cliente.activo);
            })
            .catch(error => {
                console.error('Error al obtener los datos del cliente:', error);
                setError('Error al cargar los datos del cliente.');
            });

            if (tipo !== "administrador") {
                navigate('/error');
            }  

    }, [dniAux, navigate]);

    const validatePasswords = () => {
        return password === confPassword;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validatePasswords()) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const data = {};
        if (nombre) data.nombre = nombre;
        if (dni) data.dni = dni;
        if (password) data.password = password;
        if (apellido) data.apellido = apellido;
        if (email) data.email = email;
        if (telefono) data.telefono = telefono;
        if (genero) data.genero = genero;
        if (direccion) data.direccion = direccion;
        data.tipo = setTipoUsuario;
        data.activo = activoUsuario;

        axios.put(`http://localhost:8080/customer/updateUsuario/${dniAux}`, data)
            .then(response => {
                alert(`Usuario actualizado exitosamente ${dniAux}`);
                navigate('/'); // Redirigir a la lista de clientes u otra vista
            })
            .catch(error => {
                console.error('Hubo un error al actualizar el usuario:', error);
                alert('Error al actualizar el usuario');
            });
    };

    return (
        <div className="form-container" style={{marginTop:"1000px"}}>
            <form onSubmit={handleSubmit}>
                <h3 className="form-title">Editar Cliente</h3>
                <h4 className="form-description">En esta página se pueden editar las cuentas de los clientes</h4>
                
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
                            <label htmlFor="genero">Género </label>    
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
                            <label htmlFor="email">Email </label>    
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
                            <label htmlFor="tlf">Teléfono </label>    
                            <input 
                                type="tel" 
                                name="tlf" 
                                id="tlf" 
                                value={telefono} 
                                onChange={(e) => setTelefono(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección </label>    
                            <input 
                                type="text" 
                                name="direccion" 
                                id="direccion" 
                                value={direccion} 
                                onChange={(e) => setDireccion(e.target.value)} 
                            />
                        </div>
                    </div>               
                </div>

                <div className="submit-group">
                    <input type="submit" value="Editar" className="submit-button" />
                </div>
            </form>       
        </div>
    );
}
