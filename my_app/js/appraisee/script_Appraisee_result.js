/* js/script_Appraisee_result.js */
/* Appraisee Evaluation Results Logic */

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('competencyRadar').getContext('2d');

    // ข้อมูลคะแนน (Mock Data)
    const labels = [
        'ความกระตือรือร้น (2.1)',
        'ความรับผิดชอบ (2.2)',
        'ความคิดริเริ่ม (2.3)',
        'การทำงานเป็นทีม (2.4)',
        'ผลสัมฤทธิ์ (2.5)',
        'การมีส่วนร่วม (2.6)',
        'การพัฒนาตนเอง (2.7)',
        'ความไว้วางใจ (2.8)'
    ];

    const dataScores = [4.8, 4.9, 4.2, 4.7, 4.5, 4.6, 4.3, 5.0];

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'คะแนนของคุณ',
                data: dataScores,
                fill: true,
                backgroundColor: 'rgba(255, 109, 31, 0.2)',
                borderColor: '#FF6D1F',
                pointBackgroundColor: '#FF6D1F',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#FF6D1F'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 2
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: '#e2e8f0'
                    },
                    grid: {
                        color: '#e2e8f0'
                    },
                    pointLabels: {
                        font: {
                            family: "'Prompt', sans-serif",
                            size: 11
                        },
                        color: '#64748b'
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1,
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Set User Profile Image if available in localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.profilePic) {
            const userImg = document.querySelector('header img[alt="User"]');
            if (userImg) userImg.src = profile.profilePic;
        }
    }
});
