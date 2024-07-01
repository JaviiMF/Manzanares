import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsuarioDetalle = () => {
    const [usuario, setUsuario] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [activo, setActivo] = useState(false);
    const dni = localStorage.getItem('userDni'); // Obtenemos el DNI almacenado en localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUsuario = await axios.get(`http://localhost:8080/customer/find/${dni}`);
                setUsuario(responseUsuario.data); // Establecemos los datos del usuario en el estado
                setActivo(responseUsuario.data.activo);
                console.log("Datos del usuario cargados correctamente!");

                if (responseUsuario.data.activo) {
                    const responseReservas = await axios.get(`http://localhost:8080/customer/reservas/${dni}`);
                    setReservas(responseReservas.data); // Establecemos las reservas del usuario en el estado
                    console.log("Reservas cargadas correctamente!");
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario o reservas:', error);
            }
        };

        if (dni) {
            fetchData(); // Llamamos a la función fetchData si tenemos un DNI válido en localStorage
        }
    }, [dni]); // La dependencia es el DNI, para que se ejecute cada vez que cambie

    const handleAlta = async () => {
        try {
            await axios.get(`http://localhost:8080/customer/alta/${usuario.dni}`);
            setUsuario(prevUsuario => ({
                ...prevUsuario,
            }));
            console.log('Usuario activado correctamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al activar el usuario:', error);
        }
    };

    const handleBaja = async () => {
        try {
            await axios.get(`http://localhost:8080/customer/baja/${usuario.dni}`);
            setUsuario(prevUsuario => ({
                ...prevUsuario,
            }));
            console.log('Usuario dado de baja correctamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al dar de baja al usuario:', error);
        }
    };

    const handleBajaReserva = async (id) => {
        try {
            await axios.get(`http://localhost:8080/reserve/baja/${id}`);
            setUsuario(prevUsuario => ({
                ...prevUsuario,
            }));
            console.log('Reserva dada de baja correctamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al dar de baja la reserva:', error);
        }
    };

    if (!usuario) {
        return <p>Cargando usuario...</p>;
    }

    return (
        <div className="usuario-detalle" style={{marginTop:"100px"}}>
            <h1 style={{ fontWeight: "bold" }}>{localStorage.getItem("lenguaje") === "ES" ? "Datos Personales" : "Personal Information"}</h1>
            <table className="table mt-3" style={{ textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Nombre" : "Name"}</th>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Apelldio" : "Surname"}</th>
                    <th>Email</th>
                    <th>DNI</th>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Teléfono" : "Phone Number"}</th>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Direccion" : "Address"}</th>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Género" : "Gender"}</th>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Activo" : "Active"}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.dni}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.direccion}</td>
                    <td>{usuario.genero}</td>
                    <td>{usuario.activo ? "Si" : "No"}</td>
                </tr>
                </tbody>
            </table>
            {activo && (
                <div className="form-group mb-3">
                    <button type="button" onClick={handleBaja} className="btn btn-danger btn-block">{localStorage.getItem("lenguaje") === "ES" ? "Darse de Baja" : "Deactivate Account"}</button>
                </div>
            )}
            {!activo && (
                <div className="form-group mb-3">
                    <button type="button" onClick={handleAlta} className="btn btn-success btn-block">{localStorage.getItem("lenguaje") === "ES" ? "Darse de Baja" : "Activate Account"}</button>
                </div>
            )}
            {activo && (
                <div>
                    <h1 className="mt-5" style={{ fontWeight: "bold" }}>Reservas</h1>
                    <table className="table mt-3" style={{ textAlign: 'center' }}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Habitación</th>
                            <th>Alta</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Precio Total</th>
                            <th>Activa</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reservas.map(reserva => (
                            <tr key={reserva.id}>
                                <td>{reserva.id}</td>
                                <td>{reserva.idHabitacion}</td>
                                <td>{new Date(reserva.fechaAlta).toLocaleDateString()}</td>
                                <td>{new Date(reserva.fechaCheckin).toLocaleDateString()}</td>
                                <td>{new Date(reserva.fechaCheckout).toLocaleDateString()}</td>
                                <td>{parseFloat(reserva.precioTotal.toFixed(2))}</td>
                                <td>{reserva.activa ? (
                                    <button type="button" onClick={() => handleBajaReserva(reserva.id)}
                                            className="btn btn-danger btn-sm">{localStorage.getItem("lenguaje") === "ES" ? "Cancelar" : "Cancel"}</button>
                                ) : (
                                    "No"
                                )}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default UsuarioDetalle;
