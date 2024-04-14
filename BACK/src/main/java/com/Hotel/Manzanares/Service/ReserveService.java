package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Reserva;
import com.Hotel.Manzanares.Request.ReserveRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReserveService {

    String createReserve(ReserveRequest reserveRequest);

    Boolean payReserve();

    List<Reserva> getReservasActivas();
}
