package kacirekj.myweb.repository;

import kacirekj.myweb.domain.Food;
import kacirekj.myweb.domain.FoodEntry;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface FoodEntryRepository extends Repository<FoodEntry, Long> {
    List<FoodEntry> findAll();
    FoodEntry save(FoodEntry marker);
    FoodEntry deleteById(Long id);
}
