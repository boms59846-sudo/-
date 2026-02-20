/* d:\watcharaphon18\my_app\js\script_assessor_list.js */

document.addEventListener('DOMContentLoaded', function () {
    // Mock Data for Personnel
    const personnelData = [
        { id: 1, name: 'นายสมชาย ใจดี', email: 'somchai@cice.ac.th', position: 'ครูชำนาญการ', department: 'วิชาการ', status: 'pending' },
        { id: 2, name: 'นางสาววิไล รักเรียน', email: 'wilai@cice.ac.th', position: 'ครูผู้ช่วย', department: 'กิจการนักเรียน', status: 'completed' },
        { id: 3, name: 'นายมานะ อดทน', email: 'mana@cice.ac.th', position: 'พนักงานราชการ', department: 'บริหารทั่วไป', status: 'pending' },
        { id: 4, name: 'นางสมศรี มีสุข', email: 'somsri@cice.ac.th', position: 'ครูชำนาญการพิเศษ', department: 'วิชาการ', status: 'completed' },
        { id: 5, name: 'นายเก่ง กล้าหาญ', email: 'keng@cice.ac.th', position: 'ครู คศ.1', department: 'แผนงาน', status: 'overdue' },
        { id: 6, name: 'นางสาวสุดา งามตา', email: 'suda@cice.ac.th', position: 'ครูผู้ช่วย', department: 'วิชาการ', status: 'pending' },
        { id: 7, name: 'นายวิชัย ใจสู้', email: 'wichai@cice.ac.th', position: 'ครูเชี่ยวชาญ', department: 'พัฒนาบุคลากร', status: 'pending' },
        { id: 8, name: 'นางสาวกานดา มุ่งมั่น', email: 'kanda@cice.ac.th', position: 'ครูอัตราจ้าง', department: 'กิจการนักเรียน', status: 'completed' },
        { id: 9, name: 'นายปิติ สุขใจ', email: 'piti@cice.ac.th', position: 'ครูชำนาญการ', department: 'แผนงาน', status: 'overdue' },
        { id: 10, name: 'นางวันเพ็ญ เด่นดวง', email: 'wanpen@cice.ac.th', position: 'พนักงานราชการ', department: 'บริหารทั่วไป', status: 'completed' },
        { id: 11, name: 'นายอาทิตย์ แสงทอง', email: 'arthit@cice.ac.th', position: 'ครูผู้ช่วย', department: 'วิชาการ', status: 'pending' },
        { id: 12, name: 'นางสาวนภา ฟ้าใส', email: 'napa@cice.ac.th', position: 'ครู คศ.1', department: 'กิจการนักเรียน', status: 'pending' },
        { id: 13, name: 'นายธนา รวยรื่น', email: 'thana@cice.ac.th', position: 'ครูชำนาญการพิเศษ', department: 'พัฒนาบุคลากร', status: 'completed' },
        { id: 14, name: 'นางสาวเมษา หน้าร้อน', email: 'mesa@cice.ac.th', position: 'ครูอัตราจ้าง', department: 'บริหารทั่วไป', status: 'overdue' },
        { id: 15, name: 'นายธีระ เก่งกาจ', email: 'teera@cice.ac.th', position: 'ครูเชี่ยวชาญ', department: 'แผนงาน', status: 'pending' }
    ];

    const tableBody = document.getElementById('assessor-table-body');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');

    function renderTable(data) {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        data.forEach(person => {
            const row = document.createElement('tr');
            row.className = 'border-b border-slate-50 group hover:bg-orange-50/50 transition-all';

            let statusLabel = '';
            let statusClass = '';
            switch (person.status) {
                case 'pending':
                    statusLabel = 'รอการประเมิน';
                    statusClass = 'bg-orange-50 text-orange-600';
                    break;
                case 'completed':
                    statusLabel = 'เสร็จสิ้น';
                    statusClass = 'bg-green-50 text-green-600';
                    break;
                case 'overdue':
                    statusLabel = 'เกินกำหนด';
                    statusClass = 'bg-red-50 text-red-600';
                    break;
            }

            row.innerHTML = `
                <td class="py-4 px-6">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-700">${person.name}</span>
                            <span class="text-xs text-slate-400">${person.email}</span>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6 text-slate-500 font-medium">${person.position}</td>
                <td class="py-4 px-6 text-slate-400 font-medium">${person.department}</td>
                <td class="py-4 px-6">
                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusClass}">${statusLabel}</span>
                </td>
                <td class="py-4 px-6 text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button class="px-4 py-2 ${person.status === 'overdue' ? 'bg-red-500 shadow-red-100' : 'bg-orange-500 shadow-orange-100'} text-white rounded-xl font-bold text-xs shadow-md hover:scale-105 transition-all" 
                                onclick="window.location.href='estimate.html?id=${person.id}'">
                            ${person.status === 'completed' ? 'ประเมินใหม่' : 'เริ่มประเมิน'}
                        </button>
                        <button class="w-9 h-9 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 hover:text-slate-600 transition-all flex items-center justify-center" onclick="viewDetails(${person.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterData() {
        if (!searchInput || !statusFilter) return;
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;

        const filteredData = personnelData.filter(person => {
            const matchesSearch = person.name.toLowerCase().includes(searchTerm) ||
                person.email.toLowerCase().includes(searchTerm) ||
                person.department.toLowerCase().includes(searchTerm);
            const matchesStatus = statusValue === 'all' || person.status === statusValue;

            return matchesSearch && matchesStatus;
        });

        renderTable(filteredData);
    }

    // Initial Render
    renderTable(personnelData);

    // Event Listeners
    if (searchInput) searchInput.addEventListener('input', filterData);
    if (statusFilter) statusFilter.addEventListener('change', filterData);
});

function viewDetails(id) {
    Swal.fire({
        title: 'รายละเอียดบุคลากร',
        html: `<div style="text-align: left; padding: 10px; font-family: 'Prompt', sans-serif;">
                <p class="mb-2"><strong>รหัส:</strong> ${id}</p>
                <p class="mb-2"><strong>ชื่อ:</strong> นายสมชาย ใจดี (ตัวอย่าง)</p>
                <p class="mb-2"><strong>ตำแหน่ง:</strong> ครูชำนาญการ</p>
                <p class="mb-2"><strong>แผนก:</strong> วิชาการ</p>
                <p><strong>สถานะเอกสาร:</strong> ครบถ้วน ✅</p>
               </div>`,
        icon: 'info',
        confirmButtonText: 'รับทราบ',
        confirmButtonColor: '#FF6D1F',
        customClass: {
            title: 'font-bold',
            confirmButton: 'rounded-xl font-bold px-8'
        }
    });
}
