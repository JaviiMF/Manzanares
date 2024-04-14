package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Usuario;
import com.Hotel.Manzanares.Request.LoginRequest;
import com.Hotel.Manzanares.Service.CustomerService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
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
                elemento.setContrasena(usuario.getContrasena());
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
    public String loginUsuario(LoginRequest loginRequest) {
        String tipo = "";

       try{
           Usuario usuario = customerRepository.findByUsuarioAndPass(loginRequest.getUsuario(), loginRequest.getPass());
           if(usuario != null){
               tipo = usuario.getTipo();
           }
       } catch (Exception e) {
           System.out.println("Error en el login" + e.getMessage());
       }

        return tipo;
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return customerRepository.findAll();
    }
}
