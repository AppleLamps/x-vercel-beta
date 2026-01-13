# Viewport & Safe Areas

## Viewport Meta Tag

### Recommended Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

### Parameters Explained

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `width=device-width` | Required | Match viewport to device width |
| `initial-scale=1` | Required | Set initial zoom level |
| `viewport-fit=cover` | Required for notch | Extend content to screen edges |

### Anti-Pattern: Avoid These

```html
<!-- ❌ NEVER do this - breaks accessibility -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

## Safe Area Insets

### CSS Environment Variables

```css
/* Available inset values */
env(safe-area-inset-top)    /* Dynamic Island, notch, status bar */
env(safe-area-inset-bottom) /* Home indicator */
env(safe-area-inset-left)   /* Landscape left */
env(safe-area-inset-right)  /* Landscape right */
```

### Device-Specific Values (Portrait)

| Device | Top | Bottom | Left/Right |
|--------|-----|--------|------------|
| iPhone 14/15/16 Pro | 59px | 34px | 0px |
| iPhone 14/15/16 Pro Max | 59px | 34px | 0px |
| iPhone SE (3rd gen) | 20px | 0px | 0px |
| iPhone 14/15/16 | 47px | 34px | 0px |

### Implementation Patterns

#### Full-Screen Layout

```css
.app-container {
  min-height: 100dvh; /* Dynamic viewport height */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

#### Fixed Header with Safe Area

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: calc(env(safe-area-inset-top) + 12px);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  height: calc(env(safe-area-inset-top) + 56px);
}
```

#### Fixed Bottom Navigation

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Content spacing to prevent overlap */
.main-content {
  padding-bottom: calc(env(safe-area-inset-bottom) + 60px);
}
```

### Tailwind CSS Integration

```tsx
// Using arbitrary values
<header className="fixed top-0 inset-x-0 
  pt-[calc(env(safe-area-inset-top)+12px)]
  h-[calc(env(safe-area-inset-top)+56px)]">
</header>

<nav className="fixed bottom-0 inset-x-0 
  pb-[env(safe-area-inset-bottom)]">
</nav>
```

### Tailwind Plugin (Optional)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
}
```

## Viewport Units

### Modern Units (Preferred)

```css
/* Dynamic Viewport (accounts for browser chrome) */
height: 100dvh;  /* Dynamic viewport height */
width: 100dvw;   /* Dynamic viewport width */

/* Small Viewport (smallest possible) */
height: 100svh;

/* Large Viewport (largest possible) */
height: 100lvh;
```

### When to Use Each

| Unit | Use Case |
|------|----------|
| `dvh` | Full-screen layouts, modals |
| `svh` | Elements that must always be visible |
| `lvh` | Background elements |
| `vh` | Legacy fallback only |

### Fallback Pattern

```css
.full-height {
  height: 100vh; /* Fallback */
  height: 100dvh; /* Modern browsers */
}
```

## Landscape Mode

### Handling Notch in Landscape

```css
@media (orientation: landscape) {
  .container {
    padding-left: max(env(safe-area-inset-left), 20px);
    padding-right: max(env(safe-area-inset-right), 20px);
  }
}
```

### Landscape-Specific Layouts

```css
@media (orientation: landscape) and (max-height: 500px) {
  /* Compact landscape mode (phone in landscape) */
  .header { height: 44px; }
  .content { flex-direction: row; }
}
```

## Keyboard Handling

### Virtual Keyboard Viewport

```css
/* Modern: Visual Viewport API */
.input-container {
  /* Stays above keyboard */
  position: fixed;
  bottom: env(keyboard-inset-height, 0);
}
```

### JavaScript Detection

```js
// Detect keyboard visibility
if ('visualViewport' in window) {
  window.visualViewport.addEventListener('resize', () => {
    const keyboardHeight = window.innerHeight - window.visualViewport.height;
    document.documentElement.style.setProperty(
      '--keyboard-height', 
      `${keyboardHeight}px`
    );
  });
}
```
