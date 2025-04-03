fetch('../assets/js/testimonials.json')
  .then(response => response.json())
  .then(testimonialsData => {
    let currentPage = 1;
    const reviewsPerPage = 9;
    let filteredTestimonials = [...testimonialsData];

    const container = document.getElementById('reviewsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    function displayTestimonials(testimonials, page) {
      const start = (page - 1) * reviewsPerPage;
      const end = start + reviewsPerPage;
      const pageTestimonials = testimonials.slice(start, end);

      if (page === 1) container.innerHTML = '';

      pageTestimonials.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const reviewCard = `
          <div class="review-card" data-country="${review.country}">
            <div class="review-header">
              <img src="../${review.avatar}" alt="${review.name}" class="reviewer-avatar">
              <div class="reviewer-info">
                <h3>${review.name}</h3>
                <div class="review-meta">
                  <span class="review-date">${review.date}</span>
                  <span class="review-stars">${stars}</span>
                </div>
              </div>
            </div>
            <p class="review-text">${review.review}</p>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', reviewCard);
      });

      loadMoreBtn.style.display = end < testimonials.length ? 'block' : 'none';
    }

    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      displayTestimonials(filteredTestimonials, currentPage);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const country = e.target.dataset.country;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        filteredTestimonials = country === 'all'
          ? [...testimonialsData]
          : testimonialsData.filter(r => r.country === country);
        currentPage = 1;
        displayTestimonials(filteredTestimonials, currentPage);
      });
    });

    displayTestimonials(testimonialsData, 1);
  })
  .catch(error => {
    console.error('Error loading testimonials:', error);
    document.getElementById('reviewsContainer').innerHTML = '<p>Failed to load testimonials. Please try again later.</p>';
  });
