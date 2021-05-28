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
    private String id;

    @Column(scale = 5, precision = 10)
    private BigDecimal lat;

    @Column(scale = 3, precision = 10)
    private BigDecimal lng;
    private String note;

    public Marker() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal longitude) {
        this.lat = longitude;
    }

    public BigDecimal getLng() {
        return lng;
    }

    public void setLng(BigDecimal latitude) {
        this.lng = latitude;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
