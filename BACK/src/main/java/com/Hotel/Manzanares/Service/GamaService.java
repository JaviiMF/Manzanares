package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Gama;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public interface GamaService {

    Optional<Gama> getGama(Long id);

    void createGama(Gama gama);

    void deleteGama(Long id);

    void updateGama(Long id, Gama gama);

    Optional<Gama> getGamaByNombre(String nombre);
}
