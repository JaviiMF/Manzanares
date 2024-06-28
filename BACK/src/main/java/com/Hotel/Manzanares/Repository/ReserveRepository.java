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

    @Query(value = "SELECT b.id " +
            "FROM habitacion b " +
            "LEFT JOIN reserva a ON a.id_habitacion = b.id " +
            "AND a.activa = true " + // Considera solo reservas activas
            "WHERE NOT (a.fecha_checkin <= CAST(:fechaFin AS TIMESTAMP) " +
            "AND a.fecha_checkout >= CAST(:fechaInicio AS TIMESTAMP)) " +
            "OR a.id_habitacion IS NULL", nativeQuery = true)
    Collection<Long> getHabitacionesSiNoReservadas(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);
}
