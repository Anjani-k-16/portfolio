/* ==========================================================================
   ANJANI SREE HARSHITA KANCHIRAJU - SDE & CYBER SECURITY PORTFOLIO
   Pin-to-Pin Reference Specification Logic & Typewriter Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initParticleCanvas();
  initTypewriter();
  initNav();
  initBackToTop();
  handleInitialHash();
});

/* 1. ANIMATED SPLASH INTRO & ENTRY FLOW */
window.enterPortfolio = function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.add('hide');
    document.body.style.overflow = 'auto';
  }
};

function initSplash() {
  const splash = document.getElementById('splash');
  const progressFill = document.getElementById('splash-progress-fill');
  const skipBtn = document.getElementById('splash-skip-btn');

  if (!splash || !progressFill) return;

  document.body.style.overflow = 'hidden';

  // Animate progress bar fill over 1.2 seconds
  let width = 0;
  const interval = setInterval(() => {
    width += 5;
    if (progressFill) progressFill.style.width = width + '%';

    if (width >= 100) {
      clearInterval(interval);
      if (skipBtn) {
        skipBtn.classList.add('ready');
      }
    }
  }, 25);
}

/* 2. PIN-TO-PIN TYPEWRITER ANIMATION ENGINE */
function initTypewriter() {
  const roleEl = document.getElementById('typewriter-role');
  if (!roleEl) return;

  const roles = [
    "Machine Learning Enthusiast",
    "Full-Stack Developer",
    "Cyber Security & Threat Specialist",
    "Agentic AI & LangGraph Architect",
    "2x Hackathon Winner 🏆",
    "Software Developer"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeRole() {
    const currentRole = roles[roleIdx];

    if (!isDeleting) {
      roleEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, 1400); // Pause after full typing
        return;
      }
    } else {
      roleEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeRole, 300); // Pause before next word
        return;
      }
    }

    setTimeout(typeRole, isDeleting ? 45 : 80);
  }

  typeRole();
}

/* 3. MULTI-PAGE NAVIGATION & TAB SWITCHING SYSTEM */
window.switchPage = function(pageId, event) {
  if (event) event.preventDefault();

  const pages = document.querySelectorAll('.page');
  const targetPage = document.getElementById(`${pageId}-page`);

  if (!targetPage) return;

  // Deactivate all pages
  pages.forEach(p => p.classList.remove('active'));

  // Activate target page
  targetPage.classList.add('active');

  // Update navigation link highlighting
  const navLinks = document.querySelectorAll('#nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${pageId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Sync browser URL hash
  if (window.location.hash !== `#${pageId}`) {
    history.pushState(null, '', `#${pageId}`);
  }

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile navigation menu if open
  const navLinksEl = document.getElementById('nav-links');
  if (navLinksEl) navLinksEl.classList.remove('active');
};

/* Handle initial URL hash on page load */
function handleInitialHash() {
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'about', 'skills', 'experience', 'projects', 'credentials', 'education', 'contact'];

  if (hash && validPages.includes(hash)) {
    switchPage(hash);
  } else {
    switchPage('home');
  }
}

window.addEventListener('popstate', handleInitialHash);

/* 4. BACKGROUND PARTICLE CANVAS (ATMOSPHERIC POINT CLOUD) */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 50);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(216, 170, 66, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* 5. NAVIGATION MOBILE TOGGLE */
function initNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

/* 6. BACK TO TOP BUTTON */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 7. CONTACT FORM SUBMISSION HANDLER */
window.submitForm = function() {
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const msgInput = document.getElementById('form-msg');
  const out = document.getElementById('form-output');

  const name = nameInput ? nameInput.value : 'Visitor';

  if (out) {
    out.style.color = '#3bd6a0';
    out.textContent = `Thank you ${name}! Your message has been received. I will get back to you shortly.`;

    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (msgInput) msgInput.value = '';
  }
};
