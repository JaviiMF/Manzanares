package com.Hotel.Manzanares.Repository;

import com.Hotel.Manzanares.Entity.Extras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExtrasRepository extends JpaRepository<Extras, Long> {

    public void deleteById(@Param("id") Long id);

    public Optional<Extras> findExtrasById(Long id);
}
