package kacirekj.myweb.domain;

import kacirekj.myweb.util.FoodUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entry {

    @Id
    @GeneratedValue
    private String id;

    private KindEnum kind;

    private LocalDate day;

    private Integer amount;

    @OneToOne(targetEntity = Food.class, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Food food;

    @OneToOne(targetEntity = Person.class, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Person author;
}
