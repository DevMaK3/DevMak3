/**
 * DevMaK3 Main Interactive Orchestrator
 * Controls the innovative slogan entrance, custom cursor, 
 * interactive live app simulator tabs, and modal viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor
  initCustomCursor();

  // 2. Prepare Slogan Split Typography
  prepareSloganTypography();

  // 3. Trigger Innovative Slogan Intro Sequence
  runIntroSequence();

  // 4. Setup Interactive Event Listeners & Modals
  setupEventListeners();

  // 5. Setup Live App Showcase Tabs (Mímate & Arabela)
  setupAppShowcaseTabs();
});

/* =========================================================================
   1. CUSTOM CURSOR
   ========================================================================= */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Add hover effect on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .tech-pill, .slogan-word, .slogan-char, .hero-3d-logo-wrapper, .app-tab-btn');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* =========================================================================
   2. PREPARE SLOGAN SPLIT TYPOGRAPHY
   ========================================================================= */
function prepareSloganTypography() {
  const part1Words = document.querySelectorAll('.slogan-part-1 .slogan-word');
  const part2Words = document.querySelectorAll('.slogan-part-2 .slogan-word');

  [...part1Words, ...part2Words].forEach(wordEl => {
    const text = wordEl.innerText.trim();
    wordEl.innerHTML = '';
    text.split('').forEach((char, idx) => {
      const span = document.createElement('span');
      span.className = 'slogan-char';
      span.innerText = char;
      span.dataset.index = idx;
      
      // Interactive hover spark on individual character
      span.addEventListener('mouseenter', () => {
        const rect = span.getBoundingClientRect();
        if (window.devmak3Canvas) {
          window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      });

      wordEl.appendChild(span);
    });
  });
}

/* =========================================================================
   3. INNOVATIVE SLOGAN INTRO SEQUENCE
   ========================================================================= */
function runIntroSequence() {
  const bootText = document.getElementById('boot-status');
  const logoWrapper = document.querySelector('.hero-3d-logo-wrapper');
  const badgeTag = document.querySelector('.hero-slogan-section .badge-tag');
  const connector = document.querySelector('.slogan-connector');
  const techTags = document.querySelector('.floating-tech-tags');
  const actionControls = document.querySelector('.action-controls');
  const siteNav = document.querySelector('header.site-nav');

  // Initial State
  if (bootText) bootText.innerText = 'INITIALIZING DEVMAK3 CORE...';
  if (logoWrapper) {
    logoWrapper.style.opacity = '0';
    logoWrapper.style.transform = 'scale(0.7) translateY(-30px)';
    logoWrapper.style.transition = 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
  }
  if (badgeTag) {
    badgeTag.style.opacity = '0';
    badgeTag.style.transform = 'translateY(15px)';
    badgeTag.style.transition = 'all 0.6s ease';
  }

  const charsPart1 = document.querySelectorAll('.slogan-part-1 .slogan-char');
  charsPart1.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(40px) rotateX(75deg)';
    c.style.filter = 'blur(10px)';
  });

  if (connector) {
    connector.style.opacity = '0';
    connector.style.transform = 'scale(0.8)';
    connector.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  }

  const charsPart2 = document.querySelectorAll('.slogan-part-2 .slogan-char');
  charsPart2.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(50px) scale(0.6)';
    c.style.filter = 'blur(12px)';
  });

  if (techTags) {
    techTags.style.opacity = '0';
    techTags.style.transform = 'translateY(20px)';
    techTags.style.transition = 'all 0.8s ease';
  }
  if (actionControls) {
    actionControls.style.opacity = '0';
    actionControls.style.transform = 'translateY(20px)';
    actionControls.style.transition = 'all 0.8s ease';
  }
  if (siteNav) {
    siteNav.style.opacity = '0';
    siteNav.style.transform = 'translateY(-20px)';
    siteNav.style.transition = 'all 0.7s ease';
  }

  // Timeline Execution
  // Step 1: Logo enters with shockwave
  setTimeout(() => {
    if (logoWrapper) {
      logoWrapper.style.opacity = '1';
      logoWrapper.style.transform = 'scale(1) translateY(0)';
      if (window.devmak3Canvas) {
        const rect = logoWrapper.getBoundingClientRect();
        window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }
    if (bootText) bootText.innerText = 'PHASE 01 // MAKE YOUR IDEAS';
  }, 400);

  // Step 2: Badge appears
  setTimeout(() => {
    if (badgeTag) {
      badgeTag.style.opacity = '1';
      badgeTag.style.transform = 'translateY(0)';
    }
  }, 700);

  // Step 3: "MAKE YOUR IDEAS" character cascade
  setTimeout(() => {
    charsPart1.forEach((char, index) => {
      setTimeout(() => {
        char.style.transition = 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        char.style.opacity = '1';
        char.style.transform = 'translateY(0) rotateX(0deg)';
        char.style.filter = 'blur(0)';
      }, index * 35);
    });
  }, 900);

  // Step 4: Connector beam
  setTimeout(() => {
    if (connector) {
      connector.style.opacity = '1';
      connector.style.transform = 'scale(1)';
    }
    if (bootText) bootText.innerText = 'PHASE 02 // DEVELOP YOUR DREAMS';
  }, 1600);

  // Step 5: "DEVELOP YOUR DREAMS" appearance
  setTimeout(() => {
    charsPart2.forEach((char, index) => {
      setTimeout(() => {
        char.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        char.style.opacity = '1';
        char.style.transform = 'translateY(0) scale(1)';
        char.style.filter = 'blur(0)';
      }, index * 40);
    });

    const part2 = document.querySelector('.slogan-part-2');
    if (window.devmak3Canvas && part2) {
      const rect = part2.getBoundingClientRect();
      window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }, 1900);

  // Step 6: Tech tags & actions fade in
  setTimeout(() => {
    if (techTags) {
      techTags.style.opacity = '1';
      techTags.style.transform = 'translateY(0)';
    }
    if (actionControls) {
      actionControls.style.opacity = '1';
      actionControls.style.transform = 'translateY(0)';
    }
    if (siteNav) {
      siteNav.style.opacity = '1';
      siteNav.style.transform = 'translateY(0)';
    }
    if (bootText) bootText.innerText = 'DEVMAK3 LAB // READY TO BUILD';
  }, 2600);
}

/* =========================================================================
   4. EVENT LISTENERS & MODALS
   ========================================================================= */
function setupEventListeners() {
  // Particle Mode Toggle
  const btnParticleMode = document.getElementById('btn-particle-mode');
  const particleModes = ['constellation', 'flow'];
  let currentModeIdx = 0;
  if (btnParticleMode) {
    btnParticleMode.addEventListener('click', () => {
      currentModeIdx = (currentModeIdx + 1) % particleModes.length;
      const nextMode = particleModes[currentModeIdx];
      if (window.devmak3Canvas) {
        window.devmak3Canvas.setMode(nextMode);
      }
      showToast(`Modo cuántico: ${nextMode.toUpperCase()}`);
    });
  }

  // Lightbox Modal for Brand Mockups
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const zoomableImages = document.querySelectorAll('.zoomable-image');

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      if (modal && modalImg) {
        modalImg.src = img.src;
        modal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Logo 3D click trigger spark
  const heroLogo = document.querySelector('.hero-3d-logo-wrapper');
  if (heroLogo) {
    heroLogo.addEventListener('click', () => {
      const rect = heroLogo.getBoundingClientRect();
      if (window.devmak3Canvas) {
        window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  }
}

/* =========================================================================
   5. LIVE APP SHOWCASE TABS (INTERACTIVE EMBEDS)
   ========================================================================= */
function setupAppShowcaseTabs() {
  const tabMimate = document.getElementById('tab-app-mimate');
  const tabArabela = document.getElementById('tab-app-arabela');
  const iframe = document.getElementById('app-showcase-frame');
  const urlDisplay = document.getElementById('app-url-display');
  const extLink = document.getElementById('app-external-link');
  const refreshBtn = document.getElementById('app-refresh-btn');
  const frameLoader = document.getElementById('app-frame-loader');

  if (!iframe) return;

  let loaderTimeout = null;

  function hideLoader() {
    if (frameLoader) {
      frameLoader.style.opacity = '0';
      frameLoader.style.pointerEvents = 'none';
      setTimeout(() => {
        frameLoader.style.display = 'none';
      }, 300);
    }
  }

  function showLoader() {
    if (frameLoader) {
      frameLoader.style.display = 'flex';
      frameLoader.style.opacity = '1';
      frameLoader.style.pointerEvents = 'none';
      clearTimeout(loaderTimeout);
      loaderTimeout = setTimeout(hideLoader, 2000); // Guarantees it never hangs
    }
  }

  window.hideAppLoader = hideLoader;

  // Safety trigger: hide loader automatically after at most 1.5s on initial page load
  clearTimeout(loaderTimeout);
  loaderTimeout = setTimeout(hideLoader, 1500);

  iframe.addEventListener('load', hideLoader);
  iframe.addEventListener('error', hideLoader);

  const apps = {
    mimate: {
      url: '/api/preview/mimate',
      publicUrl: 'https://mimate-nails-spa.vercel.app/',
      title: 'JL Mímate Nails Spa · Pereira'
    },
    arabela: {
      url: '/api/preview/arabela',
      publicUrl: 'https://inventario-arabela-espectaculos.vercel.app/',
      title: 'Arabela Espectáculos · Control de Bodega'
    }
  };

  let currentAppKey = 'mimate';

  function switchApp(appKey) {
    const app = apps[appKey];
    if (!app) return;
    currentAppKey = appKey;

    showLoader();

    iframe.src = app.url;
    if (urlDisplay) urlDisplay.textContent = app.publicUrl;
    if (extLink) extLink.href = app.publicUrl;

    // Update Tab UI active styles
    if (tabMimate && tabArabela) {
      if (appKey === 'mimate') {
        tabMimate.classList.add('active-tab', 'border-[#00F5D4]', 'text-white', 'bg-[#01796F]/30');
        tabMimate.classList.remove('border-transparent', 'text-slate-400', 'hover:text-slate-200');

        tabArabela.classList.remove('active-tab', 'border-[#00F5D4]', 'text-white', 'bg-[#01796F]/30');
        tabArabela.classList.add('border-transparent', 'text-slate-400', 'hover:text-slate-200');
      } else {
        tabArabela.classList.add('active-tab', 'border-[#00F5D4]', 'text-white', 'bg-[#01796F]/30');
        tabArabela.classList.remove('border-transparent', 'text-slate-400', 'hover:text-slate-200');

        tabMimate.classList.remove('active-tab', 'border-[#00F5D4]', 'text-white', 'bg-[#01796F]/30');
        tabMimate.classList.add('border-transparent', 'text-slate-400', 'hover:text-slate-200');
      }
    }

    showToast(`Mostrando: ${app.title}`);
  }

  if (tabMimate) {
    tabMimate.addEventListener('click', () => switchApp('mimate'));
  }

  if (tabArabela) {
    tabArabela.addEventListener('click', () => switchApp('arabela'));
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      showLoader();
      iframe.src = iframe.src;
      showToast('Recargando aplicación...');
    });
  }

  // Also bind any CTA buttons in the cards that say "Ver en el simulador"
  const previewTriggers = document.querySelectorAll('[data-preview-app]');
  previewTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetApp = btn.getAttribute('data-preview-app');
      switchApp(targetApp);
      const showcaseSection = document.getElementById('app-interactive-sandbox');
      if (showcaseSection) {
        showcaseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* =========================================================================
   TOAST HELPER
   ========================================================================= */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
