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
        Hey there, I&apos;m Bryan.
      </div>
      <div className={styles.description}>
        <p>
          I&apos;m a web tech lead in Singapore. Recently got the title, and honestly... the imposter syndrome is loud. So instead of faking it till I make it, I plan to keep sucking at programming (YSAP-inspired) until I get good.
        </p>
        <p>
          This is my "open-concept workshop". I choose topics to research and write about what I learn along the way while building stuff. No tutorials or polished takes. Just honest exploration of whatever&apos;s in front of me.
        </p>
        <p>
          Right now I&apos;m starting with web analytics and SEO. After that, wherever curiosity and work lead.
        </p>
        <p>
          <a href="/explore">See what I&apos;m exploring</a>, or come back regularly to check out for changes!
        </p>
      </div>
    </div>
  );
}
