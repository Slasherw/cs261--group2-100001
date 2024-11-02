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


document.getElementById('submit-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
    });

document.getElementById('yes-btn').addEventListener('click', function() {
    alert('บันทึกแบบร่างสำเร็จ');
    document.getElementById('popup').style.display = 'none';
    });

document.getElementById('no-btn').addEventListener('click', function() {
    alert('ส่งคำร้องสำเร็จ');
    document.getElementById('popup').style.display = 'none';
    });