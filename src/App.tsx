import { useEffect, useState } from 'react';
import Spotlight from './components/Spotlight';
import Header from './components/Header';
import Hero from './components/Hero';
import ConnectCollab from './components/ConnectCollab';
import About, { Skills } from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import MathSandbox from './components/MathSandbox';
import Certifications from './components/Certifications';
import ContactForm from './components/ContactForm';
import FloatingChatbot from './components/FloatingChatbot';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'cosmic';
    }
    return 'cosmic';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Get current theme class
  const getThemeClass = () => {
    switch (theme) {
      case 'sunset': return 'theme-sunset';
      case 'oceanic': return 'theme-oceanic';
      case 'amethyst': return 'theme-amethyst';
      case 'emerald': return 'theme-emerald';
      default: return ''; // Cosmic Aurora is default, loads root values
    }
  };

  useEffect(() => {
    // Highly reliable section monitoring using browser's IntersectionObserver
    const sections = ['hero', 'connect', 'about', 'skills', 'experience', 'projects', 'sandbox', 'certifications', 'contact'];
    const observedElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // triggers when section is in the upper middle viewport area
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`theme-container ${getThemeClass()} leading-relaxed antialiased selection:bg-indigo-500/30 selection:text-indigo-200 min-h-screen relative font-sans overflow-x-hidden pb-12`}>
      {/* Decorative ambient blurred blobs supporting colorful animations */}
      <div className="absolute top-[5%] left-[5%] w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none animate-mesh-1 z-0" />
      <div className="absolute top-[25%] right-[5%] w-[450px] h-[450px] rounded-full bg-indigo-600/8 blur-[120px] pointer-events-none animate-mesh-2 z-0" />
      <div className="absolute top-[55%] left-[8%] w-[400px] h-[400px] rounded-full bg-rose-600/8 blur-[100px] pointer-events-none animate-mesh-3 z-0" />
      <div className="absolute bottom-[15%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[110px] pointer-events-none animate-mesh-1 z-0" />

      {/* Header navigation bar */}
      <Header activeSection={activeSection} theme={theme} />

      {/* Spotlight Ambient Mouse Tracker */}
      <Spotlight />

      {/* Flagship Single-Column Structured Portfolio Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 md:py-16 lg:py-20 relative z-10 space-y-16 sm:space-y-24 md:space-y-28 lg:space-y-32">
        
        {/* Section 1: Hero (Vishal Kumar + Laptop / Hero Image) */}
        <Hero theme={theme} setTheme={setTheme} />

        {/* Section 2: Connect & Collab Direct Social Bento */}
        <ConnectCollab />

        {/* Section 3: About Me */}
        <About />

        {/* Section 4: Skills & Tech Stack Grid */}
        <Skills />

        {/* Section 5: Internship & Academic Experience Timeline */}
        <Experience />

        {/* Section 6: Selected Build Projects Cards */}
        <Projects />

        {/* Section 7: Vector Similarity Interactive Simulator */}
        <MathSandbox />

        {/* Section 8: Credentials & Certifications Cards */}
        <Certifications />

        {/* Section 9: Let's Work Together (Form Submission Client) */}
        <ContactForm />

        {/* Persistent copyright footing */}
        <footer className="pt-12 text-center text-xs text-zinc-500 font-mono space-y-2 border-t border-white/5">
          <p>
            © {new Date().getFullYear()} Vishal Kumar. All rights preserved.
          </p>
          <p className="max-w-2xl mx-auto leading-relaxed text-zinc-600">
            Re-engineered in modern single-column React, TypeScript, Express, and Tailwind CSS. Linear vector operations projected on real-time HTML5 2D coordinate canvas. AI chatbot fueled by Node.js server proxy.
          </p>
        </footer>

      </div>

      {/* Universal Floating AI Chatbot overlay button (always responsive & handy) */}
      <FloatingChatbot />
    </div>
  );
}
