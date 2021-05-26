package kacirekj.myweb.repository;

import kacirekj.myweb.domain.Marker;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface MarkerRepository extends Repository<Marker, Integer> {
    Marker findById(Integer id);
    List<Marker> findAll();
    Marker save(Marker marker);
}
