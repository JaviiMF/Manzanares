package com.Hotel.Manzanares;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class ManzanaresApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManzanaresApplication.class, args);
	}

	@Controller
	public static class InicioController {
		@GetMapping("/")
		public String index() {
			return "home";
		}
	}

}
