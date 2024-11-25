package turequest.backend.request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import turequest.backend.filestorage.FileServerRepository;
import turequest.backend.filestorage.FileServerService;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/submit-request")
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    @Autowired
    private FormRepository formRepository;

    @Autowired
    private FileServerService fileServerService;

    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestPart("data") Form form,
                                           @RequestPart("file") MultipartFile[] files) {

            form.setStatus("ยังไม่ถูกดำเนินการ");

        if (form.getActiondate() == null) {
            form.setActiondate("-");
        }

        if (form.getStage() == null) {
            form.setStage("0");
        }
        if (files.length > 5) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "File limits up to 5 files"));

        Long[] uploaded = {};
        if (files.length != 0) uploaded = fileServerService.upload(files);
        form.setAttachFiles(uploaded);

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

    @GetMapping("/requests-by-stage/{stage}")
    public ResponseEntity<List<Form>> getRequestsByStage(@PathVariable String stage) {
        // ค้นหา form ทั้งหมดที่มี stage ตรงกับค่า stage ที่ส่งมา
        List<Form> forms = formRepository.findByStage(stage);
        return ResponseEntity.ok(forms);
    }

    @GetMapping(value = "/info/{requestId}", produces = "application/json;charset=UTF-8")
    public ResponseEntity<?> getFormById(@PathVariable Long requestId) {
        Optional<Form> forms = formRepository.findById(requestId);
        if (forms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "No records found"));
        }
        return ResponseEntity.ok(forms.get());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFormById(@PathVariable Long id) {
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        formRepository.deleteById(id); // Delete the form from the database
        return ResponseEntity.ok(Collections.singletonMap("message", "Form deleted successfully"));
    }

    @PutMapping(value = "/update/{id}", consumes = {"application/json", "text/plain"})
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

        // เพิ่มเงื่อนไขสำหรับ stage เท่ากับ "10" แล้วอัปเดต status
        if ("10".equals(form.getStage())) {
            form.setStatus("ยังไม่ถูกดำเนินการ");
            form.setStage("0");
        } else {
            // ถ้าไม่มีการเปลี่ยนแปลง status ใหม่ จะคงค่าเดิม
            form.setStatus(updatedForm.getStatus() != null ? updatedForm.getStatus() : form.getStatus());
        }
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
    public ResponseEntity<?> admitRequest(@PathVariable Long id , @RequestParam String date) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องจากฐานข้อมูลและอัปเดตสถานะเป็น "อนุมัติคำร้อง"
        Form form = formRepository.findById(id).get();
        form.setStatus("รอที่ปรึกษาอนุมัติ");
        form.setActiondate(date);
        form.setStage("1");
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @PutMapping("/deny/{id}")
    public ResponseEntity<?> denyRequest(@PathVariable Long id , @RequestParam String date) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องจากฐานข้อมูลและอัปเดตสถานะเป็น "ปฏิเสธคำร้อง"
        Form form = formRepository.findById(id).get();
        form.setStatus("ปฏิเสธคำร้อง");
        form.setActiondate(date);
        form.setStage("-1");
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @PutMapping("/admitadvisor/{id}")
    public ResponseEntity<?> admitRequestAdvisor(@PathVariable Long id , @RequestParam String date) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องจากฐานข้อมูลและอัปเดตสถานะเป็น "อนุมัติคำร้อง"
        Form form = formRepository.findById(id).get();
        form.setStatus("รอเจ้าหน้าที่ตรวจสอบ");
        form.setActiondate(date);
        form.setStage("2");
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @PutMapping("/admitstaff/{id}")
    public ResponseEntity<?> admitRequeststaff(@PathVariable Long id , @RequestParam String date) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องจากฐานข้อมูลและอัปเดตสถานะเป็น "อนุมัติคำร้อง"
        Form form = formRepository.findById(id).get();
        form.setStatus("รอคณบดีอนุมัติ");
        form.setActiondate(date);
        form.setStage("3");
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @PutMapping("/admitdean/{id}")
    public ResponseEntity<?> admitRequestsdean(@PathVariable Long id , @RequestParam String date) {
        // ตรวจสอบว่า form ที่มี id นี้มีอยู่หรือไม่
        if (!formRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Form not found"));
        }

        // ดึงข้อมูลคำร้องจากฐานข้อมูลและอัปเดตสถานะเป็น "อนุมัติคำร้อง"
        Form form = formRepository.findById(id).get();
        form.setStatus("อนุมัติคำร้อง");
        form.setActiondate(date);
        form.setStage("4");
        formRepository.save(form);

        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @PostMapping("/savedraft")
    public ResponseEntity<?> submitRequestdraft(@RequestPart("data") Form form,
                                           @RequestPart("file") MultipartFile[] files) {

        if (form.getStatus() == null) {
            form.setStatus("แบบร่าง");
        }
        if (form.getActiondate() == null) {
            form.setActiondate("-");
        }

        if (form.getStage() == null) {
            form.setStage("10");
        }
        if (files.length > 5) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "File limits up to 5 files"));

        Long[] uploaded = {};
        if (files.length != 0) uploaded = fileServerService.upload(files);
        form.setAttachFiles(uploaded);

        // Save the form data to the database
        formRepository.save(form);

        //return ResponseEntity.ok("Request submitted successfully");
        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }
    @PutMapping(value = "/update1/{id}", consumes = {"application/json", "text/plain"})
    public ResponseEntity<?> updateRequest1(@PathVariable Long id, @RequestBody Form updatedForm) {
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

        // เพิ่มเงื่อนไขสำหรับ stage เท่ากับ "10" แล้วอัปเดต status
        if ("10".equals(form.getStage())) {
            form.setStatus("แบบร่าง");
            form.setStage("10");
        } else {
            // ถ้าไม่มีการเปลี่ยนแปลง status ใหม่ จะคงค่าเดิม
            form.setStatus(updatedForm.getStatus() != null ? updatedForm.getStatus() : form.getStatus());
        }
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
}
