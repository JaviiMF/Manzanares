package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.*;
import com.Hotel.Manzanares.Repository.*;
import com.Hotel.Manzanares.Request.ReserveRequest;
import com.Hotel.Manzanares.Service.ReserveService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ReserveServiceImpl implements ReserveService {

    private final DescuentoRepository descuentoRepository;
    private final ServicioRepository servicioRepository;
    private final ExtrasRepository extrasRepository;
    private final RoomRepository roomRepository;
    private final GamaRepository gamaRepository;
    private final ReserveRepository reserveRepository;

    @Override
    public String createReserve(ReserveRequest reserveRequest) {
        String respuesta = "";

        try {
            // Validar que los IDs de habitacion y descuento no sean null
            if (reserveRequest.getIdHabitacion() == null) {
                throw new IllegalArgumentException("El id de la habitación no puede ser null");
            }
            if (reserveRequest.getIdDescuento() == null) {
                throw new IllegalArgumentException("El id del descuento no puede ser null");
            }
            if (reserveRequest.getDniCliente() == null || reserveRequest.getDniCliente().isEmpty()) {
                throw new IllegalArgumentException("El DNI del cliente no puede ser null o vacío");
            }
            if (reserveRequest.getFechaInicio() == null || reserveRequest.getFechaInicio().isEmpty()) {
                throw new IllegalArgumentException("La fecha de inicio no puede ser null o vacía");
            }
            if (reserveRequest.getFechaFin() == null || reserveRequest.getFechaFin().isEmpty()) {
                throw new IllegalArgumentException("La fecha de fin no puede ser null o vacía");
            }

            // Obtener precio de la gama de la habitación
            Habitacion room = roomRepository.findById(reserveRequest.getIdHabitacion())
                    .orElseThrow(() -> new IllegalArgumentException("Habitación no encontrada"));

            Gama gama = gamaRepository.findByNombre(room.getGama().toString())
                    .orElseThrow(() -> new IllegalArgumentException("Gama no encontrada"));

            Double room_price = room.getPrecio();

            // Obtener porcentaje de descuento
            Descuento descuento = descuentoRepository.findById(reserveRequest.getIdDescuento())
                    .orElseThrow(() -> new IllegalArgumentException("Descuento no encontrado"));

            Integer porcentaje_descuento = descuento.getPorcentaje();
            Double servicios_price=0.0;
            if(reserveRequest.getListaServicios()!=null){
                // Obtener lista de servicios y calcular el precio total
                List<Servicio> listaServicios = servicioRepository.findAllById(reserveRequest.getListaServicios());
                 servicios_price = listaServicios.stream().mapToDouble(Servicio::getPrecio).sum();
            }

            Double extras_price=0.0;
            if(reserveRequest.getListaExtras()!=null) {
                // Obtener lista de extras y calcular el precio total
                List<Extras> listaExtras = extrasRepository.findAllById(reserveRequest.getListaExtras());
                 extras_price = listaExtras.stream().mapToDouble(Extras::getPrecio).sum();
            }
            // Calcular el precio total de la reserva
            Double suma_price = room_price + servicios_price + extras_price;
            Double total_price = suma_price - (suma_price * (porcentaje_descuento / 100.0));

            // Crear la reserva
            Reserva reserva = new Reserva();
            reserva.setDniCliente(reserveRequest.getDniCliente());
            reserva.setIdHabitacion(reserveRequest.getIdHabitacion());
            reserva.setFechaAlta(new Date());
            reserva.setFechaCheckin(new SimpleDateFormat("yyyy-MM-dd").parse(reserveRequest.getFechaInicio()));
            reserva.setFechaCheckout(new SimpleDateFormat("yyyy-MM-dd").parse(reserveRequest.getFechaFin()));
            reserva.setIdDescuento(reserveRequest.getIdDescuento());
            if(reserveRequest.getListaServicios()!=null) {
                reserva.setListaServicios(reserveRequest.getListaServicios().toString());
            }else{
                reserva.setListaServicios(null);
            }

            if(reserveRequest.getListaExtras()!=null) {
                reserva.setListaExtras(reserveRequest.getListaExtras().toString());
            }else{
                reserva.setListaExtras(null);
            }
            reserva.setPrecioTotal(total_price);

            // Guardar la reserva en el repositorio
            reserveRepository.save(reserva);

            respuesta = "Reserva realizada con éxito";

        } catch (Exception e) {
            System.out.println("Error creando la reserva: " + e.getMessage());
            respuesta = "Error creando la reserva: " + e.getMessage();
        }

        return respuesta;
    }

    @Override
    public Boolean payReserve() {
        return true;
    }

    @Override
    public List<Reserva> getReservasActivas() {
        return reserveRepository.findAll();
    }
}
