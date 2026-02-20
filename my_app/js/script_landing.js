/* js/script_landing.js */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing page initialized');

    // Add scroll effect to navigation
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg', 'bg-white/95');
            nav.classList.remove('bg-white/80');
        } else {
            nav.classList.remove('shadow-lg', 'bg-white/95');
            nav.classList.add('bg-white/80');
        }
    });

    // Handle smooth scrolling for anchors (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
