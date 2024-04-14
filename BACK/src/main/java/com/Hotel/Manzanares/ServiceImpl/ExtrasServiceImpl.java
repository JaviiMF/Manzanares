package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Extras;
import com.Hotel.Manzanares.Repository.ExtrasRepository;
import com.Hotel.Manzanares.Service.ExtrasService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ExtrasServiceImpl implements ExtrasService {

    private final ExtrasRepository extrasRepository;
    @Override
    public Optional<Extras> getExtras(Long id) {
        return extrasRepository.findExtrasById(id);
    }

    @Override
    public void createExtras(Extras extras) {
        try{
            extrasRepository.save(extras);
        }catch (Exception e){
            System.out.println("Error al grabar el extra: "+e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteExtras(Long id) {
        try{
            extrasRepository.deleteById(id);
        }catch (Exception e){
            System.out.println("Error al eliminar el extra: "+e.getMessage());
        }
    }

    @Override
    public void updateExtras(Long id, Extras extra) {
        try {
            Optional<Extras> optionalElemento = extrasRepository.findExtrasById(id);

            if (optionalElemento.isPresent()) {
                Extras elemento = optionalElemento.get();
                elemento.setDescripcion(extra.getDescripcion());
                elemento.setPrecio(extra.getPrecio());

                extrasRepository.save(elemento);
            } else {
                System.out.println("No se encontró el extra con ID: " + id);
                // Puedes agregar un manejo adicional si el elemento no está presente
            }

        } catch (Exception e) {
            System.out.println("Error al modificar el extra: " + e.getMessage());
            // Puedes manejar la excepción de una manera específica si es necesario
        }
    }
}
