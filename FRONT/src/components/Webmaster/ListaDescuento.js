import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export function ListaDescuento() {
    const [descuento, setDescuento] = useState([]);
    const [webmaster, setWebmaster] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));
    const [hasTipo, sethasTipo] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/descuento/allDescuentos")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setDescuento(data);
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

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar este descuento?");
        if (!confirmDelete) {
            return;     
        }

        fetch(`http://localhost:8080/descuento/deleteDescuento/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al borrar la oferta: ${response.statusText}`);
            }
            // Actualizamos el estado para reflejar los cambios en la UI
            setDescuento(prevDescuento => prevDescuento.filter(descuento => descuento.id !== id));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    return (
        <div className="list-container">
            <h3 className="list-title">Listado de Descuentos</h3>
            <h4 className="list-description">En esta página se muestran los Descuento actuales.</h4>

            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <table className="cliente-table">
                    <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Porcentaje</th>
                            {webmaster && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {descuento.map((descuento, index) => (
                            <tr key={index}>
                                <td>{descuento.descripcion}</td>
                                <td>{descuento.porcentaje}</td>
                                {webmaster && (
                                    <td>
                                        <button type="button" className="delete-button" onClick={() => handleDelete(descuento.id)}>
                                            Borrar
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


export default ListaDescuento;