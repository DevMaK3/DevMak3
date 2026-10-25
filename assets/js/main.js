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

  // 5. Initialize Custom Cyberpunk Service Select Dropdown
  initCustomServiceSelect();

  // 6. Initialize Mobile Navigation Menu
  initMobileNav();
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

  // Initial State - Snappy & Immediate
  if (bootText) bootText.innerText = 'INITIALIZING DEVMAK3 CORE...';
  if (logoWrapper) {
    logoWrapper.style.opacity = '0';
    logoWrapper.style.transform = 'scale(0.85) translateY(-15px)';
    logoWrapper.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }
  if (badgeTag) {
    badgeTag.style.opacity = '0';
    badgeTag.style.transform = 'translateY(10px)';
    badgeTag.style.transition = 'all 0.4s ease';
  }

  const charsPart1 = document.querySelectorAll('.slogan-part-1 .slogan-char');
  charsPart1.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(25px) rotateX(45deg)';
    c.style.filter = 'blur(6px)';
  });

  if (connector) {
    connector.style.opacity = '0';
    connector.style.transform = 'scale(0.85)';
    connector.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  }

  const charsPart2 = document.querySelectorAll('.slogan-part-2 .slogan-char');
  charsPart2.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(25px) scale(0.8)';
    c.style.filter = 'blur(6px)';
  });

  if (techTags) {
    techTags.style.opacity = '0';
    techTags.style.transform = 'translateY(10px)';
    techTags.style.transition = 'all 0.4s ease';
  }
  if (actionControls) {
    actionControls.style.opacity = '0';
    actionControls.style.transform = 'translateY(10px)';
    actionControls.style.transition = 'all 0.4s ease';
  }

  // Fast & Fluid Timeline Execution (< 900ms total for responsive instant feel)
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
  }, 80);

  // Step 2: Badge appears & Hero Actions render
  setTimeout(() => {
    if (badgeTag) {
      badgeTag.style.opacity = '1';
      badgeTag.style.transform = 'translateY(0)';
    }
    if (techTags) {
      techTags.style.opacity = '1';
      techTags.style.transform = 'translateY(0)';
    }
    if (actionControls) {
      actionControls.style.opacity = '1';
      actionControls.style.transform = 'translateY(0)';
    }
  }, 180);

  // Step 3: "MAKE YOUR IDEAS" character cascade
  setTimeout(() => {
    charsPart1.forEach((char, index) => {
      setTimeout(() => {
        char.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        char.style.opacity = '1';
        char.style.transform = 'translateY(0) rotateX(0deg)';
        char.style.filter = 'blur(0)';
        setTimeout(() => {
          char.style.filter = '';
          char.style.transform = '';
          char.style.transition = '';
        }, 300);
      }, index * 16);
    });
  }, 260);

  // Step 4: Connector beam
  setTimeout(() => {
    if (connector) {
      connector.style.opacity = '1';
      connector.style.transform = 'scale(1)';
    }
    if (bootText) bootText.innerText = 'PHASE 02 // DEVELOP YOUR DREAMS';
  }, 480);

  // Step 5: "DEVELOP YOUR DREAMS" appearance
  setTimeout(() => {
    charsPart2.forEach((char, index) => {
      setTimeout(() => {
        char.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        char.style.opacity = '1';
        char.style.transform = 'translateY(0) scale(1)';
        char.style.filter = 'blur(0)';
        setTimeout(() => {
          char.style.filter = '';
          char.style.transform = '';
          char.style.transition = '';
          char.style.opacity = '1';
        }, 350);
      }, index * 18);
    });

    const part2 = document.querySelector('.slogan-part-2');
    if (window.devmak3Canvas && part2) {
      const rect = part2.getBoundingClientRect();
      window.devmak3Canvas.burstSloganSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }, 620);

  // Step 6: Ready state
  setTimeout(() => {
    if (bootText) bootText.innerText = 'DEVMAK3 LAB // READY TO BUILD';
  }, 850);
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

/* =========================================================================
   CUSTOM CYBERPUNK SERVICE SELECT DROPDOWN
   ========================================================================= */
function initCustomServiceSelect() {
  const wrapper = document.getElementById('custom-service-select');
  if (!wrapper) return;

  const trigger = document.getElementById('select-trigger');
  const dropdown = document.getElementById('select-dropdown');
  const nativeSelect = document.getElementById('native-service-select');
  const labelEl = document.getElementById('selected-service-label');
  const iconWrap = document.getElementById('selected-service-icon-wrap');
  const options = wrapper.querySelectorAll('.select-option');
  const form = document.getElementById('contact-form');

  if (!trigger || !dropdown) return;

  const defaultText = 'Desarrollo Web & Posicionamiento SEO';
  const defaultIcon = 'globe';

  function openDropdown() {
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    dropdown.classList.add('open');
  }

  function closeDropdown() {
    trigger.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('open');
  }

  function toggleDropdown() {
    if (dropdown.classList.contains('open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function selectOption(opt) {
    const val = opt.getAttribute('data-value') || '';
    const title = opt.getAttribute('data-title') || opt.querySelector('.font-medium')?.innerText?.trim() || opt.innerText.trim();
    const iconName = opt.getAttribute('data-icon') || defaultIcon;

    // 1. Sync hidden native select for form submission & Supabase
    if (nativeSelect) {
      nativeSelect.value = val;
      nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // 2. Update UI trigger label and icon
    if (labelEl) {
      labelEl.innerText = title;
      labelEl.classList.add('text-white');
    }

    if (iconWrap) {
      iconWrap.innerHTML = `<i data-lucide="${iconName}" class="w-3.5 h-3.5" id="selected-service-icon"></i>`;
    }

    // 3. Mark selected option visually
    options.forEach(o => {
      if (o === opt) {
        o.classList.add('selected');
        o.setAttribute('aria-selected', 'true');
      } else {
        o.classList.remove('selected');
        o.setAttribute('aria-selected', 'false');
      }
    });

    // 4. Re-render Lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // 5. Close dropdown and return focus
    closeDropdown();
    trigger.focus();
  }

  // Toggle dropdown on trigger click
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDropdown();
  });

  // Option selection handlers
  options.forEach(opt => {
    opt.setAttribute('tabindex', '0');

    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      selectOption(opt);
    });

    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(opt);
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      closeDropdown();
    }
  });

  // Keyboard navigation: Escape key closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown.classList.contains('open')) {
      closeDropdown();
      trigger.focus();
    }
  });

  // Handle form reset to restore initial state
  if (form) {
    form.addEventListener('reset', () => {
      setTimeout(() => {
        if (labelEl) {
          labelEl.innerText = defaultText;
        }
        if (iconWrap) {
          iconWrap.innerHTML = `<i data-lucide="${defaultIcon}" class="w-3.5 h-3.5" id="selected-service-icon"></i>`;
        }
        options.forEach(o => {
          if (o.getAttribute('data-value') === 'desarrollo-web') {
            o.classList.add('selected');
            o.setAttribute('aria-selected', 'true');
          } else {
            o.classList.remove('selected');
            o.setAttribute('aria-selected', 'false');
          }
        });
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      }, 10);
    });
  }
}

/* =========================================================================
   6. MOBILE NAVIGATION DRAWER CONTROLLER
   ========================================================================= */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const barsIcon = document.getElementById('menu-icon-bars');
  const closeIcon = document.getElementById('menu-icon-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  if (!toggleBtn || !drawer) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    drawer.classList.remove('opacity-0', 'pointer-events-none');
    drawer.classList.add('opacity-100', 'pointer-events-auto');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (barsIcon && closeIcon) {
      barsIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  }

  function closeMenu() {
    isOpen = false;
    drawer.classList.add('opacity-0', 'pointer-events-none');
    drawer.classList.remove('opacity-100', 'pointer-events-auto');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (barsIcon && closeIcon) {
      barsIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking any nav link inside drawer
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Automatically close if viewport expands to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && isOpen) {
      closeMenu();
    }
  });
}
