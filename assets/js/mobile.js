document.addEventListener("DOMContentLoaded", function () {
    // Create hamburger button
    const hamburger = document.createElement("button");
    hamburger.classList.add("hamburger");
    hamburger.innerHTML = "☰"; // Hamburger icon
    
    // Add hamburger to the header
    const header = document.querySelector("header");
    if (header) {
        header.appendChild(hamburger);
    } else {
        console.error("Header not found!");
        return;
    }

    // Get the menu
    const menu = document.querySelector("nav ul");
    if (!menu) {
        console.error("Menu (nav ul) not found!");
        return;
    }

    // Toggle menu on click
    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const menuLinks = document.querySelectorAll("nav ul li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });
});
