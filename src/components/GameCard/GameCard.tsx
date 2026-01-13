import Link from 'next/link';
import styles from './GameCard.module.css';

type GameStatus = 'coming-soon' | 'playable' | 'in-development';

interface GameCardProps {
  title: string
  description: string
  slug?: string
  status: GameStatus
  thumbnailColor?: string
};

const statusLabels: Record<GameStatus, string> = {
  'coming-soon': 'Coming Soon',
  'playable': 'Play Now',
  'in-development': 'In Development',
};

const GameCard = ({
  title,
  description,
  slug,
  status,
  thumbnailColor,
}: GameCardProps) => {
  const isPlayable = status === 'playable' && slug;

  const content = (
    <>
      <div
        className={styles.thumbnail}
        style={thumbnailColor ? { backgroundColor: thumbnailColor } : undefined}
      >
        <span className={styles.thumbnailPlaceholder}>?</span>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={`${styles.status} ${styles[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </>
  );

  if (isPlayable) {
    return (
      <Link href={`/arcade/${slug}`} className={styles.card} data-playable>
        {content}
      </Link>
    );
  }

  return (
    <div className={styles.card} data-disabled>
      {content}
    </div>
  );
};

export default GameCard;