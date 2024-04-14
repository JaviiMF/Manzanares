package com.Hotel.Manzanares.Repository;

import com.Hotel.Manzanares.Entity.Gama;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GamaRepository extends JpaRepository<Gama, Long> {

    public void deleteGamaById(@Param("id") Long id);

    public Optional<Gama> findGamaById(Long id);

    Optional<Gama> findByNombre(String nombre);
}
