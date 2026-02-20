/* js/script_Appraisee_data.js */
/* Premium Profile Page Logic */

document.addEventListener('DOMContentLoaded', () => {
    // ดึงข้อมูลจาก LocalStorage
    const storedData = localStorage.getItem('userProfile');
    const sessionUser = localStorage.getItem('cice_user');

    let displayData = {
        name: "นายสมชาย ใจดี",
        position: "ครูชำนาญการ",
        staffId: "67-0042",
        department: "แผนกวิชาคอมพิวเตอร์ธุรกิจ",
        degree: "ปริญญาโท ครุศาสตร์อุตสาหกรรม",
        email: "somchai.j@cice.ac.th",
        phone: "081-XXX-XXXX",
        expertise: "Mobile Application Development",
        profilePic: null
    };

    if (storedData) {
        const parsed = JSON.parse(storedData);
        displayData = { ...displayData, ...parsed };
    } else if (sessionUser) {
        const parsed = JSON.parse(sessionUser);
        displayData.name = parsed.username || displayData.name;
    }

    // แสดงผล
    document.getElementById('text-name').textContent = displayData.name;
    document.getElementById('text-position').textContent = displayData.position;
    document.getElementById('val-staff-id').textContent = displayData.staffId;
    document.getElementById('val-dept').textContent = displayData.department;
    document.getElementById('val-degree').textContent = displayData.degree;
    document.getElementById('val-email').textContent = displayData.email;
    document.getElementById('val-phone').textContent = displayData.phone;
    document.getElementById('val-expertise').textContent = displayData.expertise;

    if (displayData.profilePic) {
        document.getElementById('img-profile').src = displayData.profilePic;
    } else {
        document.getElementById('img-profile').src =
            `https://ui-avatars.com/api/?name=${encodeURIComponent(displayData.name)}&background=FF6D1F&color=fff&size=200`;
    }

    // วันที่อัปเดตล่าสุด
    const today = new Date();
    document.getElementById('last-update').textContent = today.toLocaleDateString('th-TH', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
});
