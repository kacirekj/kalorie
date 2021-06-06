package kacirekj.myweb.domain;

import kacirekj.myweb.util.FoodUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.Normalizer;
import java.util.Locale;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

    @Id
    private String id;
    private String name;

    private Double kcalKgMin;

    @ManyToOne(targetEntity = Person.class, optional = true, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Person author;

    private void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
        this.id = FoodUtil.normalizeFoodName(name);
    }
}
