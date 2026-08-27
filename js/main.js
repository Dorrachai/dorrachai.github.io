/**
 * Main Application Orchestrator
 * Bootstraps all modules, animations, typewriter effect, and mobile interactions.
 */

import { initResume } from './resume.js';
import { initProjects } from './projects.js';
import { initBlog } from './blog.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize dynamic content modules
  await Promise.allSettled([
    initResume(),
    initProjects(),
    initBlog()
  ]);

  // Setup UI components and interactive enhancements
  setupTypewriter();
  setupScrollReveal();
  setupActiveNavHighlight();
  setupMobileDrawer();
  setupBackToTop();
  setupContactForm();
  setupCurrentYear();
});

/**
 * Typewriter effect for Hero Section Subtitle
 */
function setupTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    "Full-Stack Software Engineer",
    "Cloud & AI Systems Builder",
    "Open-Source Contributor",
    "Modern Web Architect"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 40;
  const pauseEnd = 1800;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, pauseEnd);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }

    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(type, currentSpeed);
  }

  type();
}

/**
 * Scroll Reveal Animation via IntersectionObserver
 */
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  function observeElements() {
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
    elements.forEach(el => observer.observe(el));
  }

  observeElements();
  // Re-run observer after dynamic modules finish rendering
  setTimeout(observeElements, 400);
}

/**
 * Active Navigation Link Highlighting on Scroll
 */
function setupActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header glass blur shadow effect
    if (scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * Mobile Navigation Drawer Toggle & Trap
 */
function setupMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    drawer?.classList.add('open');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Back to Top Button
 */
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Contact Form Mock Handler with Copy-to-Clipboard Feedback
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        submitBtn.innerHTML = `<span style="color: #10b981;">✔ Message Sent!</span>`;
        form.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3000);
      }, 1000);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'dorrachai.dev@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerText;
        copyEmailBtn.innerText = 'Copied to Clipboard!';
        setTimeout(() => {
          copyEmailBtn.innerText = originalText;
        }, 2000);
      }).catch(() => {
        alert(`Email: ${email}`);
      });
    });
  }
}

/**
 * Dynamic Current Year in Footer
 */
function setupCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
