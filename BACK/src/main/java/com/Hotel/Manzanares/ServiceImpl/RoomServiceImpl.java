package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Habitacion;
import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Repository.ReserveRepository;
import com.Hotel.Manzanares.Repository.RoomRepository;
import com.Hotel.Manzanares.Request.DispRequest;
import com.Hotel.Manzanares.Service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    private final ReserveRepository reserveRepository;


    @Override
    public List<Habitacion> getHabitacionesDisponibles(DispRequest dispRequest) {

        List<Long> habitaciones = new ArrayList<>();

        try{
            habitaciones.addAll(reserveRepository.getHabitacionesSinReserva());
            habitaciones.addAll(reserveRepository.getHabitacionesSiNoReservadas(dispRequest.getFechaInicio(),
                    dispRequest.getFechaFin()));
        } catch (Exception e){
            System.out.println("Error al obtener habitaciones disponibles" + e.getMessage());
        }

        return roomRepository.findAllById(habitaciones);
    }

    @Override
    public void createRoom(Habitacion habitacion) {
        try{
            roomRepository.save(habitacion);
        } catch (Exception e){
            System.out.println("Errror creando la habitación" + e.getMessage());
        }

    }

    @Override
    public void deleteRoom(Long id) {
        try{
            roomRepository.deleteById(id);
        } catch (Exception e){
            System.out.println("Error eliminando la habitacion" + e.getMessage());
        }
    }

    @Override
    public List<Habitacion> getAllHabitaciones() {
        return roomRepository.findAll();
    }
}
