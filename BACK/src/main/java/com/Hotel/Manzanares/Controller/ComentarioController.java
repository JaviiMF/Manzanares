package com.Hotel.Manzanares.Controller;

import com.Hotel.Manzanares.Entity.Comentario;
import com.Hotel.Manzanares.Service.ComentarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all")
    public List<Comentario> getAllComentario(){
        return comentarioService.getAllComentarios();
    }

    @DeleteMapping("/deleteComentario/{id}")
    public int deleteComentario(@PathVariable Long id){
        return comentarioService.deleteComentary(id);
    }
}
