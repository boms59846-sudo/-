/* js/script_evaluator_profile.js */
/* Evaluator Profile Page Logic */

function saveSettings() {
    Swal.fire({
        title: 'ยืนยันการบันทึก?',
        text: "ระบบจะอัปเดตข้อมูลโปรไฟล์ของคุณทันที",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f97316',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'บันทึกข้อมูล',
        cancelButtonText: 'ยกเลิก',
        borderRadius: '1rem'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว',
                icon: 'success',
                confirmButtonColor: '#f97316'
            });
        }
    });
}

function changePassword() {
    Swal.fire({
        title: 'เปลี่ยนรหัสผ่าน',
        html: `
            <input type="password" id="old-pass" class="swal2-input" placeholder="รหัสผ่านปัจจุบัน">
            <input type="password" id="new-pass" class="swal2-input" placeholder="รหัสผ่านใหม่">
            <input type="password" id="confirm-pass" class="swal2-input" placeholder="ยืนยันรหัสผ่านใหม่">
        `,
        confirmButtonText: 'เปลี่ยนรหัสผ่าน',
        confirmButtonColor: '#f97316',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        focusConfirm: false,
        preConfirm: () => {
            const oldPass = Swal.getPopup().querySelector('#old-pass').value
            const newPass = Swal.getPopup().querySelector('#new-pass').value
            const confirmPass = Swal.getPopup().querySelector('#confirm-pass').value
            if (!oldPass || !newPass || !confirmPass) {
                Swal.showValidationMessage(`กรุณากรอกข้อมูลให้ครบทุกช่อง`)
            }
            return { oldPass, newPass, confirmPass }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('เรียบร้อย!', 'เปลี่ยนรหัสผ่านสำเร็จ', 'success');
        }
    })
}

function uploadSignature() {
    Swal.fire({
        title: 'อัปโหลดลายเซ็น',
        text: 'รองรับไฟล์ PNG พื้นหลังโปร่งใสเท่านั้น',
        input: 'file',
        inputAttributes: {
            'accept': 'image/png',
            'aria-label': 'Upload your signature'
        },
        confirmButtonText: 'อัปโหลด',
        confirmButtonColor: '#f97316'
    })
}

// Preview Profile Image
document.addEventListener('DOMContentLoaded', () => {
    const uploadPhoto = document.getElementById('upload-photo');
    if (uploadPhoto) {
        uploadPhoto.addEventListener('change', function (e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('avatar-preview').src = e.target.result;
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
});
