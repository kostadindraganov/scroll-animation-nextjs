# Inverted Radius Cards Design

**Date:** 2025-11-14
**Status:** Approved
**Goal:** Replace current work cards with inverted radius hover effect, convert to TypeScript

## Overview

Implement the inverted radius shape hover effect from the CodePen demo into the existing Next.js Work component. Each card will feature an image with an expanding caption that reveals project name and description on hover, using advanced CSS masking techniques.

## Architecture & Component Structure

### Components

- **InvertedCard.tsx** - Individual card component with inverted radius effect
- **Work.tsx** - Refactored to TypeScript, renders InvertedCard components
- **project.ts** - TypeScript type definitions for project data

### Key Architectural Decisions

1. **CSS-in-JS approach** - Use CSS modules (`.module.css`) for scoped, organized styles
2. **React-based rendering** - Render cards as React components (no DOM manipulation)
3. **Preserve GSAP animations** - Keep scroll-triggered animations, apply to new structure

### CSS Custom Properties

- `--w`: Card width (280px default)
- `--r`: Border radius (0.5em default)
- `--_x`: Dynamic expansion value (0px → calculated on hover)

### File Structure

```
src/
  components/
    Work/
      Work.tsx (converted from .js)
      Work.module.css
      InvertedCard.tsx (new)
      InvertedCard.module.css (new)
      project.ts (converted from .js)
```

## TypeScript Types & Data Flow

### Type Definitions

```typescript
export interface Project {
  name: string;
  description: string;
  img: string;
  route: string;
}

interface InvertedCardProps {
  project: Project;
  isAlt: boolean; // determines left vs right alignment
}
```

### Data Flow

1. `Work.tsx` maps through the `projects` array
2. For each row (2 cards):
   - First card gets `isAlt={false}` (caption expands right)
   - Second card gets `isAlt={true}` (caption expands left)
3. Each `InvertedCard` receives project data and renders
4. GSAP animations target rendered card elements after mount

### Hover Interaction

- Pure CSS - no JavaScript needed for inverted radius effect
- Hover triggers CSS transition on `--_x` variable
- Caption width expands to reveal name + description
- Image mask animates to create corner cutout effect

## CSS Implementation Details

### Layout

- `display: grid` with `place-items: end end` (normal) or `place-items: end start` (alt)
- Image and caption both occupy `grid-area: 1/1` (overlapping)
- Caption positioned at bottom corner using `translate`

### The Inverted Radius Effect

Uses 5 layered mask images to create the cutout:

1. **Two radial gradients** - Create the inverted corner circles
2. **One small radial gradient** - Smooths the caption connection point
3. **Two conic gradients** - Fill the rectangular cutout areas

### Caption Animation

- Starts with `width: calc(1lh + var(--_x))` where `--_x: 0px`
- On hover: `--_x: calc(var(--w) - 3*var(--r) - text-width)`
- `transition: --_x 0.5s` creates smooth expansion
- `overflow: hidden` hides text until expanded
- `clip-path: inset(5px round 1lh)` creates pill shape

### Text Handling for Name + Description

- Caption has flexible height (not fixed `1lh`)
- Larger line-height for name, smaller text for description
- Adjusted padding to accommodate both lines
- May need to increase `--w` for longer text

### Responsive Considerations

- Card width adjustable via `--w` CSS variable
- Border radius via `--r` variable
- All mask calculations relative to these values

## GSAP Animation Integration

### Scroll Animation Strategy

Keep existing scroll-triggered animations, adapt for new card structure:

**Animation Sequence (per row):**

1. Cards start at `y: 1000, rotation: -60/60`
2. Left card: `rotation: -60`, right card: `rotation: 60`
3. On scroll trigger (start: "top 50%"):
   - Animate to `y: 0, rotation: 0`
   - `duration: 1, ease: "power4.out"`
   - `stagger: 0.25` between cards

### Implementation Changes

- Render React components instead of `document.createElement`
- Use `useRef` to target cards after render
- Apply same ScrollTrigger logic to `.inverted-card` class
- Keep two-column row structure

### Performance

- CSS transitions handle hover effects (GPU-accelerated)
- GSAP handles scroll animations (optimized)
- No JavaScript needed for inverted radius masking

## Card Layout Pattern

**Row-based alternating (Option B):**

Each row of 2 cards has mirrored alignment:
- Left card: Caption on bottom-right (normal)
- Right card: Caption on bottom-left (alt)

Creates balanced, symmetrical visual rhythm.

## Testing & Verification

### Manual Testing Checklist

1. Visual verification - Inverted radius effect on both left/right cards
2. Hover interaction - Caption expands smoothly, mask animates
3. Text overflow - Name + description fit in expanded caption
4. Scroll animations - Cards animate in from below with rotation
5. Responsive behavior - Cards work at different viewport sizes
6. TypeScript compilation - No type errors, proper inference

### Browser Compatibility

- CSS `@property` requires modern browsers (Chrome 85+, Safari 15.4+)
- Fallback: Static caption without transition on older browsers
- CSS masking widely supported

### Edge Cases

- Very long project names or descriptions (text truncation)
- Images with different aspect ratios (maintain 1:1 with `aspect-ratio`)
- Mobile/tablet layouts (may need single column)

### Success Criteria

- All cards display with inverted radius effect
- Hover reveals name + description smoothly
- Scroll animations work as before
- TypeScript compiles without errors
- Clean, maintainable code structure

## Implementation Notes

- Start with TypeScript conversion of existing files
- Create InvertedCard component with CSS modules
- Test individual card before full integration
- Integrate GSAP animations last
- Verify on multiple browsers
