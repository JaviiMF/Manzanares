import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListaOferta() {
    const [ofertas, setOfertas] = useState([]);
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
                setOfertas(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);


    const handleDelete = (nombre) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar esta oferta?");
        if (!confirmDelete) {
            return;     
        }

        fetch(`http://localhost:8080/customer/deleteUsuario/${nombre}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar la habitación: ${response.statusText}`);
            }
            // Actualizamos el estado para reflejar los cambios en la UI
            setOfertas(prevOfertas => prevOfertas.filter(oferta => oferta.nombre !== nombre));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleEdit = (nombre) => {
        navigate(`/clientes/editar/${nombre}`); 
    };

    return (
        <div >
            <h3 className="list-title">Listado de Ofertas</h3>
            <h4 className="list-description">En esta página puedes acceder a todas las ofertas del Hotel.</h4>

            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <table className="cliente-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ofertas.map((oferta, index) => (
                            <tr key={index}>
                                <td>{oferta.nombre}</td>
                                <td>{oferta.precio}</td>
                                <td>
                                    <button type="button" className="edit-button" onClick={() => handleEdit(oferta.nombre)}>
                                        Editar
                                    </button>
                                    <button type="button" className="delete-button" onClick={() => handleDelete(oferta.nombre)}>
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