import { useEffect, useState } from 'react';
import { MapPin, Clock, Sparkles, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { JOSH_BIO } from '../data';
// @ts-ignore
import vishalPhoto from '../assets/images/635e4ccd-5b61-4527-8eae-cffca285e280.jpg';

export default function Hero() {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="w-full pt-4 md:pt-8 scroll-mt-24" aria-label="Hero Intro">
      <div className="surface-card rounded-3xl p-6 sm:p-9 md:p-11 relative overflow-hidden">
        {/* Decorative Accent Glows */}
        <div
          className="absolute -top-28 -right-28 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-45"
          style={{ background: 'var(--accent-glow)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-25"
          style={{ background: 'var(--mesh-2)' }}
        />

        <div className="relative flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-10 justify-between">
          {/* Left Bio Content */}
          <div className="flex-1 text-center md:text-left space-y-5">
            {/* Meta Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1 text-[var(--text-secondary)]">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {JOSH_BIO.location}
              </span>
              {localTime && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 text-[var(--text-secondary)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                  <span>
                    IST <span className="text-[var(--text-primary)] font-bold">{localTime}</span>
                  </span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-500 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to Opportunities
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.06]">
                {JOSH_BIO.name}
              </h1>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight accent-gradient-text flex items-center justify-center md:justify-start gap-2">
                <span>{JOSH_BIO.role}</span>
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              </h2>
            </div>

            <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)]">
              {JOSH_BIO.tagline}
            </p>

            {/* Core Stack Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-0.5 text-xs font-mono">
              {['Node.js', 'React', 'LLM Agents', 'TypeScript', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1 text-[var(--text-secondary)] font-medium hover:border-[var(--accent-border)] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs + Quick Socials */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl accent-gradient-bg text-white text-sm font-bold shadow-lg hover:opacity-95 active:scale-95 transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-primary)] text-sm font-semibold active:scale-95 transition-all"
              >
                <span>Let&apos;s Collaborate</span>
              </a>

              <div className="flex items-center gap-2 sm:pl-1">
                <a
                  href={JOSH_BIO.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:-translate-y-0.5"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={JOSH_BIO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:-translate-y-0.5"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${JOSH_BIO.email}`}
                  aria-label="Email"
                  title="Email"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Floating Profile Avatar */}
          <div className="relative group w-36 h-36 sm:w-44 sm:h-44 shrink-0 animate-float">
            <div className="absolute -inset-1.5 rounded-full accent-gradient-bg opacity-65 blur-lg group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />
            <div className="relative w-full h-full rounded-full p-1 accent-gradient-bg shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-page)]">
                <img
                  src={vishalPhoto}
                  alt="Vishal Kumar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://github.com/Vishalkumar79052.png';
                  }}
                />
              </div>
            </div>
            <span
              className="absolute bottom-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[var(--bg-page)] flex items-center justify-center shadow-md"
              title="Available for work"
            >
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-300 animate-ping" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
