package com.Hotel.Manzanares.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "Habitacion")
@Getter
@Setter
public class Habitacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double m2;
    private Integer num;
    private Integer numcamas;
    private Long gama;
    private Boolean mascotas;
    private Double precio;
    private Boolean activa;
}
