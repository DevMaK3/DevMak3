/**
 * DevMaK3 Interactive Neural Particle & Constellation Background
 * Inspired by ILAB Creative Studio interactive fluid & UPTEC technological architecture.
 */
class DevMak3Canvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, radius: 180, isDown: false };
    this.mode = 'constellation'; // 'constellation', 'flow', 'warp'
    this.numParticles = 110;
    this.colors = ['#01796F', '#00F5D4', '#B0C4DE', '#6D8196'];
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
    window.addEventListener('mousedown', () => {
      this.mouse.isDown = true;
      this.createShockwave(this.mouse.x, this.mouse.y);
    });
    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
    });

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    if (this.width < 768) {
      this.numParticles = 50;
    } else {
      this.numParticles = 110;
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        size: Math.random() * 2.5 + 1.2,
        baseSize: Math.random() * 2.5 + 1.2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  createShockwave(x, y) {
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        baseSize: Math.random() * 3 + 2,
        color: '#00F5D4',
        alpha: 1,
        isSpark: true,
        life: 1
      });
    }
  }

  burstSloganSparks(x, y) {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      this.particles.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        baseSize: 3,
        color: i % 2 === 0 ? '#00F5D4' : '#B0C4DE',
        alpha: 1,
        isSpark: true,
        life: 1.2
      });
    }
  }

  setMode(newMode) {
    this.mode = newMode;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Spark handling
      if (p.isSpark) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= 0.025;
        p.alpha = Math.max(0, p.life);

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = p.color;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          i--;
        }
        continue;
      }

      // Movement based on mode
      if (this.mode === 'flow') {
        p.x += Math.cos(p.angle) * 1.5;
        p.y += Math.sin(p.angle) * 1.5;
        p.angle += 0.01;
      } else {
        p.x += p.vx;
        p.y += p.vy;
      }

      // Edge wrap
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Mouse interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (1 - dist / this.mouse.radius) * 3;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force;
        p.y -= Math.sin(angle) * force;
        p.size = p.baseSize * (1 + force * 0.4);
      } else {
        p.size = p.baseSize;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;

      // Connect lines in constellation mode
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        if (p2.isSpark) continue;
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        const maxDist = 130;

        if (dist2 < maxDist) {
          const lineAlpha = (1 - dist2 / maxDist) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = '#01796F';
          this.ctx.globalAlpha = lineAlpha;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
          this.ctx.globalAlpha = 1;
        }
      }

      // Connect to mouse
      if (dist < this.mouse.radius) {
        const mouseLineAlpha = (1 - dist / this.mouse.radius) * 0.45;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = '#00F5D4';
        this.ctx.globalAlpha = mouseLineAlpha;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.devmak3Canvas = new DevMak3Canvas('bg-canvas');
});
