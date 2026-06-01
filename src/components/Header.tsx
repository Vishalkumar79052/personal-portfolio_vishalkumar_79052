import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, ChangeEvent } from 'react';
import { Sparkles, HelpCircle, Download, Upload, Check, MoreVertical } from 'lucide-react';
import { JOSH_BIO } from '../data';

interface HeaderProps {
  activeSection: string;
  theme: string;
}

export default function Header({ activeSection, theme }: HeaderProps) {
  const [uploading, setUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const [hasCustomResume, setHasCustomResume] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('custom-resume');
      if (saved) {
        setHasCustomResume(true);
      }
    }
  }, []);

  // Close dropdown on click outside
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

  const handleUploadResume = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only.');
        return;
      }
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
          localStorage.setItem('custom-resume', base64String);
          localStorage.setItem('custom-resume-name', file.name);
          setHasCustomResume(true);
          setJustUploaded(true);
          setTimeout(() => setJustUploaded(false), 3000);
        } catch (error) {
          console.error('Error saving PDF to localStorage:', error);
          alert('PDF file is too large for storage. Please try a smaller, optimized PDF (under ~4MB).');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadResume = () => {
    const saved = localStorage.getItem('custom-resume');
    const savedName = localStorage.getItem('custom-resume-name') || 'Vishal_Kumar_Resume.pdf';
    
    const link = document.createElement('a');
    if (saved) {
      link.href = saved;
      link.download = savedName;
    } else {
      link.href = '/resume.pdf';
      link.download = 'Vishal_Kumar_Resume.pdf';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'sandbox', label: 'Simulator' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    }
  };

  return (
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
              );
            })}
          </div>
        </nav>

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

        {/* Interactive Resume Controls (Download & Upload) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUploadResume}
            accept="application/pdf"
            className="hidden"
            aria-label="Upload PDF Resume file"
          />

          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-[0_2px_10px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)] cursor-pointer shrink-0"
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              <span className="hidden xs:inline">Download </span>Resume
            </span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-lg border text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shrink-0 ${
              justUploaded 
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Upload Custom PDF Resume"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-zinc-400/30 border-t-zinc-400 rounded-full animate-spin" />
                <span className="hidden md:inline">Processing</span>
              </>
            ) : justUploaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline text-emerald-400">Done!</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Upload</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
