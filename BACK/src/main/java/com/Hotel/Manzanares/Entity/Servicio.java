package com.Hotel.Manzanares.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "Servicio")
@Getter
@Setter
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private Double precio;
    private String horario;
    private String descripcion;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Servicio servicio = (Servicio) o;
        return Objects.equals(id, servicio.id) && Objects.equals(nombre, servicio.nombre) && Objects.equals(precio, servicio.precio) && Objects.equals(horario, servicio.horario) && Objects.equals(descripcion, servicio.descripcion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, precio, horario, descripcion);
    }

    @Override
    public String toString() {
        return "Servicio{" +
                "id=" + id +
                ", nombre=" + nombre +
                ", precio=" + precio +
                ", horario='" + horario + '\'' +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}
