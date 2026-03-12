# Islamic Education Landing Page — Project Context

**Last Updated:** 2026-03-11
**Status:** ✅ ALL PHASES COMPLETE | Ready for Deployment
**Owner:** @AyoubAbedrabbo

---

## 🎯 Project Goal (TRANSFORMATION)

**From:** Quran reading sessions landing page (TikTok Live)
**To:** Mobile-first, one-page Islamic education landing page for non-Muslims, new Muslims, and reverts

**Design Philosophy:** "Modern Heritage"
- Scholarly, approachable, minimalist, peaceful
- Subtle Islamic geometric influences (tessellations)
- 100% readable and accessible

---

## 🎨 Design Specifications

### Color Palette (Light Theme)
- **Background:** `#F4F3EF` (warm off-white)
- **Text:** `#2C3E50` (deep slate blue)
- **Primary Accent:** `#6B8E7D` (sage green)
- **Highlight:** `#C5A059` (bronze/gold)

### Typography
- **Headings:** Playfair Display (serif) — authority, elegance
- **Body:** Inter (sans-serif) — readability, refinement

### Visual Elements
- Card-based layout with high whitespace
- Subtle low-opacity Islamic geometric tessellation patterns (background)
- Smooth 300ms transitions
- Focus states for accessibility

### Content Structure
**Primary Sections:**
1. Educational intro (replaces "bio blurb")
2. Quick Start buttons (Salah guide, Shahada explanation)
3. "The Why" section (Tawhid, Five Pillars, Islamic concepts)
4. Primary source links (Quran.com, Sunnah.com, educational media)
5. Instructional media embeds
6. FAQ/resources

---

## 📋 Implementation Phases

### ✅ Phase 1: Accessibility Fixes (IN PROGRESS)
**Goal:** Add ARIA attributes, keyboard handlers, focus states, meta tags
**Files to update:**
- `src/components/BioBlurb.tsx` — Add aria-label, aria-expanded, onKeyDown, focus-visible
- `src/components/LinkCard.tsx` — Add aria-label, aria-expanded, iframe title, aria-hidden
- `src/components/FAQ.tsx` — Add aria-expanded, aria-controls, onKeyDown, unique keys
- `src/pages/index.astro` — Add color-scheme, theme-color meta tags

**Issues to fix:** 10 accessibility violations

---

### 🔄 Phase 2: Color & Typography
**Goal:** Replace dark theme with light "Modern Heritage" palette
**Files to update:**
- `src/styles/global.css` — Replace all oklch values, import Playfair Display
- `src/pages/index.astro` — Remove `class="dark"`, update title/description

**Changes:**
- Remove dark theme oklch values
- Add new palette variables
- Update Tailwind theme
- Test WCAG AA/AAA contrast

---

### 🎨 Phase 3: Geometric Patterns
**Goal:** Integrate Islamic tessellation background patterns
**Tasks:**
- Source/design subtle geometric patterns
- Add as low-opacity SVG or CSS background
- Ensure text readability over patterns

---

### 📝 Phase 4: Content & Structure
**Goal:** Rewrite content for Islamic education focus
**Files to update:**
- `content/links.json` — Educational links, primary sources
- `content/bio.md` — Educational intro text
- `content/faq.md` — "The Why" concepts (Tawhid, Five Pillars, etc.)

---

### 🏗️ Phase 5: Layout & Components
**Goal:** Reorganize page sections, add new components if needed
**Tasks:**
- Reorganize `index.astro` sections
- Create "Quick Start" button section
- Add educational category cards
- Update hero section

---

## 📚 Key Resources

**Primary Sources to Link:**
- Quran.com — Interactive Quran translation
- Sunnah.com — Hadith collections
- Educational videos on Salah, Shahada, Islamic concepts

**Design References:**
- Light, scholarly aesthetic
- High whitespace (breathing room)
- Geometric patterns (subtle, not overwhelming)
- Card-based UI (button-driven navigation)

---

## ✅ Accessibility Checklist (Phase 1) — COMPLETE

- [x] BioBlurb: Add `aria-label`, `aria-expanded`, `onKeyDown`, `focus-visible:ring`
- [x] LinkCard: Add `aria-label`, `aria-expanded`, iframe `title`, `aria-hidden` on icons
- [x] FAQ: Add `aria-expanded`, `aria-controls`, `onKeyDown`, unique IDs, `aria-hidden` on icons
- [x] index.astro: Add `color-scheme: dark` meta, `theme-color` meta
- [x] All buttons: Keyboard handlers added (Tab, Enter, Space)
- [x] All interactive elements: Focus indicators added (`focus-visible:ring-2 focus-visible:ring-accent/50`)

---

## 🚀 Completion Status — All Phases Done ✅

1. ✅ Create PROJECT_CONTEXT.md (this file)
2. ✅ Add to CLAUDE.md
3. ✅ **Phase 1: Accessibility fixes — COMPLETE**
   - Added ARIA attributes (aria-label, aria-expanded, aria-controls, aria-hidden)
   - Added keyboard handlers (onKeyDown for Enter/Space)
   - Added focus indicators (focus-visible:ring-2)
   - Added meta tags (color-scheme, theme-color)
   - Build verified ✅

4. ✅ **Phase 2: Color palette & typography — COMPLETE**
   - Light theme applied (#F4F3EF, #2C3E50, #6B8E7D, #C5A059)
   - Playfair Display imported and configured
   - Tailwind theme updated
   - Build verified ✅

5. ✅ **Phase 3: Geometric patterns — COMPLETE**
   - Subtle Islamic tessellation SVG patterns added
   - Low-opacity background (6-8%)
   - Text remains 100% readable
   - Build verified ✅

6. ✅ **Phase 4: Content restructuring — COMPLETE**
   - links.json: 8 educational resources (Quran.com, Sunnah.com, etc.)
   - bio.md: Educational intro (Tawhid, Five Pillars, Quran)
   - faq.md: 11 Q&A on Islamic concepts ("The Why")
   - Build verified ✅

7. ✅ **Phase 5: Layout & components — COMPLETE**
   - Hero section updated (title, subtitle, CTA button)
   - Section headings updated
   - Footer updated
   - Page title and meta description updated
   - Build verified ✅

**TRANSFORMATION COMPLETE** — See TRANSFORMATION_COMPLETE.md for full summary

---

## 📌 How to Use This Document

**At the start of each chat:**
1. Read this file to understand the transformation goal
2. Check the status line (top) for current phase
3. Refer to the phases section for what's being worked on
4. Use the checklist to verify completeness

**When switching contexts:**
- This file persists across chats
- Update the status line when phases complete
- Add notes about decisions made
- Keep the accessibility checklist current

