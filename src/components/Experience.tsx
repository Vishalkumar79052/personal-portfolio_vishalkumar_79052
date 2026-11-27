import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { ALL_EXPERIENCES } from '../data';

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

        {ALL_EXPERIENCES.map((job) => {
          const isExpanded = expandedId === job.id;
          const achievements = DETAILED_ACHIEVEMENTS[job.id] || [];

          return (
            <div key={job.id} className="relative">
              {/* Timeline Node */}
              <span
                className="absolute -left-6 sm:-left-8 top-7 w-4 h-4 rounded-full accent-gradient-bg ring-4 ring-[var(--bg-page)] shadow-sm"
                aria-hidden="true"
              />

              <div className="surface-card surface-card-hover rounded-2xl p-6 sm:grid sm:grid-cols-8 sm:gap-6">
                {/* Period */}
                <header className="mb-2 sm:mb-0 mt-0.5 text-xs font-mono font-semibold uppercase tracking-wide text-[var(--text-muted)] sm:col-span-2">
                  {job.period}
                </header>

                {/* Main Content */}
                <div className="sm:col-span-6 space-y-3">
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
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <ul className="mt-3 space-y-2 pl-4 border-l-2 border-[var(--accent-border)] py-1 text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed animate-fadeIn">
                          {achievements.map((achievement, i) => (
                            <li key={i} className="relative">
                              <span className="absolute -left-[21px] top-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
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
            </div>
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
