# Mobile Typography

## Base Font Size

### Minimum Readable Sizes

| Context | Min Size | Recommended |
|---------|----------|-------------|
| Body text | 16px | 16-18px |
| Secondary text | 14px | 14-16px |
| Captions | 12px | 12-14px |
| Labels (all caps) | 11px | 11-12px |

### Why 16px Minimum?

- Prevents iOS auto-zoom on form inputs
- Readable without zooming
- Accessible for users with vision impairments

## Fluid Typography

### CSS Clamp Method

```css
:root {
  /* Fluid scale: min, preferred, max */
  --text-xs: clamp(0.75rem, 2vw + 0.5rem, 0.875rem);
  --text-sm: clamp(0.875rem, 2vw + 0.625rem, 1rem);
  --text-base: clamp(1rem, 2vw + 0.75rem, 1.125rem);
  --text-lg: clamp(1.125rem, 2.5vw + 0.75rem, 1.25rem);
  --text-xl: clamp(1.25rem, 3vw + 0.75rem, 1.5rem);
  --text-2xl: clamp(1.5rem, 4vw + 0.75rem, 2rem);
  --text-3xl: clamp(1.875rem, 5vw + 0.75rem, 2.5rem);
  --text-4xl: clamp(2.25rem, 6vw + 0.75rem, 3rem);
}

body {
  font-size: var(--text-base);
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
```

### Tailwind Custom Scale

```js
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      'xs': ['clamp(0.75rem, 2vw + 0.5rem, 0.875rem)', { lineHeight: '1.4' }],
      'sm': ['clamp(0.875rem, 2vw + 0.625rem, 1rem)', { lineHeight: '1.5' }],
      'base': ['clamp(1rem, 2vw + 0.75rem, 1.125rem)', { lineHeight: '1.6' }],
      'lg': ['clamp(1.125rem, 2.5vw + 0.75rem, 1.25rem)', { lineHeight: '1.5' }],
      'xl': ['clamp(1.25rem, 3vw + 0.75rem, 1.5rem)', { lineHeight: '1.4' }],
      '2xl': ['clamp(1.5rem, 4vw + 0.75rem, 2rem)', { lineHeight: '1.3' }],
      '3xl': ['clamp(1.875rem, 5vw + 0.75rem, 2.5rem)', { lineHeight: '1.2' }],
    },
  },
}
```

## Line Height

### Recommended Values

| Text Type | Line Height | Use Case |
|-----------|-------------|----------|
| Headings | 1.1 - 1.3 | Titles, headers |
| Body | 1.5 - 1.7 | Paragraphs, content |
| UI Labels | 1.2 - 1.4 | Buttons, nav |
| Dense UI | 1.3 - 1.4 | Lists, tables |

```css
h1, h2, h3 { line-height: 1.2; }
p, li { line-height: 1.6; }
button, .label { line-height: 1.3; }
```

## Line Length

### Optimal Reading Width

```css
/* 45-75 characters per line optimal */
.prose {
  max-width: 65ch;
}

/* Mobile-specific constraint */
@media (max-width: 430px) {
  .prose {
    max-width: 100%;
    padding: 0 16px;
  }
}
```

### Tailwind Implementation

```tsx
<article className="max-w-prose mx-auto px-4">
  <p className="text-base leading-relaxed">
    {content}
  </p>
</article>
```

## Font Weight

### Weight Scale for Mobile

```css
:root {
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

/* Avoid thin weights on mobile - poor rendering */
/* Minimum 400 for body, 500+ for emphasis */
```

### Usage Guidelines

| Element | Weight | Reason |
|---------|--------|--------|
| Body text | 400 | Readability |
| Labels | 500 | Slight emphasis |
| Headings | 600-700 | Clear hierarchy |
| Buttons | 500-600 | Visible CTA |

## System Fonts

### Native Font Stack

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 
    'Segoe UI Emoji';
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, 
    Consolas, 'Liberation Mono', monospace;
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Why System Fonts?

- Zero loading time
- Native look and feel
- Optimized for each OS
- Dynamic Type support on iOS

## Letter Spacing

### Adjustments for Mobile

```css
/* Tighter for large headings */
h1 { letter-spacing: -0.02em; }
h2 { letter-spacing: -0.01em; }

/* Slightly looser for small text */
.caption { letter-spacing: 0.01em; }

/* All caps always needs more spacing */
.uppercase { letter-spacing: 0.05em; }
```

## Text Truncation

### Single Line Truncation

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### Multi-Line Truncation

```css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## Word Breaking

### Prevent Overflow

```css
.break-words {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

/* For URLs and long strings */
.break-all {
  word-break: break-all;
}
```

## Dark Mode Typography

### Reduced Contrast for Dark Mode

```css
@media (prefers-color-scheme: dark) {
  body {
    color: rgba(255, 255, 255, 0.87); /* Not pure white */
  }
  
  .secondary-text {
    color: rgba(255, 255, 255, 0.6);
  }
  
  h1, h2, h3 {
    color: rgba(255, 255, 255, 0.95);
  }
}
```

## Dynamic Type (iOS)

### Supporting User Preferences

```css
/* Respect user's font size preferences */
html {
  font-size: 100%; /* Allows browser font scaling */
}

/* Use rem units for scalability */
body { font-size: 1rem; }
h1 { font-size: 2rem; }

/* Never use px for font sizes */
```

### Testing Dynamic Type

1. iOS: Settings → Accessibility → Display & Text Size → Larger Text
2. Test with smallest and largest settings
3. Ensure layouts don't break with larger text
