package kacirekj.myweb.repository;

import kacirekj.myweb.domain.Book;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface BookRepository extends Repository<Book, Integer> {
    Book findById(Integer id);
    Book findByMainAuthorId(Integer id);
    Book findByAuthorsId(Integer id);
    List<Book> findAll();
    Book save(Book book);
}
