# Project Structure

## Overview
This project recreates Eduard Bodak's portfolio animations in a separate folder within the main repository.

## Directory Structure

```
eduard-bodak-portfolio/
├── app/
│   ├── globals.css          # Global styles with animation support
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main page with all animations
├── components/
│   ├── FlippingCards.tsx     # 3D flipping cards on scroll
│   ├── MouseInteractiveCard.tsx  # Mouse-following 3D card
│   └── CircularWheel.tsx     # Rotating circular card wheel
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.mjs           # Next.js configuration
└── README.md                 # Project documentation
```

## Component Breakdown

### 1. FlippingCards.tsx
- **Purpose**: Creates a stack of cards that escape, flip, and return in 3D space
- **Technologies**: GSAP Timeline, ScrollTrigger
- **Key Features**:
  - Staggered escape sequence
  - 3D flip animation
  - Floating micro-animations
  - GPU-accelerated transforms

### 2. MouseInteractiveCard.tsx
- **Purpose**: A card that rotates in 3D following mouse movement
- **Technologies**: GSAP Ticker, matchMedia
- **Key Features**:
  - Real-time cursor tracking
  - Device detection (desktop/mobile)
  - Elastic return animation
  - Normalized positioning

### 3. CircularWheel.tsx
- **Purpose**: Cards arranged in a circle that rotates on scroll
- **Technologies**: CSS Grid, GSAP, ScrollTrigger
- **Key Features**:
  - Circular positioning with CSS transforms
  - Scroll-driven rotation
  - Gradient masking
  - Responsive sizing

## Running the Project

### Development
```bash
cd eduard-bodak-portfolio
npm run dev
```
Visit: http://localhost:3000

### Production Build
```bash
cd eduard-bodak-portfolio
npm run build
npm start
```

## Key Files to Explore

1. **app/page.tsx** - Main page layout and GSAP setup
2. **app/globals.css** - Custom animation styles and utilities
3. **components/*.tsx** - Individual animation components

## Animation Techniques

Each component demonstrates different GSAP and CSS techniques:

- **Timeline Sequencing**: Multiple animations coordinated on a timeline
- **ScrollTrigger**: Scroll-based animation triggers and scrubbing
- **3D Transforms**: rotateX, rotateY, rotateZ for depth
- **Perspective**: Creating realistic 3D space
- **GPU Acceleration**: force3D for smooth performance
- **Responsive Design**: matchMedia for device-specific animations
- **Accessibility**: prefers-reduced-motion support

## Browser Support

- Modern browsers with ES6+ support
- Hardware acceleration recommended
- Best experienced on desktop for full interactivity
