export type TechItem = {
  id: string
  name: string
  tag?: string
  proficiency?: number // 1-5
}

export type TechCategory = {
  id: string
  title: string
  items: TechItem[]
}

export type Project = {
  id: string
  title: string
  tagline?: string
  description: string
  tags: string[]
  github?: string
  live?: string
  download?: string
  secondaryLink?: {
    label: string
    url: string
  }
  highlights?: string[]
  featured?: boolean
  thumbnail?: string
  images?: string[]
}

export type ExperienceItem = {
  id: string
  company: string
  role: string
  start: string
  end?: string
  bullets: string[]
  tags?: string[]
  status?: 'completed' | 'in-progress' | 'planned'
}

export type SocialLink = {
  id: string
  label: string
  url: string
}

export type SiteConfig = {
  name: string
  initials: string
  role: string
  description: string
  email: string
  socials: SocialLink[]
}
