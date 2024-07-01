import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function CreaDescuento() {
    const [porcentaje, setPorcentaje] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error,  setError] = useState('');
    const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));
    const navigate = useNavigate();

    useEffect(() => {
        if (tipo !== "administrador") {
            navigate('/error');
        }       
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            porcentaje,
            descripcion
        };

        axios.post('http://localhost:8080/descuento/createDescuento', data)
            .then(response => {
                alert('Servicio creado exitosamente');
                // Limpiar formulario después de la creación exitosa
                setPorcentaje('');
                setDescripcion('');

            })
            .catch(error => {
                console.error('Hubo un error al crear la oferta:', error);
                alert('Error al crear la oferta');
            });
    };

    return (
        <div className="form-container" >
            <form onSubmit={handleSubmit}>
                <h3 className="form-title">Crear Descuentos</h3>
                <h4 className="form-description">En esta página se crean los descuentos para las Reservas</h4>
                
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <div style={{marginBottom: "10px" }}> 
                        <label  htmlFor="descripcion">Descripcion </label>    
                        <input 
                            type="text" 
                            name="descripcion" 
                            id="descripcion" 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                        />
                    </div>       
                    <div style={{marginBottom: "10px" }}>
                        <label htmlFor="porcentaje">Descuento</label>    
                        <input 
                            type="number" 
                            name="porcentaje" 
                            id="porcentaje" 
                            min="0.5" max="100.00" step="0.5"
                            value={porcentaje} 
                            onChange={(e) => setPorcentaje(e.target.value)} 
                        />
                    </div>  
                </div>                

                <div className="submit-group">
                    <input type="submit" value="Crear" className="submit-button" />
                </div>
            </form>       
        </div>
    );
}


export default CreaDescuento;
