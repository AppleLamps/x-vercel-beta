# Mobile UI Testing Checklist

## Pre-Launch Checklist

### Viewport & Layout

- [ ] Viewport meta tag includes `viewport-fit=cover`
- [ ] Safe areas handled (Dynamic Island, notch, home indicator)
- [ ] Content doesn't overlap with system UI
- [ ] Layout works in both portrait and landscape
- [ ] No horizontal scroll on any screen size
- [ ] Dynamic viewport units (`dvh`) used where needed

### Touch Targets

- [ ] All interactive elements ≥44×44px
- [ ] Minimum 8px spacing between touch targets
- [ ] `touch-manipulation` applied to interactive elements
- [ ] No adjacent targets that could cause mis-taps
- [ ] FABs and critical actions have larger targets (56×56px)

### Typography

- [ ] Base font size ≥16px
- [ ] Input fields use 16px font (no zoom on iOS)
- [ ] Line height appropriate for readability (1.5+ for body)
- [ ] Text truncation handles long content gracefully
- [ ] Dark mode has appropriate contrast (not pure white)

### Forms & Inputs

- [ ] Correct input types for each field (email, tel, etc.)
- [ ] Proper autocomplete attributes set
- [ ] enterKeyHint appropriate for each input
- [ ] Validation errors clearly visible
- [ ] Keyboard doesn't obscure inputs
- [ ] Form is usable with one thumb

### Navigation

- [ ] Bottom nav has safe area padding
- [ ] Header accounts for status bar/Dynamic Island
- [ ] Back gesture works (iOS swipe from edge)
- [ ] Active states clearly visible
- [ ] Navigation accessible via screen reader

### Performance

- [ ] LCP < 2.5s on 3G connection
- [ ] Total JS bundle < 200KB gzipped
- [ ] Images lazy loaded below the fold
- [ ] No layout shift on image/ad load
- [ ] Animations use transform/opacity only

### Accessibility

- [ ] Focus visible for keyboard users
- [ ] Reduced motion preference respected
- [ ] Color contrast ≥4.5:1 for text
- [ ] Interactive elements have labels
- [ ] Content reflows at 400% zoom

---

## Device Testing Matrix

### Must Test Devices

| Device | Width | DPR | Key Features |
|--------|-------|-----|--------------|
| iPhone SE | 375px | 2x | Smallest modern iPhone |
| iPhone 14/15/16 | 390px | 3x | Standard size |
| iPhone 14/15/16 Pro | 393px | 3x | Dynamic Island |
| iPhone 14/15/16 Pro Max | 430px | 3x | Largest iPhone |
| Android (small) | 360px | 2-3x | Common Android size |
| Android (medium) | 393px | 2-3x | Pixel-sized |
| Android (large) | 412px | 3-4x | Samsung Galaxy |

### Viewport Sizes to Test

```
375 × 667  - iPhone SE
390 × 844  - iPhone 14/15/16
393 × 852  - iPhone 14/15/16 Pro
430 × 932  - iPhone 14/15/16 Pro Max
360 × 800  - Common Android
393 × 873  - Pixel
412 × 915  - Samsung Galaxy
```

---

## Testing Scenarios

### Orientation Tests

- [ ] Portrait mode works correctly
- [ ] Landscape mode works correctly
- [ ] Rotation doesn't break layout
- [ ] Landscape handles notch on both sides

### Gesture Tests

- [ ] Pull-to-refresh works (if implemented)
- [ ] Swipe navigation works
- [ ] Pinch-to-zoom doesn't break layout
- [ ] Long-press doesn't trigger unintended actions

### Keyboard Tests

- [ ] Virtual keyboard doesn't hide inputs
- [ ] Scroll position maintained when keyboard opens
- [ ] Keyboard dismisses appropriately
- [ ] Tab order is logical

### Network Tests

- [ ] Usable on slow 3G connection
- [ ] Offline state handled gracefully
- [ ] Loading states visible
- [ ] Error states clear and actionable

### Edge Cases

- [ ] Very long text doesn't break layout
- [ ] Empty states handled
- [ ] Large images don't cause overflow
- [ ] Deep linking works correctly

---

## Browser DevTools Testing

### Chrome DevTools Mobile Emulation

1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device or set custom dimensions
4. Enable touch simulation
5. Test with throttling (Slow 3G)

### Safari Responsive Design Mode

1. Enable Developer menu (Preferences → Advanced)
2. Develop → Enter Responsive Design Mode
3. Select iOS device or custom size

### Firefox Responsive Design Mode

1. Open DevTools (F12)
2. Click responsive design mode icon
3. Select device preset or custom

---

## Automated Testing

### Lighthouse Checks

```bash
# Run Lighthouse mobile audit
npx lighthouse https://example.com --view \
  --preset=perf \
  --form-factor=mobile \
  --throttling-method=simulate
```

### Key Lighthouse Scores (Mobile)

| Metric | Target |
|--------|--------|
| Performance | ≥90 |
| Accessibility | ≥90 |
| Best Practices | ≥90 |
| SEO | ≥90 |

### Playwright Mobile Testing

```ts
import { test, devices } from '@playwright/test';

test.use(devices['iPhone 14 Pro']);

test('mobile navigation', async ({ page }) => {
  await page.goto('/');
  
  // Check touch target sizes
  const button = page.locator('button').first();
  const box = await button.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(44);
  expect(box?.height).toBeGreaterThanOrEqual(44);
  
  // Check no horizontal scroll
  const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
  const clientWidth = await page.evaluate(() => document.body.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});
```

### Cypress Mobile Testing

```ts
describe('Mobile UI', () => {
  beforeEach(() => {
    cy.viewport('iphone-14');
  });
  
  it('has proper touch targets', () => {
    cy.get('button').each(($btn) => {
      cy.wrap($btn)
        .invoke('outerWidth')
        .should('be.gte', 44);
      cy.wrap($btn)
        .invoke('outerHeight')
        .should('be.gte', 44);
    });
  });
});
```

---

## Real Device Testing

### iOS Testing

1. Connect iPhone via USB
2. Enable Web Inspector (Settings → Safari → Advanced)
3. Open Safari DevTools on Mac
4. Debug → [Device Name] → [Page]

### Android Testing

1. Enable USB debugging (Settings → Developer Options)
2. Connect Android via USB
3. Open `chrome://inspect` in desktop Chrome
4. Click "inspect" on target page

### Remote Testing Services

- BrowserStack
- Sauce Labs
- LambdaTest
- AWS Device Farm

---

## Common Issues & Fixes

### Issue: iOS zoom on input focus

**Fix**: Ensure input font-size ≥16px

### Issue: Content hidden behind notch

**Fix**: Add `padding-top: env(safe-area-inset-top)`

### Issue: Bottom content hidden by home indicator

**Fix**: Add `padding-bottom: env(safe-area-inset-bottom)`

### Issue: 300ms tap delay

**Fix**: Add `touch-action: manipulation` to interactive elements

### Issue: Horizontal scroll appearing

**Fix**: Check for elements wider than viewport, add `overflow-x: hidden`

### Issue: Layout shift on images

**Fix**: Add explicit `width` and `height` attributes, use `aspect-ratio`

### Issue: Janky scroll on iOS

**Fix**: Add `-webkit-overflow-scrolling: touch` to scroll containers

### Issue: Touch targets too small

**Fix**: Use `min-width: 44px; min-height: 44px;` on all buttons/links

---

## Sign-Off

- [ ] All checklist items verified
- [ ] Tested on minimum 3 real devices
- [ ] No critical accessibility issues
- [ ] Performance targets met
- [ ] Ready for production
