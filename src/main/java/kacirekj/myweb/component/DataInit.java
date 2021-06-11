package kacirekj.myweb.component;

import kacirekj.myweb.domain.*;
import kacirekj.myweb.repository.FoodEntryRepository;
import kacirekj.myweb.repository.FoodRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.stream.Stream;

import static kacirekj.myweb.domain.DaytimeEnum.*;

@Component
public class DataInit implements CommandLineRunner {

    private final FoodRepository repository;
    private final FoodEntryRepository foodEntryRepository;

    public DataInit(FoodRepository repository, FoodEntryRepository foodEntryRepository) {
        this.repository = repository;
        this.foodEntryRepository = foodEntryRepository;
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


        FoodEntry foodEntry0 = new FoodEntry(null, admin, f0, LocalDate.now(), DOPOLEDNI_SVACINA, 150);
        FoodEntry foodEntry1 = new FoodEntry(null, admin, f1, LocalDate.now(), OBED, 250);
        FoodEntry foodEntry2 = new FoodEntry(null, admin, f2, LocalDate.now().minus(3, ChronoUnit.DAYS), SNIDANE, 350);
        FoodEntry foodEntry3 = new FoodEntry(null, admin, f3, LocalDate.now().minus(3, ChronoUnit.DAYS), DOPOLEDNI_SVACINA, 50);
        FoodEntry foodEntry4 = new FoodEntry(null, admin, f2, LocalDate.now().minus(4, ChronoUnit.DAYS), NEUVEDENO, 5);
        FoodEntry foodEntry5 = new FoodEntry(null, admin, f3, LocalDate.now().minus(5, ChronoUnit.DAYS), SNIDANE, 750);
        FoodEntry foodEntry6 = new FoodEntry(null, admin, f2, LocalDate.now().minus(5, ChronoUnit.DAYS), DOPOLEDNI_SVACINA, 75);
        FoodEntry foodEntry7 = new FoodEntry(null, admin, f0, LocalDate.now().minus(5, ChronoUnit.DAYS), OBED, 50);
        FoodEntry foodEntry8 = new FoodEntry(null, admin, f0, LocalDate.now().minus(5, ChronoUnit.DAYS), VECERE, 74);
        FoodEntry foodEntry9 = new FoodEntry(null, admin, f1, LocalDate.now().minus(5, ChronoUnit.DAYS), NEUVEDENO, 7544);

        foodEntryRepository.save(foodEntry0);
        foodEntryRepository.save(foodEntry1);
        foodEntryRepository.save(foodEntry2);
        foodEntryRepository.save(foodEntry3);
        foodEntryRepository.save(foodEntry4);
        foodEntryRepository.save(foodEntry5);

    }
}