package com.example.crud;

import jakarta.persistence.*;

@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "displayname")
    private String displayName;

    @Column(name = "displaynameth")
    private String displayNameTh;

    @Column(name = "status1")
    private String status1;

    @Column(name = "department")
    private String department;

    @Column(name = "faculty")
    private String faculty;

    @Column(name = "type")
    private String type;

    @Column(name = "statustu")
    private String statusTu;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayNameTh() {
        return displayNameTh;
    }

    public void setDisplayNameTh(String displayNameTh) {
        this.displayNameTh = displayNameTh;
    }

    public String getStatus1() {
        return status1;
    }

    public void setStatus1(String status1) {
        this.status1 = status1;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatusTu() {
        return statusTu;
    }

    public void setStatusTu(String statusTu) {
        this.statusTu = statusTu;
    }
}
