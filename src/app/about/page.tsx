import type { Metadata } from 'next'
import { siteConfig } from '@/src/config/site'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description: 'The longer story — developer, builder, learner.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
}

export default function AboutPage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>The longer story.</h1>

      <div className={styles.content}>
        <p>
          I'm Bryan — a developer in Singapore who's been building for the web
          for the better part of a decade. These days I lead web development at
          a startup, but this site isn't about that.
        </p>

        <p>
          This is where I'm trying to rediscover why I got into programming in
          the first place. Somewhere between shipping features and fighting
          deadlines, I lost the joy of building for its own sake. I'm trying to
          get that back.
        </p>

        <h2 className={styles.heading}>What I'm into:</h2>

        <p>
          Professionally, I live in JavaScript and TypeScript. I care about the
          web as a platform — not just the frameworks, but the standards and
          fundamentals underneath.
        </p>

        <p>
          Outside of work, I'm learning to make games, studying Japanese and
          Chinese, and training to stay athletic. I read widely — theology,
          fiction, technical books, whatever pulls me.
        </p>

        <p>
          I have a background in theology (MDiv) and years of teaching and
          mentoring. Someday I'd like that thread to come back — helping people
          learn how to think and build in a world where AI does more and more of
          the mechanical work. But that's a longer arc.
        </p>

        <h2 className={styles.heading}>For now:</h2>

        <p>
          I'm just building, learning out loud, and seeing what emerges.
        </p>

        <p>
          The past 15 years have been less about code and more about serving
          people. Along the way I've:
        </p>

        <ul className={styles.list}>
          <li>Walked with people through personal struggles</li>
          <li>Helped friends get into training and fitness</li>
          <li>Guided career switchers breaking into tech</li>
          <li>Mentored software engineers in their craft</li>
          <li>Helped build side projects from scratch</li>
        </ul>

        <p>
          If any of that resonates,{' '}
          <a href="mailto:hello@bryanluketan.com" className={styles.link}>
            feel free to reach out{' '}
          </a>
          — with or without an agenda.
        </p>
      </div>
    </div>
  )
}
