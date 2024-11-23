package turequest.backend.requestdraft;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DraftRepository extends JpaRepository<DraftForm, Long> {
    // You can add custom query methods if needed
    List<DraftForm> findByStudentId(String studentId);
}