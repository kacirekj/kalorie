package kacirekj.myweb.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Entity
public class Marker {
    @Id
    private String id;

    @Column(scale = 5, precision = 10, nullable = false)
    private BigDecimal lat;

    @Column(scale = 5, precision = 10, nullable = false)
    private BigDecimal lng;

    private String note;

    @Column(scale = 2, precision = 10)
    private BigDecimal rating;

    @ManyToOne(targetEntity = Person.class, optional = false, fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Person author;

    public Marker() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal valuation) {
        this.rating = valuation;
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

    public Person getAuthor() {
        return author;
    }

    public void setAuthor(Person authorPerson) {
        this.author = authorPerson;
    }
}
