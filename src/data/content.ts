import type {
  AboutContent,
  ContactContent,
  HeroContent,
} from "@/src/types/content";

export const heroSequenceConfig = {
  frameCount: 120,
  framePath: (i: number) => `/sequence/frame-${String(i + 1).padStart(4, "0")}.webp`,
  fit: "cover" as const,
};

export const heroContent: HeroContent = {
  name: "CJ",
  title:
    "Aspiring Software Developer & IT Student",
  description:
    "I specialize in building modern web applications, Android apps, and IoT-based systems. My goal is to create technology that improves efficiency, solves practical problems, and delivers meaningful user experiences.",
  ctaPrimary: {
    text: "Get in touch",
    href: "#contact",
  },
  ctaSecondary: {
    text: "View work",
    href: "#projects",
  },
  sequence: heroSequenceConfig,
};

export const aboutContent: AboutContent = {
  heading: "About",
  paragraphs: [
    "I'm an IT student focused on building web applications, mobile apps, and IoT solutions that solve real-world problems. I enjoy transforming ideas into functional systems that are efficient, user-friendly, and impactful.",
    "My experience includes developing management systems, monitoring platforms, and Android applications, with interests in full-stack development, database design, and hardware-software integration. I'm always exploring new technologies and opportunities to create meaningful digital solutions.",
  ],
  highlights: [
    "Full-Stack Development",
    "Mobile Development",
    "IoT Solutions",
    "Database Systems",
    "UI/UX Design",
    "Problem Solving",
  ],
};

export const contactContent: ContactContent = {
  heading: "Contact",
  description:
    "If you need a developer who can move between interface polish, architecture decisions, and pragmatic execution, I’m open to the right conversation.",
  availability: "Available for select freelance and full-time roles.",
  ctaLabel: "Send an email",
};
