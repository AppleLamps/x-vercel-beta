# Touch Interactions

## Touch Target Sizing

### Minimum Sizes

| Standard | Min Size | Recommended | Spacing |
|----------|----------|-------------|---------|
| Apple HIG | 44×44px | 44×44px | 8px |
| Material Design | 48×48dp | 48×48dp | 8dp |
| WCAG 2.2 AAA | 44×44px | 48×48px | - |

### Implementation

```css
/* Base touch target */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* Large touch target (recommended) */
.touch-target-lg {
  min-width: 48px;
  min-height: 48px;
  padding: 14px;
}

/* Extended hit area (invisible padding) */
.touch-target-extended {
  position: relative;
}
.touch-target-extended::before {
  content: '';
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
}
```

### Tailwind Pattern

```tsx
// Icon button with proper touch target
<button className="p-3 min-w-[44px] min-h-[44px] 
  flex items-center justify-center
  touch-manipulation">
  <Icon className="w-5 h-5" />
</button>

// Text button with proper touch target
<button className="px-4 py-3 min-h-[44px]
  touch-manipulation">
  {label}
</button>
```

## Touch Manipulation

### Remove 300ms Tap Delay

```css
/* Apply to all interactive elements */
button, a, input, select, textarea,
[role="button"], [tabindex] {
  touch-action: manipulation;
}

/* Or use Tailwind class */
.touch-manipulation { touch-action: manipulation; }
```

### Touch Action Values

| Value | Effect |
|-------|--------|
| `manipulation` | Allow pan & pinch, no double-tap zoom delay |
| `none` | Disable all touch behaviors |
| `pan-x` | Allow horizontal panning only |
| `pan-y` | Allow vertical panning only |
| `pinch-zoom` | Allow pinch zoom only |

## Active States

### Visual Feedback Pattern

```css
/* Immediate visual feedback */
.button {
  transition: transform 0.1s ease, opacity 0.1s ease;
}

.button:active {
  transform: scale(0.97);
  opacity: 0.9;
}

/* For lists and cards */
.list-item:active {
  background-color: rgba(0, 0, 0, 0.05);
}
```

### Tailwind Active States

```tsx
<button className="active:scale-95 active:opacity-90 
  transition-transform duration-100">
  Tap me
</button>

<div className="active:bg-gray-100 
  transition-colors duration-100">
  List item
</div>
```

## Gesture Handling

### Swipe Detection

```tsx
// Basic swipe detection hook
function useSwipe(onSwipe: (direction: 'left' | 'right') => void) {
  const touchStart = useRef<number>(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;
    
    if (Math.abs(diff) > 50) {
      onSwipe(diff > 0 ? 'left' : 'right');
    }
  };
  
  return { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd };
}
```

### Pull-to-Refresh

```css
/* Overscroll behavior for pull-to-refresh */
.scrollable-container {
  overscroll-behavior-y: contain;
}

/* Native pull-to-refresh on iOS */
body {
  overscroll-behavior: none; /* Disable if custom implementation */
}
```

## Haptic Feedback

### Web Vibration API

```tsx
// Light haptic feedback
const lightHaptic = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(10);
  }
};

// Success haptic pattern
const successHaptic = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate([10, 50, 10]);
  }
};
```

## Scroll Behavior

### Momentum Scrolling

```css
.scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
  overscroll-behavior: contain; /* Prevent scroll chaining */
}
```

### Scroll Snap

```css
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.scroll-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

### Hide Scrollbars (Mobile-First)

```css
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

## Preventing Unwanted Behaviors

### Disable Text Selection on Interactive Elements

```css
button, .interactive {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
```

### Prevent Image Dragging

```css
img {
  -webkit-user-drag: none;
  user-drag: none;
}
```

### Disable Context Menu on Long Press

```tsx
<div onContextMenu={(e) => e.preventDefault()}>
  {/* Content */}
</div>
```

## Accessibility with Touch

### Focus Visible for Touch vs Keyboard

```css
/* Only show focus ring for keyboard navigation */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid #007AFF;
  outline-offset: 2px;
}
```

### Touch Target Spacing

```css
/* Ensure sufficient spacing between touch targets */
.button-group {
  display: flex;
  gap: 8px; /* Minimum 8px spacing */
}

.nav-list li + li {
  margin-top: 4px;
}
```
