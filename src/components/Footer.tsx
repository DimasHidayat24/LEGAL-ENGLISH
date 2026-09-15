import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedTab, theme } = useStudy();

  return (
    <footer className={`backdrop-blur-xl border-t mt-24 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#050B16]/95 text-[#9BAABC] border-[#1D3552]' 
        : 'bg-[#F4F7FB]/95 text-[#3E5168] border-[#D4DFEC]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Identity & Philosophy */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center">
              <span className={`font-brand font-semibold italic text-2xl tracking-[0.01em] select-none ${
                theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', 'Source Serif 4', Georgia, serif" }}
              >
                Lexa
              </span>
            </div>
            <p className={`text-xs font-sans leading-relaxed ${
              theme === 'dark' ? 'text-[#9BAABC]' : 'text-[#55687D]'
            }`}>
              An academic and professional Legal English learning platform crafted specifically for Indonesian law students, advocates, and corporate legal counsel.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className={`px-3 py-0.5 rounded-full text-[10px] font-sans font-medium border ${
                theme === 'dark'
                  ? 'bg-[#112239]/60 text-[#4F83B8] border-[#1D3552]'
                  : 'bg-[#E4EEF8] text-[#1E4E88] border-[#B6CBE0]'
              }`}>
                Common Law × Civil Law
              </span>
              <span className={`px-3 py-0.5 rounded-full text-[10px] font-sans font-medium border ${
                theme === 'dark'
                  ? 'bg-[#112239]/60 text-[#9EC4AC] border-[#1D3552]'
                  : 'bg-[#E6F4ED] text-[#1C6B46] border-[#A3D9B8]'
              }`}>
                Indonesian Jurisprudence
              </span>
            </div>
          </div>

          {/* Column 2: Curriculum & Study */}
          <div className="space-y-3">
            <h4 className={`text-xs font-sans tracking-widest uppercase font-bold ${
              theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
            }`}>
              Curriculum Tracks
            </h4>
            <ul className={`space-y-2 text-xs font-sans ${
              theme === 'dark' ? 'text-[#9BAABC]' : 'text-[#55687D]'
            }`}>
              <li>
                <button onClick={() => setSelectedTab('learn')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  Foundation & Pronominals
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  Commercial Contracts & CISG
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('comparative')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  KUHPerdata vs Common Law
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('learn')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  SIAC International Arbitration
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('write')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  Legal Memorandum & IRAC
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Digital Law Library */}
          <div className="space-y-3">
            <h4 className={`text-xs font-sans tracking-widest uppercase font-bold ${
              theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
            }`}>
              Document Library
            </h4>
            <ul className={`space-y-2 text-xs font-sans ${
              theme === 'dark' ? 'text-[#9BAABC]' : 'text-[#55687D]'
            }`}>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  Sale of Goods Agreement (CISG)
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  Bilateral Non-Disclosure Agreement
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  SIAC Final Arbitral Award Excerpt
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  Foreign Investment Legal Opinion
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('vocabulary')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] hover:underline text-left cursor-pointer transition-colors">
                  50+ Legal Terminology Dictionary
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Academic Integrity Notice */}
          <div className={`space-y-3 border-l pl-0 md:pl-6 ${
            theme === 'dark' ? 'border-[#1D3552]' : 'border-[#D4DFEC]'
          }`}>
            <h4 className={`text-xs font-sans tracking-widest uppercase font-bold flex items-center gap-1.5 ${
              theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
            }`}>
              <Shield className="w-3.5 h-3.5 text-[#4F83B8]" />
              Academic Standards
            </h4>
            <p className={`text-xs leading-relaxed font-sans font-normal ${
              theme === 'dark' ? 'text-[#9BAABC]' : 'text-[#55687D]'
            }`}>
              LEXA materials are curated in alignment with the Harvard Bluebook citation standard, modern Plain Legal English conventions (Bryan Garner / Kenneth Adams), and Indonesian Civil Law jurisprudence.
            </p>
            <div className={`pt-2 text-[10px] font-sans font-medium ${
              theme === 'dark' ? 'text-[#64758A]' : 'text-[#8495A8]'
            }`}>
              Designed for serious study • Jakarta • Singapore
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans gap-4 ${
          theme === 'dark' ? 'border-[#1D3552] text-[#64758A]' : 'border-[#D4DFEC] text-[#6E8094]'
        }`}>
          <p>© {new Date().getFullYear()} LEXA Platform. For educational and professional development purposes.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setSelectedTab('comparative')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] underline cursor-pointer transition-colors">
              Comparative Law Notes
            </button>
            <button onClick={() => setSelectedTab('insights')} className="hover:text-[#4F83B8] dark:hover:text-[#F3F5F7] underline cursor-pointer transition-colors">
              Legal Insights Journal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
