# Fluenta Digital

> A single-screen, immersive portfolio experience for **Fluenta Digital** — a digital studio based in Palangkaraya, Indonesia, building websites, mobile apps, and automation systems.

The site is intentionally **not** a project catalogue. The website _is_ the portfolio — the experience a visitor has on arrival is the proof of work. *Show, don't tell.*

🔗 **Live:** _coming soon (Vercel)_

---

## ✨ Highlights

- **Single-screen experience** — no vertical page scroll. Each scroll gesture morphs the screen into the next scene in place.
- **Four narrative scenes** — Brand intro → Branding → Web/Apps/Automation → Contact, each with its own visual identity and accent colour.
- **Siri-style living orb** on the opening screen, with breathing **blue edge lighting** around the viewport (like a smartphone notification edge).
- **Custom cursor** (dot + lagging ring), aurora blobs, film grain, scanlines, and a vignette for a cinematic, premium feel.
- **Bilingual** — instant **ID ⇄ EN** switch, preference saved to `localStorage`.
- **Quick contact shortcut** — email & WhatsApp icons always within reach.
- **SEO-ready** — meta description, Open Graph, Twitter Card, JSON-LD structured data, and an inline SVG favicon.
- **Accessible & resilient** — keyboard navigation, `prefers-reduced-motion` support, and a custom-cursor fallback so the native cursor never disappears if JS is unavailable.

## 🛠️ Tech

Built with **zero dependencies and no build step** — just the platform:

- Semantic HTML5
- Modern CSS (custom properties, `clip-path` transitions, `backdrop-filter`)
- Vanilla JavaScript (Canvas 2D, `IntersectionObserver`, `requestAnimationFrame`)
- Google Fonts: Space Grotesk + Inter

Everything lives in a single self-contained `index.html` for instant, dependency-free deployment.

## 🚀 Getting started

No tooling required. Clone and open in a browser:

```bash
git clone https://github.com/presley03/website-fluenta-digital.git
cd website-fluenta-digital
```

Then open `index.html` directly, or serve it locally:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Visit `http://localhost:8000`.

## ☁️ Deployment

Deployed as a static site on **Vercel** — no configuration needed:

1. Import the repository at [vercel.com](https://vercel.com).
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Deploy. Every push to `main` triggers an automatic redeploy.

## 📁 Structure

```
.
├── index.html      # The entire experience (HTML + CSS + JS, self-contained)
└── assets/         # Legacy component files from an earlier iteration (kept for reference)
```

## 📬 Contact

**Fluenta Digital** — Palangkaraya, Indonesia

- Email: presleyfelly@gmail.com
- WhatsApp: +62 813 4926 2959

---

<sub>Designed & built with care. © 2024 Fluenta Digital.</sub>
