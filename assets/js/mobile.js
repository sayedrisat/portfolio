// mobile.js

document.addEventListener('DOMContentLoaded', () => {
    // Only apply this script on mobile devices (screen width <= 768px)
    if (window.innerWidth <= 768px) {
        // Create the mobile menu HTML
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <button class="close-btn"><i class="fas fa-times"></i></button>
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../pages/blog.html">Blog</a></li>
                <li><a href="../pages/portfolio.html">Portfolio</a></li>
                <li><a href="../pages/reviews.html">Client Testimonials</a></li>
                <li><a href="../pages/pricing.html">Pricing</a></li>
                <li><a href="../pages/contact.html">Contact</a></li>
            </ul>
        `;
        document.body.appendChild(mobileMenu);

        // Create an overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        // Hamburger menu button (already added via CSS ::after, but we'll attach the event)
        const hamburgerButton = document.querySelector('.header-left');
        const closeButton = document.querySelector('.mobile-menu .close-btn');

        // Toggle menu on hamburger click
        hamburgerButton.addEventListener('click', (e) => {
            if (e.target === hamburgerButton || e.target.closest('.header-left')) {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
            }
        });

        // Close menu on close button click
        closeButton.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Close menu on overlay click
        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
            });
        });
    }
});
