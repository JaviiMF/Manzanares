package com.Hotel.Manzanares.Service;

import com.Hotel.Manzanares.Entity.Extras;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ExtrasService {

    Optional<Extras> getExtras(Long id);

    void createExtras(Extras extras);

    void deleteExtras(Long id);

    void updateExtras(Long id, Extras extra);

    List<Extras> getAllExtras();
}
