/* ════════════════════════════════════════════════════════════
   FIRE — faint drifting light dust (dark, quiet, luxe)
   Suggestion of warmth, not literal flames.
   ════════════════════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, dpr, motes = [], running = true, last = 0;

  // warm but desaturated — accent only
  const COLORS = [
    [255, 150, 90],
    [255, 180, 120],
    [230, 210, 190],
  ];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function makeMote(initial) {
    const c = COLORS[(Math.random() * COLORS.length) | 0];
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : H + Math.random() * 30,
      r: Math.random() * 1.2 + 0.4,          // tiny
      vy: -(Math.random() * 8 + 4),          // very slow rise
      drift: (Math.random() - 0.5) * 8,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.6 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      twSpeed: Math.random() * 1.5 + 0.8,
      baseA: Math.random() * 0.35 + 0.12,    // faint
      col: c,
    };
  }

  function seed() {
    // sparse: spread evenly, low density
    const count = Math.max(26, Math.round((W * H) / 70000));
    motes = [];
    for (let i = 0; i < count; i++) motes.push(makeMote(true));
  }

  function frame(now) {
    if (!running) { last = now; requestAnimationFrame(frame); return; }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    // clean clear — no smear
    ctx.clearRect(0, 0, W, H);

    ctx.globalCompositeOperation = 'lighter';

    for (const m of motes) {
      m.phase   += m.freq * dt;
      m.twinkle += m.twSpeed * dt;
      m.y += m.vy * dt;
      m.x += Math.sin(m.phase) * m.drift * dt;

      if (m.y < -8) { Object.assign(m, makeMote(false)); continue; }

      // gentle vertical fade so nothing crowds top or bottom
      const edgeFade = Math.min(1, m.y / 80) * Math.min(1, (H - m.y) / 120);
      const twinkle  = 0.6 + Math.sin(m.twinkle) * 0.4;
      const a = m.baseA * twinkle * edgeFade;
      if (a <= 0.01) continue;

      const [r, g, b] = m.col;
      const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 6);
      glow.addColorStop(0, `rgba(${r},${g},${b},${a})`);
      glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.9, a + 0.15)})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }

  const panel = document.getElementById('fire');
  if (panel && 'IntersectionObserver' in window) {
    new IntersectionObserver(es => {
      es.forEach(e => { running = e.isIntersecting; });
    }, { threshold: 0.15 }).observe(panel);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
})();
