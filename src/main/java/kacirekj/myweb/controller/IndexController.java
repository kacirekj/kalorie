package kacirekj.myweb.controller;

import kacirekj.myweb.domain.Food;
import kacirekj.myweb.repository.FoodRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

    private FoodRepository foodRepository;

    public IndexController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @GetMapping("food/all")
    public List<Food> getAllMarkers() {
        List<Food> markers = foodRepository.findAll();
        return markers;
    }

    @GetMapping("food/{id}")
    public Food getMarker(@PathVariable String id) {
        Food markers = foodRepository.findById(id);
        return markers;
    }

    @PostMapping("food")
    public void postMarker(@RequestBody Food marker) {
        foodRepository.save(marker);
    }

    @DeleteMapping("marker/{id}")
    public void deleteMarker(@PathVariable String id) {
        foodRepository.deleteById(id);
    }

    @PutMapping("marker")
    public void put(
            @RequestBody Food marker
    ) {
        foodRepository.save(marker);
    }
}
