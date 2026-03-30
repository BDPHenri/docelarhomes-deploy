/* global window, document */
(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function starsHtml(rating) {
    const safeRating = Math.max(1, Math.min(5, Number(rating) || 5));
    return '&#9733;'.repeat(safeRating);
  }

  function renderTestimonials() {
    const grid = document.getElementById('landing-testimonials-grid');
    if (!grid) return;

    const reviews = Array.isArray(window.DEER_VALLEY_MANUAL_REVIEWS)
      ? window.DEER_VALLEY_MANUAL_REVIEWS.slice()
      : [];

    const featured = reviews
      .filter((review) => review && review.featured)
      .sort((a, b) => (Number(a.featuredRank) || 999) - (Number(b.featuredRank) || 999))
      .slice(0, 2);

    grid.innerHTML = featured.map((review) => `
      <div class="testimonial-card fade-in visible">
        <div class="testimonial-stars">${starsHtml(review.rating)}</div>
        <p class="testimonial-text">"${escapeHtml(review.text)}"</p>
        <div class="testimonial-author">${escapeHtml(review.guestName)}</div>
        <div class="testimonial-platform">Airbnb · ${escapeHtml(review.dateText)}</div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', renderTestimonials);
})();
