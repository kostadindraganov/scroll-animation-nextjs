import Link from "next/link";
import { Project } from "./project";
import styles from "./InvertedCard.module.css";

interface InvertedCardProps {
  project: Project;
  isAlt: boolean;
}

export default function InvertedCard({ project, isAlt }: InvertedCardProps) {
  return (
    <figure className={`${styles.card} inverted-card`}>
      <img
        src={project.img}
        alt={project.name}
        className={styles.image}
      />
      <Link href={project.route} className={`${styles.button} ${styles.buttonLeft}`}>
        <figcaption className={`${styles.caption} ${styles.captionLeft}`}>
          View
        </figcaption>
      </Link>
      <Link href={project.route} className={`${styles.button} ${styles.buttonRight}`}>
        <figcaption className={`${styles.caption} ${styles.captionRight}`}>
          Details
        </figcaption>
      </Link>
    </figure>
  );
}
