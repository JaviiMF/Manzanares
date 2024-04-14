package com.Hotel.Manzanares.Request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
public class DispRequest {

    private String fechaInicio;
    private String fechaFin;

}
