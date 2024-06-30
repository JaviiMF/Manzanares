package com.Hotel.Manzanares.Repository;

import com.Hotel.Manzanares.Entity.Habitacion;
import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Habitacion,Long> {
    @Modifying
    @Query("update Habitacion h set h.activa = false where h.id =:id")
    public void deleteById(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update Habitacion h set h.activa = true where h.id =:id")
    public int enableById(@Param("id") Long id);

}
