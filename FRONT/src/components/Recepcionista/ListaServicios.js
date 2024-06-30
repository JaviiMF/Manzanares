import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListaServicios() {
    const [clientes, setClientes] = useState([]);
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
                setClientes(data);
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

        //const intId = Number(id);

        fetch(`http://localhost:8080/servicio/deleteServicio/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar el cliente: ${response.statusText}`);
            }
            // Actualizamos el estado para reflejar los cambios en la UI
            setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleEdit = (dni) => {
        navigate(`/servicios/editar/${dni}`); 
    };

    return (
        <div className="list-container"> 
            <h3 className="list-title">Listado de Servicios</h3>
            <h4 className="list-description">Listado de los servicios disponibles.</h4>

            <div>
                <table className="table mt-3 service-table">
                    <thead>
                    <tr>
                        <th style={{textAlign: 'center'}}>Descripción</th>
                        <th style={{textAlign: 'center'}}>Horario</th>
                        <th style={{textAlign: 'center'}}>Precio</th>
                        <th style={{textAlign: 'center'}}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.map((cliente, index) => (
                        <tr key={index}>
                            <td style={{textAlign: 'center'}}>{cliente.descripcion}</td>
                            <td style={{textAlign: 'center'}}>{cliente.horario}</td>
                            <td style={{textAlign: 'center'}}>{cliente.precio}</td>
                            <td style={{textAlign: 'center'}}>
                                <button type="button" className="edit-button"
                                        onClick={() => handleEdit(cliente.id)}>Editar
                                </button>
                                <button type="button" className="delete-button"
                                        onClick={() => handleDelete(cliente.id)}>Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}