(function () {
  'use strict';

  // ==========================================================================
  // Announcement Bar — dismiss and persist
  // ==========================================================================

  var announcementBar = document.querySelector('.announcement-bar');
  var announcementClose = document.querySelector('.announcement-bar__close');

  if (announcementBar && announcementClose) {
    if (sessionStorage.getItem('qs-announcement-dismissed') === 'true') {
      announcementBar.classList.add('is-dismissed');
    }

    announcementClose.addEventListener('click', function () {
      announcementBar.classList.add('is-dismissed');
      sessionStorage.setItem('qs-announcement-dismissed', 'true');
    });
  }

  // ==========================================================================
  // Sticky Footer CTA — show after scrolling past hero
  // ==========================================================================

  var stickyFooter = document.querySelector('.sticky-footer-cta');
  var heroSection = document.querySelector('.hero');

  if (stickyFooter && heroSection) {
    var stickyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stickyFooter.classList.remove('is-visible');
          } else {
            stickyFooter.classList.add('is-visible');
          }
        });
      },
      { threshold: 0 }
    );

    stickyObserver.observe(heroSection);
  }

  // ==========================================================================
  // Hidden Modal — open/close
  // ==========================================================================

  var modal = document.querySelector('.hidden-modal');
  var modalOverlay = document.querySelector('.hidden-modal__overlay');
  var modalClose = document.querySelector('.hidden-modal__close');

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (stickyFooter) stickyFooter.classList.remove('is-visible');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-visible')) {
      closeModal();
    }
  });

  // Expose open/close for personalization tools
  window.quadstarModal = {
    open: openModal,
    close: closeModal
  };

  // ==========================================================================
  // Prevent form submission on modal (it's a shell)
  // ==========================================================================

  var modalForm = document.querySelector('.hidden-modal__form');
  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }

  // ==========================================================================
  // Smooth scroll for anchor links
  // ==========================================================================

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

})();
