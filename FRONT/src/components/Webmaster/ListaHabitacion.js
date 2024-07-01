import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListaHabitacion() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));

    useEffect(() => {
        fetch("http://localhost:8080/room/all")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setHabitaciones(data);
            })
            .catch(error => {
                setError(error.message);
            });

        if (tipo !== "administrador") {
            navigate('/error');
        }       
    }, [navigate]);


    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar esta habitación?");
        if (!confirmDelete) {
            return;     
        }

        fetch(`http://localhost:8080/room/deleteHabitacion/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar la habitación: ${response.statusText}`);
            }
        })
        .catch(error => {
            setError(error.message);
        });

        window.location.reload();
    };

    const handleEnable = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas habilitar esta habitación?");
        if (!confirmDelete) {
            return;
        }

        fetch(`http://localhost:8080/room/enableHabitacion/${id}`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al habilitar la habitación: ${response.statusText}`);
                }
            })
            .catch(error => {
                setError(error.message);
            });

        window.location.reload();
    };


    return (
        <div style={{marginTop:"500px"}}>
            <h3 className="list-title">Listado de Habitaciones</h3>
            <h4 className="list-description">En esta página puedes acceder a todas las habitaciones, incluyendo si han sido reservadas o no.</h4>

            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <table className="cliente-table">
                    <thead>
                    <tr>
                        <th>Num. Habitación</th>
                        <th>M2</th>
                        <th>Num. Camas</th>
                        <th>Gama</th>
                        <th>¿Mascotas?</th>
                        <th>Precio</th>
                        <th>Acción</th> 
                    </tr>
                    </thead>
                    <tbody>
                        {habitaciones.map((habitacion, index) => (
                            <tr key={index}>
                                <td>{habitacion.num}</td>
                                <td>{habitacion.m2}</td>
                                <td>{habitacion.numcamas}</td>
                                <td>{habitacion.gama}</td>
                                <td>{habitacion.mascotas ? "Si" : "No"}</td>
                                <td>{habitacion.precio}
                                </td>                                    <td>
                                    {habitacion.activa && (
                                        <button type="button" className="delete-button"
                                                onClick={() => handleDelete(habitacion.id)}>
                                            Deshabilitar
                                        </button>
                                    )}
                                    {!habitacion.activa && (
                                        <button type="button"  className="btn btn-success btn-block" onClick={() => handleEnable(habitacion.id)}>Habilitar</button>
                                    )}
                                </td>               
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}