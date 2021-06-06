//package kacirekj.myweb.dao;
//
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.transaction.Transactional;
//import java.util.List;
//
//@Repository
//public class BooksDao {
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Transactional
//    public void save(Marker marker) {
//        entityManager.persist(marker);
//    }
//
//    @Transactional
//    public List<Marker> findAll() {
//        return entityManager.createQuery(
//                "from Book", Marker.class).getResultList();
//    }
//}
