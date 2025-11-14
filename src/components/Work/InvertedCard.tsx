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
