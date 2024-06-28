import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListaServicio() {
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/servicio/allServicios")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setServicios(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);


    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar este servicio?");
        if (!confirmDelete) {
            return;     
        }

        fetch(`http://localhost:8080/servicio/deleteServicio/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar el servicio: ${response.statusText}`);
            }
            // Actualizamos el estado para reflejar los cambios en la UI
            setServicios(prevServicios => prevServicios.filter(servicio => servicio.id !== id));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleEdit = (id) => {
        navigate(`/servicios/editar/${id}`); 
    };

    return (
        <div >
            <h3 className="list-title">Listado de Serviciosssss</h3>
            <h4 className="list-description">En esta página puedes acceder a todos los servicios del Hotel.</h4>

            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <table className="cliente-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Horario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((servicio, index) => (
                            <tr key={index}>
                                <td>{servicio.nombre}</td>
                                <td>{servicio.precio}</td>
                                <td>{servicio.horario}</td>
                                <td>
                                    <button type="button" className="edit-button" onClick={() => handleEdit(servicio.id)}>
                                        Editar
                                    </button>
                                    <button type="button" className="delete-button" onClick={() => handleDelete(servicio.id)}>
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