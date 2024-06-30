import { useState } from "react";
import axios from 'axios';

export function AltaHabitacion() {
    const [m2, setM2] = useState();
    const [num, setNum] = useState();
    const [numcamas, setNumCamas] = useState();
    const [gama, setGama] = useState();
    const [mascotas, setMascotas] = useState(true);
    const [precio, setPrecio] = useState();
    const [activa, setActiva] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            m2,
            num,
            numcamas,
            gama,
            mascotas,
            precio,
            activa:true
        };

        axios.post('http://localhost:8080/room/createHabitacion', data)
            .then(response => {
                alert('Habitación creada exitosamente');
                // Limpiar formulario después de la creación exitosa
                setM2('');
                setNum('');
                setNumCamas('');
                setGama('');
                setMascotas('');
                setPrecio('');
            })
            .catch(error => {
                console.error('Hubo un error al crear la habitación:', error);
                alert('Error al crear la habitación');
            });
    };

    const handleMascotasChange = (e) => {
        setMascotas(e.target.value === 'true');
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
                            <label htmlFor="m2">Metros cuadrados </label>    
                            <input 
                                type="number"
                                name="m2" 
                                id="m2" 
                                value={m2} 
                                onChange={(e) => setM2(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numcamas">Número de camas </label>    
                            <input 
                                type="number"
                                name="numcamas" 
                                id="numcamas" 
                                value={numcamas} 
                                onChange={(e) => setNumCamas(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mascotas">Mascotas</label>    
                                <select 
                                    name="mascotas" 
                                    id="mascotas" 
                                    value={mascotas} 
                                    onChange={handleMascotasChange}
                                >
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                        </div>
                    </div>
                    <div className="der">
                        <div className="form-group">
                            <label htmlFor="num">Número de habitación </label>    
                            <input 
                                type="number"
                                name="num" 
                                id="num" 
                                value={num} 
                                onChange={(e) => setNum(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gama">Gama </label>    
                            <select
                                name="gama"
                                id="gama" 
                                value={gama} 
                                onChange={(e) => setGama(e.target.value)} 
                            >
                                <option value="1">Baja</option>
                                <option value="2">Media</option>
                                <option value="3">Alta</option>
                            </select>
                        </div>     
                        <div className="form-group">
                            <label htmlFor="precio">Precio </label>    
                            <input 
                                type="number"
                                name="precio" 
                                id="precio" 
                                value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} 
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
