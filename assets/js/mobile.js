document.addEventListener("DOMContentLoaded", function () {
    // Create hamburger button
    const hamburger = document.createElement("button");
    hamburger.classList.add("hamburger");
    hamburger.innerHTML = "☰"; // Hamburger icon (you can replace with an SVG or image if preferred)
    
    // Insert hamburger button in the header
    const header = document.querySelector("header");
    header.appendChild(hamburger);

    // Toggle menu on click
    hamburger.addEventListener("click", function () {
        const menu = document.querySelector("nav ul");
        menu.classList.toggle("active");
    });

    // Close menu when a menu item is clicked (optional for better UX)
    const menuLinks = document.querySelectorAll("nav ul li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.querySelector("nav ul");
            menu.classList.remove("active");
        });
    });
});
