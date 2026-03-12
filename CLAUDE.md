# CLAUDE.md — Islamic Education Landing Page

> 📌 **READ FIRST:** See `PROJECT_CONTEXT.md` for the full transformation plan, implementation phases, and accessibility checklist. Start each new chat by reviewing that file.

## Project Vision (ACTIVE TRANSFORMATION)

**Current Status:** Transforming from "Quran Reading Sessions" landing page to a **mobile-first, one-page Islamic education landing page** for non-Muslims, new Muslims, and reverts.

**Design Philosophy:** "Modern Heritage" — scholarly, approachable, minimalist, peaceful with subtle Islamic geometric influences.

The page is designed for easy maintenance—users edit plain markdown and JSON files instead of touching code. Visual design emphasizes elegance, spiritual resonance, and accessibility.

---

## Core Philosophy

### ✨ Design Principles
- **Refined Minimalism**: Generous whitespace, sophisticated typography (serif headlines + refined sans-serif body)
- **Spiritual Resonance**: Contemplative, welcoming aesthetic (never corporate or heavy)
- **Content-First**: Page layout and styling serve the message, not the other way around
- **Accessibility**: Dark theme, clear hierarchy, readable fonts, smooth transitions

### 🛠️ Technical Philosophy
- **Static First**: Astro for fast, build-time rendering (no runtime cost)
- **Content Separation**: All user-facing text lives in `/content` folder (markdown/JSON) — **zero hardcoding in components**
- **Simplicity Over Cleverness**: No unnecessary abstractions, animations, or features
- **Dark Theme Only**: Optimize for one polished dark aesthetic rather than light/dark toggle

---

## Project Structure

```
src/
├── pages/
│   └── index.astro          ← Main page (reads content files at build time)
├── components/
│   ├── BioBlurb.tsx         ← Collapsible bio section
│   ├── FAQ.tsx              ← Expandable FAQ accordion
│   └── LinkCard.tsx         ← Link card with YouTube embed support
└── styles/
    └── global.css           ← Tailwind + custom CSS variables + fonts

content/                      ← USER-EDITABLE CONTENT (no code here!)
├── links.json               ← Add/remove/reorder resource links
├── bio.md                   ← Bio text in markdown
└── faq.md                   ← FAQ questions/answers (## heading = Q, content = A)
```

---

## User-Editable Content Format

### **content/links.json**
```json
[
  {
    "icon": "📖",
    "title": "Order a Free Quran",
    "description": "Request a free copy delivered to your door",
    "url": "https://example.com",
    "youtube": "optional_VIDEO_ID"  // If set, shows expandable player instead of link
  }
]
```

### **content/bio.md**
Plain markdown. Each paragraph becomes a collapsible section when expanded.

```markdown
Welcome to Quran Reading Sessions.

This is the expanded content that shows when clicked.
```

### **content/faq.md**
Markdown with `##` headings = questions, content = answers.

```markdown
## What is the Quran?

The Quran is...

## Who was Prophet Muhammad?

Muhammad was...
```

---

## Development Workflow

### Adding a New Link
1. Edit `content/links.json`
2. Add object with `icon`, `title`, `description`, `url`
3. Run `npm run dev` → it appears on page instantly

### Updating Bio Text
1. Edit `content/bio.md`
2. Add/remove paragraphs
3. Save → rebuild triggers automatically

### Adding FAQ Questions
1. Edit `content/faq.md`
2. Add new `##` heading + answer text
3. Save → FAQ expands automatically

### Embedding YouTube Videos
**Option A (in bio.md)**: Paste a YouTube URL on its own line → auto-detects and embeds

**Option B (in links.json)**: Add `"youtube": "VIDEO_ID"` to a link entry → shows inline expandable player

---

## Design System

### Colors (Dark Theme)
- **Background**: `oklch(0.1 0 0)` (near-black)
- **Card**: `oklch(0.16 0 0)` (subtle lift from background)
- **Accent**: `oklch(0.78 0.15 85)` (green — used for highlights and interactive elements)
- **Text**: `oklch(0.98 0 0)` (near-white)
- **Muted**: `oklch(0.708 0 0)` (medium gray for secondary text)

### Typography
- **Headlines** (`h1-h6`): `Crimson Text` serif — elegant, contemplative
- **Body Text**: `Inter` sans-serif — refined, readable
- **Tracking**: Headlines use `-0.02em` letter-spacing for tightness

### Components
- **Cards**: Subtle gradient background (`oklch(0.16 0 0)` → `oklch(0.165 0.02 85 / 0.5)`), radial glow overlay
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

---

## Code Standards

### ✅ DO
- **Read content files at build time** in `index.astro` using `fs.readFileSync`
- **Pass parsed data as props** to components (keep components reusable, dumb)
- **Use Tailwind utilities** for styling (avoid custom CSS unless absolutely necessary)
- **Keep component logic simple** — expandables, yes; complex state machines, no
- **Add gentle transitions** (300ms, smooth easing) for polish
- **Use `prose prose-invert`** for markdown-generated HTML to ensure readability

### ❌ DON'T
- **Hardcode content** in component files (it belongs in `/content`)
- **Add unnecessary features** (no light mode toggle, no animations beyond polish)
- **Over-engineer components** (a button that toggles expanded state is enough)
- **Change the dark theme** (it's a core part of the design)
- **Use generic fonts** (Crimson Text + Inter are intentional choices)
- **Add heavy animations** — smooth transitions yes, dancing elements no

---

## Build & Deployment

### Local Development
```bash
npm install
npm run dev          # localhost:3000 with hot reload
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
- **Video Embeds in Bio**: Detect YouTube URLs → auto-embed (already supported in links)
- **Dark Mode Toggle**: Only if requested (currently dark-only)
- **Testimonials Section**: New collapsible section for user feedback
- **Newsletter Signup**: Email collection for follow-up
- **Social Links**: Expanded footer with more platforms (YouTube, Instagram, etc.)

---

## Notes for Claude

### When Making Changes
1. **Always read the file first** before editing — understand existing patterns
2. **Keep components props-driven** — no hardcoded content
3. **Test the build** — `npm run build` must succeed
4. **Preserve the aesthetic** — refined minimalism, not corporate or trendy
5. **Respect the design system** — don't introduce new colors or fonts without reason

### When Adding Features
- Ask yourself: "Can this be content-driven?" If yes, use `/content` folder
- Prefer Tailwind utilities over custom CSS
- Keep it simple — one use case, not five hypothetical ones
- No premature optimization or abstractions

### Debugging
- `npm run dev` for live reload while developing
- Check browser console for React/client-side errors
- Check terminal for Astro build errors
- Verify markdown syntax in `/content` files if parsing fails

---

## Contact & Context

**Project Owner**: @AyoubAbedrabbo
**Purpose**: Daily Quran reading sessions on TikTok Live
**Audience**: Curious seekers, Muslims, people interested in learning about Islam
**Status**: Content-driven, design-polished, ready for user-driven updates

---

**Last Updated**: 2026-03-11
