package com.Hotel.Manzanares.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "Extras")
@Getter
@Setter
public class Extras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double precio;
    private String descripcion;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Extras extras = (Extras) o;
        return Objects.equals(id, extras.id) && Objects.equals(precio, extras.precio) && Objects.equals(descripcion, extras.descripcion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, precio, descripcion);
    }

    @Override
    public String toString() {
        return "Extras{" +
                "id=" + id +
                ", precio=" + precio +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}
