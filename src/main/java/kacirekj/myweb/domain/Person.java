package kacirekj.myweb.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Person {
    @Id
    @Column(unique = true, nullable = false)
    private Long phoneNumber;

//    @OneToMany(targetEntity = Marker.class, mappedBy = "marker")
//    private Set<Marker> markers;

    public Person() {

    }

//    public Set<Marker> getMarkers() {
//        return markers;
//    }
//
//    public void setMarkers(Set<Marker> markers) {
//        this.markers = markers;
//    }


    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
