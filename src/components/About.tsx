import { JOSH_BIO, JOSH_STATS } from '../data';
import { Code2, Server, Layers, Terminal, Database, GitBranch, Brain, Sparkles, GraduationCap, Rocket, Award } from 'lucide-react';

const highlights = [
  'AI & Full-Stack Developer',
  'Roorkee Institute of Technology',
  'MongoDB',
  'Express.js',
  'React',
  'Node.js',
  'MERN',
  'AI-based mock interview platform',
  'virtual web development internships',
  'Shadowfox',
  'CodSoft',
  'Oracle AI Foundation Associate',
];

const statIcons = [GraduationCap, Rocket, Award];

const skillsList = [
  { name: 'JavaScript', category: 'Language', icon: Code2, iconColor: '#eab308', glow: 'rgba(234, 179, 8, 0.16)' },
  { name: 'Node.js', category: 'Backend', icon: Server, iconColor: '#10b981', glow: 'rgba(16, 185, 129, 0.16)' },
  { name: 'React', category: 'Frontend', icon: Layers, iconColor: '#06b6d4', glow: 'rgba(6, 182, 212, 0.16)' },
  { name: 'Express', category: 'Backend', icon: Terminal, iconColor: '#64748b', glow: 'rgba(100, 116, 139, 0.16)' },
  { name: 'MongoDB', category: 'Database', icon: Database, iconColor: '#22c55e', glow: 'rgba(34, 197, 94, 0.16)' },
  { name: 'Python', category: 'Language', icon: Code2, iconColor: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.16)' },
  { name: 'Git', category: 'Tooling', icon: GitBranch, iconColor: '#f97316', glow: 'rgba(249, 115, 22, 0.16)' },
  { name: 'LLMs', category: 'AI Models', icon: Brain, iconColor: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.16)' },
  { name: 'Prompt Engineering', category: 'AI Design', icon: Sparkles, iconColor: '#d946ef', glow: 'rgba(217, 70, 239, 0.16)' },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24" aria-label="About me">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
        <div className="section-pill w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>About Me</span>
        </div>
      </div>

      <div className="surface-card rounded-3xl p-6 sm:p-8 space-y-7 relative overflow-hidden">
        <div className="text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)] space-y-4">
          {JOSH_BIO.aboutParagraphs.map((paragraph, index) => {
            const pattern = new RegExp(
              `(${highlights.map((h) => `\\b${h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).join('|')})`,
              'g'
            );
            const chunks = paragraph.split(pattern);

            return (
              <p key={index} className="leading-relaxed">
                {chunks.map((chunk, i) => {
                  if (highlights.includes(chunk)) {
                    return (
                      <span
                        key={i}
                        className="font-semibold text-[var(--text-primary)] underline decoration-[var(--accent)]/45 decoration-2 underline-offset-4"
                      >
                        {chunk}
                      </span>
                    );
                  }
                  return chunk;
                })}
              </p>
            );
          })}
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-subtle)]">
          {JOSH_STATS.map((stat, index) => {
            const StatIcon = statIcons[index % statIcons.length];
            return (
              <div
                key={index}
                className="group rounded-2xl p-4 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-all duration-200 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-display text-3xl font-bold tracking-tight accent-gradient-text">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {stat.label}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent-text)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <StatIcon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24" aria-label="Skills & Tech Stack">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div className="section-pill w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)] animate-pulse" />
            <span>Skills &amp; Tech Stack</span>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase self-start sm:self-auto px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            {skillsList.length} Core Technologies
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {skillsList.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="surface-card surface-card-hover flex flex-col justify-between rounded-2xl p-4 cursor-default group/skill relative overflow-hidden"
              >
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover/skill:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: skill.glow }}
                />
                <div className="relative flex items-start justify-between mb-4">
                  <div
                    className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] transition-transform duration-200 group-hover/skill:scale-110"
                    style={{ color: skill.iconColor }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                    {skill.category}
                  </span>
                </div>

                <div className="relative flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: skill.iconColor }} />
                  <span className="text-sm font-bold tracking-tight text-[var(--text-primary)]">{skill.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
