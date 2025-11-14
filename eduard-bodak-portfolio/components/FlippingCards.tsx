'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Card {
  id: number;
  color: string;
  title: string;
}

const cards: Card[] = [
  { id: 1, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', title: 'Card 1' },
  { id: 2, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', title: 'Card 2' },
  { id: 3, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', title: 'Card 3' },
  { id: 4, color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', title: 'Card 4' },
  { id: 5, color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', title: 'Card 5' },
];

export default function FlippingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Part 1: Card Escape Sequence
      const escapeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Horizontal displacement then vertical descent
        escapeTimeline.to(
          card,
          {
            xPercent: (index - 2) * 75,
            force3D: true,
            duration: 0.5,
          },
          0 + index * 0.012
        );

        escapeTimeline.to(
          card,
          {
            yPercent: 150,
            scale: 0.8,
            rotationX: 20,
            force3D: true,
            duration: 0.5,
          },
          0.5 + index * 0.012
        );
      });

      // Part 2: Card Return and Flip
      const flipTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          scrub: 1,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Return to center
        flipTimeline.to(
          card,
          {
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            rotationX: 0,
            force3D: true,
            duration: 0.33,
          },
          1 + index * 0.015
        );

        // 3D Flip
        flipTimeline.to(
          card,
          {
            rotationY: -190,
            rotationX: 15,
            force3D: true,
            duration: 0.67,
          },
          1.33 + index * 0.015
        );
      });

      // Add floating micro-animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          yPercent: '+=2',
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      timelineRef.current = flipTimeline;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="section relative"
      style={{ height: '100vh' }}
    >
      <div className="perspective-container relative w-full h-full flex items-center justify-center">
        <div className="relative w-[300px] h-[400px]">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="card absolute top-0 left-0 w-full h-full"
              style={{
                background: card.color,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="relative z-10">{card.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 text-center text-white/60 text-sm">
        Scroll to see cards flip in 3D
      </div>
    </div>
  );
}
