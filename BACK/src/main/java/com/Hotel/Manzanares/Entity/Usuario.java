package com.Hotel.Manzanares.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "Usuario")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String nombre;
    private String apellido;
    private String telefono;
    private String dni;
    private String direccion;
    private String tipo;
    private String horario;
    private Boolean activo;
    private String genero;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id) && Objects.equals(email, usuario.email) && Objects.equals(password, usuario.password) && Objects.equals(nombre, usuario.nombre) && Objects.equals(telefono, usuario.telefono) && Objects.equals(dni, usuario.dni) && Objects.equals(direccion, usuario.direccion) && Objects.equals(tipo, usuario.tipo) && Objects.equals(horario, usuario.horario) && Objects.equals(activo, usuario.activo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, nombre, telefono, dni, direccion, tipo, horario, activo);
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", contrasena='" + password + '\'' +
                ", nombre='" + nombre + '\'' +
                ", telefono='" + telefono + '\'' +
                ", dni='" + dni + '\'' +
                ", direccion='" + direccion + '\'' +
                ", tipo='" + tipo + '\'' +
                ", horario='" + horario + '\'' +
                ", activo=" + activo +
                '}';
    }
}
