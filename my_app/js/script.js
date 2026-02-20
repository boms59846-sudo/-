// News Modal Data
const newsData = [
    {
        date: "13-14 พฤศจิกายน 2568",
        title: "โครงการศึกษาดูงาน ณ วิทยาลัยการอาชีพท่าตูม จ.สุรินทร์",
        content: `วันที่ 13 - 14 พฤศจิกายน 2568 นายวีระศักดิ์ สุวรรณขันธ์ รองผู้อำนวยการวิทยาลัยการอาชีพชนแดน นำคณะครูและบุคลากรทางการศึกษาเข้าร่วมโครงการศึกษาดูงาน ณ วิทยาลัยการอาชีพท่าตูม จังหวัดสุรินทร์

เพื่อพัฒนาศักยภาพในการปฏิบัติหน้าที่และศึกษาดูงานนอกสถานที่ สร้างความสัมพันธ์อันดีต่อกันระหว่างครูและบุคลากรทางการศึกษา การศึกษาดูงานในครั้งนี้เป็นโอกาสอันดีในการแลกเปลี่ยนเรียนรู้ประสบการณ์ และนำความรู้ที่ได้รับมาพัฒนาการจัดการเรียนการสอนให้มีประสิทธิภาพยิ่งขึ้น`
    },
    {
        date: "7 พฤศจิกายน 2568",
        title: "บริจาคโลหิตเพื่ออุทิศถวายเป็นพระราชกุศล",
        content: `วันศุกร์ที่ 7 พฤศจิกายน 2568 เวลา 08:30 น. นายพัฒน์คณวัชร์ นวมเฟื่อง ผู้อำนวยการวิทยาลัยการอาชีพชนแดน พร้อมด้วยผู้บริหาร คณะครู บุคลากรทางการศึกษา และนักเรียน นักศึกษา วิทยาลัยการอาชีพชนแดน เข้าร่วมบริจาคโลหิต

เพื่ออุทิศถวายเป็นพระราชกุศลครบรอบ (15 วัน) ปัณสมวาร สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง แสดงความจงรักภักดี และน้อมรำลึกในพระมหากรุณาธิคุณอันหาที่สุดมิได้ 

กิจกรรมจัดขึ้น ณ โดมเอนกประสงค์ วิทยาลัยการอาชีพชนแดน โดยมีผู้เข้าร่วมบริจาคโลหิตเป็นจำนวนมาก แสดงให้เห็นถึงความสามัคคีและจิตสาธารณะของคณะครู บุคลากร และนักเรียน นักศึกษา`
    },
    {
        date: "31 ตุลาคม 2568",
        title: "รับรางวัลธนาคารส่งเสริมการออม ระดับการออมยอดเยี่ยม",
        content: `วันที่ 31 ตุลาคม 2568 นายพัฒน์คณวัชร์ นวมเฟื่อง ผู้อำนวยการวิทยาลัยการอาชีพชนแดน พร้อมกลุ่มงานธนาคารโรงเรียนดิจิทัลวิทยาลัยการอาชีพชนแดน เข้ารับโล่รางวัลและเกียรติบัตร "ธนาคารส่งเสริมการออม ระดับการออมยอดเยี่ยม"

จาก นางลภาวรรณ จันทร์กระจ่าง รองผู้อำนวยการธนาคารออมสิน กลุ่มลูกค้าธุรกิจและภาครัฐ รักษาการแทนผู้อำนวยการธนาคารออมสิน

รางวัลนี้เป็นการยกย่องเชิดชูเกียรติให้กับวิทยาลัยการอาชีพชนแดนที่ได้ส่งเสริมและปลูกฝังนิสัยการออมเงินให้กับนักเรียน นักศึกษา อันจะเป็นรากฐานที่สำคัญในการบริหารจัดการการเงินส่วนบุคคลในอนาคต`
    },
    {
        date: "29 พฤศจิกายน 2568",
        title: "งานประชุมวิชาการและแข่งขันทักษะวิชาชีพ ระดับสถานศึกษา",
        content: `วันพุธที่ 29 พฤศจิกายน 2568 นายพัฒน์คณวัชร์ นวมเฟื่อง ผู้อำนวยการวิทยาลัยการอาชีพชนแดน พร้อมด้วยคณะผู้บริหาร คณะครู และนักเรียน นักศึกษา เข้าร่วมงานประชุมวิชาการองค์การนักวิชาชีพแห่งประเทศไทย (อวท.) 

การแข่งขันทักษะวิชาชีพและทักษะพื้นฐาน ระดับสถานศึกษา จัดขึ้น ณ โดมอเนกประสงค์ วิทยาลัยการอาชีพชนแดน

งานในครั้งนี้เป็นเวทีให้นักเรียน นักศึกษาได้แสดงศักยภาพและความสามารถทางด้านวิชาชีพ ทั้งในส่วนของทักษะวิชาชีพเฉพาะสาขาและทักษะพื้นฐานที่จำเป็น เพื่อเตรียมความพร้อมสู่การแข่งขันในระดับที่สูงขึ้นต่อไป และเป็นการพัฒนาคุณภาพการศึกษาวิชาชีพให้มีมาตรฐานสากล`
    }
];

// Open Modal Function
function openNewsModal(index) {
    const modal = document.getElementById('newsModal');
    const modalBody = document.getElementById('modalBody');
    const news = newsData[index];

    modalBody.innerHTML = `
        <h2>${news.title}</h2>
        <span class="modal-date"><i class="far fa-calendar-alt"></i> ${news.date}</span>
        <p class="modal-text">${news.content}</p>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // ป้องกันการ scroll หน้าหลัก
}

// Close Modal Function
function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // คืนค่าการ scroll
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('newsModal');
    if (event.target == modal) {
        closeNewsModal();
    }
}

// Close modal with ESC key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeNewsModal();
    }
});

// Original code from script.js
document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Dashboard-specific code (if elements exist)
    const sidebar = document.getElementById('sidebar');
    const logoutBtn = document.getElementById('logout-btn');

    // Check if elements exist before adding event listeners
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (confirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?')) {
                alert('ออกจากระบบเรียบร้อยแล้ว');
            }
        });
    }

    // Close Sidebar when clicking outside
    if (sidebar) {
        document.body.addEventListener('click', (e) => {
            if (document.body.classList.contains('sidebar-open') &&
                !sidebar.contains(e.target) &&
                e.target !== menuToggle &&
                !menuToggle.contains(e.target)) {

                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    }
});