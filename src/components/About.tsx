import { JOSH_BIO, JOSH_STATS } from '../data';
import { Code2, Server, Layers, Terminal, Database, GitBranch, Brain, Sparkles } from 'lucide-react';

const highlights = [
  "AI & Full-Stack Developer",
  "Roorkee Institute of Technology",
  "MongoDB",
  "Express.js",
  "React",
  "Node.js",
  "MERN",
  "AI-based mock interview platform",
  "virtual web development internships",
  "Shadowfox",
  "CodSoft",
  "Oracle AI Foundation Associate"
];

const skillsList = [
  { 
    name: "JavaScript", 
    category: "Language", 
    icon: Code2,
    cardClass: "bg-yellow-500/5 border-yellow-500/30 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.05)] hover:bg-yellow-500/15 hover:border-yellow-400/60 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]", 
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    dot: "bg-yellow-400"
  },
  { 
    name: "Node.js", 
    category: "Backend", 
    icon: Server,
    cardClass: "bg-emerald-500/5 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.05)] hover:bg-emerald-500/15 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]", 
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400"
  },
  { 
    name: "React", 
    category: "Frontend", 
    icon: Layers,
    cardClass: "bg-cyan-500/5 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.05)] hover:bg-cyan-500/15 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]", 
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    dot: "bg-cyan-400"
  },
  { 
    name: "Express", 
    category: "Backend", 
    icon: Terminal,
    cardClass: "bg-zinc-800/10 border-zinc-700/50 text-zinc-350 shadow-[0_0_12px_rgba(255,255,255,0.02)] hover:bg-zinc-800/25 hover:border-zinc-500/60 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]", 
    badge: "bg-zinc-500/10 text-zinc-300 border-zinc-500/25",
    dot: "bg-zinc-400"
  },
  { 
    name: "MongoDB", 
    category: "Database", 
    icon: Database,
    cardClass: "bg-green-500/5 border-green-500/30 text-green-400 shadow-[0_0_12px_rgba(74,222,128,0.05)] hover:bg-green-500/15 hover:border-green-400/60 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]", 
    badge: "bg-green-500/10 text-green-400 border-green-500/20",
    dot: "bg-green-400"
  },
  { 
    name: "Python", 
    category: "Language", 
    icon: Code2,
    cardClass: "bg-sky-500/5 border-sky-500/30 text-sky-450 shadow-[0_0_12px_rgba(56,189,248,0.05)] hover:bg-sky-500/15 hover:border-sky-400/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]", 
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    dot: "bg-sky-400"
  },
  { 
    name: "Git", 
    category: "Tooling", 
    icon: GitBranch,
    cardClass: "bg-orange-500/5 border-orange-500/30 text-orange-405 shadow-[0_0_12px_rgba(249,115,22,0.05)] hover:bg-orange-500/15 hover:border-orange-400/60 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]", 
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    dot: "bg-orange-400"
  },
  { 
    name: "LLMs", 
    category: "AI Models", 
    icon: Brain,
    cardClass: "bg-violet-500/5 border-violet-500/30 text-violet-405 shadow-[0_0_12px_rgba(139,92,246,0.05)] hover:bg-violet-500/15 hover:border-violet-400/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]", 
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dot: "bg-violet-400"
  },
  { 
    name: "Prompt Engineering", 
    category: "AI Design", 
    icon: Sparkles,
    cardClass: "bg-fuchsia-500/5 border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.05)] hover:bg-fuchsia-500/15 hover:border-fuchsia-400/60 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]", 
    badge: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    dot: "bg-fuchsia-400"
  }
];

export default function About() {
  return (
    <section id="about" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32 lg:scroll-mt-24" aria-label="About me">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
          <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
            About Me
          </span>
        </div>
      </div>

      <div className="text-base leading-relaxed text-zinc-400 space-y-5">
        {JOSH_BIO.aboutParagraphs.map((paragraph, index) => {
          const pattern = new RegExp(`(${highlights.map(h => `\\b${h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).join('|')})`, 'g');
          const chunks = paragraph.split(pattern);

          return (
            <p key={index} className="leading-relaxed">
              {chunks.map((chunk, i) => {
                if (highlights.includes(chunk)) {
                  return <span key={i} className="font-semibold text-white">{chunk}</span>;
                }
                return chunk;
              })}
            </p>
          );
        })}
      </div>

      {/* Interactive Stats Grid */}
      <div className="mt-10 grid grid-cols-3 gap-4 border-t border-zinc-900/60 pt-8">
        {JOSH_STATS.map((stat, index) => (
          <div
            key={index}
            className="group relative cursor-default rounded-xl py-3 px-4 bg-zinc-900/10 hover:bg-zinc-900/30 border border-white/0 hover:border-white/5 transition-all duration-300"
          >
            <div className="text-3xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-300">
              {stat.value}
            </div>
            <div className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32 lg:scroll-mt-24" aria-label="Skills & Tech Stack">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 border-b border-white/5 pb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_#ec4899]" />
            <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
              Skills & Tech Stack
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase self-start sm:self-auto px-2.5 py-1 bg-zinc-900/40 border border-zinc-900 rounded">9 Stack Elements</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skillsList.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div 
                key={index} 
                className={`flex flex-col justify-between border rounded-xl p-4 transition-all duration-300 cursor-default group/skill ${skill.cardClass}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-zinc-950/80 border border-zinc-900/50 group-hover/skill:bg-black transition-colors duration-300">
                    <IconComponent className="w-4.5 h-4.5 transition-transform duration-300 group-hover/skill:scale-110" />
                  </div>
                  <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${skill.badge}`}>
                    {skill.category}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${skill.dot} animate-pulse`} />
                    <span className="text-sm font-semibold tracking-tight text-zinc-200 group-hover/skill:text-white transition-colors duration-200">{skill.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
