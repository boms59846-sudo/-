/* js/script_Appraisee_edit.js */
/* Premium Edit Profile Page Logic */

document.addEventListener('DOMContentLoaded', () => {
    const imgUpload = document.getElementById('img-upload');
    const preview = document.getElementById('profile-preview');
    const form = document.getElementById('main-edit-form');

    // Image Preview Logic
    imgUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                // Animation feedback
                preview.style.transform = 'scale(0.95)';
                setTimeout(() => preview.style.transform = 'scale(1)', 200);
            };
            reader.readAsDataURL(file);
        }
    });

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading
        Swal.fire({
            title: 'กำลังบันทึก...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Simulate API call
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: 'ข้อมูลส่วนตัวของคุณถูกอัปเดตแล้ว',
                confirmButtonColor: '#121212',
                confirmButtonText: 'กลับไปยังโปรไฟล์'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'Appraisee_data.html';
                }
            });
        }, 1500);
    });
});
