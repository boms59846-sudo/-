// js/script_admin.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 0. ตรวจสอบการเข้าถึง (Auth Guard) ---
    if (typeof protectPage === 'function') {
        protectPage();
    }

    // แสดงชื่อผู้ใช้ที่ Login
    if (typeof getCurrentUser === 'function') {
        const user = getCurrentUser();
        if (user) {
            document.querySelectorAll('.username').forEach(el => {
                el.textContent = user.username;
            });
        }
    }


    // --- 1. ประกาศตัวแปรและ Element ต่างๆ ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutBtnSidebar = document.getElementById('logout-btn-sidebar');
    const logoutBtnProfile = document.getElementById('logout-btn-profile');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');
    const sidebarDropdownToggles = document.querySelectorAll('.sidebar-dropdown-toggle');

    // Modal Variables
    const profileModal = document.getElementById('profile-modal');
    const openProfileBtn = document.getElementById('open-profile-form');
    const closeProfileBtn = document.getElementById('close-profile-modal');

    // [ใหม่] Notification Elements
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');

    // [ใหม่] Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;


    // --- 2. ฟังก์ชันเปิด/ปิด Sidebar (Mobile) ---
    function toggleSidebar() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.toggle('-translate-x-full');
            sidebarOverlay.classList.toggle('hidden');
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    // Sidebar Item Click Logic จะจัดการใน section 5 ด้านล่าง (หลีกเลี่ยง event listener ซ้ำ)

    // --- 3. ฟังก์ชัน Settings Dropdown ---
    if (settingsBtn && settingsMenu) {
        settingsBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            settingsMenu.classList.toggle('show');
            // ปิด Notification ถ้าเปิดอยู่
            if (notificationDropdown) notificationDropdown.classList.remove('show');
        });
    }

    // --- [ใหม่] ฟังก์ชัน Notification Dropdown ---
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            notificationDropdown.classList.toggle('show');
            // ปิด Settings ถ้าเปิดอยู่
            if (settingsMenu) settingsMenu.classList.remove('show');
        });
    }

    // ปิด Dropdown เมื่อคลิกข้างนอก
    window.addEventListener('click', (event) => {
        if (settingsMenu && settingsMenu.classList.contains('show')) {
            if (!settingsBtn.contains(event.target) && !settingsMenu.contains(event.target)) {
                settingsMenu.classList.remove('show');
            }
        }
        if (notificationDropdown && notificationDropdown.classList.contains('show')) {
            if (!notificationBtn.contains(event.target) && !notificationDropdown.contains(event.target)) {
                notificationDropdown.classList.remove('show');
            }
        }
    });

    // --- [ใหม่] ระบบ Dark Mode ---
    const darkModeBtn = document.getElementById('dark-mode-toggle-btn');
    const html = document.documentElement;

    function setTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            html.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
            if (darkModeToggle) darkModeToggle.checked = true;
            if (darkModeBtn) darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            html.setAttribute('data-theme', 'light');
            html.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
            if (darkModeToggle) darkModeToggle.checked = false;
            if (darkModeBtn) darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // ตรวจสอบค่าเดิม
    if (localStorage.getItem('darkMode') === 'enabled') {
        setTheme('dark');
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            setTheme(darkModeToggle.checked ? 'dark' : 'light');
        });
    }

    // --- 4. ฟังก์ชัน Dropdown ใน Sidebar ---
    sidebarDropdownToggles.forEach((toggle) => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const parentMenuItem = this.parentElement;
            parentMenuItem.classList.toggle('open');
        });
    });

    // --- 5. ระบบสลับหน้า (View Switcher) - อัปเดต ---
    // Navigation Links (Menu) - เพิ่มเมนูใหม่
    const navDashboard = document.getElementById('nav-dashboard');
    const navPersonnel = document.getElementById('nav-personnel');
    const navAssessment = document.getElementById('nav-assessment');
    const navAssessmentPeriod = document.getElementById('nav-assessment-period');
    const navAssessmentLine = document.getElementById('nav-assessment-line');
    const navOrganization = document.getElementById('nav-organization');
    const navReportSummary = document.getElementById('nav-report-summary');
    const navReportStatistics = document.getElementById('nav-report-statistics');
    const navCommandCenter = document.getElementById('nav-command-center');
    // [ดิิม] เมนูเพิ่มบุคลากร
    const navCommittee = document.getElementById('nav-committee');

    // Content Views (Section) - เพิ่มหน้าใหม่
    const viewDashboard = document.getElementById('view-dashboard');
    const viewPersonnel = document.getElementById('view-personnel');
    const viewAssessment = document.getElementById('view-assessment');
    const viewAssessmentPeriod = document.getElementById('view-assessment-period');
    const viewAssessmentLine = document.getElementById('view-assessment-line');
    const viewOrganization = document.getElementById('view-organization');
    const viewReportSummary = document.getElementById('view-report-summary');
    const viewReportStatistics = document.getElementById('view-report-statistics');
    const viewCommandCenter = document.getElementById('view-command-center');
    // [ใหม่] หน้าเพิ่มบุคลากร
    const viewAddPersonnel = document.getElementById('view-add-personnel');
    // [ใหม่ล่าสุด] หน้าโปรไฟล์
    const viewProfile = document.getElementById('view-profile');
    const navProfileShortcut = document.getElementById('nav-profile-shortcut');

    window.switchView = function (viewName) {
        // ซ่อนทุกหน้า
        const allViews = [viewDashboard, viewPersonnel, viewAssessment, viewAssessmentPeriod,
            viewAssessmentLine, viewOrganization, viewReportSummary, viewReportStatistics, viewAddPersonnel, viewProfile, viewCommandCenter];
        allViews.forEach(view => {
            if (view) {
                view.classList.remove('active');
                view.style.display = 'none';
            }
        });

        // ลบ active class และสไตล์เดิมจากทุกเมนู
        const allNavs = [navDashboard, navPersonnel, navAssessment, navAssessmentPeriod,
            navAssessmentLine, navOrganization, navReportSummary, navReportStatistics, navCommittee, navCommandCenter];

        allNavs.forEach(nav => {
            if (nav) {
                nav.classList.remove('active', 'text-primary', 'bg-primary-light');
                nav.classList.add('text-text-muted', 'hover:text-primary', 'hover:bg-gray-50');
            }
        });

        // แสดงหน้าตามที่เลือก
        let targetView = null;
        let targetNav = null;

        switch (viewName) {
            case 'dashboard': targetView = viewDashboard; targetNav = navDashboard; break;
            case 'personnel': targetView = viewPersonnel; targetNav = navPersonnel; if (typeof renderPersonnelTable === 'function') renderPersonnelTable(); break;
            case 'assessment': targetView = viewAssessment; targetNav = navAssessment; break;
            case 'assessment-period': targetView = viewAssessmentPeriod; targetNav = navAssessmentPeriod; break;
            case 'assessment-line': targetView = viewAssessmentLine; targetNav = navAssessmentLine; break;
            case 'organization': targetView = viewOrganization; targetNav = navOrganization; break;
            case 'report-summary': targetView = viewReportSummary; targetNav = navReportSummary; break;
            case 'report-statistics':
                targetView = viewReportStatistics;
                targetNav = navReportStatistics;
                setTimeout(initAdminCharts, 50); // Small delay to ensure display is block
                break;
            case 'add-personnel': targetView = viewAddPersonnel; targetNav = navCommittee; break;
            case 'command-center': targetView = viewCommandCenter; targetNav = navCommandCenter; break;
            case 'profile': targetView = viewProfile; targetNav = null; break;
        }

        if (targetView) {
            targetView.style.display = 'block';
            setTimeout(() => targetView.classList.add('active'), 10);
        }
        if (targetNav) {
            targetNav.classList.add('active', 'text-primary', 'bg-primary-light');
            targetNav.classList.remove('text-text-muted', 'hover:text-primary', 'hover:bg-gray-50');
        }
    }


    // Event Listeners สำหรับเมนูทั้งหมด
    if (navDashboard) navDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView('dashboard'); });
    if (navPersonnel) navPersonnel.addEventListener('click', (e) => { e.preventDefault(); switchView('personnel'); });
    if (navAssessment) navAssessment.addEventListener('click', (e) => { e.preventDefault(); switchView('assessment'); });
    if (navAssessmentPeriod) navAssessmentPeriod.addEventListener('click', (e) => { e.preventDefault(); switchView('assessment-period'); });
    if (navAssessmentLine) navAssessmentLine.addEventListener('click', (e) => { e.preventDefault(); switchView('assessment-line'); });
    if (navOrganization) navOrganization.addEventListener('click', (e) => { e.preventDefault(); switchView('organization'); });
    if (navReportSummary) navReportSummary.addEventListener('click', (e) => { e.preventDefault(); switchView('report-summary'); });
    if (navReportStatistics) navReportStatistics.addEventListener('click', (e) => { e.preventDefault(); switchView('report-statistics'); });
    if (navCommittee) navCommittee.addEventListener('click', (e) => { e.preventDefault(); switchView('add-personnel'); });
    if (navCommandCenter) navCommandCenter.addEventListener('click', (e) => { e.preventDefault(); switchView('command-center'); });

    // คลิกที่โปรไฟล์มุมล่างซ้าย
    if (navProfileShortcut) {
        navProfileShortcut.addEventListener('click', () => {
            switchView('profile');
            if (window.innerWidth < 1024) toggleSidebar();
        });
    }

    // --- 6. ฟังก์ชัน Profile Modal ---
    if (openProfileBtn) {
        openProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (settingsMenu) settingsMenu.classList.remove('show');
            openModal('profile-modal');
        });
    }
    if (closeProfileBtn) {
        closeProfileBtn.addEventListener('click', () => closeAllModals());
    }

    // --- 7. ฟังก์ชัน Logout ---
    function handleLogout(e) {
        e.preventDefault();
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'ยืนยันการออกจากระบบ?',
                text: "คุณต้องการออกจากระบบใช่หรือไม่",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF6D1F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่, ออกจากระบบ',
                cancelButtonText: 'ยกเลิก',
                background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e293b' : '#fff',
                color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f1f5f9' : '#545454'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('cice_user');
                    window.location.href = 'login_admin.html';
                }
            });
        } else {
            if (confirm('ยืนยันการออกจากระบบ?')) {
                window.location.href = 'login.html';
            }
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    if (logoutBtnSidebar) {
        logoutBtnSidebar.addEventListener('click', handleLogout);
    }
    if (logoutBtnProfile) {
        logoutBtnProfile.addEventListener('click', handleLogout);
    }

    // --- 7.2 Generic Modal Open/Close ---
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        }
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // รอแอนิเมชั่นจบ
        });
    }

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAllModals();
        });
    });

    // Open Modals (Buttons)
    const openAddPeriodBtn = document.getElementById('open-add-period-modal');
    if (openAddPeriodBtn) openAddPeriodBtn.addEventListener('click', () => openModal('add-period-modal'));

    const openAddDeptBtn = document.getElementById('open-add-dept-modal');
    if (openAddDeptBtn) openAddDeptBtn.addEventListener('click', () => openModal('add-dept-modal'));

    const openAddLineBtn = document.getElementById('open-add-line-modal');
    if (openAddLineBtn) openAddLineBtn.addEventListener('click', () => openModal('add-line-modal'));

    // Sidebar direct link to Add Period Modal (RESTORED)
    const navAddPeriod = document.getElementById('nav-add-period');
    if (navAddPeriod) {
        navAddPeriod.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('add-period-modal');
        });
    }

    // --- 7.3 Form Submissions (RESTORED) ---
    function handleFormSubmit(formId, successMessage) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังบันทึก...';
            btn.disabled = true;

            setTimeout(() => {
                const isDark = document.body.classList.contains('dark-mode');
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ!',
                        text: successMessage,
                        confirmButtonColor: '#FF6D1F',
                        timer: 1500,
                        showConfirmButton: false,
                        background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e1e1e' : '#fff',
                        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#fff' : '#545454'
                    }).then(() => {
                        closeAllModals();
                        form.reset();
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    });
                } else {
                    alert(successMessage);
                    closeAllModals();
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            }, 800);
        });
    }

    handleFormSubmit('add-period-form', 'เพิ่มรอบการประเมินเรียบร้อยแล้ว');
    handleFormSubmit('add-dept-form', 'เพิ่มแผนกใหม่เรียบร้อยแล้ว');
    handleFormSubmit('add-line-form', 'เพิ่มสายการประเมินเรียบร้อยแล้ว');

    // --- 8. สร้างกราฟ Chart.js ---
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        new Chart(progressCtx, {
            type: 'doughnut',
            data: {
                labels: ['ประเมินเสร็จสิ้น', 'รอดำเนินการ', 'บุคลากรที่ยังไม่ได้เข้าสู่ระบบ', 'อาจารย์ที่เข้าสู่ระบบเสร็จสิ้น', 'บุคลากรที่รอดำเนินการ', 'นักเรียนที่ยังไม่ได้รับการยืนยัน'],
                datasets: [{
                    label: 'สถานะการประเมิน',
                    data: [1000, 500, 700, 1500, 300, 100],
                    backgroundColor: ['#28a745', '#ffc107', '#ff9f00', '#1e90ff', '#333333', '#ff0028'],
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: body.classList.contains('dark-mode') ? '#fff' : '#666' } }
                }
            }
        });
    }

    // --- 9. MOCK DATA & PERSONNEL TABLE LOGIC ---
    let mockPersonnel = [
        { id: 'U1001', name: 'สมชาย ใจดี', dept: 'ฝ่ายวิชาการ / อาจารย์', role: 'assessor', status: 'active' },
        { id: 'U1002', name: 'สมหญิง รักเรียน', dept: 'ฝ่ายธุรการ / เจ้าหน้าที่', role: 'appraisee', status: 'active' },
        { id: 'U1003', name: 'วิชัย เก่งกาจ', dept: 'ฝ่ายบริหาร / หัวหน้าฝ่าย', role: 'admin', status: 'active' },
        { id: 'U1004', name: 'มานี มีตา', dept: 'ฝ่ายวิชาการ / อาจารย์', role: 'appraisee', status: 'inactive' },
        { id: 'U1005', name: 'ปิติ พอใจ', dept: 'ฝ่ายบุคคล / เจ้าหน้าที่', role: 'assessor', status: 'active' }
    ];

    function renderPersonnelTable() {
        const tbody = document.getElementById('user-list-tbody');
        if (!tbody) return;
        tbody.innerHTML = ''; // Clear existing rows

        mockPersonnel.forEach(user => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-user-id', user.id);

            const statusClass = user.status === 'active' ? 'status-active' : 'status-inactive';
            const statusText = user.status === 'active' ? 'Active' : 'Inactive';

            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.dept}</td>
                <td>
                    <select class="user-role-select" data-user-id="${user.id}">
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                        <option value="assessor" ${user.role === 'assessor' ? 'selected' : ''}>Assessor</option>
                        <option value="appraisee" ${user.role === 'appraisee' ? 'selected' : ''}>Appraisee</option>
                    </select>
                </td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-sm btn-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-sm btn-delete"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Add User Button Logic (Redirect to Form)
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('add-personnel');
        });
    }

    // --- 10. [ใหม่] Logic สำหรับฟอร์มเพิ่มบุคลากร ---
    const addPersonnelForm = document.getElementById('add-personnel-form');
    if (addPersonnelForm) {
        addPersonnelForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // จำลองการดึงค่า
            const name = document.getElementById('new-fname').value + ' ' + document.getElementById('new-lname').value;
            const dept = document.getElementById('new-dept').options[document.getElementById('new-dept').selectedIndex].text;
            const role = document.getElementById('new-role').value;
            const id = document.getElementById('new-id').value;

            // แสดง Loading จำลอง
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังบันทึก...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`บันทึกข้อมูลสำเร็จ!\n\nเพิ่มคุณ "${name}"\nรหัส: ${id}\nแผนก: ${dept}`);

                // เพิ่มลงในตารางจำลอง (ถ้าหน้ารายชื่อโหลดอยู่)
                const newUser = {
                    id: id,
                    name: name,
                    dept: dept,
                    role: role,
                    status: 'active'
                };
                mockPersonnel.push(newUser);
                renderPersonnelTable();

                // รีเซ็ตฟอร์มและปุ่ม
                addPersonnelForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;

                // กลับไปหน้ารายชื่อ
                switchView('personnel');

            }, 1000);
        });
    }

    // --- 11. [ใหม่] สร้างกราฟในหน้า "ผลการประเมิน" สำหรับ Admin ---
    function initAdminCharts() {
        const barCtx = document.getElementById('adminComparisonChart');
        const pieCtx = document.getElementById('adminScoreDistributionChart');
        if (!barCtx || !pieCtx) return;

        // --- Bar Chart (Assessment Criteria) ---
        // Clean up previous instance if exists
        const existingBar = Chart.getChart('adminComparisonChart');
        if (existingBar) existingBar.destroy();

        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: [
                    'ความกระตือรือร้น', 'ความรับผิดชอบ', 'ความคิดริเริ่ม', 'การทำงานร่วมกัน',
                    'ผลสัมฤทธิ์', 'การมีส่วนร่วม', 'การพัฒนาตนเอง', 'ความไว้วางใจ'
                ],
                datasets: [{
                    label: 'คะแนนเฉลี่ยทั้งองค์กร',
                    data: [88, 92, 75, 82, 90, 78, 85, 88],
                    backgroundColor: 'rgba(255, 109, 31, 0.7)',
                    borderColor: '#FF6D1F',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { beginAtZero: true, max: 100 }
                }
            }
        });

        // --- Pie Chart (Level Distribution) ---
        const existingPie = Chart.getChart('adminScoreDistributionChart');
        if (existingPie) existingPie.destroy();

        // Admin Mock Counts (Total 5,000)
        const counts = { exc: 1200, vg: 2500, g: 800, f: 400, imp: 100 };

        // Update Legend Labels
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val.toLocaleString();
        };
        setVal('admin-count-excellent', counts.exc);
        setVal('admin-count-verygood', counts.vg);
        setVal('admin-count-good', counts.g);
        setVal('admin-count-fair', counts.f);
        setVal('admin-count-improve', counts.imp);

        new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['ดีเยี่ยม (5)', 'ดีมาก (4)', 'ดี (3)', 'พอใช้ (2)', 'ปรับปรุง (1)'],
                datasets: [{
                    data: [counts.exc, counts.vg, counts.g, counts.f, counts.imp],
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.8)', 'rgba(59, 130, 246, 0.8)',
                        'rgba(245, 158, 11, 0.8)', 'rgba(168, 85, 247, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed.toLocaleString()} คน`
                        }
                    }
                },
                cutout: '65%'
            }
        });
    } // Closes initAdminCharts function

    // --- 11. ฟังก์ชันช่วยเหลืออื่นๆ ---
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.textContent = now.toLocaleDateString('th-TH', options);

    const dispatchForm = document.getElementById('dispatchForm');
    if (dispatchForm) {
        dispatchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const campaign = document.getElementById('campaignName').value;
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'ยืนยันการกระจายแบบประเมิน?',
                    text: `ระบบจะทำการส่งแคมเปญ "${campaign}" ไปยังกลุ่มเป้าหมาย`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#FF6D1F',
                    confirmButtonText: 'ใช่, ส่งทันที',
                    cancelButtonText: 'ตรวจสอบอีกครั้ง',
                    background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e293b' : '#fff',
                    color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f1f5f9' : '#545454'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({ icon: 'success', title: 'ดำเนินการสำเร็จ!', confirmButtonColor: '#FF6D1F' });
                        dispatchForm.reset();
                    }
                });
            }
        });
    }

    // Todo interactivity
    document.querySelectorAll('.todo-item input').forEach(input => {
        input.addEventListener('change', function () {
            this.parentElement.classList.toggle('completed', this.checked);
        });
    });

    // Admin Profile Form Submit
    const adminProfileForm = document.getElementById('admin-profile-update-form');
    if (adminProfileForm) {
        adminProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: 'อัปเดตข้อมูลสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                    background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e293b' : '#fff',
                    color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f1f5f9' : '#545454',
                    customClass: {
                        popup: 'rounded-xl2'
                    }
                });
            }
        });
    }
}); // Closes the DOMContentLoaded event listener
