package com.example.crud;
import javax.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "request")
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private String date; // วันที่

    @Column(name = "prefix")
    private String prefix; // คำนำหน้า

    @Column(name = "full_name")
    private String fullName; // ชื่อ-สกุล

    @Column(name = "student_id")
    private String studentId; // เลขทะเบียน

    @Column(name = "year")
    private Integer year; // ชั้นปี (สามารถเป็น null ได้)

    @Column(name = "department")
    private String department; // สาขาวิชา

    @Column(name = "email")
    private String email; // อีเมลล์

    @Column(name = "address")
    private String address; // เลขที่

    @Column(name = "subdistrict")
    private String subdistrict; // แขวง/ตำบล

    @Column(name = "district")
    private String district; // เขต/อำเภอ

    @Column(name = "province")
    private String province; // จังหวัด

    @Column(name = "student_phone")
    private String studentPhone; // โทรศัพท์นักศึกษา

    @Column(name = "parent_phone")
    private String parentPhone; // โทรศัพท์ผู้ปกครอง

    @Column(name = "advisor")
    private String advisor; // อาจารย์ที่ปรกครอง

    @Column(name = "request_type")
    private String requestType; // ประเภทคำร้อง

    @Column(name = "semester")
    private String semester; // ภาคเรียน

    @Column(name = "academic_year")
    private String academicYear; // ปีการศึกษา

    @Column(name = "course_code")
    private String courseCode; // รหัสวิชา

    @Column(name = "course_name")
    private String courseName; // ชื่อวิชา

    @Column(name = "section")
    private String section; // Section

    @Column(name = "reason")
    private String reason; // เหตุผลในการยื่นคำร้อง

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "Actiondate")
    private String Actiondate;

    public String getActiondate() {
        return Actiondate;
    }

    public void setActiondate(String Actiondate) {
        this.Actiondate = Actiondate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSubdistrict() {
        return subdistrict;
    }

    public void setSubdistrict(String subdistrict) {
        this.subdistrict = subdistrict;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getStudentPhone() {
        return studentPhone;
    }

    public void setStudentPhone(String studentPhone) {
        this.studentPhone = studentPhone;
    }

    public String getParentPhone() {
        return parentPhone;
    }

    public void setParentPhone(String parentPhone) {
        this.parentPhone = parentPhone;
    }

    public String getAdvisor() {
        return advisor;
    }

    public void setAdvisor(String advisor) {
        this.advisor = advisor;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
