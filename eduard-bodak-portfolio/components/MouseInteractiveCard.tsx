'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function MouseInteractiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!cardRef.current || !containerRef.current) return;

    const card = cardRef.current;
    const container = containerRef.current;

    // Detect device capability
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(hover: hover) and (pointer: fine)',
        isMobile: '(hover: none) and (pointer: coarse)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        if (isDesktop) {
          let mouseX = 0;
          let mouseY = 0;
          let cardRect: DOMRect;

          const updateCardRotation = () => {
            if (!isHovering || !card) return;

            cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            // Normalize mouse position (-1 to 1)
            const normalizedX = (mouseX - cardCenterX) / (cardRect.width / 2);
            const normalizedY = (mouseY - cardCenterY) / (cardRect.height / 2);

            // Calculate rotations
            const rotateY = normalizedX * 25; // Max 25 degrees
            const rotateX = -normalizedY * 25; // Inverted for natural feel
            const absoluteRotation = Math.abs(rotateY);
            const rotateZ = (1 - absoluteRotation / 25) * 5; // Inverse relationship

            gsap.to(card, {
              rotationY: rotateY,
              rotationX: rotateX,
              rotationZ: rotateZ,
              duration: 0.5,
              ease: 'power2.out',
              transformPerspective: 1000,
              force3D: true,
            });
          };

          const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
          };

          const onMouseEnter = () => {
            setIsHovering(true);
            gsap.ticker.add(updateCardRotation);
          };

          const onMouseLeave = () => {
            setIsHovering(false);
            gsap.ticker.remove(updateCardRotation);

            // Return to original position with elastic easing
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              rotationZ: 0,
              duration: 1.2,
              ease: 'elastic.out(1, 0.75)',
              force3D: true,
            });
          };

          container.addEventListener('mousemove', onMouseMove);
          container.addEventListener('mouseenter', onMouseEnter);
          container.addEventListener('mouseleave', onMouseLeave);

          return () => {
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mouseleave', onMouseLeave);
            gsap.ticker.remove(updateCardRotation);
          };
        } else {
          // Mobile: simple tilt animation on touch
          const onTouch = () => {
            gsap.to(card, {
              rotationY: 15,
              rotationX: 10,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
            });
          };

          container.addEventListener('touchstart', onTouch);

          return () => {
            container.removeEventListener('touchstart', onTouch);
          };
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, [isHovering]);

  return (
    <div
      className="section bg-gradient-to-br from-purple-900 to-indigo-900"
    >
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold text-white mb-8">Mouse Interactive Card</h2>
        <div
          ref={containerRef}
          className="perspective-container w-[350px] h-[480px] flex items-center justify-center"
        >
          <div
            ref={cardRef}
            className="card relative"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white relative z-10">
                Hover Me
              </span>
            </div>
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
                transform: 'translateZ(50px)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
        <p className="text-white/70 text-center max-w-md">
          Move your mouse over the card to see it rotate in 3D space following your cursor
        </p>
      </div>
    </div>
  );
}
