package kacirekj.myweb.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Person {
    @Id
    @GeneratedValue
    private Long id;
    private String email;
    private String phoneNumber;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
