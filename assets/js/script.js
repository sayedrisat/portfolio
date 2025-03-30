// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themePopup = document.getElementById('themePopup');
    
    if (themeToggle && themePopup) {
        // Toggle theme popup
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themePopup.classList.toggle('show');
        });

        // Handle theme selection
        const themeOptions = themePopup.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                setTheme(theme);
                themePopup.classList.remove('show');
            });
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!themePopup.contains(e.target) && !themeToggle.contains(e.target)) {
                themePopup.classList.remove('show');
            }
        });
    }

    // Handle settings button (for pages without theme toggle)
    document.querySelectorAll('.settings-button:not(#themeToggle)').forEach(button => {
        button.addEventListener('click', () => {
            const popup = document.createElement('div');
            popup.className = 'theme-popup show';
            popup.style.position = 'absolute';
            popup.style.top = '40px';
            popup.style.right = '10px';
            
            popup.innerHTML = `
                <button class="theme-option" data-theme="light">
                    <i class="fas fa-sun"></i> Light Mode
                </button>
                <button class="theme-option" data-theme="dark">
                    <i class="fas fa-moon"></i> Dark Mode
                </button>
            `;
            
            button.parentElement.appendChild(popup);
            
            popup.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', () => {
                    const theme = option.getAttribute('data-theme');
                    setTheme(theme);
                    popup.remove();
                });
            });
            
            document.addEventListener('click', function closePopup(e) {
                if (!popup.contains(e.target) && e.target !== button) {
                    popup.remove();
                    document.removeEventListener('click', closePopup);
                }
            });
        });
    });

    // Handle search button
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchPopup = document.createElement('div');
            searchPopup.className = 'search-popup';
            searchPopup.innerHTML = `
                <div class="search-container">
                    <input type="text" placeholder="Search...">
                    <button><i class="fas fa-search"></i></button>
                </div>
            `;
            document.body.appendChild(searchPopup);
            
            const input = searchPopup.querySelector('input');
            input.focus();
            
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Escape') {
                    searchPopup.remove();
                }
            });
            
            document.addEventListener('click', function closeSearch(e) {
                if (!searchPopup.contains(e.target) && e.target !== searchButton) {
                    searchPopup.remove();
                    document.removeEventListener('click', closeSearch);
                }
            });
        });
    }
});

// Handle active navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Handle CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const service = e.target.parentElement.querySelector('h3').textContent;
        alert(`Thank you for your interest in ${service} We'll contact you soon!`);
    });
});

// Blog post filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.blog-filter');
    const blogPosts = document.querySelectorAll('.post-card');

    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');

            // Update active class
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Filter posts
            blogPosts.forEach(post => {
                if (category === 'all' || post.getAttribute('data-category') === category) {
                    post.style.display = 'block';
                    // Add animation
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
});
