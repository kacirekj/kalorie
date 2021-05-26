package kacirekj.myweb.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
public class Marker {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(scale = 18, precision = 25)
    private BigDecimal x;

    @Column(scale = 18, precision = 25)
    private BigDecimal y;
    private String note;

    public Marker() {

    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal longitude) {
        this.x = longitude;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal latitude) {
        this.y = latitude;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
