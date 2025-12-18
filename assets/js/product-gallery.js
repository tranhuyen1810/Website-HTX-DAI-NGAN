/**
 * Product Gallery Script
 * Handles image gallery navigation and thumbnail selection
 */

(function() {
  'use strict';

  // Change main image when clicking thumbnail
  window.changeMainImage = function(thumbnail) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage && thumbnail) {
      mainImage.src = thumbnail.src;
      
      // Update active thumbnail
      const thumbnails = document.querySelectorAll('.thumbnail');
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      thumbnail.classList.add('active');
    }
  };

  // Gallery navigation buttons
  const prevBtn = document.querySelector('.gallery-nav.prev');
  const nextBtn = document.querySelector('.gallery-nav.next');
  const thumbnails = document.querySelectorAll('.thumbnail');

  if (prevBtn && nextBtn && thumbnails.length > 0) {
    let currentIndex = 0;

    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      thumbnails[currentIndex].click();
    });

    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % thumbnails.length;
      thumbnails[currentIndex].click();
    });

    // Update current index when clicking thumbnails
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', function() {
        currentIndex = index;
      });
    });
  }

  // Info button alert (you can customize this)
  const infoBtn = document.querySelector('.info-btn');
  if (infoBtn) {
    infoBtn.addEventListener('click', function() {
      alert('Để biết thêm thông tin chi tiết về sản phẩm, vui lòng liên hệ: 0767333379');
    });
  }

})();
