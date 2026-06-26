/* ════════════════════════════════════════════════════════════
   Experience orchestrator — active panel, text reveal, rail sync
   ════════════════════════════════════════════════════════════ */
(function () {
  const scroller = document.querySelector('.exp-scroll');
  const panels   = [...document.querySelectorAll('.exp-panel')];
  const dots     = [...document.querySelectorAll('.rail-dot')];
  if (!scroller || !panels.length) return;

  // reveal text + sync rail when a panel becomes dominant
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const panel = entry.target;
      const idx = panels.indexOf(panel);
      if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
        panel.classList.add('in');
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        document.body.dataset.element = panel.dataset.element || '';
      }
    });
  }, { root: scroller, threshold: [0, 0.55, 0.9] });

  panels.forEach(p => io.observe(p));

  // first panel visible immediately on load
  requestAnimationFrame(() => panels[0].classList.add('in'));

  // rail click → snap to panel
  dots.forEach((dot, i) => {
    dot.addEventListener('click', e => {
      e.preventDefault();
      panels[i].scrollIntoView({ behavior: 'smooth' });
    });
  });

  // keyboard: arrow / space navigation between panels
  let lockUntil = 0;
  window.addEventListener('keydown', e => {
    const now = Date.now();
    if (now < lockUntil) return;
    const current = panels.findIndex(p => p.classList.contains('in'));
    let target = -1;
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) target = current + 1;
    if (['ArrowUp', 'PageUp'].includes(e.key))           target = current - 1;
    if (target >= 0 && target < panels.length) {
      e.preventDefault();
      panels[target].scrollIntoView({ behavior: 'smooth' });
      lockUntil = now + 700;
    }
  });
})();
