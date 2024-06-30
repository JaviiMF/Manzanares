package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Entity.Reserva;
import com.Hotel.Manzanares.Request.LoginRequest;
import com.Hotel.Manzanares.Response.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CustomerService {

    Optional<Usuario> getUsuario(Long id);


    Usuario getUsuarioDNI(String dni);

    void createUsuario(Usuario usuario);

    void deleteUsuario(String dni);

    void updateUsuario(String dni, Usuario usuario);

    int altaUsuario(String dni);

    int bajaUsuario(String dni);

    LoginResponse loginUsuario(LoginRequest loginRequest);

    List<Usuario> getAllUsuarios();

    List<Reserva> getAllReservas(String dni);
}
