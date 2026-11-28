import { useState } from 'react';
import { ArrowUpRight, Database, Box, Map, MessageSquare, Globe, Sparkles, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PROJECTS } from '../data';
import { Tilt3DCard } from './Motion3D';

function ProjectVisualPreview({ type, isHovered }: { type: string; isHovered: boolean }) {
  const Icon =
    type === 'database'
      ? Database
      : type === 'box'
      ? Box
      : type === 'map'
      ? Map
      : type === 'message-square'
      ? MessageSquare
      : Globe;

  return (
    <div className="relative flex flex-col w-full h-full rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-subtle)] depth-z-20 shadow-sm">
      <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
      </div>

      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-45'}`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--accent-soft), transparent 72%)',
          }}
        />
        <motion.div
          animate={isHovered ? { scale: 1.12, rotateY: 16 } : { scale: 1, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className={`relative p-3 rounded-xl border bg-[var(--bg-surface)] transition-colors duration-300 ${
            isHovered
              ? 'text-[var(--accent)] border-[var(--accent-border)] shadow-md'
              : 'text-[var(--text-muted)] border-[var(--border-subtle)]'
          }`}
        >
          <Icon className="w-6 h-6 stroke-[1.75]" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(ALL_PROJECTS.map((p) => p.projectType)))];

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (filter === 'All') return true;
    return project.projectType === filter;
  });

  return (
    <section id="projects" className="scroll-mt-24" aria-label="Selected projects">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
        <div className="section-pill w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>Projects</span>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase self-start sm:self-auto px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
        </span>
      </div>

      {/* Category Filter Tabs with Sliding Pill */}
      <div className="mb-7 flex flex-wrap gap-2 text-xs">
        {categories.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative rounded-full px-3.5 py-1.5 font-mono font-semibold border transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'border-transparent text-white'
                  : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeProjectFilter"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full accent-gradient-bg shadow-sm"
                />
              )}
              <span className="relative z-10">{cat === 'All' ? 'View All' : cat}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="space-y-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isHovered = hoveredId === project.id;
            const isExternal = Boolean(project.link?.startsWith('http'));
            const isGithub = Boolean(project.link?.includes('github.com'));
            const isFeatured = idx === 0 && filter === 'All';

            return (
              <motion.li
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Tilt3DCard maxTilt={5} scaleOnHover={1.008} glareColor="var(--spotlight-color)" className="rounded-2xl">
                  <div className="surface-card group relative grid gap-5 p-5 sm:p-6 rounded-2xl sm:grid-cols-8 sm:gap-6 items-start preserve-3d">
                    {/* Visual Preview Window */}
                    <div className="sm:col-span-2">
                      <div className="w-40 sm:w-full h-28">
                        <ProjectVisualPreview type={project.iconName} isHovered={isHovered} />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="sm:col-span-6 space-y-2.5 depth-z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-text)] font-mono">
                            {project.projectType}
                          </span>
                          {isFeatured && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full accent-gradient-bg text-white">
                              <Sparkles className="w-2.5 h-2.5" />
                              Featured
                            </span>
                          )}
                        </div>

                        {project.link && (
                          <a
                            href={project.link}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noreferrer' : undefined}
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors"
                          >
                            {isGithub ? <Code2 className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                            <span>{isGithub ? 'Source' : 'Live Demo'}</span>
                          </a>
                        )}
                      </div>

                      <h3>
                        <a
                          className="font-display inline-flex items-center gap-1.5 font-bold leading-tight text-[var(--text-primary)] hover:text-[var(--accent-text)] group/link text-lg sm:text-xl transition-colors"
                          href={project.link || '#'}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noreferrer' : undefined}
                          aria-label={project.title}
                        >
                          <span>{project.title}</span>
                          <ArrowUpRight className="inline-block w-4 h-4 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      </h3>

                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{project.description}</p>

                      <ul className="pt-1 flex flex-wrap gap-1.5" aria-label="Technologies used">
                        {project.technologies.map((tech) => (
                          <li key={tech}>
                            <span className="tag-chip">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.li>
            );
          })}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="surface-card text-center py-12 rounded-2xl text-[var(--text-muted)] flex flex-col items-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--accent)] opacity-60 animate-pulse" />
            <p className="text-sm">No matched projects under this filter classification.</p>
            <button
              onClick={() => setFilter('All')}
              className="text-xs text-[var(--accent-text)] hover:underline font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.ul>
    </section>
  );
}
