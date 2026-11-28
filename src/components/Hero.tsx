import { useEffect, useState } from 'react';
import { MapPin, Clock, Sparkles, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JOSH_BIO } from '../data';
import { Tilt3DCard, TechCube3D } from './Motion3D';
// @ts-ignore
import vishalPhoto from '../assets/images/635e4ccd-5b61-4527-8eae-cffca285e280.jpg';

const DYNAMIC_ROLES = [
  'AI & Full-Stack Developer',
  'MERN Stack Engineer',
  'LLM & Agentic Builder',
];

export default function Hero() {
  const [localTime, setLocalTime] = useState<string>('');
  const [roleIndex, setRoleIndex] = useState(0);

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
    const timeInterval = setInterval(updateTime, 1000);
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % DYNAMIC_ROLES.length);
    }, 3200);

    return () => {
      clearInterval(timeInterval);
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <section id="hero" className="w-full pt-4 md:pt-8 scroll-mt-24" aria-label="Hero Intro">
      <Tilt3DCard
        maxTilt={4}
        scaleOnHover={1.005}
        glareColor="var(--spotlight-color)"
        className="surface-card group rounded-3xl p-6 sm:p-9 md:p-11 overflow-hidden"
      >
        {/* Decorative Accent Glows */}
        <div
          className="absolute -top-28 -right-28 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-45"
          style={{ background: 'var(--accent-glow)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-25"
          style={{ background: 'var(--mesh-2)' }}
        />

        <div className="relative flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-10 justify-between preserve-3d">
          {/* Left Bio Content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center md:text-left space-y-5 depth-z-10"
          >
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

            {/* Headline & Dynamic Rotating Role */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.06]">
                {JOSH_BIO.name}
              </h1>
              <div className="h-8 flex items-center justify-center md:justify-start overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={DYNAMIC_ROLES[roleIndex]}
                    initial={{ opacity: 0, y: 14, rotateX: -35 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -14, rotateX: 35 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-xl font-bold tracking-tight accent-gradient-text flex items-center gap-2"
                  >
                    <span>{DYNAMIC_ROLES[roleIndex]}</span>
                    <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)]">
              {JOSH_BIO.tagline}
            </p>

            {/* Core Stack Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-0.5 text-xs font-mono">
              {['Node.js', 'React', 'LLM Agents', 'TypeScript', 'MongoDB'].map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.05, duration: 0.35 }}
                  whileHover={{ y: -2, scale: 1.04 }}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-1 text-[var(--text-secondary)] font-medium hover:border-[var(--accent-border)] transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* CTAs + Quick Socials */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.96 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl accent-gradient-bg text-white text-sm font-bold shadow-lg hover:opacity-95 transition-opacity"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-primary)] text-sm font-semibold transition-colors"
              >
                <span>Let&apos;s Collaborate</span>
              </motion.a>

              <div className="flex items-center gap-2 sm:pl-1">
                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  href={JOSH_BIO.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  href={JOSH_BIO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  href={`mailto:${JOSH_BIO.email}`}
                  aria-label="Email"
                  title="Email"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* 3D Orbital Avatar Stage + Interactive 3D Tech Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotateY: -18 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0 flex items-center justify-center orbit-stage-3d depth-z-20"
          >
            {/* 3D Tilted Orbital Ring A */}
            <div
              className="orbit-ring-a absolute -inset-4 rounded-full border border-dashed border-[var(--accent-border)] opacity-75 pointer-events-none"
            >
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
            </div>

            {/* 3D Tilted Orbital Ring B */}
            <div
              className="orbit-ring-b absolute -inset-7 rounded-full border border-[var(--border-strong)] opacity-50 pointer-events-none"
            >
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--accent-2)] shadow-[0_0_10px_var(--accent-2)]" />
            </div>

            {/* Floating Avatar Sphere */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 animate-float">
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
                className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-page)] flex items-center justify-center shadow-md"
                title="Available for work"
              >
                <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 animate-ping" />
              </span>
            </div>

            {/* 3D Rotating Holographic Stack Cube */}
            <div className="absolute -bottom-2 -left-1 sm:-bottom-1 sm:-left-2 z-20">
              <TechCube3D />
            </div>
          </motion.div>
        </div>
      </Tilt3DCard>
    </section>
  );
}
