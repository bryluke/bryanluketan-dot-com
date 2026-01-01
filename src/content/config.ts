export const CATEGORIES = [
  'tech',
  'faith',
  'career',
  'personal-finance',
  'business',
  'fitness',
  'reviews',
  'storytelling',
  'games',
  'anime',
] as const

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

export type Category = (typeof CATEGORIES)[number]
export type Tag = (typeof TAGS)[number]

export function isValidCategory(category: string): category is Category {
  return CATEGORIES.includes(category as Category)
}

export function isValidTag(tag: string): tag is Tag {
  return TAGS.includes(tag as Tag)
}
