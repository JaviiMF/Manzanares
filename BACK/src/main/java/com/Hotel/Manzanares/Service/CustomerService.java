package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Request.LoginRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CustomerService {

    Optional<Usuario> getUsuario(Long id);

    Optional<Usuario>getUsuarioDni(String dni);
    void createUsuario(Usuario usuario);

    void deleteUsuario(String dni);

    void updateUsuario(String dni, Usuario usuario);

    String loginUsuario(LoginRequest loginRequest);

    List<Usuario> getAllUsuarios();
}
