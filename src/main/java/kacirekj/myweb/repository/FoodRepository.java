package kacirekj.myweb.repository;

import kacirekj.myweb.domain.Food;
import org.springframework.data.repository.Repository;
import org.yaml.snakeyaml.error.Mark;

import java.util.List;

public interface FoodRepository extends Repository<Food, String> {
    Food findById(String id);
    List<Food> findAll();
    Food save(Food marker);
    List<Food> deleteById(String id);
}
