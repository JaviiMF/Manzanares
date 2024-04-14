package com.Hotel.Manzanares.Repository;

import com.Hotel.Manzanares.Entity.Descuento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DescuentoRepository extends JpaRepository<Descuento,Long> {

    @Modifying
    @Query("DELETE FROM Descuento d WHERE d.id = :id")
    public void deleteDescuentoBy(@Param("id") Long id);

    public Optional<Descuento> findDescuentoById(Long id);
}
