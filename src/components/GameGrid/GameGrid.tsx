import { ReactNode } from 'react';
import styles from './GameGrid.module.css';

interface GameGridProps {
  children: ReactNode
};

const GameGrid = ({ children }: GameGridProps) => {
  return <div className={styles.grid}>{children}</div>;
};

export default GameGrid;