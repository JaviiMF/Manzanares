package com.Hotel.Manzanares.ServiceImpl;

import com.Hotel.Manzanares.Entity.Comentario;
import com.Hotel.Manzanares.Repository.ComentarioRepository;
import com.Hotel.Manzanares.Service.ComentarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ComentarioServiceImpl implements ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Override
    public Boolean addComentary(Comentario comentario) {
        try{
            comentarioRepository.save(comentario);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
