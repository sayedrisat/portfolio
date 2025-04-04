document.addEventListener("DOMContentLoaded", function () {
    // Create hamburger button
    const hamburger = document.createElement("button");
    hamburger.classList.add("hamburger");
    hamburger.innerHTML = "☰"; // Hamburger icon
    
    // Add hamburger to the header
    const header = document.querySelector("header.header");
    if (header) {
        header.appendChild(hamburger);
    } else {
        console.error("Header not found!");
        return;
    }

    // Get the nav (not just the ul)
    const nav = document.querySelector("nav.main-nav");
    if (!nav) {
        console.error("Nav (nav.main-nav) not found!");
        return;
    }

    // Get the menu (ul)
    const menu = nav.querySelector("ul");
    if (!menu) {
        console.error("Menu (nav.main-nav ul) not found!");
        return;
    }

    // Ensure nav and menu are hidden initially
    nav.classList.remove("active");
    menu.classList.remove("active");

    // Toggle menu on click
    hamburger.addEventListener("click", function () {
        nav.classList.toggle("active");
        menu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const menuLinks = document.querySelectorAll("nav.main-nav ul li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menu.classList.remove("active");
        });
    });
});
