import { useState } from "react";
import axios from 'axios';

export function AltaOferta() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            nombre,
            descripcion,
            precio,
            imagen
        };

        axios.post('http://localhost:8080/customer/createHabitacion', data)
            .then(response => {
                alert('Habitación creada exitosamente');
                // Limpiar formulario después de la creación exitosa
                setNombre('');
                setDescripcion('');
                setPrecio('');
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
                <h3 className="form-title">Crear Ofertas</h3>
                <h4 className="form-description">En esta página puedes crear las ofertas de las habitaciones.</h4>
                
                {/*error && <p className="error-message">{error}</p>*/}

                <div className="wrapper">
                    <div className="izq">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre </label>    
                            <input 
                                type="text" 
                                name="nombre" 
                                id="nombre" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
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
                            <label htmlFor="precio">Precio </label>    
                            <input 
                                type="text" 
                                name="precio" 
                                id="precio" 
                                value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="der">
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
                </div>

                <div className="submit-group">
                    <input type="submit" value="Crear" className="submit-button" />
                </div>
            </form>       
        </div>
    );
}
