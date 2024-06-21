import { useState, useEffect } from "react";

export function ListaCliente() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8081/customer/all")
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

    return (
        <div>
            <h3 className="form-title">Listado de Clientes</h3>
            <h4 className="form-description">En esta pagina puedes acceder a todos 
                los dattos sobre los usuarios, incluyendo sus reservas.</h4>

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
                                <td><a type="button" href="/clientes">Editar</a></td>
                                <td><a type="button" href="/clientes">Borrar</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}