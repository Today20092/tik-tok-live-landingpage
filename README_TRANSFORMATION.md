# Islamic Education Landing Page Transformation Guide

**Project Status:** Phase 1 Complete ✅ | Phases 2-5 Pending

---

## 🎯 Quick Start for New Chats

1. **Read This File First** — understand the transformation goal and current status
2. **Read `PROJECT_CONTEXT.md`** — see the 5-phase plan and what's completed
3. **Read Phase Summaries** — e.g., `PHASE_1_SUMMARY.md` shows accessibility work done

---

## 📋 Project Overview

**Goal:** Transform the "Quran Reading Sessions" landing page into a **mobile-first, one-page Islamic education landing page** for non-Muslims, new Muslims, and reverts.

**Design Philosophy:** "Modern Heritage" — scholarly, approachable, minimalist, peaceful with subtle Islamic geometric influences.

**Key Constraints:**
- Content-driven (users edit `/content` folder, never touch code)
- 100% accessible (WCAG AA/AAA)
- Static-first (Astro, no runtime overhead)
- Mobile-first responsive design

---

## 🎨 Design Transformation

### Current State (Dark Theme)
```
Background: Near-black (oklch 0.1 0 0)
Text: Near-white (oklch 0.98 0 0)
Headings: Crimson Text serif
Body: Inter sans-serif
Accent: Bright green (oklch 0.78 0.15 85)
Aesthetic: Contemplative, spiritual
```

### Target State (Light Theme — "Modern Heritage")
```
Background: Warm off-white (#F4F3EF)
Text: Deep slate blue (#2C3E50)
Headings: Playfair Display serif (authority, elegance)
Body: Inter sans-serif (unchanged)
Primary Accent: Sage green (#6B8E7D)
Highlight: Bronze/Gold (#C5A059)
Visual: Subtle Islamic geometric tessellation patterns
Aesthetic: Scholarly, welcoming, peaceful
```

---

## 📊 5-Phase Implementation Plan

### ✅ Phase 1: Accessibility Fixes (COMPLETE)
**Status:** ✅ Done | Build verified
**Summary:** Added ARIA attributes, keyboard handlers, focus states
**Files:** BioBlurb.tsx, LinkCard.tsx, FAQ.tsx, index.astro
**Details:** See `PHASE_1_SUMMARY.md`

**Key Improvements:**
- All interactive elements: `aria-label`, `aria-expanded`, keyboard support
- Focus indicators: Green ring visible (`focus-visible:ring-2`)
- Decorative icons: Hidden from screen readers (`aria-hidden="true"`)
- Meta tags: Added `color-scheme`, `theme-color`

---

### 🔄 Phase 2: Color & Typography (NEXT)
**Status:** ⏳ Pending
**Goal:** Replace dark theme with "Modern Heritage" light palette

**Files to Update:**
- `src/styles/global.css` — Complete overhaul
  - Remove dark theme variables (current oklch values)
  - Add new palette variables (#F4F3EF, #2C3E50, #6B8E7D, #C5A059)
  - Import Playfair Display font
  - Update Tailwind theme config
- `src/pages/index.astro`
  - Remove `class="dark"` from `<html>` element
  - Update title/description (still hardcoded, move to Phase 4)

**Tasks:**
1. Convert hex colors to oklch for Tailwind compatibility
2. Test WCAG AA/AAA contrast ratios:
   - Text on background (#2C3E50 on #F4F3EF)
   - Links/accents (#6B8E7D, #C5A059)
3. Update all component className references to use new token names
4. Test build and visual output
5. Verify all text is readable and professional

---

### 🎨 Phase 3: Geometric Patterns (AFTER PHASE 2)
**Status:** ⏳ Pending
**Goal:** Add subtle Islamic tessellation background patterns

**Considerations:**
- Low opacity (don't obscure content)
- SVG patterns or CSS clip-path
- Evoke mathematical precision and Islamic heritage
- Mobile-optimized (performance)
- Avoid overdoing it (minimalist aesthetic)

**Possible Approaches:**
1. SVG inline patterns in background
2. CSS clip-path geometric shapes
3. Subtle repeating tessellation using background-image
4. Radial gradients with geometric overlay

---

### 📝 Phase 4: Content & Structure (AFTER PHASE 3)
**Status:** ⏳ Pending
**Goal:** Rewrite content for Islamic education focus

**Files to Update:**
- `content/links.json` — Educational links
  - Replace TikTok-focused content
  - Add primary sources: Quran.com, Sunnah.com, educational media
  - Organize by category (Beliefs, Practice, Knowledge)
- `content/bio.md` — Educational intro
  - Replace personal bio with "Welcome to Islamic Education"
  - Explain the page's purpose
- `content/faq.md` — "The Why" section
  - Replace current FAQ
  - Focus on: Tawhid, Five Pillars, Islamic concepts
  - Explain beliefs behind practices

**New Sections to Consider:**
- Quick Start buttons (Salah guide, Shahada explanation)
- Primary source links (organized by topic)
- Educational categories (card-based, button-driven)

---

### 🏗️ Phase 5: Layout & Components (FINAL)
**Status:** ⏳ Pending
**Goal:** Reorganize page structure, add new components if needed

**Files to Update:**
- `src/pages/index.astro` — Section reorganization
  - Reorder sections for educational flow
  - Update hero section (title, subtitle, CTA)
  - Add new sections (Quick Start, Categories)
- Components — Possible additions
  - CategoryCard component (if needed for education sections)
  - SourceLink component (specialized for primary sources)
  - QuickStartButton component (distinct from LinkCard)

**Tasks:**
1. Define new page layout/hierarchy
2. Create new components if needed
3. Update index.astro to use new sections
4. Test mobile responsiveness
5. Verify all content displays correctly

---

## 🔧 Technical Setup

### Stack
- **Astro 6** — Static site builder
- **React 19** — Interactive components
- **Tailwind CSS 4** — Utility styling
- **Marked** — Markdown parser
- **Lucide React** — Icons

### Key Files Structure
```
src/
├── pages/
│   └── index.astro          ← Main page (reads content at build time)
├── components/
│   ├── BioBlurb.tsx         ← Expandable section (PHASE 1 ✅)
│   ├── LinkCard.tsx         ← Link with optional video (PHASE 1 ✅)
│   ├── FAQ.tsx              ← Accordion component (PHASE 1 ✅)
│   └── ui/
│       └── button.tsx       ← shadcn button (if needed)
└── styles/
    └── global.css           ← Tailwind + variables (PHASE 2 🔄)

content/
├── links.json               ← Links data (PHASE 4 🔄)
├── bio.md                   ← Bio text (PHASE 4 🔄)
└── faq.md                   ← FAQ text (PHASE 4 🔄)

PROJECT_CONTEXT.md           ← Implementation plan (THIS FILE)
PHASE_1_SUMMARY.md           ← Phase 1 details
CLAUDE.md                    ← Code standards & philosophy
```

### Development Workflow
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000, hot reload)
npm run build            # Build static site (creates /dist)
npm run preview          # Preview production build locally
```

---

## 📚 Key Resources

### Primary Sources to Link
- **Quran.com** — Interactive Quran with translations
- **Sunnah.com** — Hadith collections with commentary
- **Educational Videos** — Salah (prayer) guides, Shahada (testimony)

### Design References
- Light, scholarly aesthetic (think academic or library)
- High whitespace (breathing room, contemplative feel)
- Geometric patterns (subtle, mathematical precision)
- Card-based UI (button-driven navigation, mobile-friendly)

---

## ✅ Completion Criteria

**Phase 1 ✅** — All accessibility standards met
- ARIA attributes complete
- Keyboard navigation fully functional
- Focus indicators visible
- Build passes without errors

**Phase 2** — Color & typography transformed
- Dark theme fully replaced
- Playfair Display imported and used
- All colors updated to "Modern Heritage" palette
- Contrast ratios verified (WCAG AA/AAA)
- Visual design matches mockup

**Phase 3** — Geometric patterns integrated
- Background patterns visible but subtle
- Text remains 100% readable
- Patterns work across all screen sizes
- Performance acceptable (no jank)

**Phase 4** — Content rewritten
- Educational focus clearly evident
- Links point to primary sources
- "The Why" section explains Islamic concepts
- No hardcoded content in components

**Phase 5** — Layout optimized
- Educational hierarchy clear
- Mobile-first responsive design
- All sections display correctly
- New components (if any) are accessible

---

## 📌 For Next Chat

**When starting a new chat:**
1. Read this file (README_TRANSFORMATION.md)
2. Check PROJECT_CONTEXT.md for current phase
3. Review the relevant phase summary (PHASE_1_SUMMARY.md, etc.)
4. Ask: "Where are we in the transformation? What's next?"

**If continuing work:**
- Phases completed: 1 ✅
- Current focus: Phase 2 (Color & Typography)
- Build is passing: Yes ✅
- Accessibility verified: Yes ✅

---

## 📝 Git History

**Recent Commits:**
- `939cf62` build: create TikTok landing page with link tree and FAQ (original)
- `[PHASE 1]` Accessibility fixes: ARIA, keyboard handlers, focus states

---

## 🚀 Next Immediate Steps

1. **Phase 2 Planning:** Define exact oklch values for new palette
2. **Font Import:** Add Playfair Display to global.css
3. **Color Variables:** Create Tailwind theme tokens
4. **Component Updates:** Review and update all class names
5. **Contrast Verification:** Test readability with WCAG checker
6. **Build & Test:** Ensure everything compiles and looks correct

---

**Last Updated:** 2026-03-11
**Owner:** @AyoubAbedrabbo
**Questions?** Refer to PROJECT_CONTEXT.md and phase summaries.

