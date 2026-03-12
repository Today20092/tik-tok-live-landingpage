# CLAUDE.md — Islamic Education Landing Page

## Project Vision

A **mobile-first, one-page Islamic education landing page** for non-Muslims, new Muslims, and reverts.

**Design Philosophy:** "Modern Heritage" — scholarly, approachable, minimalist, peaceful with subtle Islamic geometric influences.

The page is designed for easy maintenance — users edit plain markdown and JSON files instead of touching code. Visual design emphasizes elegance, spiritual resonance, and accessibility.

---

## Core Philosophy

### ✨ Design Principles (Refactoring UI)
- **Refined Minimalism**: Generous whitespace, sophisticated typography (serif headlines + refined sans-serif body)
- **Spiritual Resonance**: Contemplative, welcoming aesthetic (never corporate or heavy)
- **Content-First**: Page layout and styling serve the message, not the other way around
- **Hierarchy through contrast**: Use font size, weight, and color opacity to establish visual hierarchy — not just size alone
- **Limit your palette**: Use opacity variants (`text-foreground/65`, `/85`) instead of adding new colors for secondary text
- **Accessibility (WCAG AAA)**: Both light and dark themes meet AAA contrast ratios

### 🛠️ Technical Philosophy
- **Static First**: Astro for fast, build-time rendering (no runtime cost)
- **Content Separation**: All user-facing text lives in `src/content/` folder (markdown/JSON) — **zero hardcoding in components**
- **Simplicity Over Cleverness**: No unnecessary abstractions, animations, or features
- **Dual Theme**: Light and dark themes both fully supported via CSS variables + `.dark` class toggle

---

## Project Structure

```
src/
├── content.config.ts            ← Astro content collection schemas (links + site)
├── pages/
│   └── index.astro              ← Main page (reads content files at build time)
├── components/
│   ├── BioBlurb.tsx             ← Collapsible bio section
│   ├── FAQ.tsx                  ← Expandable FAQ accordion
│   ├── LinkCard.tsx             ← Link card with YouTube embed support
│   └── ThemeToggle.tsx          ← Light/dark theme switcher
└── styles/
    └── global.css               ← Tailwind + custom CSS variables + fonts

src/content/                     ← USER-EDITABLE CONTENT (no code here!)
├── links/
│   └── links.json               ← Add/remove/reorder resource links
└── site/
    ├── bio.md                   ← Bio text in markdown
    └── faq.md                   ← FAQ questions/answers (## heading = Q, content = A)
```

---

## User-Editable Content Format

### **src/content/links/links.json**
Each entry requires `id`, `icon`, `title`, `description`, `url`. The `youtube` field is optional.
```json
[
  {
    "id": "1",
    "icon": "📖",
    "title": "Order a Free Quran",
    "description": "Request a free copy delivered to your door",
    "url": "https://example.com",
    "youtube": "optional_VIDEO_ID"
  }
]
```
> If `youtube` is set, the card shows an expandable inline player instead of an external link.

### **src/content/site/bio.md**
Plain markdown. The first paragraph shows as a preview; the rest expands on click.

```markdown
Welcome to Islamic Education.

This is the expanded content that shows when clicked.
```

### **src/content/site/faq.md**
`##` headings = questions, paragraph content = answers.

```markdown
## What is the Quran?

The Quran is...

## Who was Prophet Muhammad?

Muhammad was...
```

---

## Development Workflow

### Adding a New Link
1. Edit `src/content/links/links.json`
2. Add object with `id`, `icon`, `title`, `description`, `url`
3. `npm run dev` → appears instantly

### Updating Bio Text
1. Edit `src/content/site/bio.md`
2. Add/remove paragraphs — saves rebuild automatically

### Adding FAQ Questions
1. Edit `src/content/site/faq.md`
2. Add `##` heading + answer text — auto-expands in accordion

### Embedding YouTube Videos
**In links.json**: Add `"youtube": "VIDEO_ID"` to a link entry → inline expandable player

---

## Design System

### Colors — Light Theme (WCAG AAA)
- **Background**: `oklch(0.96 0.01 80)` (off-white `#F4F3EF`)
- **Card**: `oklch(0.98 0.005 80)` (slightly lighter)
- **Accent**: `oklch(0.48 0.08 165)` (darker sage green for AAA contrast on light)
- **Text**: `oklch(0.23 0.04 250)` (dark slate `#1A2634`)
- **Muted**: `text-foreground/65` opacity variant

### Colors — Dark Theme (WCAG AAA)
- **Background**: `oklch(0.12 0 0)` (near-black)
- **Card**: `oklch(0.16 0.005 165)` (subtle green-tinted lift)
- **Accent**: `oklch(0.72 0.15 65)` (warm green)
- **Text**: `oklch(0.94 0 0)` (near-white)
- **Muted**: `text-foreground/65` opacity variant

> Refactoring UI principle: use opacity variants for hierarchy, not new colors.

### Typography
- **Headlines** (`h1-h6`): `Playfair Display` serif — elegant, contemplative
- **Body Text**: `Inter` sans-serif — refined, readable
- **Tracking**: Headlines use `-0.02em` letter-spacing for tightness

### Components
- **Cards**: Subtle gradient background, radial glow overlay
- **Borders**: `oklch(1 0 0 / 8%)` semi-transparent white for sophistication
- **Shadows**: Soft, accent-colored shadows on hover (`shadow-accent/10`)
- **Transitions**: Smooth 300ms duration on all interactive elements

---

## Technology Stack

- **Astro 6**: Static site builder (build-time rendering)
- **React 19**: Interactive components (client-side only for expandables)
- **Tailwind CSS 4**: Utility-first styling
- **Marked**: Lightweight markdown parser
- **Lucide React**: Icon library (ChevronDown, ArrowRight, X)
- **Zod**: Schema validation for content collections (used in `content.config.ts`)

---

## Code Standards

### ✅ DO
- **Read content files at build time** in `index.astro` using `getEntry` / `getCollection` from `astro:content`
- **Pass parsed data as props** to components (keep components reusable, dumb)
- **Use Tailwind utilities** for styling (avoid custom CSS unless absolutely necessary)
- **Keep component logic simple** — expandables, yes; complex state machines, no
- **Add gentle transitions** (300ms, smooth easing) for polish
- **Use `prose dark:prose-invert`** for markdown HTML — works in both light and dark themes
- **Use opacity for secondary text** — `text-foreground/65` not a new color (Refactoring UI)

### ❌ DON'T
- **Hardcode content** in component files (it belongs in `src/content`)
- **Add unnecessary features** (no animations beyond polish)
- **Over-engineer components** (a button that toggles expanded state is enough)
- **Use generic fonts** (Playfair Display + Inter are intentional choices)
- **Add heavy animations** — smooth transitions yes, dancing elements no
- **Introduce new palette colors** — use opacity variants of existing tokens

---

## Build & Deployment

### Local Development
```bash
npm install
npm run dev          # localhost:4321 with hot reload
```

### Production Build
```bash
npm run build        # Generates static /dist folder
npm run preview      # Test production build locally
```

### Deploy to GitHub Pages
1. Push to GitHub
2. GitHub Actions runs `npm run build`
3. Contents of `/dist` served as static site
4. Users can edit content without re-deploying

---

## Future Enhancement Ideas

- **Hero Animation**: Subtle fade-in on page load (only if it doesn't cheapen the aesthetic)
- **Testimonials Section**: New collapsible section for user feedback
- **Newsletter Signup**: Email collection for follow-up
- **Social Links**: Expanded footer with more platforms (YouTube, Instagram, etc.)
- **OG Image**: Static image for social sharing previews

---

## Notes for Claude

### When Making Changes
1. **Always read the file first** before editing — understand existing patterns
2. **Keep components props-driven** — no hardcoded content
3. **Test the build** — `npm run build` must succeed
4. **Preserve the aesthetic** — refined minimalism, not corporate or trendy
5. **Respect the design system** — don't introduce new colors or fonts without reason

### When Adding Features
- Ask: "Can this be content-driven?" If yes, use `src/content/` folder
- Prefer Tailwind utilities over custom CSS
- Keep it simple — one use case, not five hypothetical ones
- No premature optimization or abstractions

### Debugging
- `npm run dev` for live reload while developing
- Check browser console for React/client-side errors
- Check terminal for Astro build errors
- Verify markdown syntax in `src/content` files if parsing fails

---

## Contact & Context

**Project Owner**: @AyoubAbedrabbo
**Purpose**: Daily Quran reading sessions on TikTok Live
**Audience**: Curious seekers, Muslims, people interested in learning about Islam

---

**Last Updated**: 2026-03-11
