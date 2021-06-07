package kacirekj.myweb.repository;

import kacirekj.myweb.domain.Food;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface FoodRepositoryCustom extends Repository<Food, String> {
    List<Food> findByIdContaining(String... ids);
}
