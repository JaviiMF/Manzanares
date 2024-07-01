import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [numerosHabitacion, setNumerosHabitacion] = useState([]);
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory
  const [webmaster, setWebmaster] = useState([]);
  const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));

  useEffect(() => {
    cargarReservas();

    if (tipo === "administrador") {
      setWebmaster(true);
    } else if (tipo === "recepcionista"){
      setWebmaster(false);
    }
    else {        
      navigate('/error');
  }
  }, [navigate]);

  const cargarReservas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reserve/activeReserve');
      console.log(response.data);
      setReservas(response.data);

      const habitacionesPromises = response.data.map(reserva => obtenerNumeroHabitacion(reserva.idHabitacion));
      const numeros = await Promise.all(habitacionesPromises);
      setNumerosHabitacion(numeros);
    } catch (error) {
      console.error('Error cargando reservas:', error);
    }
  };

  const handleActivarDesactivarReserva = async (idReserva, isActive) => {
    try {
      await axios.put(`http://localhost:8080/reserve/${idReserva}/activate`, { activa: isActive });
      cargarReservas();
    } catch (error) {
      console.error('Error activando/desactivando reserva:', error);
    }
  };

  const obtenerNumeroHabitacion = async (idHabitacion) => {
    try {
      const response = await axios.get(`http://localhost:8080/room/${idHabitacion}`);
      return response.data.num;
    } catch (error) {
      console.error(`Error obteniendo número de habitación para ID ${idHabitacion}:`, error);
      return 'Desconocido';
    }
  };

  const handleEditarReserva = (idReserva, isActive) => {
   
    if(isActive==false){
      handleActivarDesactivarReserva(idReserva, isActive)
    }

    navigate(`/editarReserva/${idReserva}`); // Usamos navigate en lugar de history.push
  };

  return (
    <div >
      <h2 className="text-center">Listado de Reservas</h2>
      <table className="table text-center">
        <thead>
          <tr>
            <th>DNI Cliente</th>
            <th>Número de Habitación</th>
            <th>Fecha Check-In</th>
            <th>Fecha Check-Out</th>
            <th>Estado</th>
            {webmaster && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva, index) => (
            <tr key={reserva.id}>
              <td>{reserva.dniCliente}</td>
              <td>{numerosHabitacion[index]}</td>
              <td>{reserva.fechaCheckin.split('T')[0]}</td>
              <td>{reserva.fechaCheckout.split('T')[0]}</td>
              <td>{reserva.activa ? 'Activa' : 'Inactiva'}</td>
              
              {webmaster && (
                <td>
                  <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => handleActivarDesactivarReserva(reserva.id, !reserva.activa)}
                  >
                    {reserva.activa ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEditarReserva(reserva.id,  !reserva.activa)}
                  >
                    Editar
                  </button>
                </td>
              )}     
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarReservas;
