package turequest.backend.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    @Autowired
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    public Optional<UserProfile> getUserProfileById(Long id) {
        return userProfileRepository.findById(id);
    }

    public Optional<UserProfile> getUserProfileByName(String user_name) {
        return userProfileRepository.findByUsername(user_name);
    }

    public UserProfile createUserProfile(UserProfile userProfile) {
        System.out.println("-> " + userProfile.getDisplayName() + " / " + userProfile.getDisplayNameTh() + " / " + userProfile.getStatusTu());
        return userProfileRepository.save(userProfile);
    }

    public UserProfile updateUserProfile(Long id, UserProfile userProfileDetails) {
        return userProfileRepository.findById(id).map(userProfile -> {
            userProfile.setUsername(userProfileDetails.getUsername());
            userProfile.setEmail(userProfileDetails.getEmail());
            userProfile.setDisplayName(userProfileDetails.getDisplayName());
            userProfile.setDisplayNameTh(userProfileDetails.getDisplayNameTh());
            userProfile.setStatus1(userProfileDetails.getStatus1());
            userProfile.setDepartment(userProfileDetails.getDepartment());
            userProfile.setFaculty(userProfileDetails.getFaculty());
            userProfile.setType(userProfileDetails.getType());
            userProfile.setStatusTu(userProfileDetails.getStatusTu());
            return userProfileRepository.save(userProfile);
        }).orElseThrow(() -> new RuntimeException("UserProfile not found"));
    }

    public void deleteUserProfile(Long id) {
        userProfileRepository.deleteById(id);
    }
}
