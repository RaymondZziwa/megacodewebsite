# MEGA CODE — Company Website

Static, responsive website built from the designs in `../designs` (Precision Engineering Canvas design system).
No build step or framework — open `index.html` in a browser, or upload the whole `website` folder to any static host
(Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Pages
| File | Page |
|---|---|
| `index.html` | Home / overview (products, custom software, studio + inquiry form) |
| `services.html` | Services (4 modules, engagement model, scope estimator) |
| `why-us.html` | Why Choose Us (5 pillars, comparison table, readiness calculator) |
| `about.html` | Who We Are (CEO message, values, Kampala hub) |
| `careers.html` | Careers (culture, open roles, application form) |
| `contact.html` | Contact (channels, office, project brief form, FAQ) |

## Light & dark theme
- First visit follows the visitor's system setting; the sun/moon button in the header switches theme and the choice is remembered.
- All colours are CSS variables at the top of `assets/css/styles.css` (light block, then dark block). Change them there.

## Before going live
1. **Forms** currently show a success message only — nothing is sent. Point each `<form>` at a form service
   (e.g. Formspree / Netlify Forms / your own endpoint) by adding `action="..." method="POST"` and removing `data-success`.
2. **Placeholders to replace:** phone `+256 700 000000` / WhatsApp link `wa.me/256700000000`, the CEO portrait
   (`about.html`, see the comment in the Executive Desk section), and the client testimonial on `why-us.html`
   (use a real, approved quote).
3. **Photos** are linked from the design tool's hosting (`lh3.googleusercontent.com`), which may expire. Download your own
   photos into `assets/img/` and update the `src` attributes.
4. Confirm product claims (e.g. "1,200+ units", "5,200+ users") are current.

## Structure
```
website/
├── index.html, services.html, why-us.html, about.html, careers.html, contact.html
└── assets/
    ├── css/styles.css   design tokens + components (light/dark)
    ├── js/main.js       theme toggle, forms, calculators, scroll reveal
    └── img/             logo-mark.svg, logo-mark-white.svg, favicon.svg
```
