// src/Comentarios.js
import React, { useState, useEffect } from 'react';
import './Comentario.css';
import axios from 'axios';

const Comentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [administrador, setAdministrador] = useState(false);
    const [reservaActiva, setReservaActiva] = useState(false); // Estado para la reserva activa
    const [dni, setDni] = useState(localStorage.getItem('userDni')); // Reemplaza con el DNI del usuario actual
    const [nuevoComentario, setNuevoComentario] = useState({
        dniUsuario: dni,
        comentario: '',
        valoracion: 0
    });

    useEffect(() => {
        if (localStorage.getItem('userTipo') === "administrador") {
            setAdministrador(true);
        }
        // Fetch de comentarios
        axios.get('http://localhost:8080/comentario/all')
            .then(response => {
                setComentarios(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        // Fetch de reservas
        axios.get(`http://localhost:8080/customer/reservas/${dni}`)
            .then(response => {
                const reservas = response.data;
                const activa = reservas.some(reserva => reserva.activa === true); // Asegúrate de que este campo existe
                setReservaActiva(activa);
            })
            .catch(error => {
                console.error('Error fetching reservas:', error);
            });
    }, [dni]);

    const renderStars = (rating) => {
        const fullStar = '★';
        const emptyStar = '☆';
        return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoComentario({ ...nuevoComentario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/comentario/addComentario', nuevoComentario)
            .then(response => {
                setComentarios([...comentarios, response.data]);
                setNuevoComentario({ dniUsuario: dni, comentario: '', valoracion: 0 });
            })
            .catch(error => {
                console.error('Error adding comentario:', error);
            });

        window.location.reload();
    };

    const handleBorrado = (id) => {
        axios.delete(`http://localhost:8080/comentario/deleteComentario/${id}`)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting comentario:', error);
            });
    };

    if (loading) return <p>Cargando comentarios...</p>;
    if (error) return <p>Error cargando comentarios: {error.message}</p>;

    return (
        <div>
            <h1 style={{ marginTop: "180px" }}>{localStorage.getItem("lenguaje") === "ES" ? "Comentarios" : "Comments"}</h1>
            <table className="table mt-3" style={{ textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>DNI Usuario</th>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Comentario" : "Comment"}</th>
                    <th>{localStorage.getItem("lenguaje") === "ES" ? "Valoracion" : "Rating"}</th>
                    {administrador && (
                        <th>Acciones</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {comentarios.map(comentario => (
                    <tr key={comentario.id}>
                        <td>{comentario.dniUsuario}</td>
                        <td>{comentario.comentario}</td>
                        <td>{renderStars(comentario.valoracion)}</td>
                        {administrador && (
                            <td>
                                <button type="button" onClick={() => handleBorrado(comentario.id)}
                                        className="btn btn-danger btn-block">Borrar
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            {reservaActiva && (
                <>
                    <h1 className="mt-5">{localStorage.getItem("lenguaje") === "ES" ? "Añadir Comentario" : "Add Comment"}</h1>
                    <form onSubmit={handleSubmit} className="comentario-form">
                        <div className="form-group">
                            <label>{localStorage.getItem("lenguaje") === "ES" ? "Comentario:" : "Comment:"}</label>
                            <textarea
                                name="comentario"
                                value={nuevoComentario.comentario}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>{localStorage.getItem("lenguaje") === "ES" ? "Valoracion:" : "Rating:"}</label>
                            <select
                                name="valoracion"
                                value={nuevoComentario.valoracion}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                            >
                                {[1, 2, 3, 4, 5].map(val => (
                                    <option key={val} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">{localStorage.getItem("lenguaje") === "ES" ? "Añadir Comentario" : "Add Comment"}</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Comentarios;
