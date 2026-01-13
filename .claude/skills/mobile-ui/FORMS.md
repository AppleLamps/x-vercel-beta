# Mobile Forms & Inputs

## Input Types

### HTML5 Input Types for Mobile

| Type | Keyboard | Use Case |
|------|----------|----------|
| `type="email"` | Email keyboard | Email addresses |
| `type="tel"` | Phone keypad | Phone numbers |
| `type="number"` | Numeric keypad | Numbers only |
| `type="url"` | URL keyboard | Web addresses |
| `type="search"` | Search keyboard | Search fields |
| `type="date"` | Date picker | Date selection |
| `type="time"` | Time picker | Time selection |

### Implementation

```tsx
// Email input
<input 
  type="email"
  inputMode="email"
  autoComplete="email"
  autoCapitalize="none"
  spellCheck="false"
/>

// Phone input
<input 
  type="tel"
  inputMode="tel"
  autoComplete="tel"
/>

// Number input
<input 
  type="text" // Better than type="number" for UX
  inputMode="numeric"
  pattern="[0-9]*"
/>

// Credit card
<input 
  type="text"
  inputMode="numeric"
  autoComplete="cc-number"
  pattern="[0-9\s]{13,19}"
/>
```

## Preventing Zoom on Focus

### Critical: Use 16px Minimum Font Size

```css
/* iOS zooms inputs with font-size < 16px */
input, select, textarea {
  font-size: 16px; /* Minimum to prevent zoom */
  font-size: max(16px, 1rem); /* Responsive alternative */
}

/* ❌ NEVER do this */
input { font-size: 14px; } /* Will cause zoom */
```

### Tailwind Implementation

```tsx
<input className="text-base" /> {/* 16px */}

// If using smaller text, ensure it's 16px on mobile
<input className="text-sm md:text-base" /> // ❌ Wrong
<input className="text-base" /> // ✅ Correct
```

## Touch-Friendly Sizing

### Input Sizing

```css
input, select, textarea {
  min-height: 44px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
}

/* Large touch-friendly input */
.input-lg {
  min-height: 48px;
  padding: 14px 16px;
}
```

### Tailwind Component

```tsx
<input 
  className="w-full min-h-[44px] px-4 py-3 
    text-base rounded-lg border border-gray-300
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    touch-manipulation"
/>
```

## Label & Error Placement

### Mobile-First Layout

```tsx
// Labels above inputs (best for mobile)
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email
  </label>
  <input 
    type="email"
    className="w-full min-h-[44px] px-4 py-3 text-base rounded-lg border"
  />
  {error && (
    <p className="text-sm text-red-500">{error}</p>
  )}
</div>
```

### Floating Labels

```tsx
<div className="relative">
  <input
    type="text"
    id="name"
    placeholder=" "
    className="peer w-full min-h-[44px] px-4 pt-5 pb-2 text-base
      border rounded-lg focus:ring-2 focus:ring-blue-500"
  />
  <label
    htmlFor="name"
    className="absolute left-4 top-1/2 -translate-y-1/2
      text-gray-500 transition-all duration-200
      peer-placeholder-shown:text-base
      peer-focus:text-xs peer-focus:top-3 peer-focus:-translate-y-0
      peer-[:not(:placeholder-shown)]:text-xs 
      peer-[:not(:placeholder-shown)]:top-3"
  >
    Name
  </label>
</div>
```

## Autocomplete Attributes

### Common Autocomplete Values

```html
<!-- Personal info -->
<input autocomplete="name">
<input autocomplete="given-name">
<input autocomplete="family-name">
<input autocomplete="email">
<input autocomplete="tel">

<!-- Address -->
<input autocomplete="street-address">
<input autocomplete="address-line1">
<input autocomplete="city">
<input autocomplete="postal-code">
<input autocomplete="country">

<!-- Payment -->
<input autocomplete="cc-name">
<input autocomplete="cc-number">
<input autocomplete="cc-exp">
<input autocomplete="cc-csc">

<!-- Authentication -->
<input autocomplete="username">
<input autocomplete="current-password">
<input autocomplete="new-password">
<input autocomplete="one-time-code">
```

## Keyboard Handling

### Dismiss Keyboard

```tsx
// Blur input on form submit
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  (document.activeElement as HTMLElement)?.blur();
  // Submit logic
};

// Close keyboard on outside tap
<div 
  onTouchStart={(e) => {
    if (e.target === e.currentTarget) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }}
>
```

### Enter Key Behavior

```tsx
// Move to next input
<input 
  enterKeyHint="next"
  onKeyDown={(e) => {
    if (e.key === 'Enter') nextInputRef.current?.focus();
  }}
/>

// Submit on enter
<input 
  enterKeyHint="done"
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSubmit();
  }}
/>

// Search on enter
<input 
  enterKeyHint="search"
  type="search"
/>
```

### Enter Key Hint Values

| Value | Use Case |
|-------|----------|
| `enter` | Default newline |
| `done` | Complete input |
| `go` | Navigate |
| `next` | Move to next field |
| `previous` | Move to previous field |
| `search` | Execute search |
| `send` | Send message |

## Select Elements

### Native Select Styling

```tsx
<div className="relative">
  <select 
    className="w-full min-h-[44px] px-4 py-3 pr-10
      text-base appearance-none bg-white
      border rounded-lg focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select option</option>
    <option value="1">Option 1</option>
  </select>
  <ChevronDownIcon 
    className="absolute right-4 top-1/2 -translate-y-1/2 
      w-5 h-5 text-gray-400 pointer-events-none" 
  />
</div>
```

## Checkboxes & Radio Buttons

### Touch-Friendly Sizing

```tsx
<label className="flex items-center gap-3 min-h-[44px] cursor-pointer">
  <input 
    type="checkbox"
    className="w-5 h-5 rounded border-gray-300 
      text-blue-600 focus:ring-blue-500"
  />
  <span className="text-base">Accept terms</span>
</label>
```

### Custom Checkbox

```tsx
<label className="flex items-center gap-3 min-h-[44px]">
  <div className="relative">
    <input 
      type="checkbox"
      className="sr-only peer"
    />
    <div className="w-6 h-6 border-2 rounded 
      peer-checked:bg-blue-600 peer-checked:border-blue-600
      peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2">
    </div>
    <CheckIcon 
      className="absolute inset-0 w-6 h-6 text-white 
        opacity-0 peer-checked:opacity-100" 
    />
  </div>
  <span>Option</span>
</label>
```

## Textarea

### Auto-Resize Pattern

```tsx
function AutoResizeTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      className="w-full min-h-[100px] max-h-[300px] px-4 py-3
        text-base resize-none overflow-y-auto
        border rounded-lg focus:ring-2 focus:ring-blue-500"
      rows={3}
    />
  );
}
```

## Form Validation

### Real-Time Validation

```tsx
<input
  type="email"
  pattern="[^@]+@[^@]+\.[^@]+"
  required
  className="peer invalid:border-red-500 
    invalid:focus:ring-red-500"
/>
<p className="hidden peer-invalid:block text-sm text-red-500 mt-1">
  Please enter a valid email
</p>
```

### Validation States

```css
/* Valid state */
input:valid {
  border-color: #10b981;
}

/* Invalid state (only after interaction) */
input:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
}

/* Focus state */
input:focus {
  outline: none;
  ring: 2px solid #3b82f6;
}
```

## Password Fields

### Show/Hide Toggle

```tsx
function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        autoComplete="current-password"
        className="w-full min-h-[44px] px-4 py-3 pr-12
          text-base border rounded-lg"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2
          p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
```

## OTP / Verification Code

### Individual Digit Inputs

```tsx
function OTPInput({ length = 6 }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);
    
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          autoComplete="one-time-code"
          className="w-12 h-14 text-center text-xl font-semibold
            border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
}
```
