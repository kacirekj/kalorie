package kacirekj.myweb.domain;

import kacirekj.myweb.util.FoodUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    private String id;
    private String name;

    private void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
        this.id = FoodUtil.normalizeFoodName(name);
    }
}
