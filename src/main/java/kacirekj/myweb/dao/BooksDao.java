package kacirekj.myweb.dao;

import kacirekj.myweb.domain.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@Repository
public class BooksDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(Book book) {
        entityManager.persist(book);
    }

    @Transactional
    public List<Book> findAll() {
        return entityManager.createQuery(
                "from Book", Book.class).getResultList();
    }
}
