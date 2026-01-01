import type { Metadata } from 'next'
import { siteConfig } from '@/src/config/site'
import styles from "./Home.module.css";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        Hey there, I'm Bryan.
      </div>
      <div className={styles.description}>
        I'm a developer based in Singapore, hoping to fall back in love with building things.
        <br /><br />
        After years of shipping other people's products, I'm making a space to call my own; building tools I find useful, games I'd want to play,and whatever else pulls my attention.
        <br /><br />
        I am challenging myself to think out loud publicly. Sometimes it's technical learnings, and other times it won't be. If any of it is useful to you, even better.
        <br /><br />
        Look around. Stay as long as you like.<br/>
        And if you're up for it, let's connect!
      </div>
    </div>
  );
}
