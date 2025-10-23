# Animated Beams Integration ✨

## Overview
Successfully integrated [shadcn's AnimatedBeam component](https://www.shadcn.io/components/special-effects/animated-beam) across the Valuto landing page to create dynamic visual connections between related elements.

## Implementation Date
October 23, 2025

## Components Integrated

### 1. AnimatedBeam Component (`components/ui/shadcn-io/animated-beam.tsx`)
- **Framework**: Built with Motion (Framer Motion successor)
- **Features**: 
  - SVG-based path animations
  - Bidirectional flow support
  - Customizable gradients and curvature
  - Responsive with ResizeObserver
  - TypeScript support

### 2. Hero Section (`Hero.tsx`)
**Connections**: 3 stat cards with flowing circular pattern
- **Forward flow**: Card 1 → 2 → 3 with alternating curves
- **Reverse flow**: Card 3 → 1 creating a continuous loop

**Configuration**:
```typescript
duration: 3-5 seconds
pathColor: "#86efac" (bright green for contrast)
pathWidth: 2-3px
pathOpacity: 0.2-0.4
curvature: ±60 for dramatic waves
```

**Styling**:
- Green gradient cards: `from-valuto-green-600 to-valuto-green-700`
- White text with light green labels
- Hover effects: shadow-xl and translate-y
- Matches Impact Stats section design

### 3. How It Works Section (`WhatWeDo.tsx`)
**Connections**: 4 workflow steps connected in sequence
- **Step 1 → Step 2**: Curved upward (-50 curvature)
- **Step 2 → Step 3**: Curved downward (+50 curvature)
- **Step 3 → Step 4**: Curved upward (-50 curvature)

**Configuration**:
```typescript
duration: 3-3.5 seconds
pathColor: "#d1fae5" (light green)
pathWidth: 3px
gradientColors: #15a34a → #22c55e (Valuto green theme)
```

### 4. What Makes Us Different Section (`WhatMakesUsDifferent.tsx`)
**Connections**: 6 feature cards with multiple connection patterns
- **Horizontal connections**: Adjacent cards in rows
- **Diagonal connections**: Cross-row relationships
- **Pattern**: Creates a network effect showing how features interconnect

**Configuration**:
```typescript
duration: 4-5.5 seconds (varied for organic feel)
pathColor: "#d1fae5" (light green)
pathWidth: 2px
pathOpacity: 0.2-0.3 (varied for depth)
delays: Staggered from 0-1.2 seconds
```

**Connection Strategy**:
- Top row: Youth-Led Team → Workshops → Gamified Platform
- Diagonals: Youth-Led → Prizes, Platform → Year-Round Support
- Bottom row: Prizes → Topics → Year-Round Support

### 5. Impact Stats Section (`ImpactStats.tsx`)
**Connections**: 4 stat cards in a flowing circular pattern
- **Forward flow**: Stats 1 → 2 → 3 → 4 with alternating curves
- **Reverse flow**: Stat 4 → 1 creating a continuous loop

**Configuration**:
```typescript
duration: 3-5 seconds
pathColor: "#86efac" (brighter green for contrast on dark cards)
pathWidth: 2-3px
pathOpacity: 0.2-0.4
curvature: ±60 for dramatic waves
```

## Technical Details

### Dependencies
```json
{
  "motion": "^11.11.17"
}
```

### Key Props Used

| Prop | Type | Purpose |
|------|------|---------|
| `containerRef` | RefObject | Parent container for positioning |
| `fromRef` | RefObject | Starting element |
| `toRef` | RefObject | Ending element |
| `curvature` | number | Curve amount (+ down, - up) |
| `duration` | number | Animation duration in seconds |
| `delay` | number | Start delay for staggered effects |
| `pathColor` | string | Static path background color |
| `pathWidth` | number | Path thickness in pixels |
| `pathOpacity` | number | Static path opacity (0-1) |
| `gradientStartColor` | string | Animated gradient start |
| `gradientStopColor` | string | Animated gradient end |
| `reverse` | boolean | Reverses animation direction |

### Color Palette
All beams use Valuto's green theme:
- **Primary Green**: `#15a34a` / `#22c55e`
- **Light Green (paths)**: `#d1fae5`
- **Bright Green (accents)**: `#86efac`

## Visual Effects

### Animation Characteristics
1. **Smooth cubic bezier curves** for natural flow
2. **Staggered delays** prevent visual chaos
3. **Varied durations** create organic movement
4. **Bidirectional support** for circular patterns
5. **Responsive** - automatically adjusts to screen size

### Design Decisions
- **Subtle opacity** on background paths (0.2-0.4) to avoid distraction
- **Bright gradients** that match Valuto's brand
- **Varied curvature** to create dynamic, non-repetitive patterns
- **Z-index management** to keep beams behind content

## Browser Compatibility
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Performance
- Uses `transform-gpu` for hardware acceleration
- ResizeObserver for efficient responsiveness
- Infinite loop animations with requestAnimationFrame
- Minimal DOM manipulation

## Future Enhancements
- [ ] Add interaction (pause on hover)
- [ ] Theme-aware colors (dark mode)
- [ ] Additional beam patterns for other sections
- [ ] Particle effects along beams
- [ ] Sound effects on beam completion (optional)

## References
- [shadcn AnimatedBeam Documentation](https://www.shadcn.io/components/special-effects/animated-beam)
- [Motion Documentation](https://motion.dev/)
- [SVG Path Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)

---

**Status**: ✅ Complete
**Last Updated**: October 23, 2025
**Tested**: Desktop & Mobile responsive

