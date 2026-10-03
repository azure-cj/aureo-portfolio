export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "email" | "resume" | "facebook";
  label: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  initials: string;
  role: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  schoolEmail?: string;
  socials: SocialLink[];
}

export interface HeroSequenceConfig {
  frameCount: number;
  framePath: (index: number) => string;
  fit?: "cover" | "contain";
}

export interface HeroContent {
  name: string;
  title: string;
  description: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
  sequence?: HeroSequenceConfig;
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  highlights: string[];
}

export interface ContactContent {
  heading: string;
  description: string | string[];
  availability: string;
  ctaLabel: string;
}
