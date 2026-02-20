/* js/script_Appraisee_syllabus.js */
/* Logic for Academic Syllabus Builder */

// State
let step = 1;
const courseData = {
    code: 'ว31101',
    nameTh: 'วิทยาการคำนวณ 1',
    nameEn: 'Computing Science 1',
    credits: '1.5',
    type: 'พื้นฐาน',
    level: 'ม.4',
    semester: '1',
    hoursPerWeek: 3,
    totalWeeks: 20,
    theoryHours: 2,
    practiceHours: 1,
    grading: {
        k: 40,
        p: 40,
        a: 20,
        midterm: 20,
        final: 30
    }
};

// DOM Elements
const stepsConfig = [
    { id: 1, title: 'โครงสร้างวิชา', sub: 'ข้อมูลพื้นฐาน' },
    { id: 2, title: 'การวัดผล', sub: 'สัดส่วนคะแนน' },
    { id: 3, title: 'ตารางสอน', sub: 'เวลาและสถานที่' },
    { id: 4, title: 'ยืนยันข้อมูล', sub: 'ตรวจสอบความถูกต้อง' }
];

function init() {
    render();
    setupEventListeners();
}

function updateState(field, value, isGrading = false) {
    if (isGrading) {
        courseData.grading[field] = parseInt(value) || 0;
    } else {
        courseData[field] = value;
    }
    render(); // Re-render to show updates (e.g. totals)
}

function setStep(newStep) {
    if (newStep < 1 || newStep > 4) return;
    step = newStep;
    render();
}

function render() {
    renderProgressSidebar();
    renderMainContent();
    renderFooter();
    renderStats();
}

function renderProgressSidebar() {
    const container = document.getElementById('progress-sidebar');
    if (!container) return;

    let html = '<div class="space-y-10 relative">';
    stepsConfig.forEach((s) => {
        const isActive = step === s.id;
        const isCompleted = step > s.id;
        const iconClass = isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' :
            (isCompleted ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-300 border border-slate-100');

        // Connector line
        if (s.id !== stepsConfig.length) {
            const lineClass = step > s.id ? 'bg-orange-500' : 'bg-slate-100';
            html += `<div class="absolute left-6 top-12 w-0.5 h-10 ${lineClass}" style="margin-top: 10px;"></div>`;
        }

        // Icon (Font Awesome mapping)
        const icons = ['fa-hashtag', 'fa-percentage', 'fa-calendar-alt', 'fa-check-circle'];

        html += `
            <div class="relative flex gap-5 items-center z-10">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${iconClass}">
                    <i class="fas ${isCompleted ? 'fa-check-circle' : icons[s.id - 1]} text-lg"></i>
                </div>
                <div>
                    <p class="text-sm font-black ${isActive ? 'text-slate-900' : 'text-slate-400'}">${s.title}</p>
                    <p class="text-[11px] text-slate-400 font-medium mt-0.5">${s.sub}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderMainContent() {
    const stepTitleEl = document.getElementById('step-title');
    if (stepTitleEl) stepTitleEl.textContent = stepsConfig[step - 1].title;

    const contentContainer = document.getElementById('form-content');
    if (!contentContainer) return;

    let html = '';

    if (step === 1) {
        html = `
            <div class="space-y-10 animate-slide-in">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div class="md:col-span-4">
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">
                            <i class="fas fa-hashtag text-orange-500 mr-1"></i> รหัสรายวิชา <span class="text-orange-500">*</span>
                        </label>
                        <input type="text" value="${courseData.code}" onchange="updateState('code', this.value)" 
                            class="input-modern font-mono" placeholder="รหัสวิชา">
                    </div>
                    <div class="md:col-span-8">
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">
                             ชื่อรายวิชา (TH) <span class="text-orange-500">*</span>
                        </label>
                        <input type="text" value="${courseData.nameTh}" onchange="updateState('nameTh', this.value)" 
                            class="input-modern" placeholder="ชื่อภาษาไทย">
                    </div>
                    <div class="md:col-span-12">
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">
                             ชื่อรายวิชา (EN)
                        </label>
                        <input type="text" value="${courseData.nameEn}" onchange="updateState('nameEn', this.value)" 
                            class="input-modern font-medium" placeholder="English Name">
                    </div>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">หน่วยกิต</label>
                        <select onchange="updateState('credits', this.value)" class="input-modern text-orange-500">
                             ${['0.5', '1.0', '1.5', '2.0'].map(v => `<option value="${v}" ${courseData.credits === v ? 'selected' : ''}>${v}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">ประเภท</label>
                        <select onchange="updateState('type', this.value)" class="input-modern">
                             ${['พื้นฐาน', 'เพิ่มเติม'].map(v => `<option value="${v}" ${courseData.type === v ? 'selected' : ''}>${v}</option>`).join('')}
                        </select>
                    </div>
                     <div>
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">ระดับ</label>
                        <select onchange="updateState('level', this.value)" class="input-modern">
                             ${['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6', 'ปวช.1', 'ปวช.2', 'ปวช.3'].map(v => `<option value="${v}" ${courseData.level === v ? 'selected' : ''}>${v}</option>`).join('')}
                        </select>
                    </div>
                     <div>
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">ภาคเรียน</label>
                        <select onchange="updateState('semester', this.value)" class="input-modern">
                             ${['1', '2', 'ฤดูร้อน'].map(v => `<option value="${v}" ${courseData.semester === v ? 'selected' : ''}>${v}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
    } else if (step === 2) {
        const total = courseData.grading.k + courseData.grading.p + courseData.grading.a;
        html = `
            <div class="space-y-12 animate-slide-in">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="space-y-8">
                        ${[
                { l: 'คะแนนด้านความรู้ (K)', k: 'k', c: 'bg-orange-500' },
                { l: 'คะแนนด้านทักษะ (P)', k: 'p', c: 'bg-slate-800' },
                { l: 'คะแนนด้านจิตพิสัย (A)', k: 'a', c: 'bg-orange-200' }
            ].map(item => `
                            <div class="space-y-3">
                                <div class="flex justify-between items-end">
                                    <span class="text-sm font-black text-slate-800 uppercase">${item.l}</span>
                                    <input type="number" value="${courseData.grading[item.k]}" 
                                        onchange="updateState('${item.k}', this.value, true)"
                                        class="text-2xl font-black text-orange-500 w-20 text-right bg-transparent outline-none border-b border-orange-200 focus:border-orange-500 transition-colors">
                                    <span class="text-xl font-black text-orange-500">%</span>
                                </div>
                                <div class="h-4 bg-slate-100 rounded-full overflow-hidden p-1">
                                    <div class="h-full ${item.c} rounded-full transition-all duration-1000" style="width: ${courseData.grading[item.k]}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="bg-slate-50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-4">
                        <div class="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-orange-500">
                            <i class="fas fa-percentage text-3xl"></i>
                        </div>
                        <h4 class="text-xl font-black text-slate-800">สรุปสัดส่วนคะแนน</h4>
                        <p class="text-sm text-slate-400 font-medium">คะแนนต้องรวมกันให้ได้ 100%</p>
                        <div class="text-5xl font-black ${total === 100 ? 'text-green-500' : 'text-orange-500'}">
                            ${total}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (step === 3) {
        const totalHours = courseData.hoursPerWeek * courseData.totalWeeks;
        html = `
            <div class="space-y-10 animate-slide-in">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-2 grid grid-cols-2 gap-8">
                        <div class="card-neumorphic p-8 space-y-6">
                            <h5 class="text-xs font-black text-slate-400 uppercase tracking-widest">คาบเรียน/สัปดาห์</h5>
                            <div class="flex items-center justify-between">
                                <button onclick="updateState('hoursPerWeek', Math.max(1, ${courseData.hoursPerWeek} - 1))" class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all font-bold text-xl">-</button>
                                <span class="text-4xl font-black text-slate-900">${courseData.hoursPerWeek}</span>
                                <button onclick="updateState('hoursPerWeek', Math.min(10, ${courseData.hoursPerWeek} + 1))" class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all font-bold text-xl">+</button>
                            </div>
                        </div>
                        <div class="card-neumorphic p-8 space-y-6">
                            <h5 class="text-xs font-black text-slate-400 uppercase tracking-widest">จำนวนสัปดาห์</h5>
                            <div class="flex items-center justify-between">
                                <button onclick="updateState('totalWeeks', Math.max(1, ${courseData.totalWeeks} - 1))" class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all font-bold text-xl">-</button>
                                <span class="text-4xl font-black text-slate-900">${courseData.totalWeeks}</span>
                                <button onclick="updateState('totalWeeks', Math.min(22, ${courseData.totalWeeks} + 1))" class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all font-bold text-xl">+</button>
                            </div>
                        </div>
                    </div>
                     <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-center shadow-2xl shadow-slate-300">
                         <i class="fas fa-clock text-orange-500 text-3xl mb-4"></i>
                         <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Total Teaching Hours</p>
                         <h3 class="text-6xl font-black mt-2">${totalHours}<span class="text-lg font-bold text-slate-500 ml-2">ชม.</span></h3>
                      </div>
                </div>
            </div>
        `;
    } else if (step === 4) {
        const totalHours = courseData.hoursPerWeek * courseData.totalWeeks;
        html = `
            <div class="flex flex-col items-center text-center py-10 animate-zoom-in">
                <div class="w-28 h-28 bg-orange-50 rounded-[2.5rem] flex items-center justify-center text-orange-500 mb-8 shadow-inner">
                    <i class="fas fa-file-alt text-4xl"></i>
                </div>
                <h3 class="text-3xl font-black text-slate-900">ตรวจสอบความเรียบร้อย</h3>
                <p class="text-slate-400 mt-3 max-w-sm font-medium">ข้อมูลรายวิชา ${courseData.code} พร้อมสำหรับการบันทึกเข้าสู่ระบบฐานข้อมูลหลักสูตร</p>
                
                <div class="mt-12 w-full max-w-3xl bg-slate-100 rounded-[3rem] p-12 text-left grid grid-cols-2 gap-10 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-10 opacity-5 rotate-12"><i class="fas fa-magic text-9xl"></i></div>
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">รหัสและชื่อวิชา</p>
                        <p class="text-xl font-black text-slate-800 leading-tight">${courseData.code} ${courseData.nameTh}</p>
                        <p class="text-sm font-bold text-orange-500 mt-1">${courseData.nameEn}</p>
                    </div>
                    <div class="flex gap-10">
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">หน่วยกิต</p>
                            <p class="text-xl font-black text-slate-800">${courseData.credits}</p>
                        </div>
                         <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">ชั่วโมงรวม</p>
                            <p class="text-xl font-black text-slate-800">${totalHours}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    contentContainer.innerHTML = html;
}

function renderFooter() {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

    if (prevBtn) {
        if (step === 1) {
            prevBtn.classList.add('opacity-0', 'pointer-events-none');
        } else {
            prevBtn.classList.remove('opacity-0', 'pointer-events-none');
        }
    }

    if (nextBtn) {
        if (step < 4) {
            nextBtn.innerHTML = 'ถัดไป <i class="fas fa-chevron-right text-sm"></i>';
            nextBtn.onclick = () => setStep(step + 1);
            nextBtn.className = "flex items-center gap-3 bg-orange-500 text-white px-12 py-4 rounded-[1.5rem] font-black text-sm hover:bg-orange-600 shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:scale-95";
        } else {
            nextBtn.innerHTML = '<i class="fas fa-save text-lg"></i> ยืนยันและประกาศใช้';
            nextBtn.onclick = saveSyllabus;
            nextBtn.className = "flex items-center gap-3 bg-slate-900 text-white px-12 py-4 rounded-[1.5rem] font-black text-sm hover:bg-black shadow-xl shadow-slate-300 transition-all hover:-translate-y-1";
        }
    }
}

function renderStats() {
    // Updates the stat widgets at the bottom
    document.getElementById('stat-type').textContent = courseData.type;
}

function saveSyllabus() {
    Swal.fire({
        title: 'บันทึกสำเร็จ!',
        text: 'โครงสร้างรายวิชาถูกบันทึกเรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonColor: '#F97316',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        // Optional: Redirect or reset
    });
}

function setupEventListeners() {
    document.getElementById('btn-prev').addEventListener('click', () => setStep(step - 1));
}

// Start
document.addEventListener('DOMContentLoaded', init);
