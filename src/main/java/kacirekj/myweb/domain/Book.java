package kacirekj.myweb.domain;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.Set;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;

    @OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
//    @Fetch(FetchMode.JOIN)
    private Author mainAuthor;

    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
//    @Fetch(FetchMode.JOIN)
    private Set<Author> authors;

    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
//    @Fetch(FetchMode.JOIN)
    private Set<Dealer> dealers;

    public Book() {

    }

    public Book(String name, Set<Author> authors, Set<Dealer> dealers, Author mainAuthor) {
        this.name = name;
        this.authors = authors;
        this.dealers = dealers;
        this.mainAuthor = mainAuthor;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Author getMainAuthor() {
        return mainAuthor;
    }

    public void setMainAuthor(Author mainAuthor) {
        this.mainAuthor = mainAuthor;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public Set<Dealer> getDealers() {
        return dealers;
    }

    public void setDealers(Set<Dealer> dealers) {
        this.dealers = dealers;
    }
}
