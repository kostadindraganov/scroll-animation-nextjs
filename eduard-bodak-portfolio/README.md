# Eduard Bodak Portfolio - Animation Recreation

A recreation of the stunning scroll-based animations from Eduard Bodak's portfolio, inspired by the Codrops article ["Built to Move: A Closer Look at the Animations Behind Eduard Bodak's Portfolio"](https://tympanus.net/codrops/2025/07/29/built-to-move-a-closer-look-at-the-animations-behind-eduard-bodaks-portfolio/).

## 🎨 Features

This project recreates three main animation techniques:

### 1. **Flipping 3D Cards on Scroll**
- Cards escape in a staggered sequence with horizontal and vertical displacement
- 3D flip animation with perspective transforms
- Floating micro-animations for added depth
- Two-phase animation: escape sequence and return with flip

### 2. **Mouse-Interactive Rotating Card**
- Real-time 3D rotation following mouse cursor position
- Device capability detection (desktop vs mobile)
- Elastic easing for smooth return animation
- Normalized positioning for natural interaction

### 3. **Circular Card Wheel with Scroll Rotation**
- Cards arranged in a perfect circle using CSS Grid
- Scroll-driven rotation animation
- Gradient masking for cards falling out of view
- Fluid responsive sizing with em units

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **GSAP** - Professional-grade animation library
- **ScrollTrigger** - Scroll-based animation plugin for GSAP
- **Tailwind CSS** - Utility-first CSS framework

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

## 🎯 Animation Techniques

### GSAP Timeline with ScrollTrigger

The flipping cards use GSAP timelines synchronized with scroll progress:

```typescript
const escapeTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: '+=200%',
    scrub: 1,
    pin: true,
  },
});
```

### Mouse Interaction with GSAP Ticker

The interactive card uses GSAP's ticker for smooth, frame-by-frame updates:

```typescript
const updateCardRotation = () => {
  const normalizedX = (mouseX - cardCenterX) / (cardRect.width / 2);
  const rotateY = normalizedX * 25;

  gsap.to(card, {
    rotationY: rotateY,
    force3D: true,
  });
};

gsap.ticker.add(updateCardRotation);
```

### CSS Grid Circular Positioning

Cards are positioned in a circle using CSS Grid and transforms:

```css
.wheel-card {
  grid-area: stack;
  transform: rotate(calc(var(--wheel-angle) * var(--wheel-index))) translateY(-100%);
}
```

## ♿ Accessibility

- **Reduced Motion Support**: Respects `prefers-reduced-motion` media query
- **Mobile Optimization**: Simplified animations for mobile devices
- **Device Detection**: GSAP matchMedia for appropriate animation selection
- **Performance**: GPU-accelerated transforms with `force3D: true`

## 📱 Responsive Design

- Desktop: Full 3D animations with mouse interaction
- Tablet: Simplified scroll animations
- Mobile: Touch-optimized interactions with reduced complexity

## 🎓 Learning Resources

This recreation was built by studying:
- The original Codrops article about Eduard Bodak's portfolio
- GSAP documentation and ScrollTrigger examples
- Modern CSS animation techniques
- 3D transforms and perspective in CSS

## 📝 Key Concepts Demonstrated

1. **3D Transforms** - rotationX, rotationY, rotationZ for depth
2. **Perspective** - Creating realistic 3D space
3. **Timeline Sequencing** - Complex multi-step animations
4. **Scroll Scrubbing** - Synchronized scroll-based animations
5. **Stagger Effects** - Sequential delays for visual interest
6. **Match Media** - Responsive animation behavior
7. **Custom Properties** - CSS variables for dynamic animations
8. **Performance Optimization** - GPU acceleration and efficient rendering

## 🚀 Performance Optimizations

- `force3D: true` enables GPU acceleration
- `will-change` CSS property for transform optimization
- GSAP's `clearProps` to remove inline styles when needed
- Conditional animation loading based on device capabilities
- Efficient event handling with GSAP ticker

## 📄 License

This is a learning project created for educational purposes, inspired by Eduard Bodak's portfolio and the Codrops article.

## 🙏 Credits

- **Original Portfolio**: Eduard Bodak
- **Article**: Codrops - "Built to Move: A Closer Look at the Animations Behind Eduard Bodak's Portfolio"
- **Animation Library**: GreenSock (GSAP)
- **Framework**: Next.js by Vercel

---

Built with ❤️ as a study of modern web animation techniques
