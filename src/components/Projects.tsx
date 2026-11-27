import { useState } from 'react';
<<<<<<< HEAD
import { ArrowUpRight, Database, Box, Map, MessageSquare, Globe, Sparkles, ExternalLink, Code2 } from 'lucide-react';
import { ALL_PROJECTS } from '../data';

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
    <div className="relative flex flex-col w-full h-full rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
      {/* Mini Window Chrome */}
      <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
      </div>

      {/* Preview Body */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-45'}`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--accent-soft), transparent 72%)',
          }}
        />
        <div
          className={`relative p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 ${
            isHovered ? 'scale-110 text-[var(--accent)] border-[var(--accent-border)] shadow-md' : 'text-[var(--text-muted)]'
          }`}
        >
          <Icon className="w-6 h-6 stroke-[1.75]" />
        </div>
      </div>
    </div>
  );
=======
import { ArrowUpRight, Database, Box, Map, MessageSquare, Globe, Sparkles } from 'lucide-react';
import { ALL_PROJECTS } from '../data';

// Custom Animated Icon Renderer representing absolute quality craftsmanship
function ProjectVisualIcon({ type, isHovered }: { type: string; isHovered: boolean }) {
  const activeClass = isHovered ? 'scale-110 text-indigo-400' : 'text-zinc-500';

  switch (type) {
    case 'database':
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800/40">
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 to-transparent pointer-events-none" />
          <div className={`transition-all duration-500 relative flex flex-col gap-1 items-center ${activeClass}`}>
            <Database className="w-8 h-8 stroke-[1.5]" />
            <div className="flex gap-0.5">
              <span className={`w-1 h-1 rounded-full bg-indigo-400 ${isHovered ? 'animate-ping' : 'opacity-40'}`}></span>
              <span className={`w-1 h-1 rounded-full bg-indigo-500 ${isHovered ? 'animate-bounce delay-75' : 'opacity-40'}`}></span>
              <span className={`w-1 h-1 rounded-full bg-indigo-300 ${isHovered ? 'animate-bounce delay-150' : 'opacity-40'}`}></span>
            </div>
            {/* Mock structural layer */}
            <div className={`absolute -inset-8 border border-indigo-500/10 rounded-full transition-transform duration-700 ${isHovered ? 'scale-125 rotate-45' : 'scale-90 opacity-0'}`} />
          </div>
        </div>
      );
    case 'box':
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800/40">
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 to-transparent pointer-events-none" />
          <div className={`transition-all duration-500 relative ${activeClass}`}>
            <Box className={`w-8 h-8 stroke-[1.5] transition-transform duration-700 ${isHovered ? 'rotate-[360deg] scale-110 text-indigo-400' : ''}`} />
            {/* Interactive logistics lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              <path
                d="M 15 50 Q 50 20 85 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className={`text-indigo-500/20 transition-all duration-700 ${isHovered ? 'stroke-indigo-400/60 stroke-dasharray-[4,2] animate-dash' : 'opacity-20'}`}
              />
            </svg>
          </div>
        </div>
      );
    case 'map':
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800/40">
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 to-transparent pointer-events-none" />
          <div className={`transition-all duration-500 relative flex flex-col items-center justify-center ${activeClass}`}>
            <Map className={`w-8 h-8 stroke-[1.5] ${isHovered ? 'rotate-3 text-indigo-400' : ''}`} />
            {/* Connected node points */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-indigo-500/40 transition-transform ${isHovered ? 'translate-x-1 -translate-y-0.5 scale-125 bg-indigo-400' : ''}`} />
              <div className={`absolute bottom-5 right-6 w-1.5 h-1.5 rounded-full bg-indigo-500/40 transition-transform ${isHovered ? '-translate-x-1 translate-y-0.5 scale-125 bg-indigo-400' : ''}`} />
              <div className={`absolute top-10 right-4 w-1 h-1 rounded-full bg-indigo-500/40 transition-transform ${isHovered ? 'scale-125 bg-indigo-400' : ''}`} />
            </div>
          </div>
        </div>
      );
    case 'message-square':
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800/40">
          <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 to-transparent pointer-events-none" />
          <div className={`transition-all duration-500 relative ${activeClass}`}>
            <MessageSquare className={`w-8 h-8 stroke-[1.5] transition-transform duration-300 ${isHovered ? '-translate-y-1 text-indigo-400' : ''}`} />
            {/* Blinking notifications badge */}
            <span className={`absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-indigo-500 ${isHovered ? 'animate-ping bg-indigo-400' : 'opacity-40'}`} />
          </div>
        </div>
      );
    default:
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800/40">
          <div className={`transition-all duration-500 ${activeClass}`}>
            <Globe className="w-8 h-8 stroke-[1.5]" />
          </div>
        </div>
      );
  }
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

<<<<<<< HEAD
  const categories = ['All', ...Array.from(new Set(ALL_PROJECTS.map((p) => p.projectType)))];
=======
  // Filter categories to make the view interactive and helpful
  const categories = ['All', 'Full-Stack AI Application', 'Backend ', 'Front-End Analytics', 'Backend Utility Middleware'];
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (filter === 'All') return true;
    return project.projectType === filter;
  });

  return (
<<<<<<< HEAD
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

      {/* Category Filter Tabs */}
      <div className="mb-7 flex flex-wrap gap-2 text-xs">
        {categories.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 font-mono font-semibold border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'accent-gradient-bg border-transparent text-white shadow-sm'
                  : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat === 'All' ? 'View All' : cat}
            </button>
          );
        })}
      </div>

      <ul className="space-y-5">
        {filteredProjects.map((project, idx) => {
          const isHovered = hoveredId === project.id;
          const isExternal = Boolean(project.link?.startsWith('http'));
          const isGithub = Boolean(project.link?.includes('github.com'));
          const isFeatured = idx === 0 && filter === 'All';
=======
    <section id="projects" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32 lg:scroll-mt-24" aria-label="Selected projects">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
          <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
            Projects
          </span>
        </div>
      </div>

      {/* Filter Tabs - Premium addition for client-side discovery */}
      <div className="mb-8 flex flex-wrap gap-2 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-3 py-1.5 font-mono border transition-all duration-300 ${
              (filter === cat)
                ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300'
                : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
            }`}
          >
            {cat === 'All' ? 'View All' : cat.split(' / ')[0]}
          </button>
        ))}
      </div>

      <ul className="group/list space-y-12">
        {filteredProjects.map((project) => {
          const isHovered = hoveredId === project.id;
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed

          return (
            <li
              key={project.id}
<<<<<<< HEAD
              className="surface-card surface-card-hover group/item relative grid gap-5 p-5 sm:p-6 rounded-2xl sm:grid-cols-8 sm:gap-6 items-start"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Visual Preview Window */}
              <div className="sm:col-span-2">
                <div className="w-40 sm:w-full h-28">
                  <ProjectVisualPreview type={project.iconName} isHovered={isHovered} />
                </div>
              </div>

              {/* Project Details */}
              <div className="sm:col-span-6 space-y-2.5">
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
=======
              className="group/item relative grid gap-4 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Hover Glowing Frame */}
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl border border-transparent transition-all duration-300 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover/item:border-zinc-800/60 lg:group-hover/item:bg-zinc-900/40 lg:group-hover/item:shadow-lg lg:group-hover/item:shadow-indigo-500/3" />

              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1 font-mono">
                    {project.projectType}
                  </span>
                  <a
                    className="inline-flex items-baseline font-semibold leading-tight text-zinc-200 hover:text-indigo-400 focus-visible:text-indigo-400 group/link text-base"
                    href={project.link || '#'}
                    aria-label={project.title}
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                    <span className="flex items-center gap-1.5">
                      {project.title}{' '}
                      <ArrowUpRight className="inline-block w-4 h-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                {/* Tags */}
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span className="rounded bg-indigo-500/5 px-2.5 py-1 text-[11px] font-semibold text-indigo-400 border border-indigo-500/10 hover:border-indigo-500/20 transition-all">
                        {tech}
                      </span>
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
                    </li>
                  ))}
                </ul>
              </div>
<<<<<<< HEAD
=======

              {/* Dynamic Icon Side Illustration */}
              <div className="z-10 sm:order-1 sm:col-span-2">
                <div className="aspect-video w-32 sm:w-full h-20 sm:h-24">
                  <ProjectVisualIcon type={project.iconName} isHovered={isHovered} />
                </div>
              </div>
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
            </li>
          );
        })}

        {filteredProjects.length === 0 && (
<<<<<<< HEAD
          <div className="surface-card text-center py-12 rounded-2xl text-[var(--text-muted)] flex flex-col items-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--accent)] opacity-60 animate-pulse" />
            <p className="text-sm">No matched projects under this filter classification.</p>
            <button
              onClick={() => setFilter('All')}
              className="text-xs text-[var(--accent-text)] hover:underline font-semibold cursor-pointer"
=======
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg text-zinc-500 flex flex-col items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-500/40 animate-pulse" />
            <p className="text-sm">No matched projects under this filter classification.</p>
            <button
              onClick={() => setFilter('All')}
              className="text-xs text-indigo-400 hover:underline font-semibold"
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
            >
              Reset Filters
            </button>
          </div>
        )}
      </ul>
    </section>
  );
}
