package com.Hotel.Manzanares.Repository;

import com.Hotel.Manzanares.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Usuario, Long> {

    @Modifying
    @Query("update Usuario c set c.activo = false where c.dni =:dni")
    public void deleteByEmail(@Param("dni") String dni);

    public Usuario findByDni(String dni);

    @Query("select u from Usuario u where u.email=:usuario and u.contrasena=:pass")
    Usuario findByUsuarioAndPass(@Param("usuario") String usuario, @Param("pass") String pass);
}
