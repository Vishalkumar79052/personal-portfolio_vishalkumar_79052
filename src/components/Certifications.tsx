import { useState } from 'react';
import { Award, ShieldCheck, Calendar, CheckCircle2, ChevronDown } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

interface CertDetails {
  id: string;
  code: string;
  date: string;
  skillsVerified: string[];
}

const EXT_CERT_DETAILS: Record<string, CertDetails> = {
  'codesphere-2nd-place': {
    id: 'codesphere-2nd-place',
    code: 'ACIC/SGTU/CODESHERE/2026/085 (Appreciation)',
    date: 'March 18-20, 2026',
    skillsVerified: [
      'Awarded 2nd Position under the prominent COMMUNITY Theme',
      'Built innovative Community-centric solution in a 36-hour continuous hackathon',
      'Spearheaded rapid high-fidelity software engineering cycles',
      'Presented structural project prototype to SGT University & ACIC jury panels',
    ],
  },
  'codesphere-participation': {
    id: 'codesphere-participation',
    code: 'ACIC/SGTU/CODESHERE/2026/083 (Participation)',
    date: 'March 18-20, 2026',
    skillsVerified: [
      'Successfully processed and delivered a working program within 36 hours limit',
      'Collaborated on design, front-end features, and technical architecture',
      'Handled challenging full-lifecycle development constraints in intense hackathon conditions',
      'Aided in structuring data flow models and code-splitting tactics',
    ],
  },
  'infosys-arduino': {
    id: 'infosys-arduino',
    code: 'INFY-ASC-2025',
    date: 'August 27, 2025',
    skillsVerified: [
      'Hardware programming & Arduino microcontroller configuration',
      'Setting up serial communication and data transmission lines',
      'Troubleshooting signal pathways and board-to-board messaging',
      'Practical experience in IoT and embedded device networks',
    ],
  },
  'adya-buildathon': {
    id: 'adya-buildathon',
    code: 'ADYA-AI-BTH-2025',
    date: 'December 4, 2025',
    skillsVerified: [
      'Rapid prototyping of AI-powered solutions & workflows',
      'Building full-stack application concepts in intense developer sprints',
      'Integrating Gemini API and LLM-driven features',
      'Collaborative project orchestration aligned with business challenges',
    ],
  },
  'unstop-hackdays': {
    id: 'unstop-hackdays',
    code: 'GCET-HD-2025',
    date: '2025 (Round 1)',
    skillsVerified: [
      'Solving high-integrity algorithmic and design challenges in short duration sprints',
      "Active collaboration in 'Team Shadow Fighter' to develop novel solutions",
      'Constructing and presenting responsive prototype interfaces',
      'Iterating software builds rapidly against hackathon requirements',
    ],
  },
  'oracle-ai': {
    id: 'oracle-ai',
    code: 'Oracle-AI-A10',
    date: '2024',
    skillsVerified: [
      'Oracle AI Foundation Associate methodologies',
      'Oracle Cloud Infrastructure (OCI) services',
      'Hands-on AI model deployment on OCI',
      'Cloud architecture foundational patterns',
    ],
  },
  'shadowfox-internship': {
    id: 'shadowfox-internship',
    code: 'SF-WD-INT-2024',
    date: '1 Month',
    skillsVerified: [
      'Responsive UI construction and semantic structure',
      'Interactive modern JavaScript application development',
      'Dynamic browser interface styling and framework implementation',
      'Collaborative version control pipelines',
    ],
  },
  'codsoft-internship': {
    id: 'codsoft-internship',
    code: 'CS-WD-INT-2024',
    date: '1 Month',
    skillsVerified: [
      'Frontend task automation and visual design elements',
      'Building web page widgets and utilities',
      'Integrating user states through native local browser storage',
      'Executing responsive mobile layouts',
    ],
  },
  'python-iit-bombay': {
    id: 'python-iit-bombay',
    code: 'IITB-PY-3.4.3',
    date: '2023',
    skillsVerified: [
      'Python 3.4.3 core grammar and structured development',
      'Advanced file I/O operations and exception handling',
      'Mathematical modules and numerical analytics',
      'Algorithm structures and clean programming conventions',
    ],
  },
  'mongodb-students': {
    id: 'mongodb-students',
    code: 'M001-MONGODB',
    date: '2024',
    skillsVerified: [
      'Introduction to NoSQL and document structures',
      'CRUD lifecycle queries and updates',
      'Creating indexed patterns for query performance',
      'NoSQL database schema mapping and configurations',
    ],
  },
};

export default function Certifications() {
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  const handleCertClick = (id: string) => {
    setActiveCertId(activeCertId === id ? null : id);
  };

  return (
    <section id="certifications" className="scroll-mt-24" aria-label="Certifications">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
        <div className="section-pill w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>Certifications</span>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase self-start sm:self-auto px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
          Click any card to inspect
        </span>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mb-6">
        Technical capabilities, hackathon recognitions, and training certifications completed in AI, databases, and
        modern web engineering:
      </p>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CERTIFICATIONS.map((cert) => {
            const isActive = activeCertId === cert.id;
            return (
              <button
                key={cert.id}
                onClick={() => handleCertClick(cert.id)}
                className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] shadow-sm'
                    : 'surface-card surface-card-hover'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-xl border shrink-0 transition-colors ${
                      isActive
                        ? 'accent-gradient-bg border-transparent text-white'
                        : 'bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--accent-text)]'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--text-primary)] leading-snug">{cert.name}</div>
                    <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5 truncate">{cert.issuer}</div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                    isActive ? 'rotate-180 text-[var(--accent-text)]' : ''
                  }`}
                />
              </button>
            );
          })}
        </div>

        {activeCertId && EXT_CERT_DETAILS[activeCertId] && (
          <div className="mt-2 rounded-2xl surface-card p-5 sm:p-6 font-mono text-xs text-[var(--text-secondary)] leading-relaxed space-y-4 animate-slideDown">
            <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[var(--text-primary)] font-bold uppercase text-[11px] tracking-wider">
                  Verified Credential Details
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 font-bold">
                VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1 bg-[var(--bg-subtle)] p-3 rounded-xl border border-[var(--border-subtle)]">
                <div className="text-[10px] text-[var(--text-muted)]">CREDENTIAL ID</div>
                <div className="font-bold text-[var(--text-primary)] break-all">
                  {EXT_CERT_DETAILS[activeCertId].code}
                </div>
              </div>
              <div className="space-y-1 bg-[var(--bg-subtle)] p-3 rounded-xl border border-[var(--border-subtle)]">
                <div className="text-[10px] text-[var(--text-muted)]">ISSUE DATE</div>
                <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                  {EXT_CERT_DETAILS[activeCertId].date}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-[var(--text-muted)] tracking-wider font-bold">
                VERIFIED COMPETENCIES
              </div>
              <ul className="space-y-2 text-[var(--text-secondary)] font-sans text-xs sm:text-sm">
                {EXT_CERT_DETAILS[activeCertId].skillsVerified.map((competency, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{competency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
