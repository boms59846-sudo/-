/* js/script_Appraisee_assessment.js */
/* Appraisee Assessment Logic */

let currentStep = 1;
const totalSteps = 4;

function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step-${i}`).classList.add('hidden');
        document.getElementById(`indicator-${i}`).classList.remove('active', 'completed');
    }

    // Show current step
    document.getElementById(`step-${step}`).classList.remove('hidden');

    // Update indicators
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`indicator-${i}`);
        if (i < step) {
            indicator.classList.add('completed');
            indicator.querySelector('.step-circle').innerHTML = '<i class="fas fa-check"></i>';
        } else if (i === step) {
            indicator.classList.add('active');
            indicator.querySelector('.step-circle').textContent = i;
        } else {
            indicator.querySelector('.step-circle').textContent = i;
        }
    }

    // Update Buttons
    document.getElementById('prev-btn').disabled = step === 1;
    document.getElementById('prev-btn').classList.toggle('opacity-50', step === 1);
    document.getElementById('prev-btn').classList.toggle('cursor-not-allowed', step === 1);

    const nextBtn = document.getElementById('next-btn');
    if (step === totalSteps) {
        nextBtn.innerHTML = '<i class="fas fa-save mr-2"></i> บันทึกข้อมูล';
        nextBtn.onclick = saveAssessment;
    } else {
        nextBtn.innerHTML = 'ถัดไป <i class="fas fa-arrow-right ml-2"></i>';
        nextBtn.onclick = () => changeStep(1);
    }

    currentStep = step;
    window.scrollTo(0, 0);
}

function changeStep(direction) {
    const newStep = currentStep + direction;
    if (newStep >= 1 && newStep <= totalSteps) {
        showStep(newStep);
    }
}

function saveAssessment() {
    Swal.fire({
        title: 'ยืนยันการบันทึก?',
        text: "คุณต้องการส่งแบบประเมินนี้ใช่หรือไม่? ข้อมูลจะถูกส่งไปยังผู้ประเมิน",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF6D1F',
        cancelButtonColor: '#cbd5e1',
        confirmButtonText: 'ยืนยัน, ส่งประเมิน',
        cancelButtonText: 'ยกเลิก',
        borderRadius: '1rem'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'แบบประเมินของคุณถูกส่งเรียบร้อยแล้ว',
                icon: 'success',
                confirmButtonColor: '#FF6D1F',
                borderRadius: '1rem'
            }).then(() => {
                window.location.href = 'dashboardAppraisee.html';
            });
        }
    });
}

function saveDraft() {
    Swal.fire({
        title: 'บันทึกฉบับร่าง',
        text: 'ระบบบันทึกข้อมูลของคุณเรียบร้อยแล้ว คุณสามารถกลับมาทำต่อได้ภายหลัง',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}

// File Upload Logic
function triggerUpload(inputId) {
    document.getElementById(inputId).click();
}

document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function () {
        const fileName = this.files[0]?.name;
        const uploadBox = this.closest('.custom-file-upload');
        if (fileName) {
            uploadBox.querySelector('p').innerHTML = `<span class="text-orange-600 font-bold">${fileName}</span>`;
            uploadBox.querySelector('i').className = 'fas fa-check-circle text-2xl text-green-500 mb-2';
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showStep(1);
});
