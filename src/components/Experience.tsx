import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_EXPERIENCES } from '../data';
import { Tilt3DCard } from './Motion3D';

const DETAILED_ACHIEVEMENTS: Record<string, string[]> = {
  'ai-fullstack-dev-projects': [
    'Mastered key algorithms in Data Structures (DSA) and fundamental Machine Learning techniques at Roorkee Institute of Technology.',
    'Engineered high-quality web applications using modern full-stack architectures (React, Tailwind, Node.js, and MongoDB).',
    'Implemented scalable programming standards and end-to-end software development lifecycles.',
    'Collaborated on peer code reviews and project presentations during technical hackathons.',
  ],
  'personal-fullstack-projects': [
    'Built multiple responsive single-page applications and web interfaces during web development internship programs.',
    'Designed reliable frontend modules using HTML, CSS, JavaScript, and Tailwind CSS for interactive client experiences.',
    'Verified responsive grid designs, browser storage persistence, and client-side web architectures.',
    'Used Git workflows and structured repository management to ship clean releases regularly.',
  ],
};

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="scroll-mt-24" aria-label="Work experience">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[var(--border-subtle)] pb-4">
        <div className="section-pill w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>Experience</span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        <div
          className="absolute left-[7px] top-3 bottom-3 w-0.5 rounded-full opacity-40"
          style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-2), transparent)' }}
        />

        {ALL_EXPERIENCES.map((job, idx) => {
          const isExpanded = expandedId === job.id;
          const achievements = DETAILED_ACHIEVEMENTS[job.id] || [];

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.45 }}
              className="relative"
            >
              {/* Animated Timeline Node */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.15, type: 'spring', stiffness: 300 }}
                className="absolute -left-6 sm:-left-8 top-7 w-4 h-4 rounded-full accent-gradient-bg ring-4 ring-[var(--bg-page)] shadow-sm z-10"
                aria-hidden="true"
              />

              <Tilt3DCard maxTilt={5} scaleOnHover={1.008} glareColor="var(--spotlight-color)" className="rounded-2xl">
                <div className="surface-card group rounded-2xl p-6 sm:grid sm:grid-cols-8 sm:gap-6 preserve-3d">
                  {/* Period */}
                  <header className="mb-2 sm:mb-0 mt-0.5 text-xs font-mono font-semibold uppercase tracking-wide text-[var(--text-muted)] sm:col-span-2 depth-z-10">
                    {job.period}
                  </header>

                  {/* Main Content */}
                  <div className="sm:col-span-6 space-y-3 depth-z-10">
                    <h3 className="font-display font-bold leading-snug text-[var(--text-primary)] text-base sm:text-lg">
                      {job.companyUrl ? (
                        <a
                          className="inline-flex items-baseline hover:text-[var(--accent-text)] group/link"
                          href={job.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${job.role} at ${job.company}`}
                        >
                          <span>
                            {job.role} ·{' '}
                            <span className="font-sans font-medium text-[var(--text-secondary)]">{job.company}</span>
                            <ArrowUpRight className="inline-block w-4 h-4 ml-1 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </span>
                        </a>
                      ) : (
                        <span>
                          {job.role} ·{' '}
                          <span className="font-sans font-medium text-[var(--text-secondary)]">{job.company}</span>
                        </span>
                      )}
                    </h3>

                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{job.description}</p>

                    {achievements.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleExpand(job.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[var(--accent-text)] hover:opacity-80 focus:outline-none transition-opacity cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{isExpanded ? 'Hide Core Achievements' : 'Show Key Impact & Accomplishments'}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden mt-3 space-y-2 pl-4 border-l-2 border-[var(--accent-border)] py-1 text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed"
                            >
                              {achievements.map((achievement, i) => (
                                <li key={i} className="relative">
                                  <span className="absolute -left-[21px] top-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                                  {achievement}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    <ul className="pt-1 flex flex-wrap gap-1.5" aria-label="Technologies used">
                      {job.technologies.map((tech) => (
                        <li key={tech}>
                          <span className="tag-chip">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8">
        <a
          className="inline-flex items-center font-bold text-sm text-[var(--text-primary)] hover:text-[var(--accent-text)] group transition-colors"
          aria-label="Explore selected projects"
          href="#projects"
        >
          <span className="border-b border-[var(--accent-border)] pb-0.5">Explore selected projects below</span>
          <ArrowUpRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
