package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/add-user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public ResponseEntity<?> createUserProfile(@RequestBody UserProfile userProfile) {
        if (userProfileService.getUserProfileByName(userProfile.getUsername()).isEmpty()) {
            userProfileService.createUserProfile(userProfile);
        }
        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }

}

