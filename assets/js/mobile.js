document.addEventListener("DOMContentLoaded", function () {
    // Get the hamburger menu button
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    if (!hamburgerMenu) {
        console.error("Hamburger menu button not found!");
        return;
    }
    
    // Get the navigation menu
    const nav = document.querySelector("nav.main-nav");
    if (!nav) {
        console.error("Navigation menu not found!");
        return;
    }

    // Toggle menu on hamburger click
    hamburgerMenu.addEventListener("click", function () {
        hamburgerMenu.classList.toggle("active");
        nav.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const menuLinks = document.querySelectorAll("nav.main-nav ul li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburgerMenu.classList.remove("active");
            nav.classList.remove("active");
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains("active")) {
            hamburgerMenu.classList.remove("active");
            nav.classList.remove("active");
        }
    });
    
    // Handle window resize
    window.addEventListener("resize", function() {
        if (window.innerWidth > 992) {
            hamburgerMenu.classList.remove("active");
            nav.classList.remove("active");
        }
    });
});

