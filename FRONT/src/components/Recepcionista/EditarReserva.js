import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CrearReserva.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

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
  const [dniValido, setDniValido] = useState(true); // Estado para el DNI válido
  const [precioTotal, setPrecioTotal] = useState(0); // Estado para el precio total
  const { idReserva } = useParams();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [numerosHabitacion, setNumerosHabitacion] = useState([]);
  const [tipo, setTipo] = useState(localStorage.getItem('userTipo'));
  
  useEffect(() => {
    fetchDescuentos();
    fetchExtras();
    fetchServicios();
    cargarReservas();

    if (tipo === "cliente") {
      navigate('/error');
    }
  }, [navigate]);

  useEffect(() => {
    if (fechaEntrada && fechaSalida) {
      fetchHabitacionesDisponibles(fechaEntrada, fechaSalida);
    }
  }, [fechaEntrada, fechaSalida]);

  useEffect(() => {
    if (dni) {
      verificarDni(dni);
    } else {
      setDniValido(true); // Resetear a válido si el DNI está vacío
    }
  }, [dni]);

  useEffect(() => {
    calcularPrecioTotal();
  }, [habitacion, descuento, extrasSeleccionados, serviciosSeleccionados]);

  const verificarDni = async (dni) => {
    try {
      const response = await axios.get(`http://localhost:8080/customer/find/${dni}`);
      if (response.data) {
        setDniValido(true);
      } else {
        setDniValido(false);
      }
    } catch (error) {
      setDniValido(false);
      console.error('Error:', error);
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
    if (!habitacion) {
      setError('Debe seleccionar una habitación.');
      return;
    }
    setError('');

    try {
      const response = await axios.put(`http://localhost:8080/reserve/updateReserve/${idReserva}`, {
        dniCliente: dni,
        fechaInicio: fechaEntrada,
        fechaFin: fechaSalida,
        idDescuento: parseInt(descuento),
        idHabitacion: parseInt(habitacion),
        listaExtras: extrasSeleccionados.map(extra => extra.id),
        listaServicios: serviciosSeleccionados.map(servicio => servicio.id)
      });
      setMensaje('Reserva actualizada exitosamente');
      setDni('');
      setFechaEntrada('');
      setFechaSalida('');
      setDescuento('');
      setHabitacion('');
      setExtrasSeleccionados([]);
      setServiciosSeleccionados([]);
      setPrecioTotal(0); // Resetear el precio total
      navigate(-1);

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

  const handleHabitacionSeleccionada = (habitacion) => {
    setHabitacion(habitacion.id);
  };

  const getMarginTop = () => {
    const baseMargin = 100; // Margen base de 80px
    const additionalMargin = Math.ceil(habitacionesDisponibles.length / 3) * 575; // 80px adicionales por cada 3 elementos
    return baseMargin + additionalMargin;
  };

  const obtenerMascota = (habitacion) => {
    const mascota = habitacion.mascotas;
    return mascota ? 'Permitidas' : 'No permitidas';
  };

  const obtenerRutaImagen = (habitacion) => {
    const numHabitacion = habitacion.num;
    const gamaHabitacion = habitacion.gama; // ID de la gama de la habitación
    let tipoCama = 'simple';
    if (numHabitacion >= 200 && numHabitacion < 300) {
      tipoCama = 'doble';
    }

    let gama = '';
    switch (gamaHabitacion) {
      case 1:
        gama = 'baja';
        break;
      case 2:
        gama = 'media';
        break;
      case 3:
        gama = 'alta';
        break;
      default:
        gama = 'baja';
    }

    return `/Room_Image/habitacion_${tipoCama}_${gama}.jpg`;
  };

  const calcularPrecioTotal = () => {
    let total = 0;
  
    // Sumar el precio de la habitación seleccionada
    const habitacionSeleccionada = habitacionesDisponibles.find(h => h.id === parseInt(habitacion));
    if (habitacionSeleccionada) {
      total += habitacionSeleccionada.precio;
    }
  
    // Sumar el precio de los extras seleccionados
    extrasSeleccionados.forEach(extra => {
      total += extra.precio;
    });
  
    // Sumar el precio de los servicios seleccionados
    serviciosSeleccionados.forEach(servicio => {
      total += servicio.precio;
    });
  
    // Aplicar descuento seleccionado
    const descuentoSeleccionado = descuentos.find(d => d.id === parseInt(descuento));
    if (descuentoSeleccionado) {
      const descuentoAplicado = total * (descuentoSeleccionado.porcentaje / 100);
      total -= descuentoAplicado;
    }
    total = parseFloat(total.toFixed(2));
    setPrecioTotal(total);
  };

  const formatoPrecio = (precio) => {
    if (typeof precio !== 'number') {
      return ''; // Manejo de valores no numéricos, si es necesario
    }
    return precio.toFixed(2); // Redondea el precio a dos decimales y lo convierte en string
  };

  const cargarReservas = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reserve/get/${idReserva}`);
      console.log(response.data);
  
      // Convertir el response.data en un array si no lo es
      const reservas = Array.isArray(response.data) ? response.data : [response.data];
      setReservas(reservas);
  
      // Obtener el número de habitación directamente del objeto reserva
      const numeroHabitacion = await obtenerNumeroHabitacion(reservas[0].idHabitacion);
      setNumerosHabitacion([numeroHabitacion]); // Puedes almacenarlo en un array si lo necesitas
    } catch (error) {
      console.error('Error cargando reservas:', error);
    }
  };
  
  const obtenerNumeroHabitacion = async (idHabitacion) => {
    try {
      const response = await axios.get(`http://localhost:8080/room/${idHabitacion}`);
      console.log(response.data.num);
      return response.data.num;
    } catch (error) {
      console.error('Error obteniendo número de habitación:', error);
      return '';
    }
  };


  const handleActivarDesactivarReserva = async (idReserva) => {
    try {
      await axios.put(`http://localhost:8080/reserve/${idReserva}/activate`, { activa: true });
      
    } catch (error) {
      console.error('Error activando/desactivando reserva:', error);
    }
  };

  const handleVolver = async () => {
    try {
      await handleActivarDesactivarReserva(idReserva);
      navigate(-1); // Volver a la página anterior en el historial
    } catch (error) {
      console.error('Error activando/desactivando reserva:', error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main-content" style={{ marginTop: getMarginTop() }}>
        <h2 className="mb-4">Crear Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>DNI del Cliente:</label>
                <input
                  type="text"
                  className={`form-control ${!dniValido ? 'is-invalid' : ''}`}
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
                {!dniValido && <small className="text-danger">El DNI no existe.</small>}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Fecha Entrada:</label>
                <input
                  type="date"
                  className="form-control"
                  value={fechaEntrada}
                  onChange={handleFechaEntradaChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Fecha Salida:</label>
                <input
                  type="date"
                  className="form-control"
                  value={fechaSalida}
                  onChange={handleFechaSalidaChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
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
                      {descuento.descripcion} - {descuento.porcentaje}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Habitaciones Disponibles:</label>
                <div className="row">
                  {habitacionesDisponibles.map((habitacionDisponible) => (
                    <div
                      key={habitacionDisponible.id}
                      className={`col-md-4 habitacion-card ${habitacionDisponible.id === habitacion ? 'selected' : ''}`}
                      onClick={() => handleHabitacionSeleccionada(habitacionDisponible)}
                      required
                    >
                      <h5>Habitación {habitacionDisponible.num}</h5>
                      <img
                        src={obtenerRutaImagen(habitacionDisponible)}
                        alt={`Habitación ${habitacionDisponible.num}`}
                        className="img-fluid"
                      />
                      <p>Numero de camas: {habitacionDisponible.numcamas}</p>
                      <p>Precio: ${habitacionDisponible.precio}</p>
                      <p>Metros cuadrados: {habitacionDisponible.m2} m2</p>
                      <p>Mascotas: {obtenerMascota(habitacionDisponible)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <h4>Extras:</h4>
              {extras.map((extra) => (
                <div key={extra.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`extra-${extra.id}`}
                    checked={extrasSeleccionados.some((e) => e.id === extra.id)}
                    onChange={() => handleExtraChange(extra)}
                  />
                  <label className="form-check-label" htmlFor={`extra-${extra.id}`}>
                    {extra.descripcion} - ${extra.precio}
                  </label>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <h4>Servicios:</h4>
              {servicios.map((servicio) => (
                <div key={servicio.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`servicio-${servicio.id}`}
                    checked={serviciosSeleccionados.some((s) => s.id === servicio.id)}
                    onChange={() => handleServicioChange(servicio)}
                  />
                  <label className="form-check-label" htmlFor={`servicio-${servicio.id}`}>
                    {servicio.descripcion} - ${servicio.precio}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="alert alert-danger mt-4">{error}</div>}

          <button type="submit" className="btn btn-primary mt-4" disabled={!dni || !fechaEntrada || !fechaSalida || !descuento || !habitacion}>
            Actualizar Reserva
          </button>

          <button onClick={handleVolver} className="btn btn-primary mt-4">
            Cancelar
          </button>
        </form>
        <div className="mt-4">
          {mensaje && <p>{mensaje}</p>}
          <h4>Precio Total: ${precioTotal}</h4>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2>Reserva</h2>
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">DNI Cliente</th>
                  <th scope="col">Número de Habitación</th>
                  <th scope="col">Fecha Checkin</th>
                  <th scope="col">Fecha Checkout</th>
                  <th scope="col">Estado</th>
                  <th scope="col ">Precio total</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva, index) => (
                  <tr key={reserva.id}>
                    <td>{reserva.dniCliente}</td>
                    <td>{numerosHabitacion[index]}</td>
                    <td>{reserva.fechaCheckin ? reserva.fechaCheckin.split('T')[0] : ''}</td>
                    <td>{reserva.fechaCheckout ? reserva.fechaCheckout.split('T')[0] : ''}</td>
                    <td>{reserva.activa ? 'Activa' : 'Inactiva'}</td>
                    <td>{formatoPrecio(reserva.precioTotal)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearReserva;
