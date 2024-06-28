package com.Hotel.Manzanares.Controller;

import com.Hotel.Manzanares.Entity.Habitacion;
import com.Hotel.Manzanares.Entity.Reserva;
import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Request.ReserveRequest;
import com.Hotel.Manzanares.Service.ReserveService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(("/reserve"))
@AllArgsConstructor
public class ReserveController {

    private final ReserveService reserveService;

    @PostMapping("/createReserve")
    public String createReserve(@RequestBody ReserveRequest reserveRequest){
        return reserveService.createReserve(reserveRequest);
    }

    @PutMapping("/updateReserve/{id}")
    public ResponseEntity<String> updateReserve(@PathVariable Long id, @RequestBody ReserveRequest reserveRequest) {
        String response = reserveService.updateReserve(id, reserveRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/payReserve")
    public Boolean payReserve(){
        return reserveService.payReserve();
    }

    @GetMapping("/activeReserve")
    public List<Reserva> getReservasActivas(){
        return reserveService.getReservasActivas();
    }

    @PutMapping("/{id}/activate")
    public void updateActivar(@PathVariable Long id, @RequestBody Reserva reserva) {
        reserveService.updateActivate(id, reserva.isActiva());
    }

    @GetMapping ("/get/{id}")
    public Optional<Reserva> getReserva(@PathVariable Long id){
        return reserveService.getReserva(id);
    }

}
