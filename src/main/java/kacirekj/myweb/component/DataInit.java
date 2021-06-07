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
        Category maso = new Category();
        maso.setName("Maso");

        Category obilniny = new Category();
        maso.setName("Obilniny");

        Food f0 = new Food();
        f0.setName("Kuřecí prsa");
        f0.setAuthor(admin);
        f0.setCategory(maso);
        f0.setProtein(25.0d);
        f0.setCarbs(0.2d);
        f0.setFat(1.0d);
        f0.setCalories(104.0d);


        Food f1 = new Food();
        f1.setName("Vepřová plec");
        f1.setAuthor(admin);
        f1.setCategory(maso);
        f1.setProtein(25.0d);
        f1.setCarbs(0.2d);
        f1.setFat(15.0d);
        f1.setCalories(200d);

        Food f2 = new Food();
        f2.setName("Hovězí klížka");
        f2.setAuthor(admin);
        f2.setCategory(maso);
        f2.setProtein(25.0d);
        f2.setCarbs(0.2d);
        f2.setFat(5.0d);
        f2.setCalories(150d);

        Food f3 = new Food();
        f3.setName("Mouka psenicna hladka");
        f3.setAuthor(admin);
        f3.setCategory(maso);
        f3.setProtein(10.0d);
        f3.setCarbs(70d);
        f3.setFat(8.0d);
        f3.setCalories(350d);

        repository.save(f0);
        repository.save(f1);
        repository.save(f2);
        repository.save(f3);
    }
}