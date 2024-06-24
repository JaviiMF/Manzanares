import { useState } from "react";

export function ListaOfertas() {
    const [clientes, setClientes] = useState([
        { nombre: "Juan", descripcion: "Sotano", precio: "180€", foto: "foto" },
        { nombre: "Ana", descripcion: "Suite Premium", precio: "99€", foto: "foto" }
    ]);

    return (
        <div>
            <h3 className="form-title">Listado de Clientes</h3>
            <h4 className="form-description">En esta pagina puedes acceder a todos 
                los dattos sobre los usuarios, incluyendo sus reservas.</h4>

            <table className="cliente-table">
                <tbody>
                    {clientes.map((cliente, index) => (
                        <tr key={index}>
                            <td>
                                <h6>Nombre</h6>
                                {cliente.nombre}
                                <h6>Descripcion</h6>
                                {cliente.descripcion}
                                <h6>Precio</h6>
                                {cliente.precio}
                            </td>
                            
                            <td>
                                <img src="" alt="Default img"/>
                                <button type="button">Click Me!</button>
                            </td>                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}