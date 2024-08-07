import { useState } from "react";
import axios from 'axios';
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

export function BuscaCliente() {
    const [dni, setDni] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();  
        
        axios.get(`http://localhost:8080/customer/find/${dni}`)
            .then(response => {
                setMensaje(`Usuario encontrado: ${response.data.nombre} `); // ${response.data.apellidos}
            })
            .catch(error => {
                if (error.response ) {
                    setMensaje("Usuario no encontrado");
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request + "A");
                }
                 else {
                    setMensaje("Error: " + (error.message || "No se pudo conectar con el servidor"));
                    console.log(error.mensaje);
                }
            });
    };

    return (
        <div className="form-container" style={{marginTop:"580px"}}>
            <form onSubmit={handleSubmit}>
                <h3 className="form-title">¿Existe el Cliente?</h3>
                <h4 className="form-description">Introduzca el DNI para comprobarlo</h4>
                
                <div className="form-group">
                    <div>
                        <label htmlFor="dni">DNI</label>
                    </div>                   
                    <input 
                        type="text" 
                        id="dni" 
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Buscar" 
                    className="submit-button" 
                />
            </form>
            {mensaje && <p className="message">{mensaje}</p>}
        </div>
    );
}