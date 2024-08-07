package com.Hotel.Manzanares.Controller;

import com.Hotel.Manzanares.Entity.Reserva;
import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Request.LoginRequest;
import com.Hotel.Manzanares.Response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import com.Hotel.Manzanares.Service.CustomerService;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(("/customer"))
@AllArgsConstructor
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuario(@PathVariable Long id){
        return customerService.getUsuario(id);
    }


    @GetMapping("/find/{dni}")
    public Usuario getUsuarioDNI(@PathVariable String dni){
        return customerService.getUsuarioDNI(dni);
    }


    @PostMapping("/createUsuario")
    public void createUsuario(@RequestBody Usuario usuario){
        customerService.createUsuario(usuario);
    }

    @DeleteMapping("/deleteUsuario/{dni}")
    public void deleteUsuario(@PathVariable String dni){
        customerService.deleteUsuario(dni);
    }

    @PutMapping("/updateUsuario/{dni}")
    public void updateUsuario(@PathVariable String dni, @RequestBody Usuario usuario){
        customerService.updateUsuario(dni,usuario);
    }

    @GetMapping("/all")
    public List<Usuario> getAllUsuarios(){
        return customerService.getAllUsuarios();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){
        return customerService.loginUsuario(loginRequest);
    }

    @GetMapping("/baja/{dni}")
    public int bajaUsuario(@PathVariable String dni){
        return customerService.bajaUsuario(dni);
    }

    @GetMapping("/alta/{dni}")
    public int altaUsuario(@PathVariable String dni){
        return customerService.altaUsuario(dni);
    }

    @GetMapping("/reservas/{dni}")
    public List<Reserva> listadoReservas(@PathVariable String dni){
        return customerService.getAllReservas(dni);
    }
}