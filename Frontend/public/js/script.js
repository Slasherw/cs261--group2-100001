function validateUsername() {
    const username = document.getElementById('username').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.color = 'red';

    if (username = null || username === '') {
        errorMessager.innerText = 'กรุณากรอกชื่อผู้ใช้';
        return;
    }
    if (username.length < 10) {
        errorMessage.innerText = 'ชื่อผู้ใช้ต้องมีความยาว 10 หลัก';
        return;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.color = 'red';

    if (password = null || password === '') {
        errorMessage.innerText = 'กรุณากรอกรหัสผ่าน';
        return
    }
    if (password.length < 3) {
        errorMessager.innerText = 'รหัสผ่านต้องมีความยาวมากกว่า 3 ตัว';
        return;
    }
}