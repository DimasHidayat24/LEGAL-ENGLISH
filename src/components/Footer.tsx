import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedTab, theme } = useStudy();

  return (
    <footer className={`backdrop-blur-xl border-t mt-24 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#080808]/95 text-[#A8A8A8] border-white/[0.08]' 
        : 'bg-[#FAFAFA]/95 text-[#555555] border-black/[0.08]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Identity & Philosophy */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center">
              <span className={`font-brand font-semibold italic text-2xl tracking-[0.01em] select-none ${
                theme === 'dark' ? 'text-[#F2F2F2]' : 'text-[#121212]'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', 'Source Serif 4', Georgia, serif" }}
              >
                Lexa
              </span>
            </div>
            <p className={`text-xs font-sans leading-relaxed ${
              theme === 'dark' ? 'text-[#A8A8A8]' : 'text-[#666666]'
            }`}>
              An academic and professional Legal English learning platform crafted specifically for Indonesian law students, advocates, and corporate legal counsel.
            </p>
          </div>

          {/* Column 2: Curriculum & Study */}
          <div className="space-y-3">
            <h4 className={`text-xs font-sans tracking-widest uppercase font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}>
              Curriculum Tracks
            </h4>
            <ul className={`space-y-2 text-xs font-sans ${
              theme === 'dark' ? 'text-[#A8A8A8]' : 'text-[#666666]'
            }`}>
              <li>
                <button onClick={() => setSelectedTab('learn')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  Foundation & Pronominals
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  Commercial Contracts & CISG
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('comparative')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  KUHPerdata vs Common Law
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('learn')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  SIAC International Arbitration
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('write')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  Legal Memorandum & IRAC
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Digital Law Library */}
          <div className="space-y-3">
            <h4 className={`text-xs font-sans tracking-widest uppercase font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}>
              Document Library
            </h4>
            <ul className={`space-y-2 text-xs font-sans ${
              theme === 'dark' ? 'text-[#A8A8A8]' : 'text-[#666666]'
            }`}>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  Sale of Goods Agreement (CISG)
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  Bilateral Non-Disclosure Agreement
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  SIAC Final Arbitral Award Excerpt
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  Foreign Investment Legal Opinion
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('vocabulary')} className="hover:text-black dark:hover:text-white hover:underline text-left cursor-pointer transition-colors">
                  50+ Legal Terminology Dictionary
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Academic Integrity Notice */}
          <div className={`space-y-3 border-l pl-0 md:pl-6 ${
            theme === 'dark' ? 'border-white/[0.08]' : 'border-black/[0.08]'
          }`}>
            <h4 className={`text-xs font-sans tracking-widest uppercase font-bold flex items-center gap-1.5 ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}>
              <Shield className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-white' : 'text-[#121212]'}`} />
              Academic Standards
            </h4>
            <p className={`text-xs leading-relaxed font-sans font-normal ${
              theme === 'dark' ? 'text-[#A8A8A8]' : 'text-[#666666]'
            }`}>
              LEXA materials are curated in alignment with the Harvard Bluebook citation standard, modern Plain Legal English conventions (Bryan Garner / Kenneth Adams), and Indonesian Civil Law jurisprudence.
            </p>
            <div className={`pt-2 text-[10px] font-sans font-medium ${
              theme === 'dark' ? 'text-[#707070]' : 'text-[#888888]'
            }`}>
              Designed for serious study • Jakarta • Singapore
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans gap-4 ${
          theme === 'dark' ? 'border-white/[0.08] text-[#707070]' : 'border-black/[0.08] text-[#888888]'
        }`}>
          <p>© {new Date().getFullYear()} LEXA Platform. For educational and professional development purposes.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setSelectedTab('comparative')} className="hover:text-black dark:hover:text-white underline cursor-pointer transition-colors">
              Comparative Law Notes
            </button>
            <button onClick={() => setSelectedTab('insights')} className="hover:text-black dark:hover:text-white underline cursor-pointer transition-colors">
              Legal Insights Journal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
