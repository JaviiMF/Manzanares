package com.Hotel.Manzanares.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Comentario")
@Getter
@Setter
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dni_usuario")
    private String dniUsuario;

    @Column(name = "comentario", columnDefinition = "TEXT")
    private String comentario;

    @Column(name = "valoracion")
    private Integer valoracion;
}
