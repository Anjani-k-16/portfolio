/* ==========================================================================
   ANJANI SREE HARSHITA KANCHIRAJU - SDE & CYBER SECURITY PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initParticleCanvas();
  initTypingEffect();
  initScrollReveals();
  initNav();
  initBackToTop();
});

/* 1. ANIMATED MONOGRAM SPLASH SCREEN LOADER (OPENING FLOW) */
function initSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  const progressEl = document.getElementById('splash-progress');
  const statusEl = document.getElementById('splash-status');
  const enterBtn = document.getElementById('splash-enter-btn');

  if (!splashScreen || !progressEl || !statusEl) return;

  let isDismissed = false;

  function dismissSplash() {
    if (isDismissed) return;
    isDismissed = true;
    splashScreen.classList.add('fade-out');
    document.body.style.overflow = 'auto';
  }

  // Dismiss ONLY when clicking the Enter Portfolio button
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissSplash();
    });
  }

  const logs = [
    { progress: 25, msg: 'Loading core system architecture...' },
    { progress: 60, msg: 'Initializing engineering modules...' },
    { progress: 85, msg: 'Preparing executive portfolio view...' },
    { progress: 100, msg: 'Welcome to Anjani Sree Harshita Kanchiraju\'s Portfolio' }
  ];

  let currentStep = 0;

  function runLoader() {
    if (isDismissed) return;

    if (currentStep < logs.length) {
      const log = logs[currentStep];
      progressEl.style.width = `${log.progress}%`;
      statusEl.textContent = log.msg;
      currentStep++;
      setTimeout(runLoader, 1000); // 1s per step (4s total)
    } else {
      if (enterBtn) {
        enterBtn.classList.add('ready');
      }
      // Hold on screen for 2.5s after 100% so full name stays visible
      setTimeout(() => {
        dismissSplash();
      }, 2500);
    }
  }

  // Prevent scroll while splash is active
  document.body.style.overflow = 'hidden';
  setTimeout(runLoader, 200);
}

/* 2. DYNAMIC PARTICLE CANVAS BACKGROUND (CYBER NODES & GRID) */
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

/* 3. HERO DYNAMIC TYPING EFFECT */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

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
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
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

/* 4. SCROLL REVEAL ANIMATIONS */
function initScrollReveals() {
  const targets = document.querySelectorAll(
    '.hero-metrics-grid, .about-grid, .skills-grid, .timeline-card, .p-card, .cred-card, .edu-lead-grid, .contact-grid'
  );

  targets.forEach(el => el.classList.add('reveal-element'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach(el => observer.observe(el));
}

/* 5. NAVIGATION HIGHLIGHTING & MOBILE MENU */
function initNav() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('#nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = '#00d8f6';
      } else if (!link.classList.contains('nav-btn')) {
        link.style.color = '';
      }
    });
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 6. BACK TO TOP BUTTON */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 7. FORM SUBMISSION WITH CLEAN EXECUTIVE RESPONSE */
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
