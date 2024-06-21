import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CrearReserva.css'; // Asegúrate de importar tu archivo CSS
import axios from 'axios';

function CrearReserva() {
  const [dni, setDni] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [descuento, setDescuento] = useState('');
  const [habitacion, setHabitacion] = useState('');
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [extras, setExtras] = useState([]);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (fechaEntrada && fechaSalida) {
      fetchHabitacionesDisponibles(fechaEntrada, fechaSalida);
    }
    fetchDescuentos();
    fetchExtras();
    fetchServicios();
  }, [fechaEntrada, fechaSalida]);

  const fetchDescuentos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/descuento/allDescuentos');
      setDescuentos(response.data);
    } catch (error) {
      console.error('Error fetching discounts', error);
    }
  };

  const fetchExtras = async () => {
    try {
      const response = await axios.get('http://localhost:8080/extras/allExtras');
      setExtras(response.data);
    } catch (error) {
      console.error('Error fetching extras', error);
    }
  };

  const fetchServicios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/servicio/allServicios');
      setServicios(response.data);
    } catch (error) {
      console.error('Error fetching servicios', error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(fechaSalida) < new Date(fechaEntrada)) {
      setError('La fecha de salida no puede ser menor que la fecha de entrada.');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/reserve/createReserve', {
        dniCliente: dni,
        fechaInicio: fechaEntrada,
        fechaFin: fechaSalida,
        idDescuento: parseInt(descuento),
        idHabitacion: parseInt(habitacion),
        listaExtras: extrasSeleccionados.map(extra => extra.id),
        listaServicios: serviciosSeleccionados.map(servicio => servicio.id)
      });
      setMensaje('Reserva creada exitosamente');
      setDni('');
      setFechaEntrada('');
      setFechaSalida('');
      setDescuento('');
      setHabitacion('');
      setExtrasSeleccionados([]);
      setServiciosSeleccionados([]);
    } catch (error) {
      console.error('Error creating reservation', error);
      setError('Error al crear la reserva. Por favor, intenta nuevamente.');
    }
  };

  const handleFechaEntradaChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setFechaEntrada(formattedDate);
  };

  const handleFechaSalidaChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setFechaSalida(formattedDate);
  };

  const handleExtraChange = (extra) => {
    setExtrasSeleccionados((prevExtras) => {
      if (prevExtras.includes(extra)) {
        return prevExtras.filter((e) => e !== extra);
      } else {
        return [...prevExtras, extra];
      }
    });
  };

  const handleServicioChange = (servicio) => {
    setServiciosSeleccionados((prevServicio) => {
      if (prevServicio.includes(servicio)) {
        return prevServicio.filter((e) => e !== servicio);
      } else {
        return [...prevServicio, servicio];
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0]; // Formatea a yyyy-MM-dd
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
              <small className="form-text text-muted">Formato esperado: yyyy-MM-dd</small>
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
              <small className="form-text text-muted">Formato esperado: yyyy-MM-dd</small>
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
          <div className="col-md-6">
            <div className="form-group">
              <label>Extras:</label>
              <div>
                {extras.map((extra) => (
                  <div key={extra.id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`extra-${extra.id}`}
                      checked={extrasSeleccionados.includes(extra)}
                      onChange={() => handleExtraChange(extra)}
                    />
                    <label className="form-check-label" htmlFor={`extra-${extra.id}`}>
                      {extra.descripcion} {extra.precio}€
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Servicios:</label>
              <div>
                {servicios.map((servicio) => (
                  <div key={servicio.id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`servicio-${servicio.id}`}
                      checked={serviciosSeleccionados.includes(servicio)}
                      onChange={() => handleServicioChange(servicio)}
                    />
                    <label className="form-check-label" htmlFor={`servicio-${servicio.id}`}>
                      {servicio.descripcion} {servicio.precio}€
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Crear Reserva
        </button>
      </form>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
    </div>
  );
}

export default CrearReserva;
