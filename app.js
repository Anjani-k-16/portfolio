/* ==========================================================================
   ANJANI SREE HARSHITA KANCHIRAJU - SDE & CYBER SECURITY PORTFOLIO
   Multi-Page System Script & Interactive Canvas Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initParticleCanvas();
  initTypingEffect();
  initNav();
  initBackToTop();
  handleInitialHash();
});

/* 1. SPLASH SCREEN ANIMATION & ENTRY FLOW */
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

  // Prevent scroll while splash screen is visible
  document.body.style.overflow = 'hidden';

  // Animate progress bar fill over 1.2 seconds and reveal Hero Landing page
  let width = 0;
  const interval = setInterval(() => {
    width += 5;
    if (progressFill) progressFill.style.width = width + '%';

    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        window.enterPortfolio();
      }, 350);
    }
  }, 25);
}

/* 2. MULTI-PAGE NAVIGATION & TAB SWITCHING SYSTEM */
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

  // Scroll to top of page smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav menu if open
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

/* Listen to browser back/forward navigation */
window.addEventListener('popstate', () => {
  handleInitialHash();
});

/* 3. DYNAMIC PARTICLE CANVAS BACKGROUND (CYBER NODES) */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const connectionDist = 120;

  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

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
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(0, 216, 246, ' : 'rgba(16, 185, 129, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse reactivity
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 216, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* 4. HERO DYNAMIC TYPING EFFECT */
function initTypingEffect() {
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  const roles = [
    'Cyber Security & Threat Analysis',
    'Full-Stack Software Engineering',
    'Agentic AI & LangGraph Workflows',
    'Toastmasters Executive Leadership'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = 1800; // Pause at full text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
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
    out.style.color = '#10b981';
    out.textContent = `Thank you ${name}! Your message has been received. I will get back to you shortly.`;

    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (msgInput) msgInput.value = '';
  }
};
