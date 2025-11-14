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
      {projects.reduce<React.ReactElement[]>((acc, project, index) => {
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
