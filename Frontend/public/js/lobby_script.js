const username = sessionStorage.getItem('username');
const email = sessionStorage.getItem('email');
const displayname = sessionStorage.getItem('displayname');
const displayname_th = sessionStorage.getItem('displaynameth');
const status1 = sessionStorage.getItem('status1');
const department = sessionStorage.getItem('department');
const faculty = sessionStorage.getItem('faculty');
const type = sessionStorage.getItem('type');
const prefixname = sessionStorage.getItem('prefixname');
const statustu = sessionStorage.getItem('statustu');
document.getElementById('userDetails').innerHTML = `
    <p>Student ID: ${username}</p>
    <p>Email: ${email}</p>
    <p>Name: ${displayname}</p>
    <p>ชื่อ: ${displayname_th}</p>
    <p>รหัสสถานะ: ${status1}</p>
    <p>department: ${department}</p>
    <p>Faculty: ${faculty}</p>
    <p>Type: ${type}</p>
    <p>Status: ${statustu}</p>
`;
document.getElementById('welcomeMessage').innerHTML = `Welcome ${displayname_th} to Website`;
const nameFromSession = sessionStorage.getItem('displaynameth');
document.getElementById('menuname').innerHTML = `${displayname_th} <a class="fa fa-user-circle"></a>`;
