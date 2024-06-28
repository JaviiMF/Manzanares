import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListaHabitacion() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/customer/all")
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


    const handleDelete = (numero) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar esta habitación?");
        if (!confirmDelete) {
            return;     
        }

        fetch(`http://localhost:8080/customer/deleteUsuario/${numero}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar la habitación: ${response.statusText}`);
            }
            // Actualizamos el estado para reflejar los cambios en la UI
            setHabitaciones(prevHabitaciones => prevHabitaciones.filter(habitacion => habitacion.numero !== numero));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleEdit = (dni) => {
        navigate(`/clientes/editar/${dni}`); 
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
                            <th>Número</th>
                            <th>Disponibilidad</th>
                            <th>Extras</th>
                            <th>Disponibles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones.map((habitacion, index) => (
                            <tr key={index}>
                                <td>{habitacion.numero}</td>
                                <td>{habitacion.disponibilidad}</td>
                                <td>{habitacion.extras}</td>
                                <td>{habitacion.disponibles}</td>
                                <td>
                                    <button type="button" className="edit-button" onClick={() => handleEdit(habitacion.numero)}>
                                        Editar
                                    </button>
                                    <button type="button" className="delete-button" onClick={() => handleDelete(habitacion.numero)}>
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