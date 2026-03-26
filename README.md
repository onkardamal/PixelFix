# NCES EduLocator Redesign

A complete front-end redesign of the NCES Global Locator experience using only **HTML, CSS, and Vanilla JavaScript**.

This project focuses on:
- modern UI/UX
- official government visual tone (USWDS-inspired)
- interactive search and filtering
- clean code structure for judging and maintainability

---

## Project Goals

- Redesign the original NCES Global Locator interface
- Keep it fully front-end (no backend/CMS/frameworks)
- Improve usability, accessibility, and visual design
- Make it deployment-ready for static hosting

---

## Tech Stack

- **HTML5**
- **CSS3** (custom properties, grid/flex, responsive layout)
- **Vanilla JavaScript (ES6+)**
- **Font Awesome 6** (CDN icons)
- **Google Fonts** (`Merriweather`, `Public Sans`)

No React, Angular, Vue, or backend dependencies are used.

---

## Features

- Official-style gov header and visual hierarchy
- Real-time search and filtering
- Autocomplete for institution name
- Browse by state (interactive cartogram)
- Type tabs (All / College / Public / Private)
- Grid, list, and table views
- Side-by-side institution comparison
- Recent searches (`localStorage`)
- CSV export of visible results
- Keyboard shortcuts help modal
- Print-friendly result view
- Sticky filters + smooth pagination
- Responsive desktop-focused layout
- Accessibility enhancements (ARIA labels, dialog semantics, keyboard support)

---

## Project Structure

```text
PixelFix/
├── index.html
├── styles.css
├── script.js
├── favicon.svg
├── site.webmanifest
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Run Locally

### Option 1: Python HTTP server

```bash
python -m http.server 5500
```

Then open:

`http://localhost:5500`

### Option 2: VS Code Live Server

- Open folder in VS Code / Cursor
- Right-click `index.html`
- Choose **Open with Live Server**

---

## Deployment

This is a static front-end app. You can deploy to:
- GitHub Pages
- Netlify
- Vercel (static)
- Firebase Hosting
- Any static web server

---

## Pre-Launch Checklist

Before going live, update placeholder production URLs in:

1. `index.html`
   - `canonical` link
   - Open Graph `og:url`, `og:image`
   - Twitter `twitter:image`
   - JSON-LD `url`

2. `robots.txt`
   - sitemap URL

3. `sitemap.xml`
   - `<loc>` URL

Also ensure `og-image.png` exists at your production URL.

---

## Accessibility Notes

- Uses ARIA roles/labels for interactive regions
- Modal dialogs are keyboard-dismissible (`Esc`)
- Search shortcut: `/`
- Keyboard help shortcut: `?`
- Focus and state indicators included for controls

---

## Credits

- NCES reference: [https://nces.ed.gov/globallocator/](https://nces.ed.gov/globallocator/)
- USWDS inspiration: [https://designsystem.digital.gov/](https://designsystem.digital.gov/)
- Fonts: Google Fonts (`Merriweather`, `Public Sans`)
- Icons: Font Awesome Free

---

## Disclaimer

This project is a **design/development redesign submission** and demonstration build.
It is **not an official NCES government publication**.

