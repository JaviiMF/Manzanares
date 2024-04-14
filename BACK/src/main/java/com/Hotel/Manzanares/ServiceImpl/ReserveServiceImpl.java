package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Extras;
import com.Hotel.Manzanares.Entity.Habitacion;
import com.Hotel.Manzanares.Entity.Reserva;
import com.Hotel.Manzanares.Entity.Servicio;
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

        try{

            Double gama_price = gamaRepository.findByNombre(roomRepository.findById(reserveRequest.getIdHabitacion()).get().getGama().toString()).get().getPrecio();
            Integer porcentaje_descuento = descuentoRepository.findById(reserveRequest.getIdDescuento()).get().getPorcentaje();
            List<Servicio> listaServicios = servicioRepository.findAllById(reserveRequest.getListaServicios());
            List<Extras> listaExtras = extrasRepository.findAllById(reserveRequest.getListaExtras());
            Double servicios_price = 0.0;
            Double extras_price = 0.0;

            for (Servicio servicio:listaServicios){
                servicios_price+=servicio.getPrecio();
            }

            for (Extras extra:listaExtras){
                extras_price+=extra.getPrecio();
            }

            Double suma_price=gama_price+servicios_price+extras_price;
            Double total_price = suma_price-(suma_price*(porcentaje_descuento/100));

            Reserva reserva = new Reserva();
            reserva.setDniCliente(reserveRequest.getDniCliente());
            reserva.setIdHabitacion(reserveRequest.getIdHabitacion());
            reserva.setFechaAlta(new Date());
            reserva.setFechaCheckin(new SimpleDateFormat("yyyy-MM-dd").parse(reserveRequest.getFechaInicio()));
            reserva.setFechaCheckout(new SimpleDateFormat("yyyy-MM-dd").parse(reserveRequest.getFechaFin()));
            reserva.setIdDescuento(reserveRequest.getIdDescuento());
            reserva.setListaServicios(reserveRequest.getListaServicios().toString());
            reserva.setListaExtras(reserveRequest.getListaExtras().toString());
            reserva.setPrecioTotal(total_price);

            reserveRepository.save(reserva);

            respuesta = "Reserva realizada con Exito";

        } catch (Exception e){
            System.out.println("Error creando la reserva" + e.getMessage());
            respuesta = "Error creando la reserva" + e.getMessage();
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
