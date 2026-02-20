/* js/script_Appraisee_form_designer.js */
/* Logic for Evaluation Form Designer */

const PRESETS = {
    '5level': [
        { text: 'ดีมาก', score: 5 },
        { text: 'ดี', score: 4 },
        { text: 'พอใช้', score: 3 },
        { text: 'ต้องปรับปรุง', score: 2 },
        { text: 'ไม่ผ่านเกณฑ์', score: 1 }
    ],
    'yesno': [
        { text: 'ใช่ / ปฏิบัติ', score: 1 },
        { text: 'ไม่ใช่ / ไม่ปฏิบัติ', score: 0 }
    ]
};

function addQuestion() {
    const list = document.getElementById('questionsList');
    const temp = document.getElementById('questionCardTemplate');
    if (!list || !temp) return; // Guard clause

    const clone = temp.content.cloneNode(true);
    list.appendChild(clone);

    // Add initial row to the new card
    const lastCard = list.lastElementChild;
    const addBtn = lastCard.querySelector('button[onclick="addChoiceRow(this)"]');
    if (addBtn) {
        addChoiceRow(addBtn);
    }
}

function addChoiceRow(btn, data = { text: '', score: 0 }) {
    const container = btn.closest('.bg-slate-50').querySelector('.choice-container');
    const row = document.createElement('div');
    row.className = 'flex items-center gap-3 fade-in';
    row.innerHTML = `
        <div class="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
            <i class="fas fa-grip-vertical text-slate-200 text-xs"></i>
            <input type="text" value="${data.text}" placeholder="ชื่อตัวเลือก" class="w-full text-sm font-medium outline-none">
        </div>
        <div class="w-24 bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center">
            <span class="text-[9px] font-bold text-slate-400 mr-2">แต้ม</span>
            <input type="number" value="${data.score}" class="w-full text-sm font-bold text-orange-600 outline-none text-right">
        </div>
        <button onclick="this.parentElement.remove()" class="text-slate-300 hover:text-red-400 transition-colors">
            <i class="fas fa-times-circle"></i>
        </button>
    `;
    container.appendChild(row);
}

function applyPreset(btn, type) {
    const container = btn.closest('.bg-slate-50').querySelector('.choice-container');
    container.innerHTML = '';
    PRESETS[type].forEach(item => {
        addChoiceRow(btn, item);
    });
}

function saveAll() {
    Swal.fire({
        title: 'บันทึกเรียบร้อย',
        text: 'โครงสร้างเกณฑ์การประเมินถูกจัดเก็บเข้าสู่ระบบแล้ว',
        icon: 'success',
        confirmButtonColor: '#F97316',
        customClass: {
            popup: 'rounded-3xl',
            confirmButton: 'rounded-xl px-8 font-bold'
        }
    }); // .then(() => { window.location.href = 'dashboardAppraisee.html'; }); // Optional: Redirect
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addQuestion();
});
