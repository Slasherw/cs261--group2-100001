package turequest.backend.filestorage;

import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class FileServer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "storeFileName", unique = true, length = 96, nullable = false)
    private String storeFileName;

    @Column(name = "originalFileName", nullable = false)
    private String originalFileName;

    public Long getId() {
        return id;
    }

    public void setStoreFileName(String storeFileName) {
        this.storeFileName = storeFileName;
    }

    public String getStoreFileName() {
        return this.storeFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getOriginalFileName() {
        return this.originalFileName;
    }
}
