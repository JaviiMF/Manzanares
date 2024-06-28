import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListaHabitacion() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
    }, []);


    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar esta habitación?");
        if (!confirmDelete) {
            return;     
        }

        fetch(`http://localhost:8080/customer/deleteHabitacion/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar la habitación: ${response.statusText}`);
            }
            // Actualizamos el estado para reflejar los cambios en la UI
            setHabitaciones(prevHabitaciones => prevHabitaciones.filter(habitacion => habitacion.id !== id));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleEdit = (id) => {
        navigate(`/habitaciones/editar/${id}`); 
    };

    return (
        <div >
            <h3 className="list-title">Listado de Habitaciones</h3>
            <h4 className="list-description">En esta página puedes acceder a todas las habitaciones, incluyendo si han sido reservadas o no.</h4>

            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <table className="cliente-table">
                    <thead>
                        <tr>
                            <th>m2</th>
                            <th>num</th>
                            <th>numcamas</th>
                            <th>gama</th>
                            <th>mascotas</th>
                            <th>precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones.map((habitacion, index) => (
                            <tr key={index}>
                                <td>{habitacion.m2}</td>
                                <td>{habitacion.num}</td>
                                <td>{habitacion.numcamas}</td>
                                <td>{habitacion.gama}</td>
                                <td>{habitacion.mascotas}</td>
                                <td>{habitacion.precio}</td>
                                <td>
                                    <button type="button" className="edit-button" onClick={() => handleEdit(habitacion.id)}>
                                        Editar
                                    </button>
                                    <button type="button" className="delete-button" onClick={() => handleDelete(habitacion.id)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}