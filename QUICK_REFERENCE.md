# Quick Reference Card

**Current Status:** Phase 1 Complete ✅ | Ready for Phase 2

---

## 📚 Documentation Files

| File | Purpose | Read When |
|------|---------|-----------|
| `README_TRANSFORMATION.md` | **START HERE** — Full overview, phases, technical setup | Every new chat |
| `PROJECT_CONTEXT.md` | Detailed transformation plan, color specs, checklists | Planning or checking status |
| `PHASE_1_SUMMARY.md` | Accessibility work completed, before/after code | Understanding what was done |
| `CLAUDE.md` | Code standards, patterns, dos/don'ts | Before editing code |
| `QUICK_REFERENCE.md` | This file — quick facts and commands | Quick lookup |

---

## 🎯 Project Goal in 10 Seconds

**Transform:** TikTok Quran sessions landing page
**To:** Islamic education landing page for seekers and new Muslims
**Design:** "Modern Heritage" — scholarly, light theme, geometric patterns
**Timeline:** 5 phases (1 complete, 4 pending)

---

## 🎨 Design Specs (Copy-Paste Reference)

**Colors (New Palette):**
```
Background:     #F4F3EF (warm off-white)
Text:           #2C3E50 (deep slate blue)
Accent Primary: #6B8E7D (sage green)
Accent Highlight: #C5A059 (bronze/gold)
```

**Fonts:**
```
Headings: Playfair Display (serif)
Body:     Inter (already imported)
```

---

## ⚡ Phase Checklist

- [x] **Phase 1:** Accessibility fixes
  - [x] ARIA attributes (aria-label, aria-expanded, aria-controls, aria-hidden)
  - [x] Keyboard handlers (Enter/Space)
  - [x] Focus indicators (focus-visible:ring-2)
  - [x] Meta tags (color-scheme, theme-color)

- [ ] **Phase 2:** Color & Typography
  - [ ] Update global.css (colors, fonts)
  - [ ] Remove `class="dark"` from HTML
  - [ ] Update component classes
  - [ ] Test contrast ratios
  - [ ] Build & verify

- [ ] **Phase 3:** Geometric patterns
  - [ ] Source/design patterns
  - [ ] Integrate SVG or CSS
  - [ ] Ensure readability

- [ ] **Phase 4:** Content rewrite
  - [ ] Update links.json (educational focus)
  - [ ] Rewrite bio.md (intro text)
  - [ ] Rewrite faq.md (The Why)

- [ ] **Phase 5:** Layout & components
  - [ ] Reorganize index.astro
  - [ ] Add new sections (Quick Start)
  - [ ] Create new components if needed
  - [ ] Final mobile test

---

## 🔧 Quick Commands

```bash
# Development
npm run dev              # Local dev with hot reload

# Building
npm run build            # Build static site
npm run preview          # Test production build

# Check status
git status               # See what's changed
git log --oneline        # See recent commits
```

---

## 📂 File Locations (Key Files)

```
src/components/BioBlurb.tsx    ← Expandable bio (PHASE 1 ✅)
src/components/LinkCard.tsx    ← Link cards (PHASE 1 ✅)
src/components/FAQ.tsx          ← Accordion FAQ (PHASE 1 ✅)
src/pages/index.astro           ← Main page (PHASES 2, 5)
src/styles/global.css           ← Colors, fonts (PHASE 2)
content/links.json              ← Link data (PHASE 4)
content/bio.md                  ← Bio text (PHASE 4)
content/faq.md                  ← FAQ text (PHASE 4)
```

---

## 🚨 Critical Rules

**DO:**
- ✅ Read content from `/content` folder (never hardcode)
- ✅ Test build before committing
- ✅ Keep components props-driven
- ✅ Use Tailwind utilities (avoid custom CSS)
- ✅ Keep transitions to 300ms smooth

**DON'T:**
- ❌ Hardcode content in components
- ❌ Add features not requested
- ❌ Break accessibility (ARIA, keyboard, focus)
- ❌ Change design philosophy without discussion
- ❌ Use generic fonts (Playfair Display + Inter only)

---

## 🎯 Next Immediate Task

**Phase 2: Color & Typography**

1. Open `src/styles/global.css`
2. Replace all oklch color values with new palette
3. Import Playfair Display font
4. Remove dark theme variables
5. Update Tailwind theme config
6. Test contrast ratios (WCAG AA/AAA)
7. Run `npm run build` to verify
8. Update README_TRANSFORMATION.md status

**Estimated Effort:** 1-2 hours (straightforward token replacement)

---

## 📞 Getting Help

**Questions about:**
- **Project scope?** → README_TRANSFORMATION.md
- **Implementation details?** → PROJECT_CONTEXT.md
- **What we already did?** → PHASE_1_SUMMARY.md
- **Code standards?** → CLAUDE.md
- **Quick facts?** → This file (QUICK_REFERENCE.md)

---

## ✨ Success Criteria

**Phase 1** ✅
- [x] All accessibility standards met (WCAG AA/AAA)
- [x] Keyboard navigation works
- [x] Build passes

**Phase 2** (Next)
- [ ] Light theme fully applied
- [ ] Playfair Display used for headings
- [ ] All colors updated
- [ ] Contrast verified
- [ ] Build passes

---

**Last Updated:** 2026-03-11
**Status:** Ready to proceed with Phase 2 ✅

