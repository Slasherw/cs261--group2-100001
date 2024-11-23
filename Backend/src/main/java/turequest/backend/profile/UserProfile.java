package turequest.backend.profile;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "displayname_en")
    private String displayname_en;

    @Column(name = "displayname_th")
    private String displayname_th;

    @Column(name = "status1")
    private String status1;

    @Column(name = "department")
    private String department;

    @Column(name = "faculty")
    private String faculty;

    @Column(name = "type")
    private String type;

    @Column(name = "tu_status")
    private String tu_status;

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
        return displayname_en;
    }

    public void setDisplayName(String displayName) {
        this.displayname_en = displayName;
    }

    public String getDisplayNameTh() {
        return displayname_th;
    }

    public void setDisplayNameTh(String displayNameTh) {
        this.displayname_th = displayNameTh;
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
        return tu_status;
    }

    public void setStatusTu(String statusTu) {
        this.tu_status = statusTu;
    }
}
