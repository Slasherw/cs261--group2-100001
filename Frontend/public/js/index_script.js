//after submit form still have to check validate and not refresh page
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitLogin();
    });
});

//submit login
function submitLogin(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validateUsername() || !validatePassword()) {
        return;
    }

    url = 'https://restapi.tu.ac.th/api/v1/auth/Ad/verify';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU10d1197613da27725d53ec3f01e7e231bc54420808a87597a9b45924024749bf2c9dc4a82e74050249ebf878d454dd1a'//ใส่ Token ใช้งาน API
       },
       body: JSON.stringify({"UserName": username, "PassWord": password})
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Login failed!');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        
        if (data.status === true) {
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('displayname', data.displayname_en);
            sessionStorage.setItem('displaynameth', data.displayname_th);
            sessionStorage.setItem('status1', data.statusid);
            sessionStorage.setItem('department', data.department);
            sessionStorage.setItem('faculty', data.faculty);
            sessionStorage.setItem('type', data.type);
            sessionStorage.setItem('statustu', data.tu_status);

            // เปลี่ยนหน้าไปยัง lobby.html
            window.location.href = 'html/lobby.html'; }
    })
    .catch(error => {
        console.error('Error:', error)
        document.getElementById('error-message').innerText = 'Login failed Password Invalid';
    })
}

//validate username
function validateUsername() {
    const username = document.getElementById('username').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.color = 'red';

    if (!username) {
        errorMessage.innerText = 'กรุณากรอกชื่อผู้ใช้';
        return false;
    }
    if (username.length < 10) {
        errorMessage.innerText = 'ชื่อผู้ใช้ต้องมีความยาว 10 หลัก';
        return false;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}

//validate password
function validatePassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.color = 'red';

    if (!password) {
        errorMessage.innerText = 'กรุณากรอกรหัสผ่าน';
        return false;
    }
    if (password.length < 3) {
        errorMessage.innerText = 'รหัสผ่านต้องมีความยาวมากกว่า 3 ตัว';
        return fasle;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}
