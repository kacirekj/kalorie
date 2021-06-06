package kacirekj.myweb.component;

import kacirekj.myweb.domain.Category;
import kacirekj.myweb.domain.Food;
import kacirekj.myweb.domain.Person;
import kacirekj.myweb.repository.FoodRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class DataInit implements CommandLineRunner {

    private final FoodRepository repository;

    public DataInit(FoodRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Person admin = new Person(0L, "kacirek.j@gmail.com", "male");
        Category category = new Category();
        category.setName("Maso");

        Food f0 = new Food();
        f0.setName("Kuřecí prsa");
        f0.setAuthor(admin);
        f0.setCategory(category);

        Food f1 = new Food();
        f1.setName("Vepřová plec");
        f1.setAuthor(admin);
        f1.setCategory(category);

        Food f2 = new Food();
        f2.setName("Hovězí klížka");
        f2.setAuthor(admin);
        f2.setCategory(category);

        repository.save(f0);
        repository.save(f1);
        repository.save(f2);
    }
}