/**
 * DevMaK3 Main Interactive Orchestrator
 * Controls the innovative slogan entrance, audio cues, custom cursor, 
 * interactive console, brand color clipboard and modal viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor
  initCustomCursor();

  // 2. Prepare Slogan Split Typography
  prepareSloganTypography();

  // 3. Trigger Innovative Slogan Intro Sequence
  runIntroSequence();

  // 4. Setup Interactive Event Listeners
  setupEventListeners();

  // 5. Setup Innovation Lab Terminal
  setupInnovationTerminal();
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
  const hoverables = document.querySelectorAll('a, button, input, .tech-pill, .brand-swatch, .slogan-word, .slogan-char, .hero-3d-logo-wrapper');
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
      span.addEventListener('mouseenter', (e) => {
        const rect = span.getBoundingClientRect();
        if (window.devmak3Canvas) {
          window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        if (window.devmak3Audio) {
          window.devmak3Audio.playLaserChime();
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
  const part1 = document.querySelector('.slogan-part-1');
  const connector = document.querySelector('.slogan-connector');
  const part2 = document.querySelector('.slogan-part-2');
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
      if (window.devmak3Audio) {
        window.devmak3Audio.playClick();
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

  // Step 5: "DEVELOP YOUR DREAMS" grandiose appearance with iridescent flare
  setTimeout(() => {
    charsPart2.forEach((char, index) => {
      setTimeout(() => {
        char.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        char.style.opacity = '1';
        char.style.transform = 'translateY(0) scale(1)';
        char.style.filter = 'blur(0)';
      }, index * 40);
    });

    if (window.devmak3Canvas) {
      const rect = part2.getBoundingClientRect();
      window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    if (window.devmak3Audio) {
      window.devmak3Audio.playIntroChime();
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
   4. EVENT LISTENERS & INTERACTIVITY
   ========================================================================= */
function setupEventListeners() {
  // Audio Toggle Button
  const btnAudio = document.getElementById('btn-toggle-audio');
  const audioText = document.getElementById('audio-text');
  if (btnAudio) {
    btnAudio.addEventListener('click', () => {
      if (window.devmak3Audio) {
        const isNowActive = window.devmak3Audio.toggleSound();
        if (audioText) {
          audioText.innerText = isNowActive ? 'SONIDO: ON' : 'SONIDO: OFF';
        }
        btnAudio.style.borderColor = isNowActive ? 'var(--color-teal-glow)' : 'rgba(176, 196, 222, 0.2)';
        showToast(isNowActive ? 'Ambiente sonoro futurista activado' : 'Audio silenciado');
      }
    });
  }

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
      if (window.devmak3Audio) window.devmak3Audio.playClick();
      showToast(`Modo cuántico: ${nextMode.toUpperCase()}`);
    });
  }

  // Brand Color Copy-to-Clipboard
  const swatches = document.querySelectorAll('.brand-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.dataset.color;
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Color ${hex} copiado al portapapeles`);
          if (window.devmak3Audio) window.devmak3Audio.playClick();
        });
      }
    });
  });

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
        if (window.devmak3Audio) window.devmak3Audio.playClick();
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
      if (window.devmak3Audio) {
        window.devmak3Audio.playIntroChime();
      }
    });
  }
}

/* =========================================================================
   5. INNOVATION LAB TERMINAL ("IDEA TO DREAM")
   ========================================================================= */
function setupInnovationTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const btnRunTransform = document.getElementById('btn-run-transform');

  if (!terminalInput || !terminalOutput) return;

  const sampleIdeas = [
    'Plataforma SaaS para conectar diseñadores e ingenieros de software',
    'Aplicación de Inteligencia Artificial para automatizar finanzas en startups',
    'Ecosistema web descentralizado de alta velocidad para creadores',
    'Dashboard inteligente de análisis de datos para incubadoras de innovación'
  ];

  let sampleIdx = 0;
  terminalInput.placeholder = sampleIdeas[0];

  terminalInput.addEventListener('focus', () => {
    if (!terminalInput.value) {
      terminalInput.value = sampleIdeas[sampleIdx];
      sampleIdx = (sampleIdx + 1) % sampleIdeas.length;
    }
  });

  function processIdea() {
    const idea = terminalInput.value.trim() || terminalInput.placeholder;
    if (window.devmak3Audio) window.devmak3Audio.playLaserChime();

    terminalOutput.innerHTML = `<span style="color: #00F5D4;">> Compilando idea con el motor DevMaK3...</span>\n`;

    const blueprint = [
      `[DEVMAK3 ARCHITECT] Idea recibida: "${idea}"`,
      `[01 // MAKE YOUR IDEAS] Analizando arquitectura, user flow y viabilidad tecnológica...`,
      `[02 // INGENIERÍA] Stack sugerido: TypeScript + Next.js + Three.js + Cloud Native Microservices`,
      `[03 // AI CORE] Modelo de lenguaje & pipeline de datos acoplado con latencia <50ms`,
      `[04 // IDENTITY] Sistema de diseño UI/UX basado en Deep Teal (#01796F) y Steel Blue (#B0C4DE)`,
      `[05 // DEVELOP YOUR DREAMS] Blueprint completado. ¡Tu idea ahora es un producto real listo para despegar!`
    ];

    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < blueprint.length) {
        terminalOutput.innerHTML += `\n${blueprint[lineIdx]}`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        if (window.devmak3Audio) window.devmak3Audio.playClick();
        lineIdx++;
      } else {
        clearInterval(interval);
        if (window.devmak3Canvas) {
          const rect = terminalOutput.getBoundingClientRect();
          window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }
    }, 450);
  }

  if (btnRunTransform) {
    btnRunTransform.addEventListener('click', processIdea);
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      processIdea();
    }
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
