package kacirekj.myweb.controller;

import kacirekj.myweb.domain.Food;
import kacirekj.myweb.domain.FoodEntry;
import kacirekj.myweb.repository.FoodEntryRepository;
import kacirekj.myweb.repository.FoodRepository;
import kacirekj.myweb.repository.FoodRepositoryCustom;
import kacirekj.myweb.util.FoodUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8081", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.PUT})
public class IndexController {

    private FoodRepository foodRepository;
    private FoodRepositoryCustom foodRepositoryCustom;
    private FoodEntryRepository foodEntryRepository;

    public IndexController(FoodRepository foodRepository, FoodRepositoryCustom foodRepositoryCustom, FoodEntryRepository foodEntryRepository) {
        this.foodRepository = foodRepository;
        this.foodRepositoryCustom = foodRepositoryCustom;
        this.foodEntryRepository = foodEntryRepository;
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

    @GetMapping("food-entry/all")
    public List<FoodEntry> getAllFoodEntries() {
        List<FoodEntry> foodEntries = foodEntryRepository.findAll();
        return foodEntries;
    }

    @PostMapping("food-entry")
    public Long getAllFoodEntries(@RequestBody FoodEntry foodEntry) {
        foodEntryRepository.save(foodEntry);
        return foodEntry.getId();
    }

    @DeleteMapping("food-entry/{id}")
    public boolean deleteFoodEntry(@PathVariable Long id) {
        return foodEntryRepository.deleteById(id) != null;
    }
}
