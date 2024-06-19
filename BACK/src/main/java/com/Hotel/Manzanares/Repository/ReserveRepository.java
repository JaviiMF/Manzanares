package com.Hotel.Manzanares.Repository;

import com.Hotel.Manzanares.Entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ReserveRepository extends JpaRepository<Reserva,Long> {
    @Query(value = "select b.id from reserva a right join habitacion b on a.id_habitacion = b.id where a.id_habitacion is null", nativeQuery = true)
    List<Long> getHabitacionesSinReserva();

    @Query(value = "select b.id from reserva a inner join habitacion b on a.id_habitacion = b.id where not (a.fecha_Checkin <= CAST(:fechaFin AS TIMESTAMP) and a.fecha_Checkout >= CAST(:fechaInicio AS TIMESTAMP))", nativeQuery = true)
    Collection<Long> getHabitacionesSiNoReservadas(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);
}
