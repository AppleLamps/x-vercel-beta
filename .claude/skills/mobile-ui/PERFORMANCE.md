# Mobile Performance

## Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤2.5s | ≤4s | >4s |
| INP (Interaction to Next Paint) | ≤200ms | ≤500ms | >500ms |
| CLS (Cumulative Layout Shift) | ≤0.1 | ≤0.25 | >0.25 |

## Image Optimization

### Responsive Images

```tsx
<picture>
  {/* WebP for modern browsers */}
  <source 
    srcSet="/image-400.webp 400w, /image-800.webp 800w"
    type="image/webp"
    sizes="(max-width: 430px) 100vw, 430px"
  />
  {/* Fallback */}
  <img 
    src="/image-800.jpg"
    srcSet="/image-400.jpg 400w, /image-800.jpg 800w"
    sizes="(max-width: 430px) 100vw, 430px"
    alt="Description"
    loading="lazy"
    decoding="async"
    className="w-full h-auto"
  />
</picture>
```

### Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 430px) 100vw, 800px"
/>
```

### Image Size Guidelines

| Use Case | Max Width | Format |
|----------|-----------|--------|
| Full-width hero | 800px | WebP/AVIF |
| Card thumbnails | 400px | WebP |
| Avatars | 96px | WebP |
| Icons | 48px | SVG |

## Lazy Loading

### Native Lazy Loading

```html
<img src="image.jpg" loading="lazy" alt="...">
<iframe src="video.html" loading="lazy"></iframe>
```

### Intersection Observer Pattern

```tsx
function useLazyLoad() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

## CSS Performance

### Critical CSS

```html
<head>
  <!-- Inline critical CSS -->
  <style>
    /* Above-the-fold styles only */
    body { margin: 0; font-family: system-ui; }
    .header { height: 56px; }
  </style>
  
  <!-- Defer non-critical CSS -->
  <link rel="preload" href="/styles.css" as="style" onload="this.rel='stylesheet'">
</head>
```

### Avoid Layout Thrashing

```css
/* ❌ Bad: Causes reflow */
.animated {
  width: 100px;
  height: 100px;
  margin-left: var(--offset);
}

/* ✅ Good: Uses transform (GPU accelerated) */
.animated {
  transform: translateX(var(--offset));
}
```

### Will-Change (Use Sparingly)

```css
/* Only for elements about to animate */
.about-to-animate {
  will-change: transform;
}

/* Remove after animation */
.animation-complete {
  will-change: auto;
}
```

## JavaScript Performance

### Code Splitting

```tsx
// Route-based splitting (Next.js)
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

### Debounce & Throttle

```tsx
// Debounce for search input
const debouncedSearch = useMemo(
  () => debounce((query: string) => search(query), 300),
  []
);

// Throttle for scroll events
const throttledScroll = useMemo(
  () => throttle(() => updatePosition(), 16), // ~60fps
  []
);
```

### Event Delegation

```tsx
// ❌ Bad: Handler on each item
{items.map(item => (
  <div onClick={() => handleClick(item.id)} />
))}

// ✅ Good: Single handler on parent
<div onClick={(e) => {
  const id = (e.target as HTMLElement).dataset.id;
  if (id) handleClick(id);
}}>
  {items.map(item => (
    <div data-id={item.id} />
  ))}
</div>
```

## Font Loading

### Font Display Strategy

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
  font-weight: 400;
}
```

### Preload Critical Fonts

```html
<link 
  rel="preload" 
  href="/fonts/custom-400.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
>
```

## Network Optimization

### Resource Hints

```html
<head>
  <!-- DNS prefetch for external domains -->
  <link rel="dns-prefetch" href="//api.example.com">
  
  <!-- Preconnect for critical external resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  
  <!-- Prefetch likely next navigation -->
  <link rel="prefetch" href="/next-page.html">
</head>
```

### Service Worker Caching

```js
// Cache first strategy for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

## Animation Performance

### CSS-Only When Possible

```css
/* GPU-accelerated properties only */
.animate {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Avoid animating these (trigger layout) */
/* width, height, margin, padding, top, left, right, bottom */
```

### Reduce Motion Preference

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### React Implementation

```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  animate={{ opacity: 1 }}
  transition={{ 
    duration: prefersReducedMotion ? 0 : 0.3 
  }}
/>
```

## Memory Management

### Cleanup Event Listeners

```tsx
useEffect(() => {
  const handler = () => {};
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}, []);
```

### Avoid Memory Leaks

```tsx
useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    if (isMounted) setState(data);
  });
  
  return () => { isMounted = false; };
}, []);
```

## Bundle Size

### Analyze Bundle

```bash
# Next.js
npx @next/bundle-analyzer

# Generic
npx webpack-bundle-analyzer stats.json
```

### Tree Shaking

```tsx
// ❌ Bad: Imports entire library
import _ from 'lodash';
_.debounce();

// ✅ Good: Import only what you need
import debounce from 'lodash/debounce';
debounce();
```

## Performance Budget

| Resource | Budget |
|----------|--------|
| Total JS | < 200KB gzipped |
| Total CSS | < 50KB gzipped |
| LCP Image | < 100KB |
| Web Fonts | < 50KB |
| Third-party | < 100KB |
