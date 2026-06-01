import { useState } from 'react';
import { Award, ShieldCheck, Calendar, Bookmark, CheckCircle2 } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

interface CertDetails {
  id: string;
  code: string;
  date: string;
  skillsVerified: string[];
}

const EXT_CERT_DETAILS: Record<string, CertDetails> = {
  "codesphere-2nd-place": {
    id: "codesphere-2nd-place",
    code: "ACIC/SGTU/CODESHERE/2026/085 (Appreciation)",
    date: "March 18-20, 2026",
    skillsVerified: [
      "Awarded 2nd Position under the prominent COMMUNITY Theme",
      "Built innovative Community-centric solution in a 36-hour continuous hackathon",
      "Spearheaded rapid high-fidelity software engineering cycles",
      "Presented structural project prototype to SGT University & ACIC jury panels"
    ]
  },
  "codesphere-participation": {
    id: "codesphere-participation",
    code: "ACIC/SGTU/CODESHERE/2026/083 (Participation)",
    date: "March 18-20, 2026",
    skillsVerified: [
      "Successfully processed and delivered a working program within 36 hours limit",
      "Collaborated on design, front-end features, and technical architecture",
      "Handled challenging full-lifecycle development constraints in intense hackathon conditions",
      "Aided in structuring data flow models and code-splitting tactics"
    ]
  },
  "infosys-arduino": {
    id: "infosys-arduino",
    code: "INFY-ASC-2025",
    date: "August 27, 2025",
    skillsVerified: [
      "Hardware programming & Arduino microcontroller configuration",
      "Setting up serial communication and data transmission lines",
      "Troubleshooting signal pathways and board-to-board messaging",
      "Practical experience in IoT and embedded device networks"
    ]
  },
  "adya-buildathon": {
    id: "adya-buildathon",
    code: "ADYA-AI-BTH-2025",
    date: "December 4, 2025",
    skillsVerified: [
      "Rapid prototyping of AI-powered solutions & workflows",
      "Building full-stack application concepts in intense developer sprints",
      "Integrating Gemini API and LLM-driven features",
      "Collaborative project orchestration aligned with business challenges"
    ]
  },
  "unstop-hackdays": {
    id: "unstop-hackdays",
    code: "GCET-HD-2025",
    date: "2025 (Round 1)",
    skillsVerified: [
      "Solving high-integrity algorithmic and design challenges in short duration sprints",
      "Active collaboration in 'Team Shadow Fighter' to develop novel solutions",
      "Constructing and presenting responsive prototype interfaces",
      "Iterating software builds rapidly against hackathon requirements"
    ]
  },
  "oracle-ai": {
    id: "oracle-ai",
    code: "Oracle-AI-A10",
    date: "2024",
    skillsVerified: [
      "Oracle AI Foundation Associate methodologies",
      "Oracle Cloud Infrastructure (OCI) services",
      "Hands-on AI model deployment on OCI",
      "Cloud architecture foundational patterns"
    ]
  },
  "shadowfox-internship": {
    id: "shadowfox-internship",
    code: "SF-WD-INT-2024",
    date: "1 Month",
    skillsVerified: [
      "Responsive UI construction and semantic structure",
      "Interactive modern javascript application development",
      "Dynamic browser interface styling and framework implementation",
      "Collaborative version control pipelines"
    ]
  },
  "codsoft-internship": {
    id: "codsoft-internship",
    code: "CS-WD-INT-2024",
    date: "1 Month",
    skillsVerified: [
      "Frontend task automation and visual design elements",
      "Building web page widgets and utilities",
      "Integrating user states through native local browser storage",
      "Executing responsive mobile layouts"
    ]
  },
  "python-iit-bombay": {
    id: "python-iit-bombay",
    code: "IITB-PY-3.4.3",
    date: "2023",
    skillsVerified: [
      "Python 3.4.3 core grammar and structured development",
      "Advanced file I/O operations and exception handling",
      "Mathematical modules and numerical analytics",
      "Algorithm structures and clean programming conventions"
    ]
  },
  "mongodb-students": {
    id: "mongodb-students",
    code: "M001-MONGODB",
    date: "2024",
    skillsVerified: [
      "Introduction to NoSQL and document structures",
      "CRUD lifecycle queries and updates",
      "Creating indexed patterns for query performance",
      "NoSQL database schema mapping and configurations"
    ]
  }
};

export default function Certifications() {
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  const handleCertClick = (id: string) => {
    setActiveCertId(activeCertId === id ? null : id);
  };

  return (
    <section id="certifications" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32 lg:scroll-mt-24" aria-label="Certifications">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
          <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
            Certifications
          </span>
        </div>
      </div>
      
      <p className="text-sm text-zinc-400 mb-6 font-sans">
        Technical capabilities, professional training, and internship certifications completed in AI, databases, and modern web engineering. Click any badge to view credentials:
      </p>

      <div className="flex flex-col gap-4">
        {/* Core Badges Row */}
        <div className="flex flex-wrap gap-3">
          {CERTIFICATIONS.map((cert) => {
            const isActive = activeCertId === cert.id;
            return (
              <button
                key={cert.id}
                onClick={() => handleCertClick(cert.id)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 text-left cursor-pointer select-none ${
                  isActive
                    ? 'bg-zinc-900 border-indigo-500 shadow-md shadow-indigo-500/10 text-white'
                    : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80 text-zinc-300'
                }`}
              >
                <Award className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-indigo-400 scale-110' : 'text-zinc-500'}`} />
                <span>{cert.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Panel */}
        {activeCertId && (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 font-mono text-xs text-zinc-300 leading-relaxed space-y-4 animate-slideDown">
            {/* Header detail */}
            <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-zinc-100 font-bold uppercase text-[10px] tracking-wider">Verified Credential Status</span>
              </div>
              <span className="text-zinc-500 text-[10px]">VERIFIED 100% ONLINE</span>
            </div>

            {/* Credential Data Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 bg-zinc-900/30 p-2.5 rounded-lg border border-zinc-800/40">
                <div className="text-[10px] text-zinc-500">CREDENTIAL ID</div>
                <div className="font-bold text-zinc-200">{EXT_CERT_DETAILS[activeCertId].code}</div>
              </div>
              <div className="space-y-1 bg-zinc-900/30 p-2.5 rounded-lg border border-zinc-800/40">
                <div className="text-[10px] text-zinc-500">ISSUE DATE</div>
                <div className="font-bold text-zinc-200 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {EXT_CERT_DETAILS[activeCertId].date}
                </div>
              </div>
            </div>

            {/* Core learning nodes */}
            <div className="space-y-2">
              <div className="text-[10px] text-zinc-500 tracking-wider font-bold">VERIFIED COMPETENCIES</div>
              <ul className="space-y-1.5 text-zinc-400">
                {EXT_CERT_DETAILS[activeCertId].skillsVerified.map((competency, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
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
