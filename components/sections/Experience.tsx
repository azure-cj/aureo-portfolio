"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { fadeInVariants, staggerVariants } from "@/src/lib/animations";
import experience from "@/src/data/experience";
import organizations from "@/src/data/organizations";
import certifications from "@/src/data/certifications";

export default function Experience() {
  const [openCertId, setOpenCertId] = useState<string | null>(null)

  const sortedCerts = [...certifications].sort((a, b) => {
    const monthMap: { [key: string]: number } = {
      "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
      "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
    }
    
    const parseDate = (dateStr: string) => {
      const parts = dateStr.split(" ")
      const month = monthMap[parts[0]] || 0
      const year = parseInt(parts[1]) || 0
      return year * 12 + month
    }
    
    return parseDate(b.issueDate) - parseDate(a.issueDate)
  })

  const getIssuerBadge = (issuer: string) => {
    if (issuer.includes("LinkedIn")) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-mono rounded border border-accent/30 bg-accent/10 text-accent">
          LI
        </span>
      )
    } else if (issuer.includes("Cisco")) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-mono rounded border border-blue-500/30 bg-blue-500/10 text-blue-400">
          CISCO
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-mono rounded border border-muted/30 bg-surface text-muted">
        {issuer.split(" ")[0].toUpperCase()}
      </span>
    )
  }

  return (
    <motion.div
      className="space-y-12"
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "-20px" }}
    >
      <motion.h2
        className="heading-lg"
        variants={fadeInVariants}
      >
        Experience
      </motion.h2>

      <motion.div
        className="space-y-6"
        variants={staggerVariants}
      >
        {experience.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeInVariants}
          >
            <Card>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="heading-sm">{item.role}</h3>
                    {item.status === 'in-progress' && (
                      <span className="inline-flex items-center bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono px-2 py-0.5 rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted">{item.company}</p>
                </div>
                <p className="text-sm text-text-dim">
                  {item.start} — {item.end ?? "Present"}
                </p>
              </div>

              <ul className="mt-4 space-y-3">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm text-text-muted"
                  >
                    <span className="mt-1 text-accent">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {item.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              ) : null}
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {organizations && organizations.length > 0 && (
        <>
          <motion.h2
            className="heading-lg"
            variants={fadeInVariants}
          >
            Organizations
          </motion.h2>

          <motion.div
            className="space-y-6"
            variants={staggerVariants}
          >
            {organizations.map((org) => (
              <motion.div
                key={org.name}
                variants={fadeInVariants}
              >
                <Card>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="heading-sm">{org.role}</h3>
                      <p className="text-sm text-text-muted">{org.name}</p>
                    </div>
                    <p className="text-sm text-text-dim">
                      {org.startDate} — {org.endDate}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {certifications && certifications.length > 0 && (
        <>
          <motion.div
            className="flex items-center gap-3"
            variants={fadeInVariants}
          >
            <motion.h2 className="heading-lg">Certifications</motion.h2>
            <span className="text-xs font-mono text-muted bg-surface px-2 py-0.5 rounded-full border border-white/10">
              {certifications.length} certificates
            </span>
          </motion.div>

          <motion.div
            className="space-y-0 border border-white/10 rounded-lg overflow-hidden"
            variants={staggerVariants}
          >
            {sortedCerts.map((cert, idx) => {
              const isOpen = openCertId === cert.id
              const issueYear = cert.issueDate.split(" ")[1]

              return (
                <div key={cert.id}>
                  <button
                    type="button"
                    onClick={() => setOpenCertId(isOpen ? null : cert.id)}
                    className="w-full px-4 py-3 min-h-[48px] flex items-center gap-3 hover:bg-surface/60 border-b border-white/5 last:border-b-0 transition-all duration-200 group text-left"
                  >
                    <div className="flex-shrink-0">
                      {getIssuerBadge(cert.issuer)}
                    </div>
                    
                    <h3 className="flex-1 text-left text-sm md:text-base text-primary font-display truncate group-hover:text-accent transition-colors">
                      {cert.name}
                    </h3>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-muted font-mono">{issueYear}</span>
                      <ChevronDown
                        size={16}
                        className={`text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-surface/40 border-t border-white/5 px-4 py-4 space-y-4">
                          {cert.credentialUrl && !cert.credentialUrl.includes("TODO") ? (
                            <div className="relative w-full h-56 sm:h-80 md:h-96">
                              <Image
                                src={cert.credentialUrl}
                                alt={cert.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
                                className="rounded-lg border border-white/10 object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-48 sm:h-72 rounded-lg border border-white/10 bg-surface/30 flex items-center justify-center">
                              <p className="text-sm text-text-muted">
                                Certificate preview unavailable
                              </p>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                            <div className="flex flex-wrap gap-2">
                              {cert.skills && cert.skills.length > 0 && (
                                <>
                                  {cert.skills.map((skill) => (
                                    <Badge key={skill}>{skill}</Badge>
                                  ))}
                                </>
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              <p className="text-xs text-text-muted">
                                Issued by: <span className="text-text-dim">{cert.issuer}</span>
                              </p>
                              {cert.credentialUrl && !cert.credentialUrl.includes("TODO") && (
                                <a
                                  href={cert.credentialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-accent hover:underline whitespace-nowrap"
                                >
                                  View Full Certificate ↗
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
