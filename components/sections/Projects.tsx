"use client";

import { motion } from "framer-motion";
import { fadeInVariants, staggerVariants } from "@/src/lib/animations";
import projects from "@/src/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
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
        Projects
      </motion.h2>

      <motion.div
        className="grid gap-6 lg:grid-cols-2"
        variants={staggerVariants}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeInVariants}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
