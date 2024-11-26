
const urlParams = new URLSearchParams(window.location.search);
const requestId = urlParams.get('id');
window.onload = function() {
    if (requestId) {
        // ทำการ fetch ข้อมูลทั้งสองพร้อมกัน
        Promise.all([
            fetchRequestById(requestId),
        ]).catch(error => {
            console.error("Error:", error);
        });
    }
};
// ฟังก์ชันเพื่อดึงข้อมูลคำร้องจาก API ตาม requestId
function fetchRequestById(requestId) {
    fetch(`http://localhost:8080/submit-request/info/${requestId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Request not found");
            }
            return response.json();
        })
        .then(data => {
            displayRequestDetails(data);
        })
        .catch(error => {
            console.error("Error fetching request:", error);
            const container = document.getElementById("request-container");
            container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
}
function displayRequestDetails(request) {
    const container = document.getElementById("request-container");

    // Clear any previous content
    container.innerHTML = "<h2>Request Details</h2>";

    // Create HTML elements for each detail
    /*
    const details = `
        <div class="request-item">
            <div><span class="request-label">Request ID:</span> ${request.id}</div>
            <div><span class="request-label">Student ID:</span> ${request.studentId}</div>
            <div><span class="request-label">Full Name:</span> ${request.fullName}</div>
            <div><span class="request-label">Date:</span> ${request.date}</div>
            <div><span class="request-label">Reason:</span> ${request.reason}</div>
            <div><span class="request-label">Request Type:</span> ${request.requestType}</div>
            <div><span class="request-label">Status:</span> ${request.status}</div>
            <div><span class="request-label">Stage:</span> ${request.stage}</div>
            <div><span class="request-label">Action Date:</span> ${request.actiondate}</div>
            <div><span class="request-label">Year:</span> ${request.year}</div>
            <div><span class="request-label">Department:</span> ${request.department}</div>
            <div><span class="request-label">Email:</span> ${request.email}</div>
            <div><span class="request-label">Subdistrict:</span> ${request.subdistrict}</div>
            <div><span class="request-label">District:</span> ${request.district}</div>
            <div><span class="request-label">Province:</span> ${request.province}</div>
            <div><span class="request-label">Student Phone:</span> ${request.studentPhone}</div>
            <div><span class="request-label">Parent Phone:</span> ${request.parentPhone}</div>
            <div><span class="request-label">Advisor:</span> ${request.advisor}</div>
            <div><span class="request-label">Request Type:</span> ${request.requestType}</div>
            <div><span class="request-label">Semester:</span> ${request.semester}</div>
            <div><span class="request-label">Academic Year:</span> ${request.academicYear}</div>
            <div><span class="request-label">Course Code:</span> ${request.courseCode}</div>
            <div><span class="request-label">Course Name:</span> ${request.courseName}</div>
            <div><span class="request-label">Section:</span> ${request.section}</div>
            <div><span class="request-label">Reason:</span> ${request.reason}</div>
            <div><span class="request-label">Status:</span> ${request.status}</div>
            <div><span class="request-label">file id:</span> ${request.attachFiles}</div>
        </div>
    `;
    // Append details to the container
    container.innerHTML += details;
    */
    // บันทึกข้อมูล attachFiles ลงใน sessionStorage
    if (Array.isArray(request.attachFiles)) {
        sessionStorage.setItem('attachFiles', JSON.stringify(request.attachFiles));
    }

    // เรียกฟังก์ชันแสดงปุ่มดาวน์โหลด
    displayDownloadButtons();
}

// ฟังก์ชันแสดงปุ่มดาวน์โหลดพร้อมข้อมูลไฟล์
async function displayDownloadButtons() {
    const container = document.getElementById("request-container");
    const attachFiles = JSON.parse(sessionStorage.getItem('attachFiles'));

    // ตรวจสอบว่า attachFiles มีข้อมูลหรือไม่
    if (Array.isArray(attachFiles) && attachFiles.length > 0) {
        for (const fileId of attachFiles) {
            try {
                // ดึงข้อมูลไฟล์จาก server
                const response = await fetch(`http://localhost:8080/fileserver/info/${fileId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch file info for ID: ${fileId}`);
                }
                const fileData = await response.json();

                // สร้างปุ่มพร้อมแสดงชื่อไฟล์
                const fileName = fileData.originalFileName || "ไม่ทราบชื่อไฟล์";
                const button = document.createElement("button");
                button.className = "btn btn-primary";
                button.textContent = `ดาวน์โหลดไฟล์ ${fileName}`;
                button.onclick = () => downloadFile(fileId);

                // เพิ่มปุ่มและชื่อไฟล์ลงใน container
                const fileContainer = document.createElement("div");
                fileContainer.style.marginBottom = "10px";
                fileContainer.appendChild(button);

                const fileLabel = document.createElement("span");
                fileLabel.style.marginLeft = "10px";
                fileLabel.textContent = `(${fileName})`;

                fileContainer.appendChild(fileLabel);
                container.appendChild(fileContainer);
            } catch (error) {
                console.error("Error fetching file info:", error);
            }
        }
    }
}
// ฟังก์ชันดาวน์โหลดไฟล์
function downloadFile(fileId) {
    const downloadUrl = `http://localhost:8080/fileserver/download/${fileId}`;
    // เปลี่ยนเส้นทางไปยัง URL ของไฟล์เพื่อดาวน์โหลดทันที
    window.location.href = downloadUrl;
}

document.getElementById('request-container').innerHTML = `
    <h2>หมายเลขคำร้อง: ${request.id}</h2>
    <p class="date">${request.date}</p>
    <h2>ข้อมูลนักศึกษา</h2>
    <pre>
ชื่อ: ${request.fullName}       รหัสนักศึกษา: ${request.studentId}        ชั้นปี: ${request.year}
สาขาวิชา: ${request.department}        อีเมลล์: ${request.email}
    </pre>
    <h2>ที่อยู่ที่สามารถติดต่อได้</h2>
    <pre>
เลขที่ ${request.address}    แขวง/ตำบล ${request.subdistrict}    เขต/อำเภอ ${request.district}
จังหวัด ${request.province}    โทรศัพท์นักศึกษา ${request.studentPhone}
โทรศัพท์ผู้ปกครอง ${request.parentPhone}    อาจารย์ที่ปรึกษา ${request.advisor}
    </pre>
    <h2>ประสงค์จะยื่นคำร้องเรื่อง</h2>
    <pre>
${request.requestType}   ภาคเรียนที่ ${request.semester}    ปีการศึกษา ${request.academicYear}
รหัสวิชา ${request.courseCode}    ชื่อวิชา ${request.courseName}   Section ${request.section}
    </pre>
    <h2>เหตุผลในการยื่นคำร้อง</h2>
    <p>${request.reason}</p>
`;

document.getElementById('status').innerHTML = `
    <h2>สถานะคำร้อง: ${request.status}</h2>
`;

document.getElementById('attachFiles').innerHTML = `
    <h2>เอกสารประกอบคำร้อง</h2>
    ${request.attachFiles}
`;