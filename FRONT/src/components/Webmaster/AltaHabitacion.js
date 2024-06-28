import { useState } from "react";
import axios from 'axios';

export function AltaHabitacion() {
    const [numero, setNumero] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');
    const [extras, setExtras] = useState('');
    const [imagen, setImagen] = useState('');
    const [disponibles, setDisponibles] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            numero,
            descripcion,
            disponibilidad,
            extras,
            imagen,
            disponibles
        };

        axios.post('http://localhost:8080/customer/createHabitacion', data)
            .then(response => {
                alert('Habitación creada exitosamente');
                // Limpiar formulario después de la creación exitosa
                setNumero('');
                setDescripcion('');
                setDisponibilidad('');
                setExtras('');
                setDisponibles('');
                setImagen('');
            })
            .catch(error => {
                console.error('Hubo un error al crear la habitación:', error);
                alert('Error al crear la habitación');
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3 className="form-title">Crear Habitaciones</h3>
                <h4 className="form-description">En esta página puedes crear las habitaciones del Hotel.</h4>
                
                {/*error && <p className="error-message">{error}</p>*/}

                <div className="wrapper">
                    <div className="izq">
                        <div className="form-group">
                            <label htmlFor="nombre">Número </label>    
                            <input 
                                type="text" 
                                name="numero" 
                                id="numero" 
                                value={numero} 
                                onChange={(e) => setNumero(e.target.value)} 
                            />
                        </div>
                    </div>               
                </div>

                <div className="form-group">
                            <label htmlFor="descripcion">Descripcion </label>    
                            <textarea id="descripcion" 
                            rows="4" cols="60"
                            name="descripcion" 
                            maxLength={255}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} ></textarea>
                        </div>  

                <div className="submit-group"></div>

                <div className="wrapper">
                    <div className="izq">
                        <div className="form-group">
                            <label htmlFor="disponibilidad">Disponibilidad </label>    
                            <input 
                                type="text" 
                                name="disponibilidad" 
                                id="disponibilidad" 
                                value={disponibilidad} 
                                onChange={(e) => setDisponibilidad(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imagen">Imagen </label>    
                            <input 
                                type="file" 
                                accept="image/*,.pdf"
                                name="imagen" 
                                id="imagen" 
                                value={imagen} 
                                onChange={(e) => setImagen(e.target.value)} 
                            />
                        </div> 
                    </div>
                    <div className="der">
                        <div className="form-group">
                            <label htmlFor="extras">Extras </label>    
                            <input 
                                type="text" 
                                name="extras" 
                                id="extras" 
                                value={extras} 
                                onChange={(e) => setExtras(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="disponibles">Disponibles de la habitación </label>    
                            <input 
                                type="text" 
                                name="disponibles" 
                                id="disponibles" 
                                value={disponibles} 
                                onChange={(e) => setDisponibles(e.target.value)} 
                            />
                        </div>
                    </div>               
                </div>

                <div className="submit-group">
                    <input type="submit" value="Crear" className="submit-button" />
                </div>
            </form>       
        </div>
    );
}
