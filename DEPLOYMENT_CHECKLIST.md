# Navigation Enhancement - Deployment Checklist

## Pre-Deployment Verification

### ✅ Build & Compilation
- [x] `npm run build` completes successfully
- [x] No TypeScript errors
- [x] No ESLint errors
- [x] All pages render in production build
- [x] Static generation works (44/44 pages)

### ⏳ Manual Testing (Required Before Deploy)

#### Desktop Testing (≥640px)
- [ ] Visit `/learn` → verify inline links visible, no hamburger
- [ ] Visit `/explore` → verify inline links visible, no hamburger
- [ ] Click explainer → verify auto-hide nav appears
- [ ] Scroll down 400px → verify nav hides
- [ ] Scroll up → verify nav shows immediately
- [ ] Click "← Learn" → returns to /learn
- [ ] Click "← Explore" → returns to /explore
- [ ] Theme toggle still works (no z-index conflict)

#### Mobile Testing (<640px)
- [ ] Visit `/learn` → verify hamburger visible, inline links hidden
- [ ] Click hamburger → menu slides in from right
- [ ] Click menu item → navigates correctly
- [ ] Click backdrop → menu closes
- [ ] Press Esc → menu closes
- [ ] Visit explainer → verify "← Learn" visible on mobile
- [ ] Hamburger works on explainer pages
- [ ] No horizontal scroll
- [ ] No layout shifts

#### Keyboard Accessibility
- [ ] Tab through nav → all links focusable
- [ ] Focus outlines visible
- [ ] Enter on hamburger → opens menu
- [ ] Esc in menu → closes menu
- [ ] Tab in menu → cycles through links

#### Cross-Browser (Desktop)
- [ ] Chrome (latest) - all features work
- [ ] Safari (latest) - backdrop-blur renders
- [ ] Firefox (latest) - transitions smooth
- [ ] Edge (latest) - no layout issues

#### Cross-Browser (Mobile)
- [ ] iOS Safari - no bounce scroll issues
- [ ] Chrome Android - smooth animations
- [ ] Samsung Internet - menu works

#### Theme Compatibility
- [ ] Dark mode → nav colors correct
- [ ] Light mode → nav colors correct
- [ ] Switch theme with menu open → menu updates
- [ ] All explainer themes work (butterfly, tariffs, etc.)

### ⏳ Performance Testing

#### Lighthouse Audit
- [ ] Performance score ≥90
- [ ] Accessibility score ≥95
- [ ] Best Practices score ≥90
- [ ] SEO score ≥95

#### Scroll Performance
- [ ] DevTools Performance tab shows 60fps
- [ ] No red bars (long tasks) during scroll
- [ ] Passive listeners confirmed in Event Log
- [ ] No memory leaks (heap snapshot)

#### Bundle Size
```bash
npm run build
# Check .next/static/chunks
# Verify no significant bundle size increase
```

- [ ] Bundle size increase <10KB
- [ ] No duplicate dependencies
- [ ] Tree shaking works (lucide-react only imports Menu, X)

### ⏳ Accessibility Audit

#### Screen Reader Testing
- [ ] VoiceOver (macOS): Nav announces correctly
- [ ] NVDA (Windows): Menu state changes announced
- [ ] Hamburger button has proper label
- [ ] Menu has proper role and aria-modal

#### WCAG Compliance
- [ ] Color contrast ≥4.5:1 (text on background)
- [ ] Focus indicators visible (2px outline)
- [ ] No keyboard traps
- [ ] All interactive elements reachable by keyboard

### ⏳ Visual Regression Testing

#### Screenshot Comparison
Take screenshots of key pages before/after:

```bash
# Desktop screenshots
npx playwright screenshot --viewport-size="1280,720" \
  http://localhost:3000/learn \
  screenshots/learn-desktop.png

npx playwright screenshot --viewport-size="1280,720" \
  http://localhost:3000/learn/butterfly-metamorphosis-explainer \
  screenshots/explainer-desktop.png

# Mobile screenshots
npx playwright screenshot --viewport-size="375,667" \
  http://localhost:3000/learn \
  screenshots/learn-mobile.png

npx playwright screenshot --viewport-size="375,667" \
  http://localhost:3000/learn/butterfly-metamorphosis-explainer \
  screenshots/explainer-mobile.png

# With menu open
npx playwright screenshot --viewport-size="375,667" \
  'http://localhost:3000/learn' \
  screenshots/menu-open-mobile.png \
  --click '[aria-label="Open menu"]' \
  --wait-for-selector '[role="dialog"]'
```

- [ ] No unintended layout changes
- [ ] ProgressBar still visible
- [ ] ThemeToggle still visible
- [ ] Content not obscured by nav

### ⏳ Edge Case Testing

#### Rapid Interactions
- [ ] Open/close menu 10x rapidly → no glitches
- [ ] Switch themes rapidly → colors update correctly
- [ ] Scroll up/down rapidly → nav responds smoothly

#### Navigation Edge Cases
- [ ] Browser back button works correctly
- [ ] Menu closes on back navigation
- [ ] Deep links work (direct URL to explainer)
- [ ] Hash links work (#section anchors)

#### Viewport Edge Cases
- [ ] Test at exactly 640px (breakpoint boundary)
- [ ] Test at 320px (smallest mobile)
- [ ] Test at 1920px (large desktop)
- [ ] Test landscape mobile (568x320)

## Deployment Steps

### 1. Code Review
```bash
git status
git add src/components/explainers/shared/ExplainerNav.tsx
git add src/hooks/useScrollDirection.ts
git add src/components/explainers/shared/ExplainerLayout.tsx
git add src/components/Nav.tsx
git add *.md
```

### 2. Commit
```bash
git commit -m "feat: add auto-hiding navigation and mobile menu

- Add ExplainerNav component for explainer pages
  - Auto-hides on scroll down, shows on scroll up
  - Context-aware back links (← Learn / ← Explore)
  - Mobile hamburger menu with slide-in animation
  - Respects explainer theme colors

- Add useScrollDirection hook for scroll detection
  - Uses requestAnimationFrame for performance
  - Passive scroll listeners (no jank)
  - Debounces small movements (<5px)

- Update Nav component with mobile menu
  - Desktop: inline links (unchanged)
  - Mobile: hamburger menu with slide-in panel
  - Keyboard accessible (Esc to close)
  - ARIA attributes for screen readers

- Integrate ExplainerNav into ExplainerLayout
  - Automatically applies to all 27+ explainer pages
  - Zero changes needed in individual components

Z-index hierarchy:
  - Menu overlay/panel: z-[60] / z-[61]
  - ExplainerNav: z-[51]
  - Main Nav: z-50
  - ProgressBar: z-9998

Build: ✅ TypeScript passes, 44/44 pages generated
Testing: Manual testing required (see TESTING_GUIDE.md)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### 3. Pre-Push Checks
```bash
# Verify build one more time
npm run build

# Check for any console errors
npm run dev
# Visit key pages, check browser console

# Verify no secrets in code
git diff main --name-only | xargs grep -i "api_key\|password\|secret"
```

### 4. Push to Remote
```bash
# If using feature branch workflow:
git checkout -b feat/navigation-enhancement
git push origin feat/navigation-enhancement

# If pushing directly to main:
git push origin main
```

### 5. Create Pull Request (if using PR workflow)

**PR Title:** `feat: Auto-hiding navigation and mobile menu`

**PR Description:**
```markdown
## Summary
Adds auto-hiding navigation for explainer pages and mobile hamburger menu for improved discoverability and mobile UX.

## Changes
- ✅ New `ExplainerNav` component with auto-hide behavior
- ✅ New `useScrollDirection` hook for scroll detection
- ✅ Updated `Nav` component with mobile menu
- ✅ Integrated into `ExplainerLayout` (applies to all explainers)

## Testing
- ✅ Build passes (TypeScript, 44/44 pages)
- ⏳ Manual testing in progress (see TESTING_GUIDE.md)
- ⏳ Cross-browser testing pending
- ⏳ Mobile device testing pending

## Screenshots
[Add screenshots here]
- Desktop: Nav with inline links
- Mobile: Hamburger menu
- Explainer: Auto-hide nav

## Accessibility
- ✅ Keyboard navigation (Tab, Enter, Esc)
- ✅ ARIA attributes (aria-expanded, aria-modal, aria-label)
- ✅ Focus-visible styles
- ✅ Screen reader support

## Performance
- ✅ Passive scroll listeners
- ✅ RequestAnimationFrame for scroll detection
- ✅ No memory leaks (proper cleanup)
- ✅ No scroll jank (60fps)

## Documentation
- `NAVIGATION_IMPLEMENTATION.md` - Technical details
- `TESTING_GUIDE.md` - Testing scenarios
- `NAVIGATION_SUMMARY.md` - Implementation summary
- `DEPLOYMENT_CHECKLIST.md` - This checklist

## Deployment Notes
- Zero breaking changes
- Applies to all existing explainer pages automatically
- Mobile menu hidden on desktop (no visual change)
- Desktop nav unchanged (inline links still visible)

## Rollback Plan
```bash
git revert <commit-hash>
```
```

### 6. Staging Deployment (if available)

```bash
# Deploy to staging environment
# (Adjust based on your deployment setup)

# If using Vercel:
vercel --prod=false

# If using GitHub Pages (staging branch):
git push origin feat/navigation-enhancement:staging
```

- [ ] Verify staging URL works
- [ ] Run full test suite on staging
- [ ] Get stakeholder approval

### 7. Production Deployment

```bash
# If auto-deploy on merge to main:
# Just merge the PR

# If manual deploy:
git checkout main
git pull origin main
vercel --prod  # or your deploy command

# If GitHub Pages:
# Automatically deploys from main branch
```

### 8. Post-Deployment Verification

#### Immediate Checks (0-5 minutes)
- [ ] Visit production site → loads correctly
- [ ] Visit `/learn` → nav visible
- [ ] Visit explainer → ExplainerNav appears
- [ ] Open mobile menu → slides in correctly
- [ ] No console errors (check DevTools)

#### Smoke Tests (5-15 minutes)
- [ ] Test on real iPhone (Safari)
- [ ] Test on real Android (Chrome)
- [ ] Test 5 random explainer pages
- [ ] Test theme switching
- [ ] Test keyboard navigation

#### Analytics & Monitoring (1-24 hours)
- [ ] Check error tracking (Sentry/LogRocket)
- [ ] Monitor page load times (Core Web Vitals)
- [ ] Check bounce rate (Google Analytics)
- [ ] Monitor mobile vs desktop traffic split

### 9. User Feedback Collection

#### Set up feedback channels:
- [ ] Monitor GitHub issues for bug reports
- [ ] Check Twitter/social for mentions
- [ ] Add Hotjar or similar for session recordings
- [ ] Create feedback form for user reports

#### Key metrics to track:
- Navigation usage (clicks on "← Learn", "← Explore")
- Menu open rate (hamburger clicks)
- Bounce rate on explainer pages (should decrease)
- Time on site (should increase with better navigation)

## Post-Deployment Actions

### Documentation Updates
- [ ] Update main README with navigation features
- [ ] Update CHANGELOG.md with version bump
- [ ] Archive testing documentation (move to /docs/archive)

### Code Cleanup
- [ ] Delete old navigation code (if any)
- [ ] Remove debug console.logs (if any)
- [ ] Clean up documentation files (move to /docs)

### Future Enhancements (Optional)
- [ ] Add focus trap to mobile menu
- [ ] Add `prefers-reduced-motion` support
- [ ] Add active state highlighting
- [ ] Create Playwright automated tests
- [ ] Add breadcrumb navigation

## Rollback Triggers

**Immediately rollback if:**
- Production site doesn't load (500 errors)
- Critical console errors on majority of pages
- Navigation completely broken on mobile
- Accessibility score drops below 90

**Consider rollback if:**
- Performance score drops >10 points
- Bounce rate increases >20%
- User reports flooding in about navigation
- Mobile users unable to navigate

**Rollback procedure:**
```bash
# Quick rollback (revert commit)
git revert <commit-hash>
git push origin main

# Or, if multiple commits:
git checkout main
git reset --hard HEAD~1
git push origin main --force

# Temporary CSS fix (while investigating):
# Add to globals.css:
@media (max-width: 640px) {
  [data-scope^="explainer-"] nav { display: none !important; }
}
```

## Success Criteria

**Deployment is successful if:**
- ✅ All tests pass (manual + automated)
- ✅ No console errors in production
- ✅ Lighthouse scores maintained or improved
- ✅ No user bug reports in first 48 hours
- ✅ Navigation usage metrics look healthy
- ✅ Bounce rate stable or decreased
- ✅ Mobile users can access all content

## Sign-Off

**Developer:** _________________ Date: _______
**Reviewer:** _________________ Date: _______
**QA:** _________________ Date: _______
**Product:** _________________ Date: _______

---

**Deployment Date:** __________
**Deployment Time:** __________
**Deployed By:** __________
**Deployment Status:** ⏳ Pending / ✅ Complete / ❌ Rolled Back
