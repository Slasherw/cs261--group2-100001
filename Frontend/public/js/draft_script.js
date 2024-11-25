const numberID = sessionStorage.getItem('username'); 
/*
fetch(`http://localhost:8080/submit-request/drafts/${numberID}`)
    .then(response => {
        if (!response.ok) throw new Error("No draft records found");
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            throw new Error("Unexpected data format");
        }

        const detailsDiv = document.getElementById('draft-details');

        detailsDiv.innerHTML = `
            <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>ชื่อ</th>
                        <th>วันที่บันทึก</th>
                        <th>เหตุผลที่ยื่นคำร้อง</th>
                        <th>อีเมลล์</th>
                        <th>ประเภทคำร้อง</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="draft-table-body">
                </tbody>
            </table>
        `;

        const tableBody = document.getElementById('draft-table-body');

        data.forEach(draft => {
            tableBody.innerHTML += `
                <tr>
                    <td>${draft.id}</td>
                    <td>${draft.fullName}</td>
                    <td>${draft.date}</td>
                    <td>${draft.reason}</td>
                    <td>${draft.email}</td>
                    <td>${draft.requestType}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editDraft(${draft.id})">แก้ไขคำร้อง</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteDraftPopup(${draft.id})">ยกเลิกคำร้อง</button>
                    </td>
                </tr>
            `;
        });
    })
    .catch(error => {
        document.getElementById('draft-details').innerHTML = "<div class='alert alert-danger'>Error fetching data.</div>";
        console.error("Error:", error);
    });

let draftId = null;

function deleteDraftPopup(id) {
    draftId = id;
    document.getElementById('decline-popup-success').style.display = 'none';
    document.getElementById('decline-popup').style.display = 'block';
}

document.getElementById('decline').addEventListener('click', function() {
    document.getElementById('decline-popup').style.display = 'none';
});

document.getElementById('confirm').addEventListener('click', function() {
    document.getElementById('decline-popup').style.display = 'none';
    deleteDraft();
});

document.getElementById('confirm2').addEventListener('click', function() {
    location.reload();
});

function deleteDraft() {
    fetch(`http://localhost:8080/submit-request/delete-draft/${draftId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete draft");
            return response.json();
        })
        .then(data => {
            document.getElementById('decline-popup-success').style.display = 'block';
        })
        .catch(error => {
            alert("Error deleting draft");
            console.error("Error:", error);
        });
}

function editDraft(id) {
    window.location.href = `../html/request.html?id=${id}`;
}
*/
document.addEventListener("DOMContentLoaded", function () {
    fetchAllRequests();
});

function fetchAllRequests() {
    fetch("http://localhost:8080/submit-request/requests-by-stage/10")
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
                <button class="btn btn-danger" onclick="deleteFormPopup(${request.id})">ยกเลิกคำร้อง</button>
            </td>
            <td>
                <button class="btn btn-warning ml-2" onclick="editForm(${request.id})">แก้ไขคำร้อง</button>
            </td>
            <td>
                <button class="btn btn-outline-dark" onclick="goToDetailRequest(${request.id})">detail</button>
            </td>
            </tr>`;
    });

    tableHTML += `</tbody></table>`;
    requestDetails.innerHTML = tableHTML;
}

function goToDetailRequest(requestId) {
    // สร้าง URL ใหม่เพื่อส่ง requestId ไปยังหน้า detailrequest.html
    const url = `detailrequest.html?id=${requestId}`;
    window.location.href = url; // เปลี่ยนเส้นทางไปยัง URL ที่ต้องการ
}
const displayname_th = sessionStorage.getItem('displaynameth');
const nameFromSession = sessionStorage.getItem('displaynameth');
document.getElementById('menuname').innerHTML = `${displayname_th} <a class="fa fa-user-circle" style="color: black;"></a>`;

   // ฟังก์ชั่นสำหรับลบคำร้อง
   function deleteFormPopup(id) {
        
    formId = id;
    document.getElementById('decline-popup-success').style.display = 'none';
    document.getElementById('decline-popup').style.display = 'block';

}

document.getElementById('decline').addEventListener('click', function() {

    document.getElementById('decline-popup').style.display = 'none';

});

document.getElementById('confirm').addEventListener('click', function() {

    document.getElementById('decline-popup').style.display = 'none';
    deleteForm();

});

document.getElementById('confirm2').addEventListener('click', function() {
    location.reload();
})

function deleteForm() {

    fetch(`http://localhost:8080/submit-request/delete/${formId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to delete request");
        return response.json();
    })
    .then(data => {

        document.getElementById('decline-popup-success').style.display = 'block';

        //alert(data.message); // แจ้งข้อความหลังจากลบข้อมูล
        //location.reload(); // รีเฟรชหน้าจอเพื่อแสดงข้อมูลล่าสุด
    })
    .catch(error => {
        alert("Error deleting request");
        console.error("Error:", error);
    });
}
function editForm(id) {
    // เปลี่ยนหน้าที่ไปยัง request.html พร้อมพารามิเตอร์ id
    window.location.href = `request.html?id=${id}`;
}

