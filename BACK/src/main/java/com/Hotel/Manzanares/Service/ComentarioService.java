package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Comentario;
import org.springframework.stereotype.Service;

@Service
public interface ComentarioService {
    Boolean addComentary(Comentario comentario);
}
