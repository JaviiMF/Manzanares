package com.Hotel.Manzanares.Request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
public class ReserveRequest {

    private String dniCliente;
    private Long idHabitacion;
    private String fechaInicio;
    private String fechaFin;
    private Long idDescuento;
    private List<Long> listaServicios;
    private List<Long> listaExtras;


    // Getters and Setters
    public String getDniCliente() {
        return dniCliente;
    }

    public void setDniCliente(String dniCliente) {
        this.dniCliente = dniCliente;
    }

    public Long getIdHabitacion() {
        return idHabitacion;
    }

    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Long getIdDescuento() {
        return idDescuento;
    }

    public void setIdDescuento(Long idDescuento) {
        this.idDescuento = idDescuento;
    }

    public List<Long> getListaServicios() {
        return listaServicios;
    }

    public void setListaServicios(List<Long> listaServicios) {
        this.listaServicios = listaServicios;
    }

    public List<Long> getListaExtras() {
        return listaExtras;
    }

    public void setListaExtras(List<Long> listaExtras) {
        this.listaExtras = listaExtras;
    }

}
