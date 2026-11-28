import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Spotlight from './components/Spotlight';
import Header from './components/Header';
import Hero from './components/Hero';
import ConnectCollab from './components/ConnectCollab';
import About, { Skills } from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import ContactForm from './components/ContactForm';
import FloatingChatbot from './components/FloatingChatbot';
import { Reveal3D } from './components/Motion3D';

export type ThemeMode = 'dark' | 'light';

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-mode');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  });

  const { scrollYProgress } = useScroll();
  const meshY1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const meshY2 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const meshY3 = useTransform(scrollYProgress, [0, 1], [0, -110]);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('portfolio-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const navIds = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 24) {
        setActiveSection('contact');
        return;
      }

      let current = '';
      for (const id of navIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="theme-shell leading-relaxed antialiased selection:bg-[var(--accent-soft)] selection:text-[var(--text-primary)] min-h-screen relative font-sans overflow-x-clip pb-12">
      {/* Architectural Dot Grid */}
      <div className="fixed inset-0 bg-dot-grid pointer-events-none z-0" />

      {/* Scroll-Driven Parallax Ambient Mesh Glows */}
      <motion.div
        className="fixed top-[4%] left-[4%] w-[360px] h-[360px] rounded-full blur-[110px] pointer-events-none animate-mesh-1 z-0"
        style={{ background: 'var(--mesh-1)', y: meshY1 }}
      />
      <motion.div
        className="fixed top-[28%] right-[4%] w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none animate-mesh-2 z-0"
        style={{ background: 'var(--mesh-2)', y: meshY2 }}
      />
      <motion.div
        className="fixed bottom-[10%] left-[12%] w-[380px] h-[380px] rounded-full blur-[115px] pointer-events-none animate-mesh-3 z-0"
        style={{ background: 'var(--mesh-3)', y: meshY3 }}
      />

      <Header activeSection={activeSection} mode={mode} toggleMode={toggleMode} />
      <div className="h-16" aria-hidden="true" />
      <Spotlight />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10 md:py-16 lg:py-20 relative z-10 space-y-16 sm:space-y-24 md:space-y-28">
        <Hero />
        <Reveal3D>
          <ConnectCollab />
        </Reveal3D>
        <Reveal3D>
          <About />
        </Reveal3D>
        <Reveal3D>
          <Skills />
        </Reveal3D>
        <Reveal3D>
          <Experience />
        </Reveal3D>
        <Reveal3D>
          <Projects />
        </Reveal3D>
        <Reveal3D>
          <Certifications />
        </Reveal3D>
        <Reveal3D>
          <ContactForm />
        </Reveal3D>

        <footer className="pt-10 text-center text-xs font-mono space-y-2 border-t border-[var(--border-subtle)] text-[var(--text-muted)]">
          <p className="text-[var(--text-secondary)] font-semibold">
            © {new Date().getFullYear()} Vishal Kumar. All rights reserved.
          </p>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Built with React, TypeScript, Express, Tailwind CSS, Motion 3D, and Gemini AI Copilot.
          </p>
        </footer>
      </main>

      <FloatingChatbot />
    </div>
  );
}
