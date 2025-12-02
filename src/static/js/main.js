document.addEventListener('DOMContentLoaded', () => {
    console.log('DirIA Landing Page Loaded');

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Chatbot Integration (Placeholder for now, linking to console or embedded)
    const chatBtn = document.getElementById('chat-widget-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            // Open chatbot modal or redirect
            window.location.href = '/console.html';
        });
    }
});
