package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Reserva;
import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Request.LoginRequest;
import com.Hotel.Manzanares.Response.LoginResponse;
import com.Hotel.Manzanares.Service.CustomerService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import com.Hotel.Manzanares.Repository.CustomerRepository;


import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public Optional<Usuario> getUsuario(Long id){
        return customerRepository.findById(id);
    }

    public Usuario getUsuarioDNI(String dni){
        return customerRepository.findByDni(dni);
    }


    @Override
    public void createUsuario(Usuario usuario) {
        try{
            if(usuario.getTipo()==null){
                usuario.setActivo(true);
                usuario.setTipo("cliente");
            }

            customerRepository.save(usuario);
        } catch (Exception e){
            System.out.println("Error al grabar al usuario" + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteUsuario(String dni) {
        try {
            customerRepository.deleteByEmail(dni);
        } catch (Exception e){
            System.out.println("Error al eliminar usuario" + e.getMessage());
        }
    }

    @Override
    public void updateUsuario(String dni, Usuario usuario) {
        try {
            Usuario elemento = customerRepository.findByDni(dni);

            if(elemento != null){
                elemento.setActivo(usuario.getActivo());
                elemento.setDireccion(usuario.getDireccion());
                elemento.setDni(usuario.getDni());
                elemento.setHorario(usuario.getHorario());
                elemento.setEmail(usuario.getEmail());
                elemento.setPassword(usuario.getPassword());
                elemento.setTipo(usuario.getTipo());
                elemento.setNombre(usuario.getNombre());
                elemento.setTelefono(usuario.getTelefono());

                customerRepository.save(elemento);
            }
        } catch (Exception e){
            System.out.println("Error al modificar usuario" + e.getMessage());
        }
    }

    @Override
    public LoginResponse loginUsuario(LoginRequest loginRequest) {

        LoginResponse loginResponse = new LoginResponse();

       try{
           Usuario usuario = customerRepository.findByUsuarioAndPass(loginRequest.getUsuario(), loginRequest.getPass());
           if(usuario != null){
               loginResponse.setDni(usuario.getDni());
               loginResponse.setTipo(usuario.getTipo());
           }
       } catch (Exception e) {
           System.out.println("Error en el login" + e.getMessage());
       }

        return loginResponse;
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return customerRepository.findAll();
    }

    @Override
    public int altaUsuario(String dni){
        return customerRepository.altaByDni(dni);
    }

    @Override
    public int bajaUsuario(String dni){
        return customerRepository.bajaByDni(dni);
    }

    @Override
    public List<Reserva> getAllReservas(String dni){
        return customerRepository.findByCliente(dni);
    }
}
