/* js/script_Appraisee.js */
/* Premium Appraisee Dashboard Logic */

document.addEventListener('DOMContentLoaded', () => {
    // --- 0. ตรวจสอบการเข้าถึง (Auth Guard) ---
    if (typeof protectPage === 'function') {
        protectPage();
    }

    // Set Current Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('th-TH', options);

    // Fetch user data from localStorage if exists
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const user = JSON.parse(savedProfile);
        if (user.name) document.querySelector('h2').textContent = user.name;
        if (user.position) document.querySelector('p.text-gray-500').textContent = user.position;
    }

    // Mock function for file delete
    document.querySelectorAll('.fa-trash-alt').forEach(btn => {
        btn.parentElement.onclick = () => {
            Swal.fire({
                title: 'ลบไฟล์นี้?',
                text: "เมื่อลบแล้วจะไม่สามารถกู้คืนข้อมูลได้",
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'ใช่, ลบเลย',
                cancelButtonText: 'ยกเลิก'
            });
        };
    });
});

function handleLogout() {
    Swal.fire({
        title: 'ยืนยันการออกจากระบบ?',
        text: "คุณต้องการสิ้นสุดการใช้งานในครั้งนี้ใช่หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF6D1F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'login.html';
        }
    });
}