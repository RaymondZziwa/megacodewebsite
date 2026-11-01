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
2. **Placeholders to replace:** the client testimonial on `why-us.html` (use a real, approved quote).
   Contact details in use: `+256 775 563805` (call + WhatsApp) and `support@megacodeug.com`.
3. **Photos** are linked from the design tool's hosting (`lh3.googleusercontent.com`), which may expire. Download your own
   photos into `assets/img/` and update the `src` attributes.
4. **Client logos** (home page clientele section): save them in `assets/img/clients/` as
   `prof-bio-research.png`, `fix-dental-naalya.png`, `ocare-pharmacy.png`, `ub-consulting-engineers.png`
   (transparent PNG works best). Each logo replaces its lettered badge automatically.
5. **Search engines:** `sitemap.xml` and `robots.txt` assume the site lives at `https://megacodeug.com`. If the domain
   differs, update both files and the `canonical` / `og:url` tags in each page head. After launch, submit
   `https://megacodeug.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
6. Confirm product claims (e.g. "1,200+ units", "5,200+ users") are current.

## Structure
```
website/
├── index.html, services.html, why-us.html, about.html, careers.html, contact.html
├── sitemap.xml, robots.txt
└── assets/
    ├── css/styles.css   design tokens + components (light/dark)
    ├── js/main.js       theme toggle, forms, calculators, scroll reveal
    └── img/             logo-mark.svg, logo-mark-white.svg, favicon.svg, ceo.jpeg
        └── clients/     client logos (add yours here)
```
