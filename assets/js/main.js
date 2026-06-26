// ── Smooth scroll ────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Navbar shrink on scroll ───────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Hero canvas — aurora + grain ─────────────────────────────────
(function () {
  const cv = document.getElementById('hero-canvas');
  if (!cv) return;
  const cx = cv.getContext('2d');
  let W, H, t = 0, last = 0;

  const orbs = [
    { x: .08, y: .4,  r: .6,  col: '18,10,65',  spd: .0005, ox: .12, oy: .08 },
    { x: .85, y: .55, r: .55, col: '0,40,28',   spd: .0007, ox: .06, oy: .10 },
    { x: .45, y: .02, r: .45, col: '40,6,44',   spd: .0004, ox: .14, oy: .05 },
  ];

  let streaks = [];

  function resize() {
    W = cv.offsetWidth; H = cv.offsetHeight;
    cv.width = W; cv.height = H;
    streaks = [];
    const cols = Math.ceil(W / 40) + 1;
    for (let i = 0; i < cols; i++) {
      streaks.push({ x: i * 40, y: -Math.random() * H,
        speed: 30 + Math.random() * 60,
        op: Math.random() * .04 + .01,
        len: 40 + Math.random() * 90 });
    }
  }
  resize();
  window.addEventListener('resize', resize);

  function draw(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now;
    cx.clearRect(0, 0, W, H);
    cx.fillStyle = '#030305'; cx.fillRect(0, 0, W, H);

    orbs.forEach(o => {
      const px = (o.x + Math.sin(t * o.spd) * o.ox) * W;
      const py = (o.y + Math.cos(t * o.spd * 1.3) * o.oy) * H;
      const r  = Math.min(W, H) * o.r;
      const g  = cx.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, `rgba(${o.col},.18)`);
      g.addColorStop(1, `rgba(${o.col},0)`);
      cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    });

    for (let y = 0; y < H; y += 2) {
      cx.fillStyle = 'rgba(0,0,0,.05)'; cx.fillRect(0, y, W, 1);
    }

    streaks.forEach(l => {
      l.y += l.speed * dt;
      if (l.y > H + l.len) { l.y = -l.len; l.op = Math.random() * .04 + .01; l.speed = 30 + Math.random() * 60; }
      const g = cx.createLinearGradient(0, l.y - l.len, 0, l.y);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(1, `rgba(255,255,255,${l.op})`);
      cx.fillStyle = g; cx.fillRect(l.x - .5, l.y - l.len, 1, l.len);
    });

    const id = cx.getImageData(0, 0, W, H);
    const d = id.data;
    for (let i = 0; i < d.length; i += 16) { const n = (Math.random() - .5) * 12; d[i] += n; d[i+1] += n; d[i+2] += n; }
    cx.putImageData(id, 0, 0);

    t += dt; requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ── Intersection Observer fade-in ────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('section').forEach(s => io.observe(s));

// ── Count-up animation untuk stats ───────────────────────────────
(function () {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;

  const animate = el => {
    const target = parseInt(el.dataset.count, 10);
    const plus = el.querySelector('.stat-plus');
    const plusHTML = plus ? plus.outerHTML : '';
    const dur = 1400;
    const start = performance.now();

    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.innerHTML = Math.round(target * eased) + plusHTML;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: .6 });

  nums.forEach(n => statIO.observe(n));
})();
