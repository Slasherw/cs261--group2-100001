package turequest.backend.filestorage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServerService {

    @Autowired
    private FileServerRepository fileServerRepository;
    public final String UPLOADED_FOLDER = System.getProperty("user.dir") + "/uploads/";

    public Long[] upload(MultipartFile[] files) {
        Long[] results = new Long[files.length];
        try {
            int id = 0;
            for (MultipartFile file : files) {
                if (file.isEmpty()) return new Long[] {};

                FileServer fileServer = new FileServer();
                UUID uuid = UUID.randomUUID();
                Path path = Paths.get(UPLOADED_FOLDER + uuid);
                Files.createDirectories(path.getParent());

                file.transferTo(path);

                fileServer.setOriginalFileName(file.getOriginalFilename());
                fileServer.setStoreFileName(uuid.toString());

                fileServerRepository.save(fileServer);

                results[id] = fileServer.getId();
                id++;
            }
        } catch (IOException e) {
            System.out.println("Getting error on uploading file @ FileServer Service");
        }
        return results;
    }
}
