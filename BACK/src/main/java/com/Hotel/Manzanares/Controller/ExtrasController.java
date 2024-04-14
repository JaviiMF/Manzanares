package com.Hotel.Manzanares.Controller;

import com.Hotel.Manzanares.Service.ExtrasService;
import lombok.AllArgsConstructor;
import com.Hotel.Manzanares.Entity.Extras;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(("/extras"))
@AllArgsConstructor
public class ExtrasController {

    public final ExtrasService extrasService;

    @GetMapping("/{id}")
    public Optional<Extras> getExtras(@PathVariable Long id){
        return extrasService.getExtras(id);
    }

    @PostMapping("/createExtras")
    public void createExtras(@RequestBody Extras extras){
        extrasService.createExtras(extras);
    }

    @DeleteMapping("/deleteExtras/{id}")
    public void deleteExtras(@PathVariable Long id){
        extrasService.deleteExtras(id);
    }

    @PutMapping("/updateExtras/{id}")
    public void updateExtras(@PathVariable Long id,@RequestBody Extras extras){
        extrasService.updateExtras(id,extras);
    }
}
