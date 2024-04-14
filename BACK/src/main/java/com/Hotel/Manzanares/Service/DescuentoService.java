package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Descuento;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface DescuentoService {

    Optional<Descuento> getDescuento(Long id);

    void createDescuento(Descuento descuento);

    void deleteDescuento(Long id);

    void updateDescuento(Long id,Descuento descuento);

    List<Descuento> getAllDescuentos();
}
