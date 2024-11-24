package turequest.backend.filestorage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FileServerRepository extends JpaRepository<FileServer, Long> {
    // You can add custom query methods if needed
}