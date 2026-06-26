(function () {
  const canvas = document.getElementById('skills-canvas');
  if (!canvas) return;
  const cx = canvas.getContext('2d');

  let W, H, t = 0, last = 0;

  const orbs = [
    { x: .12, y: .25, r: .55, col: '22,14,72',  spd: .0006, ox: .10, oy: .08 },
    { x: .80, y: .65, r: .50, col: '0,48,32',   spd: .0008, ox: .07, oy: .10 },
    { x: .50, y: .05, r: .42, col: '50,8,52',   spd: .0005, ox: .13, oy: .06 },
  ];

  let streaks = [];

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
    streaks = [];
    const cols = Math.ceil(W / 36) + 1;
    for (let i = 0; i < cols; i++) {
      streaks.push({
        x:     i * 36,
        y:    -Math.random() * H,
        speed: 35 + Math.random() * 70,
        op:    Math.random() * .05 + .015,
        len:   50 + Math.random() * 100,
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);

  function draw(now) {
    const dt = Math.min((now - last) / 1000, .05);
    last = now;

    cx.clearRect(0, 0, W, H);
    cx.fillStyle = '#030305';
    cx.fillRect(0, 0, W, H);

    /* aurora blobs */
    orbs.forEach(o => {
      const px = (o.x + Math.sin(t * o.spd) * o.ox) * W;
      const py = (o.y + Math.cos(t * o.spd * 1.3) * o.oy) * H;
      const r  = Math.min(W, H) * o.r;
      const g  = cx.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, `rgba(${o.col},.20)`);
      g.addColorStop(1, `rgba(${o.col},0)`);
      cx.fillStyle = g;
      cx.fillRect(0, 0, W, H);
    });

    /* scanlines */
    for (let y = 0; y < H; y += 2) {
      cx.fillStyle = 'rgba(0,0,0,.06)';
      cx.fillRect(0, y, W, 1);
    }

    /* falling streaks */
    streaks.forEach(l => {
      l.y += l.speed * dt;
      if (l.y > H + l.len) {
        l.y  = -l.len;
        l.op = Math.random() * .05 + .015;
        l.speed = 35 + Math.random() * 70;
      }
      const g = cx.createLinearGradient(0, l.y - l.len, 0, l.y);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(1, `rgba(255,255,255,${l.op})`);
      cx.fillStyle = g;
      cx.fillRect(l.x - .5, l.y - l.len, 1, l.len);
    });

    /* grain — sample setiap 16 px biar ringan */
    const id = cx.getImageData(0, 0, W, H);
    const d  = id.data;
    for (let i = 0; i < d.length; i += 16) {
      const n = (Math.random() - .5) * 14;
      d[i]   += n;
      d[i+1] += n;
      d[i+2] += n;
    }
    cx.putImageData(id, 0, 0);

    t += dt;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
