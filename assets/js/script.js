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
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themePopup.classList.toggle('show');
        });

        const themeOptions = themePopup.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                setTheme(theme);
                themePopup.classList.remove('show');
            });
        });

        document.addEventListener('click', (e) => {
            if (!themePopup.contains(e.target) && !themeToggle.contains(e.target)) {
                themePopup.classList.remove('show');
            }
        });
    }

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

    // Fetch posts from posts.json and render dynamically (for Blog and Homepage)
    const postsContainer = document.getElementById('posts-container'); // Homepage
    const allPostsContainer = document.getElementById('all-posts-container'); // Blog page

    if (postsContainer || allPostsContainer) {
        console.log('Attempting to fetch posts.json...');
        fetch(postsContainer ? 'posts.json' : '../posts.json') // Adjust path based on page
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(posts => {
                console.log('Posts fetched successfully:', posts);
                // Sort posts by date (newest first)
                posts.sort((a, b) => new Date(b.date) - new Date(a.date));

                // For homepage (Recent Posts)
                if (postsContainer) {
                    console.log('Rendering recent posts...');
                    const recentPosts = posts.slice(0, 4); // Show latest 4 posts
                    recentPosts.forEach(post => {
                        const postElement = document.createElement('article');
                        postElement.classList.add('post-card');
                        postElement.innerHTML = `
                            <img src="${post.image}" alt="${post.title}" loading="lazy">
                            <div class="post-content">
                                <span class="post-date">${post.date}</span>
                                <h3>${post.title}</h3>
                                <p>${post.excerpt}</p>
                                <a href="${post.link}" class="read-more">Read More</a>
                            </div>
                        `;
                        postsContainer.appendChild(postElement);
                    });
                }

                // For blog page (All Posts with Filtering)
                if (allPostsContainer) {
                    console.log('Rendering all posts...');
                    // Function to render posts based on filter
                    const renderPosts = (category) => {
                        allPostsContainer.innerHTML = ''; // Clear previous posts
                        const filteredPosts = category === 'all' 
                            ? posts 
                            : posts.filter(post => post.category === category);

                        filteredPosts.forEach(post => {
                            const postElement = document.createElement('article');
                            postElement.classList.add('post-card');
                            postElement.innerHTML = `
                                <img src="../${post.image}" alt="${post.title}" loading="lazy">
                                <div class="post-content">
                                    <span class="post-date">${post.date}</span>
                                    <h3>${post.title}</h3>
                                    <p>${post.excerpt}</p>
                                    <a href="../${post.link}" class="read-more">Read More</a>
                                </div>
                            `;
                            allPostsContainer.appendChild(postElement);
                        });
                    };

                    // Initial render (show all posts)
                    renderPosts('all');

                    // Add event listeners to filter buttons
                    document.querySelectorAll('.blog-filter').forEach(link => {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            const category = link.getAttribute('data-category');

                            // Update active class
                            document.querySelectorAll('.blog-filter').forEach(l => l.classList.remove('active'));
                            link.classList.add('active');

                            // Render filtered posts
                            renderPosts(category);
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                if (postsContainer) {
                    postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
                }
                if (allPostsContainer) {
                    allPostsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
                }
            });
    } else {
        console.log('No posts container found on this page.');
    }

    // Fetch client logos for Portfolio page
    const clientLogosContainer = document.getElementById('client-logos-container');
    if (clientLogosContainer) {
        console.log('Attempting to fetch client-logos.json...');
        fetch('../client-logos.json') // Path adjusted since portfolio.html is in pages/
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(logos => {
                console.log('Client logos fetched successfully:', logos);
                logos.forEach(logo => {
                    const logoElement = document.createElement('img');
                    logoElement.src = `../${logo.image}`; // Adjust path for pages/ folder
                    logoElement.alt = logo.name;
                    logoElement.setAttribute('loading', 'lazy');
                    clientLogosContainer.appendChild(logoElement);
                });
            })
            .catch(error => {
                console.error('Error loading client logos:', error);
                clientLogosContainer.innerHTML = '<p>Failed to load client logos. Please try again later.</p>';
            });
    }

    // Fetch case studies for Portfolio page
    const caseStudiesContainer = document.getElementById('case-studies-container');
    const caseStudyFilter = document.getElementById('case-study-filter');

    if (caseStudiesContainer) {
        console.log('Attempting to fetch case-studies.json...');
        fetch('../case-studies.json') // Path adjusted since portfolio.html is in pages/
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(caseStudies => {
                console.log('Case studies fetched successfully:', caseStudies);

                // Function to render case studies based on filter
                const renderCaseStudies = (category) => {
                    caseStudiesContainer.innerHTML = ''; // Clear previous case studies
                    const filteredCaseStudies = category === 'all' 
                        ? caseStudies 
                        : caseStudies.filter(caseStudy => caseStudy.category === category);

                    filteredCaseStudies.forEach(caseStudy => {
                        const caseStudyElement = document.createElement('article');
                        caseStudyElement.classList.add('post-card'); // Reuse post-card style
                        caseStudyElement.innerHTML = `
                            <img src="../${caseStudy.image}" alt="${caseStudy.title}" loading="lazy">
                            <div class="post-content">
                                <span class="post-date">${caseStudy.date}</span>
                                <h3>${caseStudy.title}</h3>
                                <p>${caseStudy.excerpt}</p>
                                <div class="metrics">
                                    <div class="metric">
                                        <span class="number">${caseStudy.metrics.traffic}</span>
                                        <span class="label">Traffic Growth</span>
                                    </div>
                                    <div class="metric">
                                        <span class="number">${caseStudy.metrics.revenue}</span>
                                        <span class="label">Revenue Increase</span>
                                    </div>
                                </div>
                                <a href="../${caseStudy.link}" class="read-more">View Case Study</a>
                            </div>
                        `;
                        caseStudiesContainer.appendChild(caseStudyElement);
                    });
                };

                // Initial render (show all case studies)
                renderCaseStudies('all');

                // Add event listener to dropdown filter
                if (caseStudyFilter) {
                    caseStudyFilter.addEventListener('change', (e) => {
                        const category = e.target.value;
                        renderCaseStudies(category);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading case studies:', error);
                caseStudiesContainer.innerHTML = '<p>Failed to load case studies. Please try again later.</p>';
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
        const service = e.target.parentElement.querySelector('h3')?.textContent || 'our services';
        alert(`Thank you for your interest in ${service}! We'll contact you soon!`);
    });
});
