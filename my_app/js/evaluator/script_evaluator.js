/* d:\watcharaphon18\my_app\js\script_evaluator.js */

document.addEventListener('DOMContentLoaded', () => {
    // --- 0. ตรวจสอบการเข้าถึง (Auth Guard) ---
    if (typeof protectPage === 'function') {
        protectPage();
    }

    // 1. Department Bar Chart
    const ctxDept = document.getElementById('departmentChart');
    if (ctxDept) {
        new Chart(ctxDept.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['วิชาการ', 'บริหาร', 'แผนงาน', 'กิจการ', 'บริการ'],
                datasets: [{
                    label: 'ประเมินแล้ว',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: '#FF6D1F',
                    borderRadius: 12,
                    barThickness: 30
                }, {
                    label: 'รอดำเนินการ',
                    data: [2, 3, 5, 2, 1],
                    backgroundColor: '#F1F5F9',
                    borderRadius: 12,
                    barThickness: 30
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false }, stacked: true },
                    y: { grid: { color: '#F1F5F9' }, stacked: true, beginAtZero: true }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 2. Progress Doughnut Chart
    const ctxProg = document.getElementById('progressCircle');
    if (ctxProg) {
        new Chart(ctxProg.getContext('2d'), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [78, 22],
                    backgroundColor: ['#FF6D1F', '#F1F5F9'],
                    borderWidth: 0,
                    circumference: 360,
                    rotation: 0
                }]
            },
            options: {
                cutout: '85%',
                plugins: { tooltip: { enabled: false } },
                events: []
            }
        });
    }

    // 3. Sidebar Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
    }

    // 4. Logout (Shared with Admin logic but simplified for now)
    const logoutBtn = document.getElementById('logout-btn-sidebar') || document.getElementById('logout-btn') || document.querySelector('a[href="#"].text-red-500');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'ยืนยันการออกจากระบบ?',
                text: "คุณต้องการออกจากระบบใช่หรือไม่",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF6D1F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่, ออกจากระบบ',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('cice_user');
                    Swal.fire({
                        icon: 'success',
                        title: 'ออกจากระบบสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = 'login_evaluator.html';
                    });
                }
            });
        });
    }
});
