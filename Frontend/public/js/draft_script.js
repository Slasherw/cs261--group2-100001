const numberID = sessionStorage.getItem('username'); 

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
