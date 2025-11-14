'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WheelCard {
  id: number;
  title: string;
  color: string;
}

const wheelCards: WheelCard[] = [
  { id: 1, title: '01', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: '02', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: '03', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, title: '04', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 5, title: '05', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 6, title: '06', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 7, title: '07', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 8, title: '08', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
];

export default function CircularWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wheelRef.current) return;

    const ctx = gsap.context(() => {
      // Rotate the entire wheel on scroll
      gsap.to(wheelRef.current, {
        rotation: -65,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="section relative bg-gradient-to-br from-slate-900 to-slate-800"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Gradient mask overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 1) 100%)',
            }}
          />

          {/* Wheel container */}
          <div
            ref={wheelRef}
            className="relative"
            style={{
              width: '800px',
              height: '800px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                display: 'grid',
                gridTemplateAreas: '"stack"',
              }}
            >
              {wheelCards.map((card, index) => {
                const angle = (360 / wheelCards.length) * index;
                const radius = 350; // Distance from center

                return (
                  <div
                    key={card.id}
                    className="card"
                    style={{
                      gridArea: 'stack',
                      width: '200px',
                      height: '280px',
                      transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                      transformOrigin: 'center center',
                      background: card.color,
                      justifySelf: 'center',
                      alignSelf: 'center',
                    }}
                  >
                    <span className="text-6xl font-bold relative z-10">{card.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center indicator */}
          <div className="absolute w-4 h-4 bg-white rounded-full opacity-50" />
        </div>

        <div className="absolute bottom-10 left-0 right-0 text-center text-white/60 text-sm">
          Scroll to rotate the card wheel
        </div>
      </div>
    </div>
  );
}
