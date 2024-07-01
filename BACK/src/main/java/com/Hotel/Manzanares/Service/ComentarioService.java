package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Comentario;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ComentarioService {
    Boolean addComentary(Comentario comentario);

    List<Comentario> getAllComentarios();

    int deleteComentary(Long id);
}
