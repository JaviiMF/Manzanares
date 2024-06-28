package com.Hotel.Manzanares.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "Reserva")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dniCliente")
    private String dniCliente;

    @Column(name = "idHabitacion")
    private Long idHabitacion;

    @Column(name = "fechaAlta")
    private Date fechaAlta;

    @Column(name = "fechaCheckin")
    private Date fechaCheckin;

    @Column(name = "fechaCheckout")
    private Date fechaCheckout;

    @Column(name = "idDescuento")
    private Long idDescuento;

    @Column(name = "listaServicios")
    private String listaServicios;

    @Column(name = "listaExtras")
    private String listaExtras;

    @Column(name = "precioTotal")
    private Double precioTotal;

    @Column(name="activa")
    private boolean activa;
}
