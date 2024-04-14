package com.Hotel.Manzanares.Request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class LoginRequest {

    private String usuario;
    private String pass;
}
