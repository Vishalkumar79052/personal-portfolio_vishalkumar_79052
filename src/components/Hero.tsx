import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { MapPin, Clock, Sparkles, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { JOSH_BIO } from '../data';
// @ts-ignore
import vishalPhoto from '../assets/images/635e4ccd-5b61-4527-8eae-cffca285e280.jpg';

export default function Hero() {
=======
import { MapPin, Clock, Sparkles } from 'lucide-react';
import { JOSH_BIO } from '../data';
//  @ts-ignore
 import vishalPhoto from '../assets/images/635e4ccd-5b61-4527-8eae-cffca285e280.jpg';

interface HeroProps {
  theme: string;
  setTheme: (theme: string) => void;
  visitorName: string;
  setVisitorName: (name: string) => void;
  visitorRole: string;
  setVisitorRole: (role: string) => void;
}

export default function Hero({ theme, setTheme, visitorName, setVisitorName, visitorRole, setVisitorRole }: HeroProps) {
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
<<<<<<< HEAD
=======
      // Kolkata (India) Time Zone for IST
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
<<<<<<< HEAD
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
=======
      const timestring = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setLocalTime(timestring);
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

<<<<<<< HEAD
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
=======
  const getKolkataGreeting = () => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        hour12: false
      });
      const hour = parseInt(formatter.format(new Date()), 10);
      if (hour >= 5 && hour < 12) return 'Good Morning ☀️';
      if (hour >= 12 && hour < 17) return 'Good Afternoon 🌤️';
      if (hour >= 17 && hour < 22) return 'Good Evening 🌌';
      return 'Good Night 🌙';
    } catch (e) {
      return 'Welcome 👋';
    }
  };

  const currentGreeting = getKolkataGreeting();

  const handleRoleSelect = (role: string) => {
    setVisitorRole(role);
  };

  return (
    <section id="hero" className="w-full pt-6 md:pt-10 scroll-mt-24 space-y-8" aria-label="Hero Intro">
      {/* Bio / Heading Block */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 justify-between">
        
        {/* Texts Info (Name + Title + Tagline) */}
        <div className="flex-1 text-center md:text-left space-y-4">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-1 bg-zinc-900/50 border border-zinc-800 rounded-full px-3 py-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              {JOSH_BIO.location}
            </span>
            {localTime && (
              <span className="text-zinc-400 flex items-center gap-1.5 bg-indigo-500/5 border border-indigo-500/15 rounded-full px-3 py-1">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>Local Time: <span className="text-zinc-200 font-semibold select-all">{localTime}</span></span>
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl xs:text-5xl font-black tracking-tight text-white md:text-6xl select-none leading-none">
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {JOSH_BIO.name}
              </span>
            </h1>
          </div>

          <h2 className="text-lg font-bold tracking-tight text-indigo-400 sm:text-xl flex items-center justify-center md:justify-start gap-1.5 font-sans">
            <span>{JOSH_BIO.role}</span>
            <Sparkles className="w-4 h-4 text-indigo-400/80 animate-pulse" />
          </h2>

          <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-zinc-400 font-sans">
            {JOSH_BIO.tagline}
          </p>

          {/* Quick Core Tag Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 text-xs font-mono">
            <span className="rounded-md border border-white/5 bg-zinc-900/40 px-3 py-1 text-zinc-300">Node.js</span>
            <span className="rounded-md border border-white/5 bg-zinc-900/40 px-3 py-1 text-zinc-300">React</span>
            <span className="rounded-md border border-white/5 bg-zinc-900/40 px-3 py-1 text-zinc-300">LLM Agents</span>
            <span className="rounded-md border border-white/5 bg-zinc-900/40 px-3 py-1 text-zinc-300">TypeScript</span>
            <span className="rounded-md border border-white/5 bg-zinc-900/40 px-3 py-1 text-zinc-300">MongoDB</span>
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="relative group w-32 h-32 sm:w-36 sm:h-36 shrink-0">
          {/* Neon cosmic aura flow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-colors duration-300 bg-zinc-950">
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
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border border-zinc-950 flex items-center justify-center shadow">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
          </span>
        </div>
      </div>

      {/* Embedded Colorful Theme Therapeutic Control Swapper */}
      <div className="p-5 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-left space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-rose-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>Interactive Color Therapy</span>
          </div>
          <p className="text-xs text-zinc-400 max-w-xl">
            Click a node below to swap the entire Cosmic aura, accent gradients, and typography highlight contrasts across the layout instantly.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-2.5 shrink-0 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            {[
              { id: 'cosmic', name: 'Cosmic Aurora', dots: ['bg-[#6366f1]', 'bg-[#ec4899]', 'bg-[#06b6d4]'] },
              { id: 'sunset', name: 'Sunset Radiance', dots: ['bg-[#f43f5e]', 'bg-[#fb923c]', 'bg-[#f59e0b]'] },
              { id: 'oceanic', name: 'Ocean Sapphire', dots: ['bg-[#38bdf8]', 'bg-[#10b981]', 'bg-[#0ea5e9]'] },
              { id: 'amethyst', name: 'Electric Amethyst', dots: ['bg-[#d946ef]', 'bg-[#a855f7]', 'bg-[#ec4899]'] },
              { id: 'emerald', name: 'Forest Jade', dots: ['bg-[#10b981]', 'bg-[#059669]', 'bg-[#34d399]'] },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={t.name}
                className={`relative p-1.5 rounded-full border transition-all duration-300 hover:scale-115 flex gap-1 cursor-pointer ${
                  theme === t.id
                    ? 'border-white bg-white/10 shadow-lg scale-110'
                    : 'border-transparent bg-black/20 hover:bg-black/45'
                }`}
              >
                {t.dots.map((dotClass, i) => (
                  <span key={i} className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
                ))}
                {theme === t.id && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border border-black animate-ping" />
                )}
              </button>
            ))}
          </div>
          
          <div className="text-[10px] w-full sm:w-fit font-mono text-zinc-400 flex justify-between items-center bg-black/30 px-3 py-1 rounded-md border border-white/5">
            <span className="mr-3">ACTIVE PALETTE:</span>
            <span className="font-extrabold text-white uppercase text-[10px]">
              {theme === 'cosmic' ? '🌌 Cosmic Aurora' :
               theme === 'sunset' ? '🌅 Sunset Radiance' :
               theme === 'oceanic' ? '🌊 Ocean Sapphire' :
               theme === 'amethyst' ? '🔮 Electric Amethyst' :
               '🌲 Forest Jade'}
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
