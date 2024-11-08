package com.example.crud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Collections;
import java.util.List;
@RestController
@RequestMapping("/submit-request")
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    @Autowired
    private FormRepository formRepository;

    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestBody Form form) {
        if (form.getStatus() == null) {
            form.setStatus("ยังไม่ถูกดำเนินการ");
        }
        // Save the form data to the database
        formRepository.save(form);

        //return ResponseEntity.ok("Request submitted successfully");
        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @GetMapping(value = "/student/{studentId}", produces = "application/json;charset=UTF-8")

    public ResponseEntity<?> getFormByStudentId(@PathVariable String studentId) {
        List<Form> forms = formRepository.findByStudentId(studentId);
        if (forms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "No records found"));
        }
        return ResponseEntity.ok(forms);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFormById(@PathVariable Long id) {
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        formRepository.deleteById(id); // Delete the form from the database
        return ResponseEntity.ok(Collections.singletonMap("message", "Form deleted successfully"));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRequest(@PathVariable Long id, @RequestBody Form updatedForm) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องเก่ามาและอัพเดตค่าใหม่ที่ส่งมา
        Form form = formRepository.findById(id).get();
        form.setFullName(updatedForm.getFullName());
        form.setDate(updatedForm.getDate());
        form.setYear(updatedForm.getYear());
        form.setDepartment(updatedForm.getDepartment());
        form.setEmail(updatedForm.getEmail());
        form.setRequestType(updatedForm.getRequestType());
        form.setStatus(updatedForm.getStatus() != null ? updatedForm.getStatus() : form.getStatus()); // ถ้าไม่มีค่า status ใหม่ ให้คงค่าเดิม

        // เพิ่มฟิลด์อื่นๆ ตามที่คุณต้องการ
        form.setAddress(updatedForm.getAddress());
        form.setSubdistrict(updatedForm.getSubdistrict());
        form.setDistrict(updatedForm.getDistrict());
        form.setProvince(updatedForm.getProvince());
        form.setStudentPhone(updatedForm.getStudentPhone());
        form.setParentPhone(updatedForm.getParentPhone());
        form.setAdvisor(updatedForm.getAdvisor());
        form.setPrefix(updatedForm.getPrefix());
        form.setSemester(updatedForm.getSemester());
        form.setAcademicYear(updatedForm.getAcademicYear());
        form.setCourseCode(updatedForm.getCourseCode());
        form.setCourseName(updatedForm.getCourseName());
        form.setSection(updatedForm.getSection());
        form.setReason(updatedForm.getReason());
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));

    }
    @GetMapping("/all-requests")
    public ResponseEntity<List<Form>> getAllRequests() {
        List<Form> forms = formRepository.findAll();
        return ResponseEntity.ok(forms);
    }
    @PutMapping("/admit/{id}")
    public ResponseEntity<?> admitRequest(@PathVariable Long id) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องจากฐานข้อมูลและอัปเดตสถานะเป็น "อนุมัติคำร้อง"
        Form form = formRepository.findById(id).get();
        form.setStatus("อนุมัติคำร้อง");
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @PutMapping("/deny/{id}")
    public ResponseEntity<?> denyRequest(@PathVariable Long id) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องจากฐานข้อมูลและอัปเดตสถานะเป็น "ปฏิเสธคำร้อง"
        Form form = formRepository.findById(id).get();
        form.setStatus("ปฏิเสธคำร้อง");
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
}
