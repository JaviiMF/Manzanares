package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Descuento;
import com.Hotel.Manzanares.Repository.DescuentoRepository;
import com.Hotel.Manzanares.Service.DescuentoService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DescuentoServiceImpl implements DescuentoService {

    private final DescuentoRepository descuentoRepository;
    @Override
    public Optional<Descuento> getDescuento(Long id) {
        return descuentoRepository.findDescuentoById(id);
    }

    @Override
    public void createDescuento(Descuento descuento) {
        try{
            descuentoRepository.save(descuento);
        }catch (Exception e){
            System.out.println("Error al grabar el descuento: "+e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteDescuento(Long id) {
        try{
            descuentoRepository.deleteDescuentoBy(id);
        }catch (Exception e){
            System.out.println("Error al eliminar el descuento: "+e.getMessage());
        }
    }

    @Override
    public void updateDescuento(Long id, Descuento descuento) {
        Optional<Descuento> optionalElemento = descuentoRepository.findDescuentoById(id);

        try {
            if (optionalElemento.isPresent()) {
                Descuento elemento = optionalElemento.get();
                elemento.setDescripcion(descuento.getDescripcion());
                elemento.setPorcentaje(descuento.getPorcentaje());

                descuentoRepository.save(elemento);
            } else {
                System.out.println("No se encontró el descuento con ID: " + id);
                // Puedes agregar un manejo adicional si el elemento no está presente
            }
        } catch (Exception e) {
            System.out.println("Error al modificar el descuento: " + e.getMessage());
            // Puedes manejar la excepción de una manera específica si es necesario
        }
    }

    @Override
    public List<Descuento> getAllDescuentos() {
        return descuentoRepository.findAll();
    }
}
