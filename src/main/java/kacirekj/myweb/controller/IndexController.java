package kacirekj.myweb.controller;

import kacirekj.myweb.domain.Marker;
import kacirekj.myweb.repository.MarkerRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class IndexController {

    private MarkerRepository markerRepository;

    public IndexController(MarkerRepository markerRepository) {
        this.markerRepository = markerRepository;
    }

    @GetMapping("/marker/all")
    public List<Marker> getAllMarkers() {
        List<Marker> markers = markerRepository.findAll();
        return markers;
    }

    @PostMapping("/marker")
    public void postMarker(@RequestBody Marker marker) {
        markerRepository.save(marker);
    }

    @PutMapping("/marker/{id}")
    public void put(
            @PathParam("id") Integer id,
            @RequestBody Marker marker
    ) {
        Marker storedMarker = markerRepository.findById(id);
        storedMarker.setY(marker.getY());
        storedMarker.setX(marker.getX());
        storedMarker.setNote(marker.getNote());
        markerRepository.save(storedMarker);
    }
}
