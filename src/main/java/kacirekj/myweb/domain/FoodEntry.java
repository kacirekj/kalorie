package kacirekj.myweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodEntry {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(targetEntity = Person.class, fetch = FetchType.LAZY)
    private Person author;

    @OneToOne(targetEntity = Food.class, fetch = FetchType.EAGER)
    private Food food;

    private LocalDate date;

    private DaytimeEnum kind;

    private Integer amount;
}
