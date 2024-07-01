package com.Hotel.Manzanares.Repository;

import com.Hotel.Manzanares.Entity.Comentario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {

    @Modifying
    @Transactional
    @Query("delete Comentario c where c.id =:id")
    public int deleteComentarioById(@Param("id") Long id);
}
