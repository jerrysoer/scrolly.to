# Navigation Enhancement Testing Guide

## Quick Start

```bash
cd /Users/jsmacair/Claude/projects/ship-suite/scrolly.to
npm run dev
```

Visit: http://localhost:3000

## Test Scenarios

### ✅ Test 1: Main Nav - Desktop Navigation (≥640px)

**URL:** http://localhost:3000/learn

**Expected behavior:**
- Nav bar at top with "scrolly.to" logo on left
- "Explore" and "Learn" links visible in center
- GitHub icon visible
- "Get updates" button visible
- **NO hamburger menu icon**

**Screenshot locations:**
- Top nav bar should show all links inline
- Hover "Explore" → should change to `text-text` color
- Hover "Learn" → should change to `text-text` color

### ✅ Test 2: Main Nav - Mobile Menu (<640px)

**URL:** http://localhost:3000/learn

**Expected behavior:**
1. Resize browser to <640px width (or use DevTools mobile mode)
2. "Explore" and "Learn" links should be **HIDDEN**
3. Hamburger menu icon (☰) should be **VISIBLE** (left of GitHub icon)
4. Click hamburger → menu slides in from right
5. Menu shows:
   - Explore
   - Learn
   - GitHub ↗
   - Get updates (green button)
6. Click "Learn" → navigates to /learn, menu closes
7. Click backdrop (dark overlay) → menu closes
8. Press **Esc key** → menu closes

**Accessibility:**
- Tab to hamburger → should show focus outline
- Press Enter → menu opens
- Menu button should have `aria-expanded="true"` when open

### ✅ Test 3: ExplainerNav - Auto-Hide Behavior (Desktop)

**URL:** http://localhost:3000/learn/butterfly-metamorphosis-explainer

**Expected behavior:**
1. Page loads → nav bar visible at top with "← Learn" link
2. Nav shows: "← Learn" (left), "scrolly.to" (center), hamburger (right)
3. Scroll down slowly (~400px):
   - Nav should **slide up and hide**
   - ProgressBar (thin colored line) should remain visible
4. Scroll back up:
   - Nav should **slide down and show** immediately
5. Stay at top (scrollY < 300px):
   - Nav should always be visible

**Visual checks:**
- Nav background should have blur effect (translucent)
- Nav should respect explainer's theme colors (dark/light)
- ThemeToggle (sun/moon icon) in top-right should remain visible
- No overlap with ProgressBar

### ✅ Test 4: ExplainerNav - Section Context Awareness

**Test "Learn" section:**
- http://localhost:3000/learn/butterfly-metamorphosis-explainer
- Nav should show: **"← Learn"**
- Click "← Learn" → returns to http://localhost:3000/learn

**Test "Explore" section:**
- http://localhost:3000/explore/claude-code-skills-explainer
- Nav should show: **"← Explore"**
- Click "← Explore" → returns to http://localhost:3000/explore

### ✅ Test 5: ExplainerNav - Mobile Menu (on Explainer)

**URL:** http://localhost:3000/learn/butterfly-metamorphosis-explainer

**Resize to mobile (<640px):**

**Expected behavior:**
1. Nav shows: "← Learn" (left), hamburger (right)
2. **NO "scrolly.to" wordmark** (hidden on mobile)
3. Click hamburger → menu slides in from right
4. Menu structure same as main Nav
5. Click "Explore" → navigates to /explore
6. Menu closes automatically

**Scroll behavior:**
- Scroll down → nav hides
- Click hamburger while scrolled down → nav shows (with menu)
- Menu should be usable even when nav would normally be hidden

### ✅ Test 6: Z-Index Layering (No Conflicts)

**URL:** http://localhost:3000/learn/how-tariffs-actually-work

**Visual inspection:**
1. ProgressBar (top, thin colored line) → should be **below nav bar**
2. Open hamburger menu → menu should be **above everything**
3. ThemeToggle (top-right sun/moon) → should be **above content** but **below menu**
4. Scroll indicator dots (if present) → should not conflict with nav

**DevTools check:**
- Inspect ProgressBar → z-index: 9998
- Inspect ExplainerNav → z-index: 51
- Inspect menu backdrop → z-index: 60
- Inspect menu panel → z-index: 61

### ✅ Test 7: Theme Compatibility (Dark/Light)

**URL:** http://localhost:3000/learn/butterfly-metamorphosis-explainer

**Test dark mode:**
1. Click ThemeToggle (top-right) → switch to dark mode
2. Nav background should use `var(--bg-primary)` (dark)
3. Nav text should use `var(--text-primary)` (light)
4. Nav border should use `var(--border)`
5. Menu should match theme

**Test light mode:**
1. Click ThemeToggle again → switch to light mode
2. All colors should update correctly
3. No white-on-white or black-on-black text

### ✅ Test 8: Multiple Explainers (Verify Layout Integration)

Visit each of these and verify nav works correctly:

**Learn section:**
- http://localhost:3000/learn/butterfly-metamorphosis-explainer
- http://localhost:3000/learn/how-tariffs-actually-work
- http://localhost:3000/learn/how-eyes-see-color
- http://localhost:3000/learn/how-wifi-connects

**Explore section:**
- http://localhost:3000/explore/claude-code-skills-explainer
- http://localhost:3000/explore/microgpt-explainer
- http://localhost:3000/explore/git-worktrees-explainer

**For each:**
- ✅ Nav appears
- ✅ "← Learn" or "← Explore" is correct
- ✅ Auto-hide works on scroll
- ✅ Hamburger menu works
- ✅ No layout breaks

### ✅ Test 9: Keyboard Accessibility

**URL:** http://localhost:3000/learn

**Keyboard navigation:**
1. Press **Tab** repeatedly → should cycle through:
   - Logo link
   - "Explore" link (desktop)
   - "Learn" link (desktop)
   - GitHub icon
   - "Get updates" button
   - Hamburger menu (mobile)
2. Tab to hamburger, press **Enter** → menu opens
3. Press **Esc** → menu closes
4. Press **Tab** in menu → should cycle through menu links
5. Press **Enter** on menu link → navigates

**Focus visibility:**
- All interactive elements should show focus outline (blue ring)
- Focus outline should be visible against all backgrounds

### ✅ Test 10: Performance (No Jank)

**URL:** http://localhost:3000/learn/butterfly-metamorphosis-explainer

**DevTools Performance Test:**
1. Open Chrome DevTools → Performance tab
2. Start recording
3. Scroll up and down rapidly for 5 seconds
4. Stop recording
5. Check for:
   - **No red bars** (long tasks)
   - **Smooth 60fps** line (no drops)
   - **Passive listeners** in Event Log

**Scroll listener check:**
- Open Console
- Type: `getEventListeners(window)['scroll']`
- Verify: `passive: true` on scroll listeners

### ✅ Test 11: Cross-Browser Compatibility

**Desktop browsers:**
- Chrome (latest) → all features work
- Safari (latest) → backdrop-blur renders correctly
- Firefox (latest) → menu transitions smooth

**Mobile browsers:**
- iOS Safari → no horizontal scroll, smooth animations
- Chrome Android → menu swipe works, no layout shift

### ✅ Test 12: Edge Cases

**Fast scrolling:**
- Scroll down quickly (wheel or trackpad) → nav hides smoothly
- Scroll up quickly → nav shows immediately (no delay)

**Menu spam:**
- Open/close menu rapidly 10 times → no visual glitches
- Click hamburger, immediately click backdrop → closes cleanly

**Theme switching in menu:**
- Open menu → switch theme → menu colors update
- Menu should not close when theme changes

**Browser back button:**
- Open menu → navigate to another page → press Back
- Menu should be closed on return (not stuck open)

## Automated Testing (Future)

Create Playwright tests for critical paths:

```typescript
// test/navigation.spec.ts
test('ExplainerNav shows and hides on scroll', async ({ page }) => {
  await page.goto('/learn/butterfly-metamorphosis-explainer');

  // Nav should be visible initially
  await expect(page.locator('nav').first()).toBeVisible();

  // Scroll down
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);

  // Nav should be hidden
  await expect(page.locator('nav').first()).not.toBeVisible();

  // Scroll up
  await page.evaluate(() => window.scrollBy(0, -500));
  await page.waitForTimeout(500);

  // Nav should be visible again
  await expect(page.locator('nav').first()).toBeVisible();
});

test('Mobile menu opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  await page.goto('/learn');

  // Click hamburger
  await page.click('[aria-label="Open menu"]');

  // Menu should be visible
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  // Press Escape
  await page.keyboard.press('Escape');

  // Menu should be closed
  await expect(page.locator('[role="dialog"]')).not.toBeVisible();
});
```

## Visual Regression Testing

Take screenshots before/after changes:

```bash
# Baseline (before implementation)
npx playwright screenshot \
  --viewport-size="1280,720" \
  http://localhost:3000/learn/butterfly-metamorphosis-explainer \
  baseline-desktop.png

npx playwright screenshot \
  --viewport-size="375,667" \
  http://localhost:3000/learn \
  baseline-mobile.png

# Compare (after implementation)
npx playwright screenshot \
  --viewport-size="1280,720" \
  http://localhost:3000/learn/butterfly-metamorphosis-explainer \
  after-desktop.png

npx playwright screenshot \
  --viewport-size="375,667" \
  http://localhost:3000/learn \
  after-mobile.png
```

## Known Issues to Watch For

1. **iOS Safari bounce scroll** - Backdrop blur may flicker on overscroll
   - Solution: Add `position: fixed` body when menu open

2. **Firefox backdrop-filter** - May not render on older versions
   - Solution: Fallback to solid background with opacity

3. **Horizontal scroll on mobile** - Menu panel may cause overflow
   - Solution: Add `overflow-x: hidden` to body when menu open

4. **Focus trap edge case** - Tab may escape menu on some browsers
   - Solution: Implement proper focus trap (react-focus-lock)

5. **Scroll position jump** - Hiding nav may cause content shift
   - Solution: Ensure nav uses `position: fixed` (already implemented)

## Success Metrics

After testing, verify:

- ✅ 0 TypeScript errors
- ✅ 0 console errors on any page
- ✅ 0 console warnings related to navigation
- ✅ 100% of explainer pages render nav correctly
- ✅ Lighthouse Accessibility score ≥95
- ✅ No performance regression (60fps scrolling)
- ✅ All keyboard shortcuts work
- ✅ Screen reader announces menu state changes

## Deployment Checklist

Before merging to production:

1. ✅ All tests pass (manual + automated)
2. ✅ Build completes with no errors (`npm run build`)
3. ✅ Lighthouse audit passes (Performance ≥90, Accessibility ≥95)
4. ✅ Cross-browser testing complete
5. ✅ Mobile testing on real devices (iOS + Android)
6. ✅ Documentation updated (README, NAVIGATION_IMPLEMENTATION.md)
7. ✅ Changelog entry added
8. ✅ Git commit with clear message
9. ✅ PR created with screenshots
10. ✅ Code review approved

## Rollback Plan

If critical issues are found in production:

1. Revert commits:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. Temporary fix (hide nav on mobile):
   ```css
   @media (max-width: 640px) {
     .explainer-nav { display: none; }
   }
   ```

3. Investigation:
   - Check Sentry/error logs
   - Review user reports
   - Test in failing environment
   - Fix and redeploy
