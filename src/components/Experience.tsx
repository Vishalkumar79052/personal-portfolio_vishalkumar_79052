import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { ALL_EXPERIENCES } from '../data';

// Detailed achievements customized for Vishal Kumar's professional milestones
const DETAILED_ACHIEVEMENTS: Record<string, string[]> = {
  "ai-fullstack-dev-projects": [
    "Mastered key algorithms in Data Structures (DSA) and fundamental Machine Learning techniques at Roorkee Institute of Technology.",
    "Engineered various high-quality web applications using modern full-stack architectures (React, Tailwind, Node.js, and MongoDB).",
    "Learned and implemented scalable programming standards and core software development cycles.",
    "Collaborated on peer code reviews and project presentations during technical hackathons."
  ],
  "personal-fullstack-projects": [
    "Built multiple responsive single-page applications and web interfaces during the web development internship periods.",
    "Designed reliable frontend modules using HTML, CSS, JavaScript, and Tailwind CSS for interactive client experiences.",
    "Successfully verified application security features, responsive grid designs, and client-side web architectures.",
    "Utilized Git workflows and repository management routines to release clean build versions regularly."
  ]
};

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32 lg:scroll-mt-24" aria-label="Work experience">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
          <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
            Experience
          </span>
        </div>
      </div>

      <div className="group/list space-y-8">
        {ALL_EXPERIENCES.map((job) => {
          const isExpanded = expandedId === job.id;
          const achievements = DETAILED_ACHIEVEMENTS[job.id] || [];

          return (
            <div
              key={job.id}
              className="group/item relative grid pb-1 transition-all duration-350 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
            >
              {/* Card Hover Ambient Overlay */}
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl border border-transparent transition-all duration-350 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover/item:border-zinc-900 lg:group-hover/item:bg-zinc-900/15 lg:group-hover/item:shadow-lg lg:group-hover/item:shadow-indigo-500/5" />

              {/* Timestamp Column */}
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2">
                {job.period}
              </header>

              {/* Main Job Body */}
              <div className="z-10 sm:col-span-6">
                <h3 className="font-semibold leading-snug text-zinc-200">
                  <div>
                    {job.companyUrl ? (
                      <a
                        className="inline-flex items-baseline font-semibold leading-tight text-zinc-200 hover:text-indigo-400 focus-visible:text-indigo-400 group/link text-base"
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${job.role} at ${job.company}`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                        <span>
                          {job.role} ·{' '}
                          <span className="inline-block">
                            {job.company}
                            <ArrowUpRight className="inline-block w-4 h-4 ml-1 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none" />
                          </span>
                        </span>
                      </a>
                    ) : (
                      <span className="text-base font-semibold leading-tight text-zinc-200">
                        {job.role} · <span className="text-zinc-400 font-normal">{job.company}</span>
                      </span>
                    )}
                  </div>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {job.description}
                </p>

                {/* Highly Interactive Show Highlights Drawer */}
                {achievements.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => toggleExpand(job.id)}
                      className="relative z-20 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-zinc-300 hover:text-indigo-400 focus:outline-none transition-colors cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <Briefcase className="w-3.5 h-3.5 text-indigo-400/80" />
                      <span>{isExpanded ? 'Hide Core Achievements' : 'Show Key Impact & Accomplishments'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 transition-transform" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                      )}
                    </button>

                    {isExpanded && (
                      <ul className="mt-3 space-y-2.5 pl-4 border-l border-indigo-500/20 py-1 text-xs text-zinc-400 leading-relaxed animate-fadeIn">
                        {achievements.map((achievement, i) => (
                          <li key={i} className="relative">
                            <span className="absolute -left-5 top-1.5 h-1 w-1 rounded-full bg-indigo-400"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Tech Badges List */}
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {job.technologies.map((tech) => (
                    <li key={tech}>
                      <span className="flex items-center rounded bg-indigo-500/5 px-2.5 py-1 text-[11px] font-semibold text-indigo-400 border border-indigo-500/10 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-200">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Link */}
      <div className="mt-12">
        <a
          className="inline-flex items-center font-bold text-zinc-100 group cursor-pointer relative"
          aria-label="Interact with simulator"
          href="#sandbox"
        >
          <span className="border-b border-transparent pb-px transition group-hover:border-indigo-400">
            Simulate semantic vector search below
          </span>
          <ArrowUpRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </section>
  );
}
