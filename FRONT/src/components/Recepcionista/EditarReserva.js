import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarReserva = () => {
  const { idReserva } = useParams();
  const [reserva, setReserva] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/reserve/${idReserva}`);
        setReserva(response.data);
      } catch (error) {
        console.error('Error fetching reserva:', error);
      }
    };

    fetchReserva();
  }, [idReserva]);

  const handleGuardarCambios = async () => {
    // Implementa la lógica para guardar los cambios
    // Por ejemplo, podrías usar axios.put para actualizar la reserva
    try {
      await axios.put(`http://localhost:8081/reserve/${idReserva}`, reserva);
      navigate('/'); // Navega de vuelta al listado de reservas después de editar
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (!reserva) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container">
      <h2>Editar Reserva</h2>
      <form>
        <div className="form-group">
          <label htmlFor="dniCliente">DNI Cliente</label>
          <input
            type="text"
            className="form-control"
            id="dniCliente"
            value={reserva.dniCliente}
            onChange={(e) => setReserva({ ...reserva, dniCliente: e.target.value })}
          />
        </div>
        {/* Agrega más campos de formulario para editar la reserva */}
        <button type="button" className="btn btn-primary" onClick={handleGuardarCambios}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarReserva;
