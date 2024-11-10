const numberID = sessionStorage.getItem('username');

    fetch(`http://localhost:8080/submit-request/student/${numberID}`)
    .then(response => {
        console.log(response); // แสดงข้อมูล response ทั้งหมดใน console
        if (!response.ok) throw new Error("No records found");
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            throw new Error("Unexpected data format"); // กรณีที่ข้อมูลไม่เป็น array
        }

        const detailsDiv = document.getElementById('request-details');
        
        // สร้างตาราง Bootstrap
        detailsDiv.innerHTML = `
            <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>ชื่อ</th>
                        <th>วันที่ยื่น</th>
                        
                        <th>เหตุผลที่ยื่นคำร้อง</th>
                        <th>อีเมลล์</th>
                        <th>ประเภทคำร้อง</th>
                        <th>สถานะ</th>
                        <th>Action</th>
                        <th>Action</th>
                        <th>ActionDate</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                </tbody>
            </table>
        `;

        const tableBody = document.getElementById('table-body');

        data.forEach(form => {
            let statusColor = "";  // ตัวแปรสำหรับเก็บสีสถานะ
        if (form.status === "อนุมัติคำร้อง") {
            statusColor = "style='color: green;'"; // กำหนดสีเขียวถ้าสถานะเป็น "อนุมัติคำร้อง"
        }
        if (form.status === "ปฏิเสธคำร้อง") {
            statusColor = "style='color: red;'"; // กำหนดสีเขียวถ้าสถานะเป็น "อนุมัติคำร้อง"
        }
            tableBody.innerHTML += `
                <tr>
                    <td>${form.id}</td>
                    <td>${form.fullName}</td>
                    <td>${form.date}</td>
                    
                    <td>${form.reason}</td>
                    <td>${form.email}</td>
                    <td>${form.requestType}</td>
                    <td id="status-${form.id}" ${statusColor}>${form.status}</td>
                    <td>
                        <!-- ปุ่มลบสำหรับแต่ละแถว -->
                        <button class="btn btn-danger" onclick="deleteFormPopup(${form.id})">ยกเลิกคำร้อง</button>
                        
                    </td>
                    <td>
                        <button class="btn btn-warning ml-2" onclick="editForm(${form.id})">แก้ไขคำร้อง</button>
                    </td>
                    <td>${form.actiondate}</td>
                </tr>
            `;
        });
    })
    .catch(error => {
        document.getElementById('request-details').innerHTML = "<div class='alert alert-danger'>Error fetching data.</div>";
        console.error("Error:", error);
    });

    let formId = null;

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
const displayname_th = sessionStorage.getItem('displaynameth');
const nameFromSession = sessionStorage.getItem('displaynameth');
document.getElementById('menuname').innerHTML = `${displayname_th} <a class="fa fa-user-circle" style="color: black;"></a>`;
