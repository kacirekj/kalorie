package kacirekj.myweb.repository;

import kacirekj.myweb.domain.Marker;
import org.springframework.data.repository.Repository;
import org.yaml.snakeyaml.error.Mark;

import java.util.List;

public interface MarkerRepository extends Repository<Marker, String> {
    Marker findById(String id);
    List<Marker> findAll();
    Marker save(Marker marker);
    List<Marker> deleteById(String id);
}
