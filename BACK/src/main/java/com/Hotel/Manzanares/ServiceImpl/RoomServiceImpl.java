package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Habitacion;
import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Repository.ReserveRepository;
import com.Hotel.Manzanares.Repository.RoomRepository;
import com.Hotel.Manzanares.Request.DispRequest;
import com.Hotel.Manzanares.Service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {

    @Autowired
    private final RoomRepository roomRepository;

    @Autowired
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

    /*@Override
    public void updateHabitacion(String dni, Habitacion habitacion) {
        try {
            Usuario elemento = customerRepository.findByDni(dni);

            if(elemento != null){
                elemento.setActivo(usuario.getActivo());
                elemento.setDireccion(usuario.getDireccion());
                elemento.setDni(usuario.getDni());
                elemento.setHorario(usuario.getHorario());
                elemento.setEmail(usuario.getEmail());
                elemento.setPassword(usuario.getPassword());
                elemento.setTipo(usuario.getTipo());
                elemento.setNombre(usuario.getNombre());
                elemento.setTelefono(usuario.getTelefono());

                customerRepository.save(elemento);
            }
        } catch (Exception e){
            System.out.println("Error al modificar usuario" + e.getMessage());
        }
    }*/

    @Override
    public List<Habitacion> getAllHabitaciones() {
        return roomRepository.findAll();
    }

    @Override
    public Optional<Habitacion> getRoom(Long id){return roomRepository.findById(id);}

    @Override
    public int enableRoom(Long id) {
        return roomRepository.enableById(id);
    }
}
