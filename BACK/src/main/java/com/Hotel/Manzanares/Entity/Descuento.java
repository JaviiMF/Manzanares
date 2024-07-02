package com.Hotel.Manzanares.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "Descuento")
@Getter
@Setter
public class Descuento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer porcentaje;
    private String descripcion;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Descuento descuento = (Descuento) o;
        return Objects.equals(id, descuento.id) && Objects.equals(porcentaje, descuento.porcentaje) && Objects.equals(descripcion, descuento.descripcion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, porcentaje, descripcion);
    }

    @Override
    public String toString() {
        return "Descuento{" +
                "id=" + id +
                ", porcentaje=" + porcentaje +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}
