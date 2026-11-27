import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
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
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
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
              );
            })}
          </div>
        </nav>

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
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              <span className="hidden sm:inline">Download </span>Resume
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Reading Progress Bar */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full accent-gradient-bg transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
