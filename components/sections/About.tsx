"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { fadeInVariants, staggerVariants } from "@/src/lib/animations";

export default function About() {
  const paragraphs = [
    "I'm an IT student passionate about building web applications, mobile apps, and IoT solutions that solve real-world problems. I enjoy transforming ideas into functional systems that are efficient, user-friendly, and impactful.",
    "My experience includes developing management systems, monitoring platforms, Android applications, and IoT-powered projects, with interests in full-stack development, database design, and hardware-software integration. I enjoy working on projects that combine creativity and technology to improve everyday processes and user experiences.",
    "Beyond coding, I'm passionate about continuous learning, exploring emerging technologies, and taking on challenges that help me grow as a developer. Whether it's creating a website for a client, developing a mobile application, or integrating hardware with software, I find satisfaction in turning concepts into practical solutions that make a difference.",
    "I'm always looking for opportunities to learn, collaborate, and build meaningful technology that creates value for people and organizations."
  ];

  const highlights = [
    "Full-Stack Web Development",
    "Mobile Application Development",
    "IoT & Embedded Systems",
    "Database Design & Management",
    "UI/UX Design",
    "Problem Solving & Innovation"
  ];

  const clients = [
    "National University Fairview (NUFV)",
    "JRed Aquatics"
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "-20px" }}
    >
      <motion.h2
        className="heading-lg"
        variants={fadeInVariants}
      >
        About
      </motion.h2>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <motion.div
          className="space-y-4"
          variants={fadeInVariants}
        >
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="body-md leading-relaxed text-text-muted"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div variants={fadeInVariants}>
          <Card className="space-y-4">
            <h3 className="heading-sm">Focus areas</h3>
            <ul className="space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm text-text-muted"
                >
                  <span className="mt-1 text-accent">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-4 mt-6">
            <h3 className="heading-sm">Notable Clients</h3>
            <div className="space-y-2">
              {clients.map((client) => (
                <p key={client} className="text-sm text-text-muted">
                  {client}
                </p>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
