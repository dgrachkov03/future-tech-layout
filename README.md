# FutureTech

![FutureTech Preview](preview.jpg)

A responsive multi-page website for an AI news and resources platform. Built with semantic HTML5, SCSS, and vanilla JavaScript following BEM methodology and WCAG accessibility guidelines.

**Live Demo**: https://dgrachkov03.github.io/future-tech-layout/

**Figma Design**: https://www.figma.com/design/YzTDRV7OaSoeCUBNYaoCZV/FutureTech

---

## Pages

- `index.html` — Homepage with hero section, features, blog preview, resources, reviews
- `news.html` — News feed with category tabs
- `podcasts.html` — Podcast catalog with video player
- `resources.html` — Downloadable ebooks, whitepapers, and reports
- `blog.html` — Blog article detail page
- `contacts.html` — Contact form and FAQ accordion

---

## Tech Stack

- HTML5 — semantic markup, ARIA attributes
- SCSS — BEM methodology, CSS custom properties, fluid typography
- JavaScript ES6+ — class-based components, ES modules
- intl-tel-input 25.3.1 — international phone number input

---

## SCSS Setup via npm

The project uses Dart Sass through `package.json` scripts.

1. Install dependencies:

```bash
npm install
```

2. Build minified CSS once:

```bash
npm run build:css
```

3. Watch SCSS files during development:

```bash
npm run watch:css
```

The entry point is `styles/main.scss`, output file is `styles/main.min.css`.

---

## Project Structure

```
future-tech/
├── assets/
│   ├── fonts/
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-Medium.woff2
│   │   ├── Inter-SemiBold.woff2
│   │   ├── Inter-Bold.woff2
│   │   ├── KumbhSans-Regular.woff2
│   │   └── KumbhSans-Medium.woff2
│   ├── images/
│   └── videos/
├── scripts/
│   ├── utils/
│   │   ├── defineScrollBarWidthCSSVar.js
│   │   └── pxToRem.js
│   ├── BaseComponent.js
│   ├── Header.js
│   ├── Tabs.js
│   ├── VideoPlayer.js
│   ├── ExpandableContent.js
│   ├── PhoneInput.js
│   └── main.js
├── styles/
│   ├── helpers/
│   │   ├── index.scss
│   │   ├── functions.scss
│   │   ├── media.scss
│   │   └── mixins.scss
│   ├── blocks/
│   │   ├── accordion.scss
│   │   ├── advantage-card.scss
│   │   ├── about.scss
│   │   ├── about-card.scss
│   │   ├── badge.scss
│   │   ├── blog-actions.scss
│   │   ├── blog-card.scss
│   │   ├── blog-details.scss
│   │   ├── bordered-grid.scss
│   │   ├── burger-button.scss
│   │   ├── button.scss
│   │   ├── card.scss
│   │   ├── checkbox.scss
│   │   ├── contacts.scss
│   │   ├── contacts-card.scss
│   │   ├── download-info.scss
│   │   ├── expandable-content.scss
│   │   ├── feedback-form.scss
│   │   ├── field.scss
│   │   ├── footer.scss
│   │   ├── header.scss
│   │   ├── hero.scss
│   │   ├── hero-alt.scss
│   │   ├── icon.scss
│   │   ├── intl-tel-input.scss
│   │   ├── list.scss
│   │   ├── logo.scss
│   │   ├── metrics.scss
│   │   ├── news.scss
│   │   ├── news-card.scss
│   │   ├── person-card.scss
│   │   ├── promo.scss
│   │   ├── rating-view.scss
│   │   ├── report-card.scss
│   │   ├── resources-preview.scss
│   │   ├── review-card.scss
│   │   ├── section.scss
│   │   ├── soc1als.scss
│   │   ├── summary.scss
│   │   ├── table-of-contents.scss
│   │   ├── tabs.scss
│   │   ├── tag.scss
│   │   ├── team.scss
│   │   ├── tile.scss
│   │   ├── video-card.scss
│   │   └── video-player.scss
│   ├── normalize.scss
│   ├── fonts.scss
│   ├── variables.scss
│   ├── globals.scss
│   ├── utils.scss
│   ├── main.css
│   ├── main.min.css
│   └── main.scss
├── index.html
├── news.html
├── podcasts.html
├── resources.html
├── blog.html
├── contacts.html
├── README.md
├── .gitignore
├── package.json
└── package-lock.json
```

---

## JavaScript Architecture

The project uses class-based components with ES modules. `Tabs` extends `BaseComponent` and uses Proxy-based reactive state (`updateUI()` runs on state changes). Other components (`Header`, `VideoPlayer`, `ExpandableContent`, `PhoneInput`) use standalone class implementations with explicit event/state logic.

### Components

**Header** — sticky navigation with mobile menu overlay. Implements focus trap, roving tabindex, `inert` attribute for background content, Escape key handling, and responsive behavior via `matchMedia`.

**Tabs** — tablist/tab/tabpanel ARIA pattern with full keyboard navigation: Arrow Left/Right for tab switching, Home/End for first/last tab, Cmd+Arrow support on macOS. State is managed via Proxy.

**VideoPlayer** — custom play button overlay with native HTML5 video controls after first interaction. Handles play, pause, and ended events. Initialized as a collection across all instances on the page.

**ExpandableContent** — expands hidden content with a height animation using the Web Animations API. Button is hidden after expansion.

**PhoneInput** — wraps intl-tel-input library for international phone number input.

---

## SCSS Architecture

### Helpers

`functions.scss` — `rem()` converts px to rem, `fluid()` generates `clamp()` values for fluid scaling between two viewport widths.

`media.scss` — mobile-first breakpoint mixins: `laptop` (1440px), `tablet` (1023px), `mobile` (767px), `small-mobile` (480px). Includes `hover` mixin that targets `any-hover: hover` devices with an `:active` fallback for touch.

`mixins.scss` — utility mixins: `visually-hidden`, `flex-align-center`, `flex-center`, `abs-center`, `abs-x`, `abs-y`, `square`, `fluid-text`, `full-vw-centered-line`, `hide`/`show`.

### CSS Custom Properties

All design tokens are defined in `:root` in `variables.scss`:

`--scrollbar-width` is set via JavaScript on page load to prevent layout shift caused by scrollbar appearance.

### Naming

Classes follow BEM: `block__element--modifier`. When an element carries multiple roles (BEM mix), order is: context element first, reusable block second — for example `class="section__subtitle tag"`.

---

## Accessibility

- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<dl>`, `<time>`, `<address>`, `<blockquote>`, `<details>`/`<summary>`
- All interactive elements are keyboard accessible
- Focus trap in mobile menu
- `aria-expanded`, `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-current` used where appropriate
- `inert` attribute used to block background content when menu is open
- `role="img"` with `aria-label` on star rating groups
- `aria-hidden="true"` on decorative SVGs and duplicate text
- `:focus-visible` styled with sufficient contrast
- `prefers-reduced-motion` respected in normalize
- Form fields use `:user-invalid` to avoid premature validation errors

---

## Browser Support

Chrome 108+, Firefox 110+, Safari 15.4+, Edge 108+.

These minimum versions are primarily influenced by the use of modern CSS features such as Media Queries Level 4 range syntax (`width <=`) and selectors like `:has(:target)`. For broader support, you can replace range syntax with classic `max-width`/`min-width` media queries and provide JS/CSS fallbacks for unsupported selectors.
