import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { MapPin, Clock, Sparkles, Camera } from 'lucide-react';
import { JOSH_BIO } from '../data';
// @ts-ignore
import vishalAvatar from '../assets/images/vishal_avatar_1780254597338.png';

interface HeroProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function Hero({ theme, setTheme }: HeroProps) {
  const [localTime, setLocalTime] = useState<string>('');
  const [avatar, setAvatar] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('custom-avatar') || 'https://github.com/Vishalkumar79052.png';
    }
    return 'https://github.com/Vishalkumar79052.png';
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('custom-avatar', base64String);
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const updateTime = () => {
      // Kolkata (India) Time Zone for IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const timestring = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setLocalTime(timestring);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="w-full pt-6 md:pt-10 scroll-mt-24 space-y-8" aria-label="Hero Intro">
      {/* Bio / Heading Block */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 justify-between">
        
        {/* Texts Info (Name + Title + Tagline) */}
        <div className="flex-1 text-center md:text-left space-y-4">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase py-1 px-2.5 rounded bg-indigo-500/10 border border-indigo-500/20 shadow-sm">
              Portfolio
            </span>
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              {JOSH_BIO.location}
            </span>
          </div>

          <h1 className="text-4xl xs:text-5xl font-black tracking-tight text-white md:text-6xl select-none leading-none">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {JOSH_BIO.name}
            </span>
          </h1>

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

        {/* Dynamic Avatar */}
        <div className="relative group w-32 h-32 sm:w-36 sm:h-36 cursor-pointer shrink-0" onClick={triggerFileSelect}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
            aria-label="Upload custom bio photo"
          />
          {/* Neon cosmic aura flow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-colors duration-300 bg-zinc-950">
            <img
              src={avatar}
              alt="Vishal Kumar Avatar"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = vishalAvatar;
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity duration-300">
              <Camera className="w-5 h-5 text-white" />
              <span className="text-[9px] text-zinc-300 font-sans font-semibold uppercase tracking-wider">Change Photo</span>
            </div>
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border border-zinc-950 flex items-center justify-center shadow">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
          </span>
        </div>
      </div>

      {/* Kolkata local Clock bar */}
      {localTime && (
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/30 border border-zinc-900 rounded-xl py-2.5 px-4 w-fit">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Clock className="w-3.5 h-3.5 text-zinc-400 ml-1" />
          <span>Local Time (IST): <strong className="text-white select-all">{localTime}</strong></span>
        </div>
      )}



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
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
