package com.Hotel.Manzanares.Controller;


import com.Hotel.Manzanares.Entity.Gama;
import com.Hotel.Manzanares.Service.GamaService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(("/gama"))
@AllArgsConstructor
public class GamaController {

    private final GamaService gamaService;
    @GetMapping("/{id}")
    public Optional<Gama> getGama(@PathVariable Long id){return gamaService.getGama(id);}
    @PostMapping("/createGama")
    public void createGama(@RequestBody Gama gama){gamaService.createGama(gama);}

    @DeleteMapping("/deleteGama/{id}")
    public void deleteGama(@PathVariable Long id){gamaService.deleteGama(id);}

    @PutMapping("/updateGama/{id}")
    public void updateGama(@PathVariable Long id,@RequestBody Gama gama){
        gamaService.updateGama(id,gama);
    }

    @GetMapping("/getGamaByNombre/{nombre}")
    public Optional<Gama> getGamaByNombre(@PathVariable String nombre){return gamaService.getGamaByNombre(nombre);}
}
