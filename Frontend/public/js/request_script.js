
//validate Date
function validateDate() {
    const date = document.getElementById('date').value;
    const errorMessage = document.getElementById('date-error');
    errorMessage.style.color = 'red';

    const today = new Date().toISOString().split('T')[0];

    if (date !== today) {
        errorMessage.innerText = 'วันที่ไม่ถูกต้อง';
        return false;
    }

    if (!date) {
        errorMessage.innerText = 'กรุณากรอกวันที่';
        return false;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}

//validate StudentId
function validateStudentId(){
    const studentId = document.getElementById('number').value;
    const errorMessage = document.getElementById('number-error');
    errorMessage.style.color = 'red';

    const studentIdPattern = /^[0-9]{10}$/;

    if (!studentId) {
        errorMessage.innerText = 'กรุณากรอกเลขทะเบียน';
        return false;
    }
    if (!studentId.match(studentIdPattern)) {
        errorMessage.innerText = 'เลขทะเบียนไม่ถูกต้อง';
        return false;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}

//validate PhoneNumber
function validatePhoneNumber(){
    const phoneNumber = document.querySelector('#phone').value;
    const errorMessage = document.getElementById('phone-error');
    errorMessage.style.color = 'red';

    const phoneNumberPattern = /^0[0-9]{9}$/;

    if (!phoneNumber) {
        errorMessage.innerText = 'กรุณากรอกเบอร์โทรศัพท์';
        return false;
    }
    if (!phoneNumber.match(phoneNumberPattern)) {
        errorMessage.innerText = 'เบอร์โทรศัพท์ไม่ถูกต้อง';
        return false;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}

//validate Semester
function validateSemester(){
    const semester = document.getElementById('semester').value;
    const uniYear = document.getElementById('uni-year').value;
    const errorMessage = document.getElementById('semester-error');
    errorMessage.style.color = 'red';

    const thisYear = new Date().getFullYear();
    nextYear = thisYear + 1;
    const today = new Date().toISOString().split('T')[0];
    const firstSemester =  new Date(thisYear+'-08-13');
    const secondSemester = new Date(nextYear+'-01-20');
    const summerSemester = new Date(nextYear+'-06-09');

    if (!semester) {
        errorMessage.innerText = 'กรุณาเลือกภาคการศึกษา';
        return false;
    }
    if (!uniYear) {
        errorMessage.innerText = 'กรุณากรอกปีการศึกษา';
        return false;
    }
    switch (semester) {
        case '1':
            if ( today < firstSemester || today > secondSemester) {
                errorMessage.innerText = 'ภาคการศึกษาไม่ถูกต้อง';
                return false;
            }
            break;
        case '2':
            if (today < secondSemester || today > summerSemester) {
                errorMessage.innerText = 'ภาคการศึกษาไม่ถูกต้อง';
                return false;
            }
            break;
        case 'summer':
            if (today < summerSemester) {
                errorMessage.innerText = 'ภาคการศึกษาไม่ถูกต้อง';
                return false;
            }
            break;
        default:
            errorMessage.innerText = 'ภาคการศึกษาไม่ถูกต้อง';
            return false;
    }
    if (uniYear != thisYear+543) {
        errorMessage.innerText = 'ปีการศึกษาไม่ถูกต้อง';
        return false;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}

//validate Date when change
const date = document.getElementById('date');
date.addEventListener('change', validateDate);

//validate StudentId when change
const studentId = document.getElementById('number');
studentId.addEventListener('input', validateStudentId);

//validate PhoneNumber when change
const phoneNumber = document.querySelector('#phone');
phoneNumber.addEventListener('input', validatePhoneNumber);

//validate Semester when change
const semester = document.getElementById('semester');
const uniYear = document.getElementById('uni-year');
semester.addEventListener('change', validateSemester);
uniYear.addEventListener('input', validateSemester);






//pop up for clickingตกลง
//document.getElementById('submit-btn').addEventListener('click', function() {
    //document.getElementById('popupsubmit').style.display = 'block';
    //});

//pop up for clickingยกเลิก
document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('popupsend').style.display = 'none';
    document.getElementById('popupsent').style.display = 'none';
    document.getElementById('popupcancel').style.display = 'block';
    });

document.getElementById('no-btn').addEventListener('click', function() {
    // alert('');
    document.getElementById('popupcancel').style.display = 'none';
    });

document.getElementById('yes-btn').addEventListener('click', function() {
    document.getElementById('cancel-work-btn').click();
    document.getElementById('popupcancel').style.display = 'none';
    });
const nameth = sessionStorage.getItem('displaynameth');
document.getElementById('fullname').value = nameth;
document.getElementById('fullname').disabled = true;

const numberID = sessionStorage.getItem('username');
document.getElementById('number').value = numberID;
document.getElementById('number').disabled = true;
const email = sessionStorage.getItem('email');
document.getElementById('email').value = email;
document.getElementById('email').disabled = true;

document.getElementById('menuname').value = nameth;
const nameFromSession = sessionStorage.getItem('displaynameth');
if (nameFromSession) {
            document.getElementById('menuname').innerHTML = `${nameFromSession} <a class="fa fa-user-circle"></a>`;
        }

document.getElementById('submit-btn').addEventListener('click', function() {

    document.getElementById('popupcancel').style.display = 'none';
    document.getElementById('popupsent').style.display = 'none';
    document.getElementById('popupsend').style.display = 'block';

});

document.getElementById('quit-btn').addEventListener('click', function() {

    document.getElementById('popupsent').style.display = 'none';

});

document.getElementById('notsend-btn').addEventListener('click', function() {

    document.getElementById('popupsend').style.display = 'none';

});

document.getElementById('savedraft-btn').addEventListener('click', function() {

    document.getElementById('savedraftpopup').style.display = 'block';

});

document.getElementById('notsavedraft-btn').addEventListener('click', function() {

    document.getElementById('savedraftpopup').style.display = 'none';

});
/*
document.getElementById('realsavedraft-btn').addEventListener('click', function() {

    const formData = {
        date: document.getElementById('date').value,
        fullName: document.getElementById('fullname').value,
        
        studentId: document.getElementById('number').value,
        year: document.getElementById('year').value,
        
        email: document.getElementById('email').value,
        address: document.getElementById('no').value,
        subdistrict: document.getElementById('sub-district').value,
        district: document.getElementById('district').value,
        province: document.getElementById('province').value,
        studentPhone: document.getElementById('phone').value,
        parentPhone: document.getElementById('parent').value,
        advisor: document.getElementById('teacher').value,
        department: document.getElementById('department').value,
        prefix: document.getElementById('prefix').value,
        semester: document.getElementById('semester').value,
        academicYear: document.getElementById('uni-year').value,
        courseCode: document.getElementById('course-code').value,
        courseName: document.getElementById('course').value,
        section: document.getElementById('Section').value,
        reason: document.getElementById('reason').value,
        requestType: document.getElementById('requesttype').value

        
    };

    const requestId = new URLSearchParams(window.location.search).get('id'); // assuming id is passed as a query param

    const url = requestId 
        ? `http://localhost:8080/draft-request/update/${requestId}` // PUT or PATCH API endpoint for update
        : `http://localhost:8080/draft-request`; // POST endpoint for new data

    const method = requestId ? 'PUT' : 'POST'; // Use PUT for update, POST for new entry
    const formData_2 = new FormData();

    formData_2.append("data", new Blob([JSON.stringify(formData)], { type: "application/json" }));
    const fileInput = document.querySelector('#attach_files');
    const files = fileInput ? fileInput.files : null;
    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData_2.append("file", files[i]);
        }
    }
    const headers = requestId
    ? { 'Content-Type': 'application/json' } // สำหรับการอัปเดต
    : undefined; // ไม่ต้องใส่ headers สำหรับ POST แบบ multipart/form-data
    // Send the data to the server
    fetch(url, {
        method: method,
        headers: headers,
        body: requestId ? JSON.stringify(formData) : formData_2
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('savedraftpopup').style.display = 'none';
        if (data.success) {
            document.getElementById('cancel-work-btn').click();
            document.getElementById('popupsent-text').innerText = requestId ? 'คำร้องถูกอัพเดตเรียบร้อยแล้ว' : 'คำร้องถูกส่งเรียบร้อยแล้ว';
            document.getElementById('popupsend').style.display = 'none';
            document.getElementById('popupsent').style.display = 'block';            
        } else {
            alert('เกิดข้อผิดพลาดในการส่งคำร้อง');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการส่งคำร้องแบบรับการตอบกลับฝั่ง server');
    });

});
*/
document.getElementById('send-btn').addEventListener('click', function() {
    // Get the form data

    const formData = {
        date: document.getElementById('date').value,
        fullName: document.getElementById('fullname').value,
        
        studentId: document.getElementById('number').value,
        year: document.getElementById('year').value,
        
        email: document.getElementById('email').value,
        address: document.getElementById('no').value,
        subdistrict: document.getElementById('sub-district').value,
        district: document.getElementById('district').value,
        province: document.getElementById('province').value,
        studentPhone: document.getElementById('phone').value,
        parentPhone: document.getElementById('parent').value,
        advisor: document.getElementById('teacher').value,
        department: document.getElementById('department').value,
        prefix: document.getElementById('prefix').value,
        semester: document.getElementById('semester').value,
        academicYear: document.getElementById('uni-year').value,
        courseCode: document.getElementById('course-code').value,
        courseName: document.getElementById('course').value,
        section: document.getElementById('Section').value,
        reason: document.getElementById('reason').value,
        requestType: document.getElementById('requesttype').value

        
    };

    const requestId = new URLSearchParams(window.location.search).get('id'); // assuming id is passed as a query param

    const url = requestId 
        ? `http://localhost:8080/submit-request/update/${requestId}` // PUT or PATCH API endpoint for update
        : `http://localhost:8080/submit-request`; // POST endpoint for new data

    const method = requestId ? 'PUT' : 'POST'; // Use PUT for update, POST for new entry
    const formData_2 = new FormData();

    formData_2.append("data", new Blob([JSON.stringify(formData)], { type: "application/json" }));
    const fileInput = document.querySelector('#attach_files');
    const files = fileInput ? fileInput.files : null;
    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData_2.append("file", files[i]);
        }
    }
    const headers = requestId
    ? { 'Content-Type': 'application/json' } // สำหรับการอัปเดต
    : undefined; // ไม่ต้องใส่ headers สำหรับ POST แบบ multipart/form-data
    // Send the data to the server
    fetch(url, {
        method: method,
        headers: headers,
        body: requestId ? JSON.stringify(formData) : formData_2
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            document.getElementById('cancel-work-btn').click();
            document.getElementById('popupsent-text').innerText = requestId ? 'คำร้องถูกอัพเดตเรียบร้อยแล้ว' : 'คำร้องถูกส่งเรียบร้อยแล้ว';
            document.getElementById('popupsend').style.display = 'none';
            document.getElementById('popupsent').style.display = 'block';            
        } else {
            alert('เกิดข้อผิดพลาดในการส่งคำร้อง');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการส่งคำร้องแบบรับการตอบกลับฝั่ง server');
    });
});

document.getElementById('logout-button').addEventListener('click', function() {

    document.getElementById('logoutpopup').style.display = 'block';

});

document.getElementById('nologout').addEventListener('click', function() {

    document.getElementById('logoutpopup').style.display = 'none';

});

document.getElementById('logout').addEventListener('click', function() {
    // ลบข้อมูลทั้งหมดใน sessionStorage
    sessionStorage.clear();
  
    window.location.href = '../index.html'; 
});


window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id == null) return;

    fetch('http://localhost:8080/submit-request/info/' + id)
    .then(response => response.json())
    .then(response => {
        if (response.message != null) return;
        document.getElementById('date').value = response.date;
        document.getElementById('fullname').value = response.fullName;
        
        document.getElementById('number').value = response.studentId;
        document.getElementById('year').value = response.year;
        
        document.getElementById('email').value = response.email;
        document.getElementById('no').value = response.address;
        document.getElementById('sub-district').value = response.subdistrict;
        document.getElementById('district').value = response.district;
        document.getElementById('province').value = response.province;
        document.getElementById('phone').value = response.studentPhone;
        document.getElementById('parent').value = response.parentPhone;
        document.getElementById('teacher').value = response.advisor;
        document.getElementById('department').value = response.department;
        document.getElementById('prefix').value = response.prefix;
        document.getElementById('semester').value = response.semester;
        document.getElementById('uni-year').value = response.academicYear;
        document.getElementById('course-code').value = response.courseCode;
        document.getElementById('course').value = response.courseName;
        document.getElementById('Section').value = response.section;
        document.getElementById('reason').value = response.reason;
        document.getElementById('requesttype').value = response.requestType;
    })

}

const fileBtn = document.querySelector("#attach_files");
const customTxt = document.querySelector("#custom-msg");

fileBtn.addEventListener("change", function () {
  if (fileBtn.files.length > 0) {
    // Map through the FileList to get each file's name
    const fileNames = Array.from(fileBtn.files).map(file => file.name);
    // Join file names with a separator (e.g., comma)
    customTxt.innerHTML = fileNames.join(" and  ");
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});
document.getElementById('realsavedraft-btn').addEventListener('click', function() {
    // Get the form data

    const formData = {
        date: document.getElementById('date').value,
        fullName: document.getElementById('fullname').value,
        
        studentId: document.getElementById('number').value,
        year: document.getElementById('year').value,
        
        email: document.getElementById('email').value,
        address: document.getElementById('no').value,
        subdistrict: document.getElementById('sub-district').value,
        district: document.getElementById('district').value,
        province: document.getElementById('province').value,
        studentPhone: document.getElementById('phone').value,
        parentPhone: document.getElementById('parent').value,
        advisor: document.getElementById('teacher').value,
        department: document.getElementById('department').value,
        prefix: document.getElementById('prefix').value,
        semester: document.getElementById('semester').value,
        academicYear: document.getElementById('uni-year').value,
        courseCode: document.getElementById('course-code').value,
        courseName: document.getElementById('course').value,
        section: document.getElementById('Section').value,
        reason: document.getElementById('reason').value,
        requestType: document.getElementById('requesttype').value

        
    };

    const requestId = new URLSearchParams(window.location.search).get('id'); // assuming id is passed as a query param

    const url = requestId 
        ? `http://localhost:8080/submit-request/update1/${requestId}` // PUT or PATCH API endpoint for update
        : `http://localhost:8080/submit-request/savedraft`; // POST endpoint for new data

    const method = requestId ? 'PUT' : 'POST'; // Use PUT for update, POST for new entry
    const formData_2 = new FormData();

    formData_2.append("data", new Blob([JSON.stringify(formData)], { type: "application/json" }));
    const fileInput = document.querySelector('#attach_files');
    const files = fileInput ? fileInput.files : null;
    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData_2.append("file", files[i]);
        }
    }
    const headers = requestId
    ? { 'Content-Type': 'application/json' } // สำหรับการอัปเดต
    : undefined; // ไม่ต้องใส่ headers สำหรับ POST แบบ multipart/form-data
    // Send the data to the server
    fetch(url, {
        method: method,
        headers: headers,
        body: requestId ? JSON.stringify(formData) : formData_2
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            document.getElementById('cancel-work-btn').click();
            document.getElementById('popupsent-text').innerText = requestId ? 'คำร้องถูกอัพเดตเรียบร้อยแล้ว' : 'คำร้องถูกส่งเรียบร้อยแล้ว';
            document.getElementById('popupsend').style.display = 'none';
            document.getElementById('popupsent').style.display = 'block';            
        } else {
            alert('เกิดข้อผิดพลาดในการส่งคำร้อง');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการส่งคำร้องแบบรับการตอบกลับฝั่ง server');
    });
});
// Function to check for URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Check if "id" parameter exists in the URL
  const id = getURLParameter("id");
  if (id) {
    // Hide elements if "id" parameter is present
    document.querySelector(".document").style.display = "none";
    document.querySelector("#browse-file").style.display = "none";
    document.querySelector("#custom-msg").style.display = "none";
    document.querySelector("#attach_files").style.display = "none";
  }
  // Get the button and the popup element
const saveDraftBtn = document.getElementById("realsavedraft-btn");
const saveDraftPopup = document.getElementById("savedraftpopup");

// Add an event listener to the button
saveDraftBtn.addEventListener("click", function () {
  // Hide the popup
  saveDraftPopup.style.display = "none";
});