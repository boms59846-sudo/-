/* d:\watcharaphon18\my_app\js\script_graph.js */

document.addEventListener('DOMContentLoaded', function () {
    // --- 1. Evaluation Trend Chart ---
    const ctxTrend = document.getElementById('evaluationChart');
    if (ctxTrend) {
        const ctx = ctxTrend.getContext('2d');
        const gradientYellow = ctx.createLinearGradient(0, 0, 0, 400);
        gradientYellow.addColorStop(0, 'rgba(255, 193, 7, 0.4)');
        gradientYellow.addColorStop(1, 'rgba(255, 193, 7, 0.0)');

        const gradientPink = ctx.createLinearGradient(0, 0, 0, 400);
        gradientPink.addColorStop(0, 'rgba(255, 99, 132, 0.4)');
        gradientPink.addColorStop(1, 'rgba(255, 99, 132, 0.0)');

        const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
        gradientGreen.addColorStop(0, 'rgba(34, 197, 94, 0.4)');
        gradientGreen.addColorStop(1, 'rgba(34, 197, 94, 0.0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'],
                datasets: [
                    {
                        label: 'คะแนนชุดที่ 1',
                        data: [2, 20, 38, 30, 32],
                        borderColor: '#FFC107',
                        backgroundColor: gradientYellow,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#FFC107',
                        pointBorderWidth: 3,
                        pointRadius: 6,
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    },
                    {
                        label: 'คะแนนชุดที่ 2',
                        data: [12, 25, 34, 44, 50],
                        borderColor: '#FF6384',
                        backgroundColor: gradientPink,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#FF6384',
                        pointBorderWidth: 3,
                        pointRadius: 6,
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    },
                    {
                        label: 'คะแนนชุดที่ 3',
                        data: [11, 42, 38, 40, 42],
                        borderColor: '#22c55e',
                        backgroundColor: gradientGreen,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#22c55e',
                        pointBorderWidth: 3,
                        pointRadius: 6,
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            font: { family: "'Prompt', sans-serif", size: 12 }
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 60, grid: { color: 'rgba(0, 0, 0, 0.03)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // --- 2. Comparison Bar Chart ---
    const ctxBar = document.getElementById('comparisonChart');
    if (ctxBar) {
        const criteriaScores = [95, 78, 65, 59, 90, 82, 98, 72];
        new Chart(ctxBar.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [
                    'ความกระตือรือร้น',
                    'ความรับผิดชอบ',
                    'ความคิดสร้างสรรค์',
                    'การทำงานร่วมกัน',
                    'ผลสัมฤทธิ์ของงาน',
                    'การมีส่วนร่วม',
                    'การพัฒนาตนเอง',
                    'ความไว้วางใจ'
                ],
                datasets: [{
                    label: 'คะแนนเฉลี่ย',
                    data: criteriaScores,
                    backgroundColor: 'rgba(255, 109, 31, 0.7)',
                    borderColor: 'rgba(255, 109, 31, 1)',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, max: 100 },
                    y: { ticks: { font: { family: "'Prompt', sans-serif", size: 11 } } }
                }
            }
        });
    }

    // --- 3. Score Level Pie Chart ---
    const ctxPie = document.getElementById('scoreDistributionChart');
    if (ctxPie) {
        new Chart(ctxPie.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['ดีเยี่ยม', 'ดีมาก', 'ดี', 'พอใช้', 'ปรับปรุง'],
                datasets: [{
                    data: [3, 2, 2, 1, 0], // Sample data matching criteriaScores distribution
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '70%'
            }
        });
    }
});
