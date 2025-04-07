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
    hamburgerMenu.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click from bubbling up to the document
        hamburgerMenu.classList.toggle("active");
        nav.classList.toggle("active");
        console.log("Hamburger clicked! Menu is now:", nav.classList.contains("active") ? "open" : "closed"); // Debugging
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

    // Theme toggle functionality for both desktop and mobile
    const themeSwitch = document.getElementById("themeSwitch"); // Desktop toggle
    const themeSwitchMobile = document.getElementById("themeSwitchMobile"); // Mobile toggle

    // Check for saved theme in localStorage and apply to both toggles
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        if (savedTheme === "dark") {
            if (themeSwitch) themeSwitch.checked = true;
            if (themeSwitchMobile) themeSwitchMobile.checked = true;
        }
    }

    // Toggle theme on desktop switch change
    if (themeSwitch) {
        themeSwitch.addEventListener("change", function () {
            const newTheme = this.checked ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            // Sync the mobile toggle
            if (themeSwitchMobile) themeSwitchMobile.checked = this.checked;
        });
    }

    // Toggle theme on mobile switch change
    if (themeSwitchMobile) {
        themeSwitchMobile.addEventListener("change", function () {
            const newTheme = this.checked ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            // Sync the desktop toggle
            if (themeSwitch) themeSwitch.checked = this.checked;
        });
    }
});
