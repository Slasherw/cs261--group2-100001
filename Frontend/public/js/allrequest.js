document.addEventListener("DOMContentLoaded", function () {
    fetchAllRequests();
});

function fetchAllRequests() {
    fetch("http://localhost:8080/submit-request/all-requests")
        .then(response => response.json())
        .then(data => {
            displayRequests(data);
        })
        .catch(error => {
            console.error("Error fetching requests:", error);
        });
}

function displayRequests(requests) {
    const requestDetails = document.getElementById("request-details");

    // สร้างโครงสร้างตาราง
    let tableHTML = `<table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th>ID</th>
                <th>เลขทะเบียน</th>
                <th>ชื่อ</th>
                <th>วัน</th>
                <th>เหตุผลคำร้อง</th>
                <th>ประเภทคำร้อง</th>
                <th>Status</th>
                <th>Action</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>`;

    // เพิ่มแถวข้อมูลสำหรับแต่ละคำร้อง
    requests.forEach(request => {
        let statusColor = "";  // ตัวแปรสำหรับเก็บสีสถานะ
        if (request.status === "อนุมัติคำร้อง") {
            statusColor = "style='color: green;'"; // กำหนดสีเขียวถ้าสถานะเป็น "อนุมัติคำร้อง"
        }
        if (request.status === "ปฏิเสธคำร้อง") {
            statusColor = "style='color: red;'"; // กำหนดสีเขียวถ้าสถานะเป็น "อนุมัติคำร้อง"
        }
        tableHTML += `
            <tr>
                <td>${request.id}</td>
                <td>${request.studentId}</td>
                <td>${request.fullName}</td>
                <td>${request.date}</td>
                <td>${request.reason}</td>
                <td>${request.requestType}</td>
                <td id="status-${request.id}" ${statusColor}>${request.status}</td>
                <td>
                    <button class="btn btn-success" onclick="admitRequest(${request.id})">Admit</button>
                </td>
                <td>
                    <button class="btn btn-danger ml-2" onclick="denyRequest(${request.id})">Deny</button>
                    
                </td>
            </tr>`;
    });

    tableHTML += `</tbody></table>`;
    requestDetails.innerHTML = tableHTML;
}
function admitRequest(id) {
    fetch(`http://localhost:8080/submit-request/admit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert("คำร้องถูกอนุมัติแล้ว"); // แจ้งผู้ใช้ว่าคำร้องถูกอนุมัติแล้ว
        location.reload(); // รีเฟรชหน้าเว็บหลังจากเปลี่ยนสถานะเสร็จ
        
        
    })
    .catch(error => {
        console.error("Error admitting request:", error);
    });
    
}function denyRequest(id) {
    fetch(`http://localhost:8080/submit-request/deny/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert("คำร้องถูกปฏิเสธแล้ว"); // แจ้งผู้ใช้ว่าคำร้องถูกปฏิเสธแล้ว
        location.reload(); // รีเฟรชหน้าเว็บหลังจากเปลี่ยนสถานะเสร็จ
    })
    .catch(error => {
        console.error("Error denying request:", error);
    });
}
const displayname_th = sessionStorage.getItem('displaynameth');
const nameFromSession = sessionStorage.getItem('displaynameth');
document.getElementById('menuname').innerHTML = `${displayname_th} <a class="fa fa-user-circle" style="color: black;"></a>`;
