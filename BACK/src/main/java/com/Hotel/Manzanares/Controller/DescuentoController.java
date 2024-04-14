package com.Hotel.Manzanares.Controller;


import com.Hotel.Manzanares.Entity.Descuento;
import com.Hotel.Manzanares.Service.DescuentoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(("/descuento"))
@AllArgsConstructor
public class DescuentoController {

    private final DescuentoService descuentoService;

    @GetMapping("/{id}")
    Optional<Descuento>getDescuento(@PathVariable Long id){
        return descuentoService.getDescuento(id);
    }

    @PostMapping("/createDescuento")
    public void createDescuento(@RequestBody Descuento descuento){
        descuentoService.createDescuento(descuento);
    }

    @DeleteMapping("/deleteDescuento/{id}")
    public void deleteDescuento(@PathVariable Long id){
        descuentoService.deleteDescuento(id);
    }
    @PutMapping("/updateDescuento/{id}")
    public void updateDescuento(@PathVariable Long id,@RequestBody Descuento descuento ) {
        descuentoService.updateDescuento(id,descuento);
    }
    @GetMapping("/allDescuentos")
    public List<Descuento> getAllDescuentos(){
        return descuentoService.getAllDescuentos();
    }
}
