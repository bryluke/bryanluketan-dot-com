export const TOPICS = [
  {
    slug: 'html-and-css',
    name: 'HTML & CSS',
    description: 'The foundations that everyone skips and then regrets.',
  },
  {
    slug: 'javascript-and-typescript',
    name: 'JavaScript & TypeScript',
    description: 'The language itself, beyond framework-specific usage.',
  },
  {
    slug: 'data-structures-and-algorithms',
    name: 'Data Structures & Algorithms',
    description: 'Not for interviews. For understanding how things work.',
  },
  {
    slug: 'web-technologies',
    name: 'Web Technologies',
    description: 'The platform underneath the frameworks.',
  },
  {
    slug: 'design-patterns-and-ui',
    name: 'Design Patterns & UI',
    description: 'The intersection of design thinking and implementation.',
  },
  {
    slug: 'react-patterns',
    name: 'React Patterns',
    description: 'Going deeper than "it works". Understanding why patterns exist and when they break.',
  },
  {
    slug: 'web-analytics-and-seo',
    name: 'Web Analytics & SEO',
    description: 'Understanding how the web sees you. Tracking, measuring, and making things findable.',
  },
  {
    slug: 'games',
    name: 'Games',
    description: 'Building things that are fun. Learning graphics, physics, and interaction design.',
  },
  {
    slug: 'ai-and-machine-learning',
    name: 'AI & Machine Learning',
    description: 'The technological shift that\'s impossible to ignore.',
  },
] as const

export type TopicSlug = (typeof TOPICS)[number]['slug']

export interface TopicConfig {
  slug: TopicSlug
  name: string
  description: string
}

export function isValidTopic(topic: string): topic is TopicSlug {
  return TOPICS.some((t) => t.slug === topic)
}

export function getTopicBySlug(slug: string): TopicConfig | undefined {
  return TOPICS.find((t) => t.slug === slug)
}

export const TAGS = [
  // meta
  'exploration',
  'meta',
  'beginnings',
  'reflection',
  'building-in-public',

  // tech
  'typescript',
  'javascript',
  'react',
  'nextjs',
  'css',
  'web-dev',
  'gamedev',
  'tools',

  // career
  'mentorship',
  'leadership',
  'career-switch',
  'freelance',
  'interviewing',

  // languages
  'japanese',
  'chinese',

  // life
  'productivity',
  'learning',
  'side-projects',
] as const

export type Tag = (typeof TAGS)[number]

export function isValidTag(tag: string): tag is Tag {
  return TAGS.includes(tag as Tag)
}
