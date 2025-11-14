# Inverted Radius Cards Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace current work cards with inverted radius hover effect and convert to TypeScript

**Architecture:** Create InvertedCard component using CSS masking for inverted corner radius effect. Cards use CSS @property for smooth hover transitions. GSAP scroll animations preserved for entrance effects. Row-based mirrored layout (left card normal, right card alt).

**Tech Stack:** Next.js 15, TypeScript, React 19, GSAP 3, CSS Modules, CSS @property

---

## Task 1: Convert project.js to TypeScript

**Files:**
- Modify: `src/components/Work/project.js` → rename to `project.ts`

**Step 1: Rename file to TypeScript**

```bash
cd '/Users/cyberkoko/Desktop/codegrid/codegrid-mubien-scroll-animation-nextjs copy'
mv src/components/Work/project.js src/components/Work/project.ts
```

**Step 2: Add TypeScript interface**

In `src/components/Work/project.ts`, add interface before the array:

```typescript
export interface Project {
  name: string;
  description: string;
  img: string;
  route: string;
}

export const projects: Project[] = [
  // ... existing array stays the same
];
```

**Step 3: Verify no TypeScript errors**

Run: `npm run build`
Expected: Build succeeds (may have warnings about Work.js not being TS yet)

**Step 4: Commit**

```bash
git add src/components/Work/project.ts
git commit -m "feat: convert project.js to TypeScript with Project interface"
```

---

## Task 2: Create InvertedCard CSS Module

**Files:**
- Create: `src/components/Work/InvertedCard.module.css`

**Step 1: Create CSS module file**

Create `src/components/Work/InvertedCard.module.css` with complete styles:

```css
@property --_x {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

.card {
  --w: 340px;
  --r: 0.5em;

  display: grid;
  place-items: end end;
  transition: --_x 0.5s;
  cursor: pointer;
  margin: 0;
  position: relative;
}

.card.alt {
  place-items: end start;
}

.card > * {
  grid-area: 1/1;
}

.card:hover {
  --_x: calc(var(--w) - 3*var(--r) - 12em);
}

.image {
  width: var(--w);
  aspect-ratio: 1;
  border-radius: var(--r);
  object-fit: cover;
  --_m: /calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 69%, #0000 72%);
  --_g: conic-gradient(from 90deg at calc(100% - var(--r)) calc(100% - var(--r)), #0000 25%, #000 0);
  --_d: (3.5em + var(--r));
  mask:
    calc(100% - var(--_d) - var(--_x)) 100% var(--_m),
    100% calc(100% - var(--_d)) var(--_m),
    radial-gradient(1.75em at 100% 100%, #0000 99%, #000 calc(100% + 1px))
      calc(-1*var(--r) - var(--_x)) calc(-1*var(--r)),
    var(--_g) calc(-1*var(--_d) - var(--_x)) 0,
    var(--_g) 0 calc(-1*var(--_d));
  mask-repeat: no-repeat;
}

.card.alt .image {
  --_g: conic-gradient(from 180deg at var(--r) calc(100% - var(--r)), #0000 25%, #000 0);
  mask:
    calc(var(--_d) + var(--_x)) 100% var(--_m),
    0% calc(100% - var(--_d)) var(--_m),
    radial-gradient(1.75em at 0 100%, #0000 99%, #000 calc(100% + 1px))
      calc(var(--r) + var(--_x)) calc(-1*var(--r)),
    var(--_g) calc(var(--_d) + var(--_x)) 0,
    var(--_g) 0 calc(-1*var(--_d));
  mask-repeat: no-repeat;
}

.caption {
  height: 3.5em;
  width: calc(3.5em + var(--_x));
  box-sizing: border-box;
  translate: calc(1.75em - var(--r)) calc(1.75em - var(--r));
  overflow: hidden;
  background: #BF4D28;
  color: #fff;
  padding: 0.5em 1em;
  clip-path: inset(5px round 3em);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2em;
}

.card.alt .caption {
  translate: calc(-1.75em + var(--r)) calc(1.75em - var(--r));
}

.caption h3 {
  margin: 0;
  font-size: 1.1em;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.2;
}

.caption p {
  margin: 0;
  font-size: 0.75em;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0.9;
  line-height: 1.2;
}
```

**Step 2: Verify file created**

Run: `ls -la src/components/Work/InvertedCard.module.css`
Expected: File exists

**Step 3: Commit**

```bash
git add src/components/Work/InvertedCard.module.css
git commit -m "feat: add InvertedCard CSS module with masking effects"
```

---

## Task 3: Create InvertedCard TypeScript Component

**Files:**
- Create: `src/components/Work/InvertedCard.tsx`

**Step 1: Create component file**

Create `src/components/Work/InvertedCard.tsx`:

```typescript
import Link from "next/link";
import { Project } from "./project";
import styles from "./InvertedCard.module.css";

interface InvertedCardProps {
  project: Project;
  isAlt: boolean;
}

export default function InvertedCard({ project, isAlt }: InvertedCardProps) {
  return (
    <figure className={`${styles.card} ${isAlt ? styles.alt : ''} inverted-card`}>
      <Link href={project.route}>
        <img
          src={project.img}
          alt={project.name}
          className={styles.image}
        />
        <figcaption className={styles.caption}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </figcaption>
      </Link>
    </figure>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/Work/InvertedCard.tsx
git commit -m "feat: create InvertedCard component with TypeScript"
```

---

## Task 4: Create Work CSS Module

**Files:**
- Create: `src/components/Work/Work.module.css`

**Step 1: Create CSS module for Work layout**

Create `src/components/Work/Work.module.css`:

```css
.work {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-items: center;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

**Step 2: Commit**

```bash
git add src/components/Work/Work.module.css
git commit -m "feat: add Work CSS module for layout"
```

---

## Task 5: Convert Work.js to TypeScript with InvertedCard

**Files:**
- Modify: `src/components/Work/Work.js` → rename to `Work.tsx`

**Step 1: Rename file**

```bash
mv src/components/Work/Work.js src/components/Work/Work.tsx
```

**Step 2: Replace entire Work.tsx content**

Replace all content in `src/components/Work/Work.tsx`:

```typescript
"use client";
import { useRef } from "react";
import { projects } from "./project";
import InvertedCard from "./InvertedCard";
import styles from "./Work.module.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Work() {
  const workContainerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = workContainerRef.current?.querySelectorAll(".inverted-card");

      if (!cards) return;

      gsap.set(cards, {
        y: 1000,
      });

      const rows = workContainerRef.current?.querySelectorAll(`.${styles.row}`);

      rows?.forEach((row) => {
        const rowCards = row.querySelectorAll(".inverted-card");

        rowCards.forEach((card, itemIndex) => {
          const isLeftCard = itemIndex === 0;
          gsap.set(card, {
            rotation: isLeftCard ? -60 : 60,
            transformOrigin: "center center",
          });
        });

        ScrollTrigger.create({
          trigger: row,
          start: "top 50%",
          onEnter: () => {
            gsap.to(rowCards, {
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.25,
            });
          },
        });
      });
    },
    { scope: workContainerRef }
  );

  return (
    <section className={styles.work} ref={workContainerRef}>
      {projects.reduce<JSX.Element[]>((acc, project, index) => {
        if (index % 2 === 0) {
          const leftProject = projects[index];
          const rightProject = projects[index + 1];

          acc.push(
            <div key={`row-${index}`} className={styles.row}>
              <InvertedCard project={leftProject} isAlt={false} />
              {rightProject && <InvertedCard project={rightProject} isAlt={true} />}
            </div>
          );
        }
        return acc;
      }, [])}
    </section>
  );
}
```

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add src/components/Work/Work.tsx
git commit -m "feat: convert Work to TypeScript with InvertedCard integration"
```

---

## Task 6: Convert page.js to TypeScript

**Files:**
- Modify: `src/app/page.js` → rename to `page.tsx`

**Step 1: Rename file**

```bash
mv src/app/page.js src/app/page.tsx
```

**Step 2: Verify file imports are correct**

The file should already work as TypeScript since it has no type-specific changes needed. Content remains:

```typescript
import { ReactLenis } from "lenis/react";
import Work from "@/components/Work/Work";

export default function Home() {
  return (
    <>
      <ReactLenis root>
        <header>
          <h1>Featured Work</h1>
        </header>

        <Work />

        <footer>
          <p>Developed by Codegrid</p>
          <p>All rights reserved &copy; 2025</p>
        </footer>
      </ReactLenis>
    </>
  );
}
```

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: convert page.js to TypeScript"
```

---

## Task 7: Update layout.js to TypeScript

**Files:**
- Modify: `src/app/layout.js` → rename to `layout.tsx`

**Step 1: Read current layout**

Run: `cat src/app/layout.js`

**Step 2: Rename to TypeScript**

```bash
mv src/app/layout.js src/app/layout.tsx
```

**Step 3: Add TypeScript types to layout**

Update `src/app/layout.tsx` to add proper types:

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codegrid - Featured Work",
  description: "Featured work with scroll animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Step 4: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: convert layout to TypeScript with proper types"
```

---

## Task 8: Create TypeScript configuration (if needed)

**Files:**
- Check: `tsconfig.json` (should exist with Next.js 15)

**Step 1: Verify tsconfig.json exists**

Run: `cat tsconfig.json`
Expected: File exists with Next.js TypeScript config

**Step 2: If missing, create tsconfig.json**

If file doesn't exist, create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 3: Commit if created**

```bash
git add tsconfig.json
git commit -m "feat: add TypeScript configuration"
```

---

## Task 9: Install TypeScript dependencies (if needed)

**Files:**
- Modify: `package.json`

**Step 1: Check if TypeScript is installed**

Run: `npm list typescript @types/react @types/node`
Expected: May show "not installed" or versions

**Step 2: Install TypeScript dependencies if missing**

```bash
npm install --save-dev typescript @types/react @types/node @types/react-dom
```

**Step 3: Verify installation**

Run: `npm list typescript`
Expected: Shows installed version

**Step 4: Commit package files**

```bash
git add package.json package-lock.json
git commit -m "feat: add TypeScript dependencies"
```

---

## Task 10: Test development server

**Files:**
- Test all components in browser

**Step 1: Start development server**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000

**Step 2: Open browser and verify**

Open: http://localhost:3000

**Visual checks:**
- [ ] Cards display with images
- [ ] Hover on cards shows expanding caption
- [ ] Caption reveals name and description
- [ ] Inverted radius corner cutout visible on hover
- [ ] Left card caption expands to the right
- [ ] Right card caption expands to the left
- [ ] Scroll animations work (cards rotate in from below)
- [ ] No console errors

**Step 3: Test hover on multiple cards**

Hover on each card and verify smooth transition

**Step 4: Test scroll animations**

Scroll down page and verify cards animate in correctly with rotation

**Step 5: Stop server**

Press `Ctrl+C` to stop dev server

---

## Task 11: Build and verify production

**Files:**
- Production build verification

**Step 1: Build for production**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors

**Step 2: Check build output**

Expected output should show:
- Route compilation success
- No type errors
- Static/dynamic page info

**Step 3: Start production server**

Run: `npm start`
Expected: Server starts

**Step 4: Test in browser**

Open: http://localhost:3000
Verify all features work in production mode

**Step 5: Stop server**

Press `Ctrl+C`

---

## Task 12: Final commit and cleanup

**Files:**
- All modified files

**Step 1: Check git status**

Run: `git status`
Expected: Should show clean working tree or only untracked files

**Step 2: Verify all changes committed**

Run: `git log --oneline -n 10`
Expected: Shows all feature commits

**Step 3: Create summary commit if needed**

If there are uncommitted changes:

```bash
git add .
git commit -m "feat: complete inverted radius cards with TypeScript migration

- Convert all components to TypeScript
- Implement InvertedCard component with CSS masking
- Add row-based mirrored layout
- Preserve GSAP scroll animations
- Add proper TypeScript types for all components"
```

---

## Verification Checklist

After completing all tasks, verify:

- [ ] All `.js` files converted to `.tsx`
- [ ] TypeScript compilation succeeds (`npm run build`)
- [ ] No TypeScript errors in IDE
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Inverted radius hover effect works on all cards
- [ ] Caption expands smoothly revealing name + description
- [ ] Row-based mirrored pattern (left normal, right alt)
- [ ] GSAP scroll animations still work
- [ ] Cards rotate in from below on scroll
- [ ] No browser console errors
- [ ] Responsive layout works (test different screen sizes)
- [ ] All commits follow conventional commit format

---

## Troubleshooting

**Issue: CSS masking not working**
- Check browser supports CSS `@property` (Chrome 85+, Safari 15.4+)
- Verify CSS module imported correctly
- Check browser DevTools for mask property

**Issue: TypeScript errors on build**
- Verify all imports use correct extensions (`.tsx` not `.jsx`)
- Check `tsconfig.json` exists and is valid
- Ensure TypeScript dependencies installed

**Issue: GSAP animations not triggering**
- Verify `.inverted-card` class applied to figure elements
- Check ScrollTrigger is registered
- Verify `useGSAP` scope is correct

**Issue: Caption text too long**
- Adjust `--w` variable in CSS for wider cards
- Reduce font size in caption styles
- Add text truncation with ellipsis

**Issue: Images not loading**
- Verify image paths in `project.ts` are correct
- Check images exist in `/public` folder
- Verify Next.js Image optimization not interfering
