document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Sticky Navbar Styling & Auto-Close Mobile Menu on Scroll
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  const closeMobileMenu = () => {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    }
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Close mobile menu when user starts scrolling
    closeMobileMenu();
  }, { passive: true });

  // 3. Mobile Hamburger Menu Toggle & Outside Click Close
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when tapping outside the navbar
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // 4. Pre-Select Service When Clicking Service Card Buttons
  const serviceSelect = document.getElementById('service-type');
  const serviceBtns = document.querySelectorAll('.select-service-btn');

  serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chosenService = btn.getAttribute('data-service');
      if (serviceSelect && chosenService) {
        serviceSelect.value = chosenService;
      }
    });
  });

  // 5. Interactive WhatsApp Booking Form Handler
  const bookingForm = document.getElementById('whatsapp-booking-form');
  const dateInput = document.getElementById('event-date');

  // Prevent picking past dates
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('client-name').value.trim();
      const serviceType = document.getElementById('service-type').value;
      const eventDate = document.getElementById('event-date').value;
      const rehearsalLoc = document.getElementById('rehearsal-location').value;
      const songChoice = document.getElementById('song-choice').value.trim();
      const whatsappNumber = document.getElementById('whatsapp-line').value;
      const extraNotes = document.getElementById('extra-notes').value.trim();

      // Format date nicely (e.g., 14 Dec 2026)
      let formattedDate = eventDate;
      if (eventDate) {
        const dateObj = new Date(eventDate + 'T00:00:00');
        formattedDate = dateObj.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
      }

      const messageLines = [
        `Hi Donnel! I'd like to book a choreography session:`,
        ``,
        `*Name(s):* ${clientName}`,
        `*Service:* ${serviceType}`,
        `*Event Date:* ${formattedDate}`,
        `*Rehearsal Location:* ${rehearsalLoc}`,
        `*Song Choice:* ${songChoice || 'Not decided yet'}`,
        extraNotes ? `*Notes:* ${extraNotes}` : ''
      ].filter(Boolean);

      const encodedMessage = encodeURIComponent(messageLines.join('\n'));
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener');
    });
  }

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 7. Gallery Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // 8. Gallery Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });
  }

  // 9. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => revealObserver.observe(el));
});