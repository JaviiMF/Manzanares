import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export function EditaServicio() {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [hor1, setHor1] = useState('');
    const [hor2, setHor2] = useState('');
    const [horario, setHorario] = useState('');
    const [imagen, setImagen] = useState('');
    const [error,  setError] = useState('');
    const { idAux } = useParams();

    const validateHorario = () => {
        return hor1 <= hor2;
    };

    const comparaHor = () => {
        return hor1 == hor2;
    };

    useEffect(() => {
        // Fetch user data
        axios.get(`http://localhost:8080/servicio/${idAux}`)
            .then(response => {
                const servicio = response.data;
                setNombre(servicio.nombre);
                setPrecio(servicio.precio);
                setDescripcion(servicio.descripcion);
                setHor1('');
                setHor2('');
                setImagen('');
                
            })
            .catch(error => {
                console.error('Error al obtener los datos del cliente:', error);
                setError('Error al cargar los datos del cliente.');
            });
    }, [idAux]);

    const handleSubmit = (event) => {
        event.preventDefault();
/*
        if (!validateHorario()) {
            setError('El inicio no puede ser mayor que el final.');
            return;
        }*/

        const data = {
            nombre,
            precio,
            descripcion,
            horario
        };

        if (comparaHor()) {
            data.horario = "Todo el dia";
        }
        else
            data.horario = hor1 + ":00h-" + hor2 + ":00h";

        axios.put(`http://localhost:8080/servicio/updateServicio/${idAux}`, data)
            .then(response => {
                alert('Servicio actualizado exitosamente');
                // Limpiar formulario después de la creación exitosa
                setNombre('');
                setPrecio('');
                setDescripcion('');
                setHor1('');
                setHor2('');
                setHorario('');
                setImagen('');
                setError('');
            })
            .catch(error => {
                console.error('Hubo un error al crear el usuario:', error);
                alert('Error al crear el usuario');
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3 className="form-title">Editar Servicios</h3>
                <h4 className="form-description">En esta página se permite editar los servicios del Hotel</h4>
                
                {error && <p className="error-message">{error}</p>}

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
                        <div className="form-group">
                            <label htmlFor="horario1">Horario Inicio </label>    
                            <input 
                                type="number" 
                                name="hor1" 
                                id="hor1" 
                                min="0" max="24" step="1"
                                value={hor1} 
                                onChange={(e) => setHor1(e.target.value)} 
                            />
                        </div>
                                            
                    </div>
                    <div className="der">
                        <div className="form-group">
                            <label htmlFor="precio">Precio (€)</label>    
                            <input 
                                type="number" 
                                name="precio" 
                                id="precio" 
                                min="0.00" max="10000.00" step="0.01"
                                value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} 
                            />
                        </div>  
                        <div className="form-group">   
                            <label htmlFor="horario2">Horario Fin </label>                             
                            <input 
                                type="number" 
                                name="hor2" 
                                id="hor2" 
                                min="0" max="23" step="1"
                                value={hor2} 
                                onChange={(e) => setHor2(e.target.value)} 
                            />
                        </div>                                           
                    </div>   

                               
                </div>

                <div className="form-group">
                            <label htmlFor="descripcion" style={{marginLeft:"40px"}}>Descripcion </label>
                            <textarea id="descripcion" 
                            rows="4" cols="60"
                            name="descripcion" 
                            maxLength={255}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} ></textarea>
                        </div>  

                <div className="submit-group">
                    <input type="submit" value="Actualizar" className="submit-button" />
                </div>
            </form>       
        </div>
    );
}
