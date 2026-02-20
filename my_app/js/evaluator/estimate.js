/* d:\watcharaphon18\my_app\js\estimate.js */

document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const questions = [
        "2.1 ความกระตือรือร้นในการปฏิบัติงาน (Assiduity)",
        "2.2 ความรับผิดชอบต่อหน้าที่ (Responsibility)",
        "2.3 ความคิดริเริ่มสร้างสรรค์ (Creativity)",
        "2.4 การทำงานร่วมกับผู้อื่น (Teamwork)",
        "2.5 ผลสัมฤทธิ์ของงานตามเป้าหมาย (Quality of Work)",
        "2.6 การมีส่วนร่วมในกิจกรรมของวิทยาลัย (Contribution)",
        "2.7 การพัฒนาตนเองอย่างต่อเนื่อง (Self-Development)",
        "2.8 ระดับความไว้วางใจในการมอบหมายงาน (Trustworthiness)"
    ];

    // --- DOM Elements ---
    const questionsContainer = document.getElementById('questions-container');
    const evaluationForm = document.getElementById('evaluationForm');
    const currentDateEl = document.getElementById('current-date');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentText = document.getElementById('progress-percent');
    const saveStatus = document.getElementById('save-status');

    // --- Initialize ---
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear() + 543}`;
    if (currentDateEl) currentDateEl.textContent = formattedDate;

    // Render Questions
    if (questionsContainer) {
        questions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card animate-fadeInUp';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div class="flex-1">
                        <span class="text-xs font-black text-orange-500 uppercase tracking-widest mb-2 block">ข้อที่ ${index + 1}</span>
                        <h4 class="font-bold text-slate-700 text-lg leading-relaxed">${q}</h4>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <div class="flex gap-2">
                            ${[1, 2, 3, 4, 5].map(num => `
                                <div class="rating-item">
                                    <input type="radio" name="q${index}" id="q${index}_${num}" value="${num}" required>
                                    <label for="q${index}_${num}">${num}</label>
                                </div>
                            `).join('')}
                        </div>
                        <div class="flex justify-between w-full px-1 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                            <span>ควรปรับปรุง</span>
                            <span>ดีเยี่ยม</span>
                        </div>
                    </div>
                </div>
            `;
            questionsContainer.appendChild(card);
        });

        questionsContainer.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                updateProgress();
            }
        });
    }

    function updateProgress() {
        const total = questions.length;
        const answered = new Set();
        questionsContainer.querySelectorAll('input[type="radio"]:checked').forEach(checked => {
            answered.add(checked.name);
        });

        const percent = Math.round((answered.size / total) * 100);
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressPercentText) progressPercentText.textContent = `${percent}%`;

        if (saveStatus) {
            saveStatus.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> กำลังบันทึกร่าง...';
            saveStatus.className = 'text-blue-500 flex items-center text-xs font-bold';
            setTimeout(() => {
                saveStatus.innerHTML = '<i class="fas fa-check-circle mr-2"></i> บันทึกร่างอัตโนมัติเรียบร้อย';
                saveStatus.className = 'text-green-500 flex items-center text-xs font-bold';
            }, 800);
        }
    }

    // --- Form Submission ---
    if (evaluationForm) {
        evaluationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            Swal.fire({
                title: 'ยืนยันการส่งผล?',
                text: "คุณต้องการบันทึกและส่งผลการประเมินนี้ใช่หรือไม่?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#FF6D1F',
                cancelButtonColor: '#94a3b8',
                confirmButtonText: 'ยืนยันการส่ง',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    title: 'font-bold',
                    confirmButton: 'rounded-xl font-bold px-8',
                    cancelButton: 'rounded-xl font-bold px-8'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const btn = evaluationForm.querySelector('button[type="submit"]');
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> กำลังดำเนินการ...';

                    setTimeout(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'บันทึกสำเร็จ!',
                            text: 'ส่งผลการประเมินเรียบร้อยแล้ว',
                            confirmButtonColor: '#FF6D1F',
                            customClass: {
                                title: 'font-bold',
                                confirmButton: 'rounded-xl font-bold px-8'
                            }
                        }).then(() => {
                            window.location.href = 'assessor_list.html';
                        });
                    }, 1500);
                }
            });
        });
    }
});