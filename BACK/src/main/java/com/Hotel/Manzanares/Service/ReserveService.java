package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Habitacion;
import com.Hotel.Manzanares.Entity.Reserva;
import com.Hotel.Manzanares.Request.ReserveRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ReserveService {

    String createReserve(ReserveRequest reserveRequest);

    Boolean payReserve();

    List<Reserva> getReservasActivas();

    void updateActivate(Long id, boolean isActive);

    Optional<Reserva> getReserva(Long id);

    String updateReserve(Long id, ReserveRequest reserveRequest);
}
