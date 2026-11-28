import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JOSH_BIO } from '../data';
import { Tilt3DCard } from './Motion3D';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const maxLength = 500;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    try {
      let delivered = false;
      try {
        const bkResponse = await fetch('/api/forms/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (bkResponse.ok) {
          const bkData = await bkResponse.json();
          if (bkData?.web3Forms?.sent || bkData?.emailJs?.sent || bkData?.success) {
            delivered = true;
          }
        }
      } catch {
        // Fallback to direct Web3Forms if backend is unavailable
      }

      if (!delivered) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: '2096dd3a-1a4e-4e9b-8352-e80a7584161e',
            ...payload,
            subject: `New Message from ${payload.name} (Portfolio)`,
            from_name: 'Vishal Kumar Portfolio',
          }),
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to deliver message.');
        }
      }

      setSubmissionSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error(err);
      setSubmissionError(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mb-12 scroll-mt-24" aria-label="Contact form">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
        <div className="section-pill w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>Contact</span>
        </div>
      </div>

      <Tilt3DCard maxTilt={3} scaleOnHover={1.004} glareColor="var(--spotlight-color)" className="rounded-3xl">
        <div className="surface-card group rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 relative overflow-hidden preserve-3d">
          <div
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30"
            style={{ background: 'var(--accent-glow)' }}
          />

          {/* Left Info Panel */}
          <div className="relative lg:col-span-2 flex flex-col justify-between space-y-6 depth-z-10">
            <div className="space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                Let&apos;s build something{' '}
                <span className="accent-gradient-text">remarkable.</span>
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Open to full-stack engineering roles, AI product collaborations, and freelance web applications. Drop a
                note and I&apos;ll respond promptly.
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <Mail className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <span className="text-[var(--text-primary)] truncate select-all">{JOSH_BIO.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-[var(--text-secondary)]">{JOSH_BIO.location} · Remote Ready</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-[var(--text-secondary)]">Usually replies within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form onSubmit={handleSubmit} className="relative lg:col-span-3 space-y-4 depth-z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="form-name"
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block"
                >
                  Your Name
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ada Lovelace"
                  className="input-surface w-full rounded-xl text-sm px-3.5 py-2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="form-email"
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block"
                >
                  Your Email Address
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@example.com"
                  className="input-surface w-full rounded-xl text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="form-msg"
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block"
                >
                  Connection Message
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    message.length >= maxLength ? 'text-rose-500 font-bold' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {message.length}/{maxLength}
                </span>
              </div>
              <textarea
                id="form-msg"
                required
                rows={4}
                value={message}
                maxLength={maxLength}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your project overview, query or collaborative idea here..."
                className="input-surface w-full rounded-xl text-sm px-3.5 py-2.5 resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl accent-gradient-bg hover:opacity-95 disabled:opacity-60 px-6 py-2.5 text-sm font-bold text-white transition-opacity cursor-pointer select-none gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send Message</span>
              </motion.button>

              <AnimatePresence>
                {submissionSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Message received! Thank you for reaching out.</span>
                  </motion.div>
                )}

                {submissionError && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-xs text-rose-500 font-mono font-semibold"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                    <span>{submissionError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </Tilt3DCard>
    </section>
  );
}
