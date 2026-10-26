/**
 * DevMaK3 Interactive Neural Particle & Constellation Background
 * High-performance, hardware-accelerated 60/120 FPS rendering engine.
 * Features batched canvas draw calls, zero shadowBlur overhead, and tab-lifecycle sleeping.
 */
class DevMak3Canvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    // Request hardware-accelerated 2D context
    try {
      this.ctx = this.canvas.getContext('2d', { alpha: true, desynchronized: true }) || this.canvas.getContext('2d');
    } catch (e) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.particles = [];
    this.sparks = [];
    this.mouse = { x: -1000, y: -1000, radius: 160, radiusSq: 25600, isDown: false };
    this.mode = 'constellation'; // 'constellation', 'flow'
    this.numParticles = 65;
    this.colors = ['#01796F', '#00F5D4', '#B0C4DE', '#6D8196'];
    this.animationFrameId = null;
    this.isRunning = false;
    this.reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    }, { passive: true });

    window.addEventListener('mousedown', () => {
      this.mouse.isDown = true;
      if (this.mouse.x > 0 && this.mouse.y > 0) {
        this.createShockwave(this.mouse.x, this.mouse.y);
      }
    }, { passive: true });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
    }, { passive: true });

    // Page Visibility API: Sleep when tab is hidden to save 100% CPU/GPU/Battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.createParticles();
    this.start();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    if (this.reducedMotion) {
      this.numParticles = 20;
    } else if (this.width < 768) {
      this.numParticles = 32;
    } else if (this.width < 1200) {
      this.numParticles = 50;
    } else {
      this.numParticles = 65;
    }

    if (this.particles.length > 0) {
      if (this.particles.length > this.numParticles) {
        this.particles.length = this.numParticles;
      } else {
        while (this.particles.length < this.numParticles) {
          this.particles.push(this.makeParticle());
        }
      }
    }
  }

  makeParticle() {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 2 + 1.2,
      baseSize: Math.random() * 2 + 1.2,
      color: color,
      alpha: Math.random() * 0.5 + 0.3,
      angle: Math.random() * Math.PI * 2
    };
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(this.makeParticle());
    }
  }

  createShockwave(x, y) {
    if (this.reducedMotion) return;
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.5,
        color: '#00F5D4',
        alpha: 1,
        life: 1
      });
    }
    if (this.sparks.length > 40) {
      this.sparks.splice(0, this.sparks.length - 40);
    }
  }

  burstSloganSparks(x, y) {
    if (this.reducedMotion) return;
    const originX = x || this.width / 2;
    const originY = y || this.height / 2;
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.sparks.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.5,
        color: i % 2 === 0 ? '#00F5D4' : '#B0C4DE',
        alpha: 1,
        life: 1
      });
    }
    if (this.sparks.length > 40) {
      this.sparks.splice(0, this.sparks.length - 40);
    }
  }

  setMode(newMode) {
    this.mode = newMode;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const len = this.particles.length;
    const mouseX = this.mouse.x;
    const mouseY = this.mouse.y;
    const radiusSq = this.mouse.radiusSq;
    const radius = this.mouse.radius;
    const isConstellation = this.mode === 'constellation';
    const isFlow = this.mode === 'flow';
    const maxLineDistSq = 120 * 120; // 14400

    // 1. Update and draw sparks (ultra-low overhead, zero shadowBlur)
    if (this.sparks.length > 0) {
      for (let s = this.sparks.length - 1; s >= 0; s--) {
        const sp = this.sparks[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.94;
        sp.vy *= 0.94;
        sp.life -= 0.035;

        if (sp.life <= 0) {
          this.sparks.splice(s, 1);
          continue;
        }

        this.ctx.beginPath();
        this.ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        this.ctx.fillStyle = sp.color;
        this.ctx.globalAlpha = Math.max(0, sp.life);
        this.ctx.fill();
      }
      this.ctx.globalAlpha = 1;
    }

    // 2. Update particle positions and apply physics
    for (let i = 0; i < len; i++) {
      const p = this.particles[i];

      if (isFlow) {
        p.x += Math.cos(p.angle) * 1.3;
        p.y += Math.sin(p.angle) * 1.3;
        p.angle += 0.008;
      } else {
        p.x += p.vx;
        p.y += p.vy;
      }

      // Wrap around edges
      if (p.x < 0) p.x = this.width;
      else if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      else if (p.y > this.height) p.y = 0;

      // Mouse repulsion
      if (mouseX > -500) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dSq = dx * dx + dy * dy;

        if (dSq < radiusSq && dSq > 0) {
          const dist = Math.sqrt(dSq);
          const force = (1 - dist / radius) * 2.5;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
        }
      }
    }

    // 3. BATCHED Constellation Lines (Single draw call instead of hundreds!)
    if (isConstellation) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(1, 121, 111, 0.18)';
      this.ctx.lineWidth = 0.75;

      for (let i = 0; i < len; i++) {
        const p1 = this.particles[i];
        for (let j = i + 1; j < len; j++) {
          const p2 = this.particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < maxLineDistSq) {
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      this.ctx.stroke();
    }

    // 4. BATCHED Mouse Connection Lines (Single draw call)
    if (mouseX > -500 && isConstellation) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(0, 245, 212, 0.32)';
      this.ctx.lineWidth = 0.9;

      for (let i = 0; i < len; i++) {
        const p = this.particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dSq = dx * dx + dy * dy;

        if (dSq < radiusSq) {
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(mouseX, mouseY);
        }
      }
      this.ctx.stroke();
    }

    // 5. Draw particles grouped by color (Drastically reduces canvas state changes)
    for (let c = 0; c < this.colors.length; c++) {
      const color = this.colors[c];
      this.ctx.beginPath();
      this.ctx.fillStyle = color;

      for (let i = 0; i < len; i++) {
        const p = this.particles[i];
        if (p.color === color) {
          this.ctx.moveTo(p.x + p.size, p.y);
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
      }
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.devmak3Canvas = new DevMak3Canvas('bg-canvas');
});
