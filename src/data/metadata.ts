import type { SiteConfig } from "@/src/types/content";

export const siteConfig: SiteConfig = {
  name: "CJ Aureo",
  fullName: "Christopher Joseph Aureo",
  initials: "CJ DEV",
  role: "Aspiring Software Developer",
  title: "CJ Aureo — Aspiring Software Developer",
  description:
    "IT Student specializing in web applications, Android apps, and IoT-based systems. Available for select freelance projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cjaureo.dev",
  ogImage: "/opengraph-image",
  author: "CJ Aureo",
  email: "chrstphraureo18@gmail.com",
  schoolEmail: "aureocv@students.nu-fairview.edu.ph",
  socials: [
    {
      platform: "email",
      label: "Email",
      url: "mailto:chrstphraureo18@gmail.com",
    },
    {
      platform: "github",
      label: "GitHub",
      url: "https://github.com/azure-cj",
    },
    {
      platform: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/christopher.aureo.1/",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/christopher-joseph-aureo-039b83434",
    },
  ],
};

export default siteConfig;
