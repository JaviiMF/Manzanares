import { useState, useEffect } from "react";

export function ListaCliente() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/customer/all")
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

    // Función para manejar la eliminación de un cliente
    const handleDelete = (dni) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar este cliente?");
        if (!confirmDelete) {
            return; // Si el usuario cancela, no hacemos nada
        }

        fetch(`http://localhost:8080/customer/deleteUsuario/${dni}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar el cliente: ${response.statusText}`);
            }
            // Actualizamos el estado para reflejar los cambios en la UI
            setClientes(prevClientes => prevClientes.filter(cliente => cliente.dni !== dni));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    return (
        <div>
            <h3 className="form-title">Listado de Clientes</h3>
            <h4 className="form-description">En esta página puedes acceder a todos 
                los datos sobre los usuarios, incluyendo sus reservas.</h4>

            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <table className="cliente-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>DNI</th>
                            <th>Teléfono</th>
                            <th>Acciones</th> {/* Columna para acciones */}
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellidos}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.dni}</td>
                                <td>{cliente.telefono}</td>
                                <td>
                                    <button type="button" onClick={() => handleDelete(cliente.dni)}>
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