package turequest.backend.filestorage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/fileserver")
@CrossOrigin(origins = "http://localhost:3000")
public class FileServerController {

    @Autowired
    private FileServerRepository fileServerRepository;
    @Autowired
    private FileServerService fileServerService;

    @GetMapping("/info/{fildId}")
    public ResponseEntity<?> info(@PathVariable Long fileId) {
        Optional<FileServer> fileServerOptional = fileServerRepository.findById(fileId);

        if (!fileServerOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // File not found
        }

        FileServer fileServer = fileServerOptional.get();
        return ResponseEntity.ok(fileServer);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        // Find the file record by ID from the repository
        Optional<FileServer> fileServerOptional = fileServerRepository.findById(fileId);

        if (!fileServerOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // File not found
        }

        FileServer fileServer = fileServerOptional.get();
        String fileName = fileServer.getStoreFileName(); // Get the stored filename (UUID)

        // Define the full path to the file
        Path filePath = Paths.get(fileServerService.UPLOADED_FOLDER + fileName);
        Resource resource = new FileSystemResource(filePath);

        if (!resource.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // File not found on disk
        }

        // Set headers to prompt download
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileServer.getOriginalFileName() + "\"");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/octet-stream");

        // Return the file as the response
        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }

}
