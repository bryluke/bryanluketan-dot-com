import type { Metadata } from 'next';
import { siteConfig } from '@/src/config/site';
import GameCard from '@/src/components/GameCard';
import GameGrid from '@/src/components/GameGrid';
import styles from './arcade.module.css';

export const metadata: Metadata = {
  title: 'Arcade',
  description: 'Games and interactive experiments.',
  alternates: {
    canonical: `${siteConfig.url}/arcade`,
  },
};

const placeholderGames = [
  {
    title: 'First Game',
    description: 'One game. One week. One core mechanic. The first shipped artifact.',
    status: 'in-development' as const,
    thumbnailColor: 'var(--color-accent-subtle)',
  },
  {
    title: 'TBD',
    description: 'Another experiment waiting to be discovered.',
    status: 'coming-soon' as const,
  },
  {
    title: 'TBD',
    description: 'Ideas are brewing. Watch this space.',
    status: 'coming-soon' as const,
  },
];

const ArcadePage = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Arcade</h1>
        <p className={styles.description}>
          Finished games and interactive experiments. Each one is a complete artifact, not a
          work-in-progress.
        </p>
      </header>

      <section className={styles.games}>
        <GameGrid>
          {placeholderGames.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              status={game.status}
              thumbnailColor={game.thumbnailColor}
            />
          ))}
        </GameGrid>
      </section>
    </div>
  )
}

export default ArcadePage;