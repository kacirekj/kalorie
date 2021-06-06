package kacirekj.myweb.repository;

import kacirekj.myweb.domain.Activity;
import kacirekj.myweb.domain.Food;
import kacirekj.myweb.domain.Person;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface PersonRepository extends Repository<Person, String> {
    Person findById(String id);
    List<Activity> findAll();
    Food save(Food marker);
    Person deleteById(String id);
}
