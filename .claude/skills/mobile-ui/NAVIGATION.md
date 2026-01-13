# Mobile Navigation Patterns

## Bottom Tab Navigation

### Standard Implementation

```tsx
function BottomNav() {
  const [active, setActive] = useState('home');
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50
      bg-white border-t border-gray-200
      pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-14">
        {[
          { id: 'home', icon: HomeIcon, label: 'Home' },
          { id: 'search', icon: SearchIcon, label: 'Search' },
          { id: 'notifications', icon: BellIcon, label: 'Alerts' },
          { id: 'profile', icon: UserIcon, label: 'Profile' },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex flex-col items-center justify-center
              min-w-[64px] min-h-[44px] px-3 py-2
              touch-manipulation
              ${active === id ? 'text-blue-600' : 'text-gray-600'}`}
            aria-label={label}
            aria-current={active === id ? 'page' : undefined}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-0.5">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
```

### Guidelines

- **Max 5 items** (prefer 4)
- **Icon + Label** for clarity
- **Active state** clearly visible
- **Touch target**: Min 44×44px per item
- **Safe area**: Always include `pb-[env(safe-area-inset-bottom)]`

## Header Navigation

### Fixed Header with Safe Area

```tsx
function Header({ title, onBack, actions }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50
      bg-white/95 backdrop-blur-sm border-b border-gray-200
      pt-[env(safe-area-inset-top)]">
      <div className="flex items-center justify-between h-14 px-2">
        {/* Back button */}
        <button
          onClick={onBack}
          className="min-w-[44px] min-h-[44px] p-2
            flex items-center justify-center
            touch-manipulation"
          aria-label="Go back"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        
        {/* Title */}
        <h1 className="text-lg font-semibold truncate px-2">
          {title}
        </h1>
        
        {/* Actions */}
        <div className="flex items-center">
          {actions}
        </div>
      </div>
    </header>
  );
}
```

### Large Title (iOS Style)

```tsx
function LargeTitleHeader({ title, scrollY }) {
  const isCollapsed = scrollY > 50;
  
  return (
    <>
      {/* Fixed small header */}
      <header className={`fixed top-0 left-0 right-0 z-50
        pt-[env(safe-area-inset-top)] transition-all duration-200
        ${isCollapsed ? 'bg-white/95 backdrop-blur-sm border-b' : 'bg-transparent'}`}>
        <div className="flex items-center h-14 px-4">
          <h1 className={`text-lg font-semibold transition-opacity
            ${isCollapsed ? 'opacity-100' : 'opacity-0'}`}>
            {title}
          </h1>
        </div>
      </header>
      
      {/* Inline large title */}
      <div className={`px-4 pt-2 pb-4 transition-opacity
        ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </>
  );
}
```

## Drawer / Side Menu

### Sheet-Style Drawer

```tsx
function Drawer({ isOpen, onClose, children }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50
        w-[280px] max-w-[80vw] bg-white
        transform transition-transform duration-300 ease-out
        pl-[env(safe-area-inset-left)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {children}
      </div>
    </>
  );
}
```

### Swipe to Open

```tsx
function SwipeDrawer({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const startX = useRef(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;
    
    // Open drawer on right swipe from edge
    if (startX.current < 20 && diff > 50) {
      setIsOpen(true);
    }
    // Close on left swipe
    if (isOpen && diff < -50) {
      setIsOpen(false);
    }
  };
  
  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Drawer>
    </div>
  );
}
```

## Bottom Sheet

### Modal Bottom Sheet

```tsx
function BottomSheet({ isOpen, onClose, children }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className={`fixed inset-x-0 bottom-0 z-50
        bg-white rounded-t-2xl
        transform transition-transform duration-300 ease-out
        pb-[env(safe-area-inset-bottom)]
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-4 pb-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
```

### Drag to Dismiss

```tsx
function DraggableBottomSheet({ isOpen, onClose, children }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) setDragY(diff);
  };
  
  const handleTouchEnd = () => {
    if (dragY > 100) {
      onClose();
    }
    setDragY(0);
  };
  
  return (
    <div
      ref={sheetRef}
      style={{ transform: `translateY(${dragY}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="..."
    >
      {children}
    </div>
  );
}
```

## Tab Navigation (Horizontal)

### Scrollable Tabs

```tsx
function ScrollableTabs({ tabs, active, onChange }) {
  const tabsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Auto-scroll to active tab
    const activeTab = tabsRef.current?.children[active] as HTMLElement;
    activeTab?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }, [active]);
  
  return (
    <div 
      ref={tabsRef}
      className="flex overflow-x-auto scrollbar-hide
        border-b border-gray-200
        -webkit-overflow-scrolling: touch"
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onChange(index)}
          className={`flex-shrink-0 px-4 py-3 min-h-[44px]
            text-sm font-medium whitespace-nowrap
            border-b-2 transition-colors touch-manipulation
            ${active === index 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-600 border-transparent'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

## Search Navigation

### Expandable Search

```tsx
function ExpandableSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isExpanded) inputRef.current?.focus();
  }, [isExpanded]);
  
  return (
    <div className="flex items-center">
      <div className={`flex items-center overflow-hidden
        transition-all duration-300 ease-out
        ${isExpanded ? 'w-full' : 'w-10'}`}>
        {isExpanded && (
          <input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            className="w-full min-h-[44px] px-4 py-2
              text-base bg-gray-100 rounded-full"
            onBlur={() => setIsExpanded(false)}
          />
        )}
      </div>
      
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="min-w-[44px] min-h-[44px] p-2
            flex items-center justify-center"
          aria-label="Open search"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
```

## Contextual Actions

### Action Sheet

```tsx
function ActionSheet({ isOpen, onClose, actions }) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="space-y-1">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              action.onPress();
              onClose();
            }}
            className={`w-full min-h-[48px] px-4 py-3
              text-left text-base
              active:bg-gray-100 touch-manipulation
              ${action.destructive ? 'text-red-600' : 'text-gray-900'}`}
          >
            <div className="flex items-center gap-3">
              {action.icon && <action.icon className="w-5 h-5" />}
              <span>{action.label}</span>
            </div>
          </button>
        ))}
      </div>
      
      <button
        onClick={onClose}
        className="w-full min-h-[48px] mt-2 px-4 py-3
          text-center text-base font-medium
          bg-gray-100 rounded-lg touch-manipulation"
      >
        Cancel
      </button>
    </BottomSheet>
  );
}
```

## Floating Action Button (FAB)

### Standard FAB

```tsx
function FloatingActionButton({ icon: Icon, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="fixed z-40
        right-4 bottom-[calc(env(safe-area-inset-bottom)+72px)]
        w-14 h-14 rounded-full
        bg-blue-600 text-white shadow-lg
        flex items-center justify-center
        active:scale-95 transition-transform
        touch-manipulation"
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}
```

### Extended FAB

```tsx
function ExtendedFAB({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed z-40
        right-4 bottom-[calc(env(safe-area-inset-bottom)+72px)]
        h-14 px-6 rounded-full
        bg-blue-600 text-white shadow-lg
        flex items-center gap-2
        active:scale-95 transition-transform
        touch-manipulation"
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
```

## Navigation Transitions

### Page Slide Transition

```css
/* Enter from right */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* Exit to left */
@keyframes slideOutLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-30%); }
}

.page-enter {
  animation: slideInRight 0.3s ease-out;
}

.page-exit {
  animation: slideOutLeft 0.3s ease-out;
}
```

### Shared Element Transition (View Transitions API)

```css
/* Enable view transitions */
@view-transition {
  navigation: auto;
}

/* Shared element */
.shared-element {
  view-transition-name: shared-image;
}

::view-transition-old(shared-image),
::view-transition-new(shared-image) {
  animation-duration: 0.3s;
}
```
