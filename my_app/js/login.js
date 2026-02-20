// จัดการการ submit ฟอร์มเข้าสู่ระบบ
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.form');
    const loginButton = document.querySelector('.button');

    // จัดการการ submit ฟอร์ม
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // ป้องกันการ submit ฟอร์มแบบปกติ

            // เปลี่ยนหน้าไปยัง index.html
            window.location.href = 'dashboardEvaluator.html';
        });
    }

    // จัดการการคลิกปุ่ม Sign In
    if (loginButton) {
        loginButton.addEventListener('click', function (e) {
            e.preventDefault(); // ป้องกันการ submit ฟอร์มแบบปกติ

            // เปลี่ยนหน้าไปยัง index.html
            window.location.href = 'dashboardEvaluatoer.html';
        });
    }
});
