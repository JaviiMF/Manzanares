import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function CrearReserva() {
  const [dni, setDni] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [descuentos, setDescuentos] = useState([]); // Agregamos el estado descuentos
  const [habitacion, setHabitacion] = useState('');
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [error, setError] = useState('');
  const [descuento, setDescuento] = useState('');

  /*const descuentos = [
    { value: '0', label: '0%' },
    { value: '10', label: '10%' },
    { value: '20', label: '20%' },
  ];*/

  useEffect(() => {
    if (fechaEntrada && fechaSalida) {
      fetchHabitacionesDisponibles(fechaEntrada, fechaSalida);
    }
  }, [fechaEntrada, fechaSalida]);

  const fetchHabitacionesDisponibles = async (fechaEntrada, fechaSalida) => {
    try {
      const response = await axios.post('http://localhost:8080/room/disponibles', {
        fechaInicio: fechaEntrada,
        fechaFin: fechaSalida,
      });
      setHabitacionesDisponibles(response.data);
    } catch (error) {
      console.error('Error fetching available rooms', error);
    }
  };

  const fetchDescuentos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/descuento/allDescuentos');
      setDescuentos(response.data);
    } catch (error) {
      console.error('Error fetching discounts', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(fechaSalida) < new Date(fechaEntrada)) {
      setError('La fecha de salida no puede ser menor que la fecha de entrada.');
      return;
    }
    setError('');
    console.log({
      dni,
      fechaEntrada,
      fechaSalida,
      descuento,
      habitacion,
    });
    // Aquí puedes añadir el código para manejar el envío del formulario
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options).replace(/-/g, '/');
  };

  const handleFechaEntradaChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setFechaEntrada(formattedDate);
  };

  const handleFechaSalidaChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setFechaSalida(formattedDate);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>DNI del Cliente:</label>
              <input
                type="text"
                className="form-control"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Fecha de Entrada:</label>
              <input
                type="date"
                className="form-control"
                onChange={handleFechaEntradaChange}
                required
              />
              <small className="form-text text-muted">Formato esperado: yyyy/mm/dd</small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Fecha de Salida:</label>
              <input
                type="date"
                className="form-control"
                onChange={handleFechaSalidaChange}
                required
              />
              <small className="form-text text-muted">Formato esperado: yyyy/mm/dd</small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
            <label>Descuento:</label>
              <select
                className="form-control"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                required
              >
                <option value="">Selecciona un descuento</option>
                {descuentos.map((descuento) => (
                  <option key={descuento.id} value={descuento.id}>
                    {descuento.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Habitación:</label>
              <select
                className="form-control"
                value={habitacion}
                onChange={(e) => setHabitacion(e.target.value)}
                required
              >
                <option value="">Selecciona una habitación</option>
                {habitacionesDisponibles.map((habitacion) => (
                  <option key={habitacion.id} value={habitacion.id}>
                    {habitacion.num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Crear Reserva
        </button>
      </form>
    </div>
  );
}

export default CrearReserva;
