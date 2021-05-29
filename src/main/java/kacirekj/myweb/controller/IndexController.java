package kacirekj.myweb.controller;

import kacirekj.myweb.domain.Marker;
import kacirekj.myweb.repository.MarkerRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;

/**
 * Co to ma delat:
 * Uzivatel prijde, ze chce recenzovat. Tak si otevre mapu, zada nazev ulice NEBO si priblizovani najde potrebne misto. Udela pravym tlacitkem mysi klik a vybere pridat novou recenzi mista.
 * Potom vyplni Komentar k misto, da pocet hvezdicek od 0 do 5 jako hodnoceni. Vyplni sve telefonni cislo a odesle formular. Na mobil mu prijde kod, ktery vepise do formulare a potvrdi ho. Tim se
 * recenze vlozi.
 *
 * Uzivatel prijde ze chce editovat nebo smazat recenzi. Vlozi sve tel. cislo, prijde mu kod kterym pak muze editovat recenzi, je-li sbindovana s danym el cislem. Pak ji muze mazat a editovat.
 *
 *
 */
@RestController
public class IndexController {

    private MarkerRepository markerRepository;

    public IndexController(MarkerRepository markerRepository) {
        this.markerRepository = markerRepository;
    }

    @GetMapping("marker/all")
    public List<Marker> getAllMarkers() {
        List<Marker> markers = markerRepository.findAll();
        return markers;
    }

    @PostMapping("marker")
    public void postMarker(@RequestBody Marker marker) {
        markerRepository.save(marker);
    }

    @DeleteMapping("marker/{id}")
    public void deleteMarker(@PathVariable("id") String id) {
        markerRepository.deleteById(id);
    }

    @PutMapping("marker")
    public void put(
            @RequestBody Marker marker
    ) {
        markerRepository.save(marker);
    }
}
