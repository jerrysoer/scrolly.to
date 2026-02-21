# Plan: Integrate trader-joes-explainer into scrolly.to/explore

## Context

The trader-joes-explainer was originally prepared for deployment as a standalone subdomain at `trader-joes.scrolly.to`. However, the user now wants to integrate it into the main scrolly.to site at `/explore/trader-joes` instead.

This requires porting the 3-part explainer from its standalone Next.js app structure into scrolly.to's registry-based dynamic routing system.

**Current state:**
- Standalone project at `/Users/jsmacair/Claude/projects/scrolly/trader-joes-explainer`
- 3 parts (Origin Story, Playbook, Cult Machine) with 25 total sections
- 63 files committed with all components, data, and assets
- Organic/natural design with interactive features (CEO era chart, hover states, theme toggle)
- Security audited (LOW risk rating)
- SEO/GEO complete with JSON-LD structured data

**Integration architecture:**
scrolly.to uses a registry-based system where explainers are:
1. Registered in `src/lib/explainers/registry.ts` with metadata
2. Dynamically loaded at `/explore/[slug]` via Next.js App Router
3. Wrapped in ExplainerLayout with theme initialization and analytics
4. Listed in `/explore` index page with custom card art

## Implementation Approach

### Phase 1: Add Registry Entry

**File:** `src/lib/explainers/registry.ts`

Add trader-joes entry to the registry:
```typescript
"trader-joes": {
  slug: "trader-joes",
  section: "explore",
  title: "The Trader Joe's Story",
  description: "How a Stanford MBA turned LA convenience stores into America's most beloved grocery brand — a 3-part interactive series.",
  category: "Business",
  scopeName: "explainer-trader-joes",
  themeKey: "trader-joes-theme",
  defaultTheme: "light",
  datePublished: "2026-02-21",
  keywords: ["Trader Joe's", "Joe Coulombe", "retail", "grocery", "business strategy", "Acquired"],
  fonts: "dispatch", // Editorial tone, data-heavy
  faqs: [
    {
      question: "Who founded Trader Joe's?",
      answer: "Joe Coulombe, a Stanford MBA, founded Trader Joe's in 1967 in Pasadena, California."
    },
    {
      question: "Why is Trader Joe's so popular?",
      answer: "Trader Joe's built its cult following through private-label products, curated selection, competitive pricing, and a unique tiki-themed store culture."
    },
    {
      question: "Who owns Trader Joe's?",
      answer: "Trader Joe's has been owned by Aldi Nord since 1979, though it operates completely independently."
    }
  ],
  component: () => import("@/components/explainers/trader-joes/ExplainerApp"),
}
```

### Phase 2: Port Component Structure

**Create new directory:** `src/components/explainers/trader-joes/`

#### 2.1 Main Component (ExplainerApp.tsx)
Port the Part1App, Part2App, Part3App structure into a single ExplainerApp that handles multi-part navigation.

**Approach:**
- Create a client component that manages part state (1, 2, or 3)
- Use URL hash or query param to track current part (#part-1, #part-2, #part-3)
- Import all section components from their respective part directories
- Reuse shared components from scrolly.to's `src/components/explainers/shared/`

#### 2.2 Data Files
**Create:** `src/components/explainers/trader-joes/data/`
- `part-1.ts` - Origin Story data
- `part-2.ts` - Playbook data
- `part-3.ts` - Cult Machine data
- `series.ts` - Multi-part navigation metadata

Copy directly from standalone project's `data/` directory.

#### 2.3 Section Components
**Create:** `src/components/explainers/trader-joes/sections/`
```
sections/
├── part-1/
│   ├── HeroSection.tsx
│   ├── OriginSection.tsx
│   ├── SevenElevenSection.tsx
│   ├── EpiphanySection.tsx
│   ├── LiquorSection.tsx
│   ├── MalibuSection.tsx
│   ├── FirstStoreSection.tsx
│   ├── CloneMissionSection.tsx
│   ├── FAQSection.tsx
│   └── BuyoutSection.tsx
├── part-2/
│   ├── HeroSection.tsx
│   ├── LessIsMoreSection.tsx
│   ├── PrivateLabelSection.tsx
│   ├── FearlessFlyerSection.tsx
│   ├── PayPeopleWellSection.tsx
│   ├── IntentionalStoreSection.tsx
│   └── AlbrechtSection.tsx
└── part-3/
    ├── HeroSection.tsx
    ├── TreasureHuntSection.tsx
    ├── TwoBuckChuckSection.tsx
    ├── AntiGrocerSection.tsx
    ├── FanEconomySection.tsx (interactive with organic design)
    ├── ReckoningSection.tsx
    ├── JoesFarewellSection.tsx
    └── MachineTodaySection.tsx (interactive CEO era chart)
```

Copy directly from standalone project, update imports to use scrolly.to's shared components.

#### 2.4 Shared Components to Reuse
Instead of copying, import from `src/components/explainers/shared/`:
- SectionWrapper ✅
- ThemeToggle ✅
- ProgressBar ✅
- SectionNav ✅
- CompletionCard ✅
- ScrollyFooter ✅

**Custom components to port:**
- CounterAnimation (used in stats)
- PullQuote (used in narrative sections)
- TimelineStepper (used in Part 1)
- StickyDiagram (used in Part 2)
- PartNav (multi-part navigation)

### Phase 3: Assets & Public Files

#### 3.1 Copy Generated Assets
**Copy from:** `public/generated/` in standalone project
**To:** `public/generated/trader-joes/`

Images needed:
- All Part 1 images (joe-coulombe-portrait, seven-eleven-exterior, etc.)
- All Part 2 images (fearless-flyer, hawaiian-shirt-crew, etc.)
- All Part 3 images (fan-economy-haul, cult-machine-hero, etc.)

#### 3.2 OG Image
**Copy:** `public/og-image.png`
**To:** `public/og-trader-joes.png`

Update registry to reference this image in metadata.

### Phase 4: Styling Integration

#### 4.1 Theme CSS
The standalone project uses inline theme variables in `globals.css`.

**Options:**
1. **Scoped CSS** - Add scoped styles in ExplainerApp with `[data-scope="explainer-trader-joes"]`
2. **Global theme extension** - Add trader-joes theme to `src/app/globals.css` with scoping

**Recommended:** Option 1 (scoped CSS in component file)

```tsx
// In ExplainerApp.tsx
<style jsx global>{`
  [data-scope="explainer-trader-joes"] {
    --bg-primary: #faf8f3;
    --bg-card: #FFFFFF;
    --bg-secondary: #f5edd6;
    --text-primary: #1a2744;
    --text-secondary: #4a5568;
    --text-tertiary: #8b9cb5;
    --border: #d4c5a9;
    --accent-red: #c0392b;
    --accent-gold: #b8860b;
    --accent-navy: #1a2744;
    --accent-green: #2d6a4f;
  }
  [data-scope="explainer-trader-joes"][data-theme="dark"] {
    --bg-primary: #0f1419;
    --bg-card: #1a1f29;
    --bg-secondary: #242a35;
    --text-primary: #e8eef5;
    --text-secondary: #c5d1de;
    --text-tertiary: #8b9cb5;
    --border: #2d3748;
  }
}`}</style>
```

#### 4.2 Animations
Copy animation keyframes from standalone project's `globals.css`:
- `fade-in`, `rise-up`, `pulse-glow`, `slide-up`
- `float` (for $0 price tag)
- `scroll-reveal`

Add to scoped styles or global CSS with scoping.

### Phase 5: Update Explore Index

**File:** `src/app/explore/page.tsx`

Add card art for trader-joes in the CARD_ART object:
```typescript
const CARD_ART: Record<string, {...}> = {
  // ... existing entries
  "trader-joes": {
    gradient: "from-[#faf8f4] to-[#f5edd6]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none">
        {/* Shopping bag with $0 price tag and Hawaiian shirt pattern */}
        {/* Copy from Gallery.tsx SVG */}
      </svg>
    )
  }
}
```

### Phase 6: Update Gallery Component

**File:** `src/components/Gallery.tsx`

Change the trader-joes card URL from external to internal:
```typescript
{
  title: "The Trader Joe's Story",
  desc: "How a Stanford MBA turned LA convenience stores into America's most beloved grocery brand — 3-part interactive series.",
  category: "Business",
  gradient: "from-[#faf8f4] to-[#f5edd6]",
  url: "/explore/trader-joes", // CHANGED from https://trader-joes.scrolly.to
  svg: (/* keep existing SVG */)
}
```

### Phase 7: Analytics Integration

The ExplainerLayout component automatically handles analytics via:
- Engagement pixel with `data-explainer="trader-joes"`
- Theme initialization from localStorage
- SEO metadata injection

**No additional work needed** - registry config drives this.

### Phase 8: Update Standalone Project URLs

**File (standalone):** `trader-joes-explainer/app/layout.tsx`

Update siteUrl for reference/documentation:
```typescript
const siteUrl = "https://scrolly.to/explore/trader-joes"; // Updated from trader-joes.scrolly.to
```

This keeps the standalone project in sync if we ever need to deploy it separately.

## Critical Files

### Files to Create in scrolly.to:
- `src/lib/explainers/registry.ts` (modify - add entry)
- `src/components/explainers/trader-joes/ExplainerApp.tsx` (new)
- `src/components/explainers/trader-joes/data/*.ts` (new - 4 files)
- `src/components/explainers/trader-joes/sections/**/*.tsx` (new - 25 files)
- `src/app/explore/page.tsx` (modify - add card art)
- `src/components/Gallery.tsx` (modify - change URL)
- `public/generated/trader-joes/*.png` (copy assets)
- `public/og-trader-joes.png` (copy OG image)

### Files to Reference:
- `trader-joes-explainer/components/` - source for all section components
- `trader-joes-explainer/data/` - source for data files
- `trader-joes-explainer/public/generated/` - source for assets
- `trader-joes-explainer/app/globals.css` - source for theme CSS

## Implementation Checklist

### Step 1: Registry & Routing
- [ ] Add trader-joes entry to `src/lib/explainers/registry.ts`
- [ ] Verify dynamic route at `/explore/trader-joes` auto-generates

### Step 2: Component Structure
- [ ] Create `src/components/explainers/trader-joes/` directory
- [ ] Create `ExplainerApp.tsx` with multi-part state management
- [ ] Copy data files to `data/` subdirectory
- [ ] Port all 25 section components to `sections/` subdirectory
- [ ] Update imports to use scrolly.to shared components

### Step 3: Assets
- [ ] Copy all images from `public/generated/` to `public/generated/trader-joes/`
- [ ] Copy OG image to `public/og-trader-joes.png`
- [ ] Update image paths in components to reference new locations

### Step 4: Styling
- [ ] Add scoped theme CSS to ExplainerApp
- [ ] Copy animation keyframes
- [ ] Test theme toggle works (light/dark)
- [ ] Verify all interactive elements render correctly

### Step 5: Discovery
- [ ] Add card art to `src/app/explore/page.tsx`
- [ ] Update Gallery.tsx URL to `/explore/trader-joes`
- [ ] Verify explainer appears in both locations

### Step 6: Testing
- [ ] Build succeeds: `npm run build`
- [ ] All 3 parts load at `/explore/trader-joes`
- [ ] Part navigation works (hash or query param)
- [ ] Interactive chart in Part 3 Section 8 works (hover states)
- [ ] Theme toggle persists across parts
- [ ] Analytics pixel fires
- [ ] SEO metadata correct

### Step 7: Deploy
- [ ] Push to scrolly.to repository
- [ ] Deploy to Vercel
- [ ] Verify live at `https://scrolly.to/explore/trader-joes`
- [ ] Test on mobile, tablet, desktop
- [ ] Run Lighthouse audit (target: 90+ all metrics)

## Notes

### Why This Approach?
- **Single deployment**: scrolly.to handles all explainers
- **Discoverability**: Appears in /explore index and homepage Gallery
- **Consistency**: Uses shared components and layout system
- **Analytics**: Unified tracking across all explainers
- **Maintenance**: Updates to shared components benefit all explainers

### Trade-offs
- **Standalone independence**: Can't deploy trader-joes separately without rebuilding
- **Bundle size**: Adds ~200KB to scrolly.to build
- **Iteration speed**: Changes require full scrolly.to rebuild/deploy

### Alternatives Considered
1. **External subdomain** (trader-joes.scrolly.to): Rejected per user request
2. **Static export + embed**: Overcomplicated, loses interactivity
3. **Monorepo with nx/turborepo**: Overkill for 10 explainers

## Verification

### Build Test
```bash
cd /Users/jsmacair/Claude/projects/ship-suite/scrolly.to
npm run build
```

Expected output:
- ✓ Compiled successfully
- Static pages include: `/explore/trader-joes`
- No TypeScript errors
- No missing imports

### Local Test
```bash
npm run dev
```

Navigate to:
- `http://localhost:3000/explore/trader-joes` - Explainer loads
- `http://localhost:3000/explore` - Card appears with correct link
- `http://localhost:3000/#gallery` - Gallery card links internally

### Feature Test
- [ ] Part 1: All 10 sections render
- [ ] Part 2: All 7 sections render
- [ ] Part 3: All 8 sections render
- [ ] Part 3 Section 5: Fan Economy with floating $0 tag, interactive metrics
- [ ] Part 3 Section 8: Machine Today with interactive CEO era chart
- [ ] Theme toggle: Light/dark switch works across parts
- [ ] Progress bar: Updates on scroll
- [ ] Section nav: Jump to section works
- [ ] Footer: Acquired podcast link works
- [ ] Share button: Generates correct URL

### Analytics Test
```bash
# Check pixel fires
curl -I https://scrolly.to/explore/trader-joes | grep -i "x-explainer"
```

Expected: `data-explainer="trader-joes"` attribute on pixel script

### Performance Test
```bash
npx lighthouse https://scrolly.to/explore/trader-joes --view
```

Target scores:
- Performance: 90+ (interactive chart may impact)
- Accessibility: 95+
- Best Practices: 100
- SEO: 100
