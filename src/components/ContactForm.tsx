import { useState, FormEvent } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [emailJsStatus, setEmailJsStatus] = useState<{ status: string; detail?: string } | null>(null);
  const [web3FormsStatus, setWeb3FormsStatus] = useState<{ status: string; detail?: string } | null>(null);

  const maxLength = 500;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);
    setEmailJsStatus(null);
    setWeb3FormsStatus(null);
    
    try {
      // Direct Web3Forms submission
      const payload = {
        access_key: "2096dd3a-1a4e-4e9b-8352-e80a7584161e",
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        subject: `New Message from ${name.trim()} (Portfolio)`,
        from_name: "Vishal Kumar Portfolio"
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to deliver message via Web3Forms API.");
      }

      setWeb3FormsStatus({ status: 'success' });

      // Optional: Log/Sync with backend without disrupting successful submission
      try {
        const bkResponse = await fetch('/api/forms/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });
        if (bkResponse.ok) {
          const bkData = await bkResponse.json();
          if (bkData && bkData.emailJs) {
            setEmailJsStatus(bkData.emailJs);
          }
        }
      } catch (bkErr) {
        console.warn("Backend local log sync skipped:", bkErr);
      }

      setSubmissionSuccess(true);
      
      // Reset input fields
      setName('');
      setEmail('');
      setMessage('');

      // Auto clear success indicator
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
    <section id="contact" className="mb-24 scroll-mt-24 sm:mb-32">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
          <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
            Contact
          </span>
        </div>
      </div>

      <p className="text-zinc-400 text-sm mb-6 max-w-lg leading-relaxed">
        I’m always open to talking about new opportunities, project designs, health-tech architectures, 
        or mathematical models. Drop a line into the digital scratchpad below:
      </p>

      {/* Main submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="form-name" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
              Your Name
            </label>
            <input
              id="form-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Marie Curie"
              className="w-full rounded-lg bg-zinc-900 border border-zinc-800 text-sm px-3.5 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="form-email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
              Your Email Address
            </label>
            <input
              id="form-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="marie@curie.edu"
              className="w-full rounded-lg bg-zinc-900 border border-zinc-800 text-sm px-3.5 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="form-msg" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
              Connection Message
            </label>
            <span className={`text-[10px] font-mono ${message.length >= maxLength ? 'text-rose-500' : 'text-zinc-650'}`}>
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
            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 text-sm px-3.5 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer select-none gap-2"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Send Message</span>
          </button>

          {submissionSuccess && (
            <div className="flex flex-col gap-0.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0 animate-bounce" />
                <span>Message Received! Thank you.</span>
              </div>
              {emailJsStatus && emailJsStatus.status === 'success' && (
                <span className="text-[10px] font-mono text-indigo-400 pl-5 uppercase font-semibold">
                  🚀 Delivery confirmed via EmailJS
                </span>
              )}
              {web3FormsStatus && web3FormsStatus.status === 'success' && (
                <span className="text-[10px] font-mono text-emerald-400 pl-5 uppercase font-semibold">
                  🚀 Forwarded successfully via Web3Forms (Real-time Email)
                </span>
              )}
              {emailJsStatus && emailJsStatus.status === 'skipped_missing_public_key' && (
                <span className="text-[10px] font-mono text-zinc-500 pl-5">
                  Set EMAILJS_PUBLIC_KEY in Secrets for live email dispatch.
                </span>
              )}
              {emailJsStatus && (emailJsStatus.status === 'failed' || emailJsStatus.status === 'error') && (
                <span className="text-[10px] font-mono text-amber-500 pl-5">
                  ⚠️ EmailJS service delivery check failed: {emailJsStatus.detail}
                </span>
              )}
            </div>
          )}

          {submissionError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
              <span>{submissionError}</span>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
