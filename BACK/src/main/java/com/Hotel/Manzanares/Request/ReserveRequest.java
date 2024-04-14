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
}
