import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
<<<<<<< HEAD
import { Download, MoreVertical, Sun, Moon } from 'lucide-react';
import type { ThemeMode } from '../App';

interface HeaderProps {
  activeSection: string;
  mode: ThemeMode;
  toggleMode: () => void;
}

export default function Header({ activeSection, mode, toggleMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const updateScroll = () => {
      rafId = 0;
      const y = window.scrollY;
      setIsScrolled(y > 12);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (y / maxScroll) * 100)) : 0);
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

=======
import { Download, MoreVertical } from 'lucide-react';
import { JOSH_BIO } from '../data';

interface HeaderProps {
  activeSection: string;
  theme: string;
}

export default function Header({ activeSection, theme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleDownloadResume = () => {
<<<<<<< HEAD
=======
    // Clear any previous custom-resume overrides from local storage
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
    if (typeof window !== 'undefined') {
      localStorage.removeItem('custom-resume');
      localStorage.removeItem('custom-resume-name');
    }

    const link = document.createElement('a');
    link.href = '/RenderCV_EngineeringResumes_2026 Update.pdf';
    link.download = 'Vishal_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
<<<<<<< HEAD
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
=======
    { id: 'sandbox', label: 'Simulator' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
  ];

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
<<<<<<< HEAD
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
=======
    const element = document.getElementById(id);
    if (id === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (element) {
      // Offset to account for the sticky top header (approx 80px-96px)
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
    }
  };

  return (
<<<<<<< HEAD
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--border-subtle)] backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'shadow-[0_10px_30px_-14px_rgba(0,0,0,0.38)]' : ''
      }`}
      style={{ backgroundColor: 'var(--bg-header)' }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 h-16 flex items-center justify-between gap-3 relative">
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="flex items-center gap-2.5 font-bold tracking-wider text-sm shrink-0 group"
          aria-label="Scroll back to top"
        >
          <span className="w-8 h-8 rounded-xl accent-gradient-bg text-white flex items-center justify-center font-black text-xs shadow-md group-hover:scale-105 transition-transform">
            VK
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)] font-semibold">
            <span>Vishal Kumar</span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)]">
              DEV
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center max-w-full overflow-x-auto scrollbar-none py-1 px-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)]"
          aria-label="Global upper navigation"
        >
          <div className="flex items-center whitespace-nowrap gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-[11px] font-bold uppercase tracking-wider transition-all duration-200 relative py-1.5 px-3.5 rounded-full cursor-pointer select-none ${
                    isActive
                      ? 'text-white accent-gradient-bg shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </a>
=======
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/60 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16 xl:px-24 h-16 flex items-center justify-between gap-4 relative">
        {/* Brand Logo / Monogram */}
        <a 
          href="#top" 
          onClick={(e) => handleNavClick(e, 'top')}
          className="flex items-center gap-1.5 font-bold tracking-wider text-sm text-white hover:text-indigo-400 transition-colors shrink-0 group"
          aria-label="Scroll back to top"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            VK
          </span>
          <span className="text-[10px] uppercase font-mono text-zinc-500 font-normal px-1.5 py-0.5 rounded border border-zinc-900 bg-zinc-950/50 group-hover:border-indigo-500/20 transition-all">
            PORTFOLIO
          </span>
        </a>

        {/* Desktop-only Horizontal Navigation Links */}
        <nav 
          className="hidden lg:flex items-center max-w-full overflow-x-auto scrollbar-none py-1 px-0.5" 
          aria-label="Global upper navigation"
        >
          <div className="flex items-center whitespace-nowrap">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <div key={item.id} className="flex items-center">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative py-2 px-1 cursor-pointer select-none group/nav ${
                      isActive
                        ? 'text-white font-extrabold font-sans'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover/nav:scale-[1.02] block">
                      {item.label}
                    </span>
                    {/* Underline Effect */}
                    {isActive ? (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded bg-gradient-to-r from-indigo-500 to-pink-500 shadow-[0_1px_8px_rgba(139,92,246,0.4)]" />
                    ) : (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded bg-gradient-to-r from-indigo-500/80 to-pink-500/80 scale-x-0 origin-center group-hover/nav:scale-x-100 transition-transform duration-350 ease-out" />
                    )}
                  </a>
                  {index < navItems.length - 1 && (
                    <span className="text-zinc-600 mx-3 select-none flex-shrink-0">•</span>
                  )}
                </div>
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
              );
            })}
          </div>
        </nav>

<<<<<<< HEAD
        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile menu */}
          <div className="flex lg:hidden relative" ref={menuRef}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer ${
                mobileMenuOpen
                  ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent-text)]'
                  : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              title="Menu links"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {mobileMenuOpen && (
              <div className="absolute top-full mt-2 right-0 w-52 rounded-2xl surface-elevated p-2 z-50 animate-slideDown">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer select-none ${
                          isActive
                            ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full accent-gradient-bg" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleMode}
            className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--accent-border)] text-[var(--text-primary)] text-[11px] font-semibold transition-all duration-200 active:scale-95 cursor-pointer"
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {mode === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-mono">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline font-mono">Dark</span>
              </>
            )}
          </button>

          {/* Resume Download */}
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl accent-gradient-bg text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md hover:opacity-95 cursor-pointer shrink-0"
=======
        {/* Mobile and tablet three-dot navigation trigger */}
        <div className="flex lg:hidden relative" ref={menuRef}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border transition-all duration-300 active:scale-95 cursor-pointer ${
              mobileMenuOpen 
                ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-300' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            title="Menu links"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Floating Dropdown Menu Card */}
          {mobileMenuOpen && (
            <div className="absolute top-full mt-2 left-0 w-48 rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8),_0_0_20px_rgba(139,92,246,0.15)] z-50 animate-slideDown animate-duration-150">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer select-none ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600/15 to-pink-600/15 text-white border-l-2 border-indigo-500'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Resume Controls (Download) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-[0_2px_10px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)] cursor-pointer shrink-0"
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
<<<<<<< HEAD
              <span className="hidden sm:inline">Download </span>Resume
=======
              <span className="hidden xs:inline">Download </span>Resume
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
            </span>
          </button>
        </div>
      </div>
<<<<<<< HEAD

      {/* Scroll Reading Progress Bar */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full accent-gradient-bg transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
=======
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
    </header>
  );
}
