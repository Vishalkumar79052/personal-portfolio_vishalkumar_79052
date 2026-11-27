<<<<<<< HEAD
import { Github, Linkedin, Facebook, Instagram, Mail, Phone, ArrowUpRight, MessageCircle } from 'lucide-react';
import { JOSH_BIO } from '../data';

export default function ConnectCollab() {
  const socials = [
    {
      label: 'GitHub',
      handle: '@Vishalkumar79052',
      href: JOSH_BIO.github,
      external: true,
      icon: Github,
      badgeBg: 'bg-slate-900 border border-slate-700/70',
      glow: 'rgba(148, 163, 184, 0.14)',
    },
    {
      label: 'LinkedIn',
      handle: 'Professional Network',
      href: JOSH_BIO.linkedin,
      external: true,
      icon: Linkedin,
      badgeBg: 'bg-[#0077b5]',
      glow: 'rgba(0, 119, 181, 0.18)',
    },
    {
      label: 'Email',
      handle: JOSH_BIO.email,
      href: `mailto:${JOSH_BIO.email}`,
      external: false,
      icon: Mail,
      badgeBg: 'bg-[#ea4335]',
      glow: 'rgba(234, 67, 53, 0.16)',
    },
    {
      label: 'Phone',
      handle: JOSH_BIO.phone,
      href: `tel:${JOSH_BIO.phone.replace(/\s+/g, '')}`,
      external: false,
      icon: Phone,
      badgeBg: 'bg-[#10b981]',
      glow: 'rgba(16, 185, 129, 0.16)',
    },
    ...(JOSH_BIO.facebook
      ? [
          {
            label: 'Facebook',
            handle: 'Profile Feed',
            href: JOSH_BIO.facebook,
            external: true,
            icon: Facebook,
            badgeBg: 'bg-[#1877f2]',
            glow: 'rgba(24, 119, 242, 0.16)',
          },
        ]
      : []),
    ...(JOSH_BIO.instagram
      ? [
          {
            label: 'Instagram',
            handle: 'Follow Feed',
            href: JOSH_BIO.instagram,
            external: true,
            icon: Instagram,
            badgeBg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
            glow: 'rgba(236, 72, 153, 0.16)',
          },
        ]
      : []),
  ];

  return (
    <section id="connect" className="scroll-mt-24 w-full" aria-label="Connect & Collab">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
        <div className="section-pill w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)] animate-pulse" />
          <span>Connect &amp; Collab</span>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase self-start sm:self-auto px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
          Available for roles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WhatsApp Featured Card */}
        <div className="md:col-span-1 h-full">
          <a
            href={`${JOSH_BIO.whatsapp}?text=Hi%20Vishal%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`}
            target="_blank"
            rel="noreferrer"
            className="surface-card surface-card-hover group h-full xl:min-h-[160px] flex flex-col justify-between p-5 rounded-2xl border-emerald-500/30 hover:border-emerald-500/60 cursor-pointer relative overflow-hidden"
          >
            <div
              className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(37, 211, 102, 0.18)' }}
            />
            <div className="relative flex items-center justify-between mb-6 md:mb-0">
              <span className="relative flex h-10 w-10 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25d366]/35 opacity-75" />
                <span className="relative inline-flex rounded-full h-10 w-10 bg-[#25d366] items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
                Fast Reply
              </span>
            </div>

            <div className="relative text-left mt-auto space-y-1">
              <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-500">
                Message Instantly
              </div>
              <div className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-1">
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="text-xs text-[var(--text-muted)] font-mono select-all">+91 8279688358</div>
=======
import { Github, Linkedin, Facebook, Instagram, Mail, Phone, ChevronRight, MessageCircle } from 'lucide-react';
import { JOSH_BIO } from '../data';

export default function ConnectCollab() {
  return (
    <section id="connect" className="scroll-mt-24 w-full" aria-label="Connect & Collab">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_#ec4899]" />
          <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
            Connect & Collab
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase self-start sm:self-auto px-2.5 py-1 bg-zinc-900/40 border border-zinc-900 rounded">Available for roles</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* WhatsApp Direct Messaging Accent card */}
        <div className="md:col-span-1 h-full">
          <a
            href="https://wa.me/918279688358?text=Hi%20Vishal%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
            className="group h-full relative xl:min-h-[140px] flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 hover:from-emerald-500/15 hover:to-teal-500/15 border border-emerald-500/20 hover:border-[#25d366]/40 text-emerald-300 hover:text-white transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_rgba(37,211,102,0.03)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.1)] cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4 md:mb-0">
              <span className="relative flex h-9 w-9 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25d366]/40 opacity-75" />
                <span className="relative inline-flex rounded-full h-9 w-9 bg-[#25d366] items-center justify-center text-white border border-[#25d366]/30">
                  <MessageCircle className="w-5 h-5 text-white" />
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>

            <div className="text-left mt-auto space-y-1">
              <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">Message Instantly</div>
              <div className="text-sm font-extrabold tracking-wide font-sans">Chat on WhatsApp</div>
              <div className="text-[11px] text-zinc-500 group-hover:text-zinc-400 font-mono select-all transition-colors">+91 8279688358</div>
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
            </div>
          </a>
        </div>

<<<<<<< HEAD
        {/* Social Bento Grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                className="surface-card surface-card-hover group flex flex-col justify-between p-4 rounded-2xl cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: item.glow }}
                />
                <div className="relative flex items-start justify-between mb-4">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white group-hover:scale-105 group-hover:rotate-3 transition-transform duration-200 shrink-0 shadow-sm ${item.badgeBg}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="relative text-left leading-tight">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--text-muted)]">
                    {item.label}
                  </div>
                  <div className="text-xs font-bold text-[var(--text-primary)] mt-1 truncate">{item.handle}</div>
                </div>
              </a>
            );
          })}
=======
        {/* Bento social links (takes 2 cols) */}
        <div className="md:col-span-2 grid grid-cols-2 xs:grid-cols-3 gap-3">
          
          <a
            href={JOSH_BIO.github}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-700/50 hover:bg-zinc-950/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.04)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center bg-black border border-zinc-800 text-white group-hover:scale-105 group-hover:bg-zinc-900 group-hover:rotate-6 transition-transform duration-300 shrink-0 mb-4">
              <Github className="w-4.5 h-4.5 text-white" />
            </span>
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors">GitHub</div>
              <div className="text-xs font-bold text-white mt-1 truncate">@Vishalkumar79052</div>
            </div>
          </a>

          <a
            href={JOSH_BIO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-[#0077b5]/50 hover:bg-[#0077b5]/5 hover:shadow-[0_0_15px_rgba(0,119,181,0.12)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0077b5] border border-[#0077b5]/30 text-white group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300 shrink-0 mb-4">
              <Linkedin className="w-4.5 h-4.5" />
            </span>
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 group-hover:text-sky-400 transition-colors">LinkedIn</div>
              <div className="text-xs font-bold text-sky-300 mt-1 truncate">Professional Network</div>
            </div>
          </a>

          <a
            href={`mailto:${JOSH_BIO.email}`}
            className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-[#ea4335]/50 hover:bg-[#ea4335]/5 hover:shadow-[0_0_15px_rgba(234,67,53,0.12)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#ea4335] border border-[#ea4335]/30 text-white group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300 shrink-0 mb-4 font-mono">
              <Mail className="w-4.5 h-4.5" />
            </span>
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 group-hover:text-rose-450 transition-colors">Gmail</div>
              <div className="text-xs font-bold text-rose-350 mt-1 truncate select-all">{JOSH_BIO.email}</div>
            </div>
          </a>

          <a
            href={`tel:${JOSH_BIO.phone.replace(/\s+/g, '')}`}
            className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-[#10b981]/50 hover:bg-[#10b981]/5 hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            title={`Call: ${JOSH_BIO.phone}`}
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#10b981] border border-[#10b981]/30 text-white group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300 shrink-0 mb-4">
              <Phone className="w-4.5 h-4.5" />
            </span>
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 group-hover:text-emerald-450 transition-colors">Phone</div>
              <div className="text-xs font-bold text-emerald-300 mt-1 truncate select-all">{JOSH_BIO.phone}</div>
            </div>
          </a>

          {JOSH_BIO.facebook && (
            <a
              href={JOSH_BIO.facebook}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-[#1877f2]/50 hover:bg-[#1877f2]/5 hover:shadow-[0_0_15px_rgba(24,119,242,0.12)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1877f2] border border-[#1877f2]/30 text-white group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300 shrink-0 mb-4 font-mono">
                <Facebook className="w-4.5 h-4.5" />
              </span>
              <div className="text-left leading-tight animate-fadeIn">
                <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 group-hover:text-indigo-400 transition-colors">Facebook</div>
                <div className="text-xs font-bold text-indigo-300 mt-1 truncate">Profile Feed</div>
              </div>
            </a>
          )}

          {JOSH_BIO.instagram && (
            <a
              href={JOSH_BIO.instagram}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-[#e1306c]/50 hover:bg-[#e1306c]/5 hover:shadow-[0_0_15px_rgba(225,48,108,0.12)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] border border-[#e1306c]/30 text-white group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300 shrink-0 mb-4">
                <Instagram className="w-4.5 h-4.5" />
              </span>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 group-hover:text-pink-400 transition-colors">Instagram</div>
                <div className="text-xs font-bold text-pink-300 mt-1 truncate">Follow Feed</div>
              </div>
            </a>
          )}

>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
        </div>
      </div>
    </section>
  );
}
