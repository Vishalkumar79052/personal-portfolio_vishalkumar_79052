import { useState } from 'react';
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
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  // Filter categories to make the view interactive and helpful
  const categories = ['All', 'Full-Stack AI Application', 'Backend & Orchestration', 'Front-End Analytics', 'Backend Utility Middleware'];

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (filter === 'All') return true;
    return project.projectType === filter;
  });

  return (
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

          return (
            <li
              key={project.id}
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
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Icon Side Illustration */}
              <div className="z-10 sm:order-1 sm:col-span-2">
                <div className="aspect-video w-32 sm:w-full h-20 sm:h-24">
                  <ProjectVisualIcon type={project.iconName} isHovered={isHovered} />
                </div>
              </div>
            </li>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-lg text-zinc-500 flex flex-col items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-500/40 animate-pulse" />
            <p className="text-sm">No matched projects under this filter classification.</p>
            <button
              onClick={() => setFilter('All')}
              className="text-xs text-indigo-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </ul>
    </section>
  );
}
