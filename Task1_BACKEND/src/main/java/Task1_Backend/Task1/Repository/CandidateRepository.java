package Task1_Backend.Task1.Repository;

import Task1_Backend.Task1.Entity.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidat, Long> {
}
