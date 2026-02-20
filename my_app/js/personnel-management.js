// ============================================
// Personnel Management - Complete Script
// ============================================

class PersonnelManager {
    constructor() {
        this.personnel = [
            {
                id: 'U1001',
                fname: 'สมชาย',
                lname: 'ใจดี',
                email: 'somchai@cice.edu',
                phone: '089-123-4567',
                dept: 'academic',
                position: 'อาจารย์',
                role: 'appraisee',
                status: 'active'
            },
            {
                id: 'U1002',
                fname: 'นิชา',
                lname: 'สุขสวัสดิ์',
                email: 'nicha@cice.edu',
                phone: '089-234-5678',
                dept: 'academic',
                position: 'อาจารย์',
                role: 'assessor',
                status: 'active'
            },
            {
                id: 'U1003',
                fname: 'วิชัย',
                lname: 'เก่งกาจ',
                email: 'vichai@cice.edu',
                phone: '089-345-6789',
                dept: 'admin',
                position: 'หัวหน้าฝ่าย',
                role: 'admin',
                status: 'active'
            },
            {
                id: 'U1004',
                fname: 'มานี',
                lname: 'มีตา',
                email: 'mani@cice.edu',
                phone: '089-456-7890',
                dept: 'academic',
                position: 'อาจารย์',
                role: 'appraisee',
                status: 'inactive'
            },
            {
                id: 'U1005',
                fname: 'ปิติ',
                lname: 'พอใจ',
                email: 'piti@cice.edu',
                phone: '089-567-8901',
                dept: 'personnel',
                position: 'เจ้าหน้าที่',
                role: 'assessor',
                status: 'active'
            }
        ];

        this.filteredPersonnel = [...this.personnel];
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.editingId = null;

        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    // ==================== Initialize Elements ====================
    initializeElements() {
        this.elements = {
            // Buttons
            addBtn: document.getElementById('add-personnel-btn'),
            exportBtn: document.getElementById('export-btn'),
            closeModalBtn: document.getElementById('close-modal'),
            formCancelBtn: document.getElementById('form-cancel-btn'),
            resetFilterBtn: document.getElementById('reset-filter-btn'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),

            // Filters
            searchInput: document.getElementById('search-input'),
            filterDept: document.getElementById('filter-dept'),
            filterRole: document.getElementById('filter-role'),
            filterStatus: document.getElementById('filter-status'),

            // Table
            tbody: document.getElementById('personnel-tbody'),
            emptyState: document.getElementById('empty-state'),

            // Stats
            statTotal: document.getElementById('stat-total'),
            statActive: document.getElementById('stat-active'),
            statInactive: document.getElementById('stat-inactive'),
            statAdmin: document.getElementById('stat-admin'),

            // Pagination
            showingCount: document.getElementById('showing-count'),
            totalCount: document.getElementById('total-count'),
            pageInfo: document.getElementById('page-info'),

            // Modal
            modal: document.getElementById('personnel-modal'),
            form: document.getElementById('personnel-form'),
            modalTitle: document.getElementById('modal-title'),

            // Form Fields
            formId: document.getElementById('form-personnel-id'),
            formFname: document.getElementById('form-fname'),
            formLname: document.getElementById('form-lname'),
            formEmail: document.getElementById('form-email'),
            formPhone: document.getElementById('form-phone'),
            formEmpId: document.getElementById('form-id'),
            formDept: document.getElementById('form-dept'),
            formPosition: document.getElementById('form-position'),
            formRole: document.getElementById('form-role')
        };
    }

    // ==================== Attach Event Listeners ====================
    attachEventListeners() {
        // Buttons
        this.elements.addBtn?.addEventListener('click', () => this.openModal());
        this.elements.exportBtn?.addEventListener('click', () => this.exportCSV());
        this.elements.closeModalBtn?.addEventListener('click', () => this.closeModal());
        this.elements.formCancelBtn?.addEventListener('click', () => this.closeModal());
        this.elements.resetFilterBtn?.addEventListener('click', () => this.resetFilters());
        this.elements.prevBtn?.addEventListener('click', () => this.previousPage());
        this.elements.nextBtn?.addEventListener('click', () => this.nextPage());

        // Filters
        this.elements.searchInput?.addEventListener('input', () => this.applyFilters());
        this.elements.filterDept?.addEventListener('change', () => this.applyFilters());
        this.elements.filterRole?.addEventListener('change', () => this.applyFilters());
        this.elements.filterStatus?.addEventListener('change', () => this.applyFilters());

        // Form
        this.elements.form?.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Modal click outside
        this.elements.modal?.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.closeModal();
            }
        });
    }

    // ==================== Filter & Search ====================
    applyFilters() {
        const searchTerm = this.elements.searchInput?.value.toLowerCase() || '';
        const dept = this.elements.filterDept?.value || '';
        const role = this.elements.filterRole?.value || '';
        const status = this.elements.filterStatus?.value || '';

        this.filteredPersonnel = this.personnel.filter(person => {
            const fullName = `${person.fname} ${person.lname}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchTerm) ||
                person.email.toLowerCase().includes(searchTerm) ||
                person.id.toLowerCase().includes(searchTerm);

            const matchesDept = !dept || person.dept === dept;
            const matchesRole = !role || person.role === role;
            const matchesStatus = !status || person.status === status;

            return matchesSearch && matchesDept && matchesRole && matchesStatus;
        });

        this.currentPage = 1;
        this.render();
    }

    resetFilters() {
        this.elements.searchInput.value = '';
        this.elements.filterDept.value = '';
        this.elements.filterRole.value = '';
        this.elements.filterStatus.value = '';
        this.applyFilters();
    }

    // ==================== Render ====================
    render() {
        this.renderTable();
        this.updateStats();
        this.updatePagination();
    }

    renderTable() {
        const startIdx = (this.currentPage - 1) * this.itemsPerPage;
        const endIdx = startIdx + this.itemsPerPage;
        const pageData = this.filteredPersonnel.slice(startIdx, endIdx);

        if (this.filteredPersonnel.length === 0) {
            this.elements.tbody.innerHTML = '';
            this.elements.emptyState.classList.remove('hidden');
            return;
        }

        this.elements.emptyState.classList.add('hidden');

        this.elements.tbody.innerHTML = pageData.map(person => `
            <tr>
                <td class="col-avatar">
                    <img src="https://ui-avatars.com/api/?name=${person.fname}+${person.lname}&background=FF6D1F&color=fff&bold=true" 
                         alt="${person.fname}" 
                         class="personnel-avatar">
                </td>
                <td class="col-name">
                    <div class="personnel-name">
                        <span class="personnel-name-main">${person.fname} ${person.lname}</span>
                        <span class="personnel-name-sub">${person.email}</span>
                    </div>
                </td>
                <td class="col-id">${person.id}</td>
                <td class="col-dept">${this.getDeptName(person.dept)}</td>
                <td class="col-position">${person.position}</td>
                <td class="col-role">
                    <span class="badge badge-${person.role}">${this.getRoleName(person.role)}</span>
                </td>
                <td class="col-status">
                    <span class="badge badge-${person.status}">${person.status === 'active' ? 'ใช้งาน' : 'ปิดใช้งาน'}</span>
                </td>
                <td class="col-actions">
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-edit" onclick="personnelManager.editPersonnel('${person.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-delete" onclick="personnelManager.deletePersonnel('${person.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    updateStats() {
        const total = this.personnel.length;
        const active = this.personnel.filter(p => p.status === 'active').length;
        const inactive = this.personnel.filter(p => p.status === 'inactive').length;
        const admin = this.personnel.filter(p => p.role === 'admin').length;

        this.elements.statTotal.textContent = total;
        this.elements.statActive.textContent = active;
        this.elements.statInactive.textContent = inactive;
        this.elements.statAdmin.textContent = admin;
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredPersonnel.length / this.itemsPerPage);
        const startIdx = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIdx = Math.min(this.currentPage * this.itemsPerPage, this.filteredPersonnel.length);

        this.elements.showingCount.textContent = endIdx;
        this.elements.totalCount.textContent = this.filteredPersonnel.length;
        this.elements.pageInfo.textContent = `${this.currentPage}`;

        this.elements.prevBtn.disabled = this.currentPage === 1;
        this.elements.nextBtn.disabled = this.currentPage >= totalPages;
    }

    // ==================== Modal ====================
    openModal(id = null) {
        if (id) {
            this.editingId = id;
            const person = this.personnel.find(p => p.id === id);
            if (person) {
                this.elements.modalTitle.textContent = 'แก้ไขข้อมูลบุคลากร';
                this.elements.formId.value = person.id;
                this.elements.formFname.value = person.fname;
                this.elements.formLname.value = person.lname;
                this.elements.formEmail.value = person.email;
                this.elements.formPhone.value = person.phone;
                this.elements.formEmpId.value = person.id;
                this.elements.formDept.value = person.dept;
                this.elements.formPosition.value = person.position;
                this.elements.formRole.value = person.role;
                document.querySelector(`input[name="status"][value="${person.status}"]`).checked = true;
            }
        } else {
            this.editingId = null;
            this.elements.modalTitle.textContent = 'เพิ่มบุคลากรใหม่';
            this.elements.form.reset();
            this.elements.formId.value = '';
            document.querySelector('input[name="status"][value="active"]').checked = true;
        }

        this.elements.modal.classList.remove('hidden');
    }

    closeModal() {
        this.elements.modal.classList.add('hidden');
        this.elements.form.reset();
        this.editingId = null;
    }

    // ==================== Form Handling ====================
    handleFormSubmit(e) {
        e.preventDefault();

        const data = {
            fname: this.elements.formFname.value,
            lname: this.elements.formLname.value,
            email: this.elements.formEmail.value,
            phone: this.elements.formPhone.value,
            id: this.elements.formEmpId.value,
            dept: this.elements.formDept.value,
            position: this.elements.formPosition.value,
            role: this.elements.formRole.value,
            status: document.querySelector('input[name="status"]:checked').value
        };

        if (this.editingId) {
            // Update
            const index = this.personnel.findIndex(p => p.id === this.editingId);
            if (index > -1) {
                this.personnel[index] = { ...this.personnel[index], ...data };
            }
            this.showNotification('อัปเดตข้อมูลสำเร็จ!', 'success');
        } else {
            // Add new
            if (!this.personnel.find(p => p.id === data.id)) {
                this.personnel.push(data);
                this.showNotification('เพิ่มบุคลากรสำเร็จ!', 'success');
            } else {
                this.showNotification('รหัสพนักงานซ้ำ!', 'error');
                return;
            }
        }

        this.closeModal();
        this.applyFilters();
    }

    // ==================== Actions ====================
    editPersonnel(id) {
        this.openModal(id);
    }

    deletePersonnel(id) {
        Swal.fire({
            title: 'ยืนยันการลบ',
            text: 'คุณแน่ใจหรือว่าต้องการลบข้อมูลนี้?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF6D1F',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                this.personnel = this.personnel.filter(p => p.id !== id);
                this.showNotification('ลบข้อมูลสำเร็จ!', 'success');
                this.applyFilters();
            }
        });
    }

    // ==================== Export ====================
    exportCSV() {
        const headers = ['รหัส', 'ชื่อ', 'นามสกุล', 'อีเมล', 'เบอร์โทร', 'แผนก', 'ตำแหน่ง', 'สิทธิ์', 'สถานะ'];
        const rows = this.filteredPersonnel.map(p => [
            p.id,
            p.fname,
            p.lname,
            p.email,
            p.phone,
            this.getDeptName(p.dept),
            p.position,
            this.getRoleName(p.role),
            p.status === 'active' ? 'ใช้งาน' : 'ปิดใช้งาน'
        ]);

        let csv = headers.join(',') + '\n';
        csv += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `personnel_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        this.showNotification('ส่งออกข้อมูลสำเร็จ!', 'success');
    }

    // ==================== Pagination ====================
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredPersonnel.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // ==================== Helpers ====================
    getDeptName(dept) {
        const depts = {
            'academic': 'ฝ่ายวิชาการ',
            'personnel': 'ฝ่ายบุคคล',
            'admin': 'ฝ่ายธุรการ'
        };
        return depts[dept] || dept;
    }

    getRoleName(role) {
        const roles = {
            'admin': 'Admin',
            'assessor': 'Assessor',
            'appraisee': 'Appraisee'
        };
        return roles[role] || role;
    }

    showNotification(message, icon = 'success') {
        Swal.fire({
            title: icon === 'success' ? 'สำเร็จ!' : 'ข้อผิดพลาด',
            text: message,
            icon: icon,
            timer: 2000,
            showConfirmButton: false
        });
    }
}

// ==================== Initialize ====================
let personnelManager;

document.addEventListener('DOMContentLoaded', function () {
    personnelManager = new PersonnelManager();
});
