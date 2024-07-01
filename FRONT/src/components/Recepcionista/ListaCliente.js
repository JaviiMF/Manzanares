import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListaCliente() {
    const [clientes, setClientes] = useState([]);
    const [webmaster, setWebmaster] = useState([]);
    const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));
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
                setClientes(data);
            })
            .catch(error => {
                setError(error.message);
            });

        if (tipo === "administrador") {
            setWebmaster(true);
        } else if (tipo === "recepcionista"){
            setWebmaster(false);
        }
        else {        
            navigate('/error');
        }
    }, [navigate]);


    const handleDelete = (dni) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar este cliente?");
        if (!confirmDelete) {
            return; 
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

    const handleEdit = (dni) => {
        navigate(`/clientes/editar/${dni}`); 
    };

    return (
        <div style={{marginTop:"300px"}}>
            <h3 className="list-title">Listado de Clientes</h3>
            <h4 className="list-description">En esta página puedes acceder a todos 
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
                        <th>Tipo</th>
                        {webmaster && <th>Acción</th> }
                    </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.dni}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.tipo}</td>
                                {webmaster && (
                                <td>
                                    <button type="button" className="edit-button"
                                            onClick={() => handleEdit(cliente.dni)}>
                                        Editar
                                    </button>
                                    <button type="button" className="delete-button"
                                            onClick={() => handleDelete(cliente.dni)}>
                                        Deshabilitar
                                    </button>
                                </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}