package kacirekj.myweb.controller;

import kacirekj.myweb.domain.Food;
import kacirekj.myweb.repository.FoodRepository;
import kacirekj.myweb.repository.FoodRepositoryCustom;
import kacirekj.myweb.util.FoodUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class IndexController {

    private FoodRepository foodRepository;
    private FoodRepositoryCustom foodRepositoryCustom;

    public IndexController(FoodRepository foodRepository, FoodRepositoryCustom foodRepositoryCustom) {
        this.foodRepository = foodRepository;
        this.foodRepositoryCustom = foodRepositoryCustom;
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

    @GetMapping("food")
    public List<Food> getFoods(@RequestParam String id) {
        String normalized = FoodUtil.normalizeFoodName(id);
        String[] separated = normalized.split("-");
        return foodRepositoryCustom.findByIdContaining(separated);
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
