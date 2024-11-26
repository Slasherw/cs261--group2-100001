document.addEventListener("DOMContentLoaded", function () {
    fetchAllRequests();
});

function fetchAllRequests() {
    fetch("http://localhost:8080/submit-request/requests-by-stage/3")
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
                <th>เลขทะเบียน</th>
                <th>ชื่อ</th>
                <th>วันที่ยื่น</th>
                <th>เหตุผลคำร้อง</th>
                <th>ประเภทคำร้อง</th>
                <th>Status</th>
                <th>Action</th>
                <th>Action</th>
                <th>วันที่ที่ตอบรับ</th>
                <th>ข้อมูล</th>
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
                <td>
                <input type="date" id="date-${request.id}"  class="form-control">
                </td>
                <td>
                <button class="btn btn-outline-dark" onclick="goToDetailRequest(${request.id})">detail</button>
                </td>
            </tr>`;
    });

    tableHTML += `</tbody></table>`;
    requestDetails.innerHTML = tableHTML;
}
function admitRequest(id) {
    const selectedDate = document.getElementById(`date-${id}`).value;

    if (!selectedDate) {
        alert("กรุณาเลือกวันที่ก่อนที่จะอนุมัติคำร้อง");
        return;
    }
    fetch(`http://localhost:8080/submit-request/admitdean/${id}?date=${selectedDate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {

        document.getElementById('decline-request-popup').style.display = 'none';
        document.getElementById('submit-request-popup').style.display = 'block';
        //alert("คำร้องถูกอนุมัติแล้ว"); // แจ้งผู้ใช้ว่าคำร้องถูกอนุมัติแล้ว
        //location.reload(); // รีเฟรชหน้าเว็บหลังจากเปลี่ยนสถานะเสร็จ
        
        
    })
    .catch(error => {
        console.error("Error admitting request:", error);
    });
    
}function denyRequest(id) {
    const selectedDate = document.getElementById(`date-${id}`).value;

    if (!selectedDate) {
        alert("กรุณาเลือกวันที่ก่อนที่จะอนุมัติคำร้อง");
        return;
    }
    fetch(`http://localhost:8080/submit-request/deny/${id}?date=${selectedDate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
    .then(response => response.json())
    .then(data => {
        
        document.getElementById('submit-request-popup').style.display = 'none';
        document.getElementById('decline-request-popup').style.display = 'block';
        
        //alert("คำร้องถูกปฏิเสธแล้ว"); // แจ้งผู้ใช้ว่าคำร้องถูกปฏิเสธแล้ว
        //location.reload(); // รีเฟรชหน้าเว็บหลังจากเปลี่ยนสถานะเสร็จ
    })
    .catch(error => {
        console.error("Error denying request:", error);
    });
}
function goToDetailRequest(requestId) {
    // สร้าง URL ใหม่เพื่อส่ง requestId ไปยังหน้า detailrequest.html
    const url = `detailrequest.html?id=${requestId}`;
    window.location.href = url; // เปลี่ยนเส้นทางไปยัง URL ที่ต้องการ
}
const displayname_th = sessionStorage.getItem('displaynameth');
const nameFromSession = sessionStorage.getItem('displaynameth');
document.getElementById('menuname').innerHTML = `${displayname_th} <a class="fa fa-user-circle" style="color: black;"></a>`;

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
