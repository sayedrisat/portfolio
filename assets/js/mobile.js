document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.createElement("button");
    hamburger.classList.add("hamburger");
    hamburger.innerHTML = "☰";
    
    const nav = document.querySelector("nav");
    nav.parentNode.insertBefore(hamburger, nav);

    hamburger.addEventListener("click", function () {
        const menu = document.querySelector("nav ul");
        menu.classList.toggle("active");
    });
});
