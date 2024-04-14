package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Gama;
import com.Hotel.Manzanares.Repository.GamaRepository;
import com.Hotel.Manzanares.Service.GamaService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class GamaServiceImpl implements GamaService {

    private final GamaRepository gamaRepository;
    @Override
    public Optional<Gama> getGama(Long id) {
        return gamaRepository.findGamaById(id);
    }

    @Override
    public void createGama(Gama gama) {
        try{
            gamaRepository.save(gama);
        }catch (Exception e){
            System.out.println("Error al grabar la gama" + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteGama(Long id) {
        try{
            gamaRepository.deleteGamaById(id);
        }catch (Exception e){
            System.out.println("Error al grabar la gama" + e.getMessage());
        }
    }

    @Override
    public void updateGama(Long id, Gama gama) {
        Optional<Gama> optionalElemento = gamaRepository.findGamaById(id);

        try {
            if (optionalElemento.isPresent()) {
                Gama elemento = optionalElemento.get();
                elemento.setNombre(gama.getNombre());
                elemento.setDescripcion(gama.getDescripcion());
                elemento.setPrecio(gama.getPrecio());

                gamaRepository.save(elemento);
            } else {
                System.out.println("No se encontró la gama con ID: " + id);
                // Puedes agregar un manejo adicional si el elemento no está presente
            }
        } catch (Exception e) {
            System.out.println("Error al modificar la gama: " + e.getMessage());
            // Puedes manejar la excepción de una manera específica si es necesario
        }

    }

    @Override
    public Optional<Gama> getGamaByNombre(String nombre) {
        return gamaRepository.findByNombre(nombre);
    }
}
