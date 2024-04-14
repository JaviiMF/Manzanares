package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Habitacion;
import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Request.DispRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomService {

    List<Habitacion> getHabitacionesDisponibles(DispRequest dispRequest);

    void createRoom(Habitacion habitacion);

    void deleteRoom(Long id);

    List<Habitacion> getAllHabitaciones();
}
