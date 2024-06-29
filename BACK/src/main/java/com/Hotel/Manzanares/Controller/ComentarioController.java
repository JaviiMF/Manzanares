package com.Hotel.Manzanares.Controller;

import com.Hotel.Manzanares.Entity.Comentario;
import com.Hotel.Manzanares.Service.ComentarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(("/comentario"))
@AllArgsConstructor
public class ComentarioController {

    @Autowired
    final ComentarioService comentarioService;

    @PostMapping("/addComentario")
    public Boolean addComentario(@RequestBody Comentario comentario){
        try{
            comentarioService.addComentary(comentario);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
