'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlippingCards from '../components/FlippingCards';
import MouseInteractiveCard from '../components/MouseInteractiveCard';
import CircularWheel from '../components/CircularWheel';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-indigo-950 to-purple-950">
        <div className="flex flex-col items-center justify-center gap-8 px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white text-center">
            Eduard Bodak
          </h1>
          <h2 className="text-2xl md:text-4xl text-white/80 text-center">
            Portfolio Animations Recreation
          </h2>
          <p className="text-lg text-white/60 max-w-2xl text-center">
            A recreation of the stunning scroll-based animations from Eduard Bodak's portfolio,
            featuring GSAP and modern web animation techniques.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="text-white/40 text-sm animate-bounce">
              Scroll to explore
            </div>
            <svg
              className="w-6 h-6 text-white/40"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Animation 1: Flipping 3D Cards */}
      <FlippingCards />

      {/* Animation 2: Mouse Interactive Card */}
      <MouseInteractiveCard />

      {/* Animation 3: Circular Card Wheel */}
      <CircularWheel />

      {/* Footer Section */}
      <section className="section bg-gradient-to-br from-slate-950 to-black">
        <div className="flex flex-col items-center justify-center gap-6 px-4">
          <h3 className="text-4xl font-bold text-white">Animation Techniques Used</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-3">3D Card Flipping</h4>
              <p className="text-white/70">
                GSAP timelines with ScrollTrigger, 3D transforms, and staggered animations
                for dynamic card sequences.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-3">Mouse Interaction</h4>
              <p className="text-white/70">
                Real-time cursor tracking with GSAP ticker, matchMedia for device detection,
                and elastic easing for smooth returns.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-3">Circular Rotation</h4>
              <p className="text-white/70">
                CSS Grid positioning with CSS custom properties and scroll-driven rotation
                animations with gradient masking.
              </p>
            </div>
          </div>
          <div className="mt-12 text-white/50 text-sm">
            <p>Inspired by the Codrops article: "Built to Move: A Closer Look at Eduard Bodak's Portfolio"</p>
            <p className="mt-2">Technologies: Next.js 15, GSAP, ScrollTrigger, TypeScript, Tailwind CSS</p>
          </div>
        </div>
      </section>
    </main>
  );
}
