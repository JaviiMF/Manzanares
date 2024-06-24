package com.Hotel.Manzanares.Controller;

import com.Hotel.Manzanares.Entity.Habitacion;
import com.Hotel.Manzanares.Entity.Servicio;
import com.Hotel.Manzanares.Repository.ServicioRepository;
import com.Hotel.Manzanares.Service.ServicioService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(("/servicio"))
@AllArgsConstructor
public class ServicioController {

    private final ServicioService servicioService;

    @GetMapping("/{id}")
    public Optional<Servicio> getServicio(@PathVariable Long id){
       return servicioService.getServicio(id);
    }
    @PostMapping("/createServicio")
    public void createServicio(@RequestBody Servicio servicio){
        servicioService.createService(servicio);
    }
    @DeleteMapping("/deleteServicio/{id}")
    public void deleteServicio(@PathVariable Long id){
        servicioService.deleteServicio(id);
    }

    @PutMapping("/updateServicio/{id}")
    public void updateServicio(@PathVariable Long id,@RequestBody Servicio servicio){
        servicioService.updateServicio(id,servicio);
    }

    @GetMapping("/allServicios")
    public List<Servicio>getAllServicios(){
        return servicioService.getAllServicios();
    }
}
