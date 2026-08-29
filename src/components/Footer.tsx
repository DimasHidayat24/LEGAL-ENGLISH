import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Scale, BookOpen, Shield, Award, ExternalLink } from 'lucide-react';
import { LexaLogo } from './LexaLogo';

export const Footer: React.FC = () => {
  const { setSelectedTab } = useStudy();

  return (
    <footer className="bg-[#0D0F14] text-zinc-400 border-t border-zinc-800/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Identity & Philosophy */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1 bg-[#13151D] border border-zinc-800 rounded-xs flex items-center justify-center">
                <LexaLogo className="w-6 h-6" size={24} variant="colored" />
              </div>
              <span className="font-sans font-extrabold text-lg tracking-tight text-white">
                LEXA
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              An academic and professional Legal English learning platform crafted specifically for Indonesian law students, advocates, and corporate legal counsel.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-400">
              "Iura Novit Curia • Pacta Sunt Servanda"
            </div>
          </div>

          {/* Column 2: Curriculum & Study */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest uppercase text-zinc-200 font-semibold">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li>
                <button onClick={() => setSelectedTab('learn')} className="hover:text-white hover:underline text-left cursor-pointer">
                  Foundation & Pronominals
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-white hover:underline text-left cursor-pointer">
                  Commercial Contracts & CISG
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('comparative')} className="hover:text-white hover:underline text-left cursor-pointer">
                  KUHPerdata vs Common Law
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('learn')} className="hover:text-white hover:underline text-left cursor-pointer">
                  SIAC International Arbitration
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('write')} className="hover:text-white hover:underline text-left cursor-pointer">
                  Legal Memorandum & IRAC
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Digital Law Library */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest uppercase text-zinc-200 font-semibold">
              Document Library
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-white hover:underline text-left cursor-pointer">
                  Sale of Goods Agreement (CISG)
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-white hover:underline text-left cursor-pointer">
                  Bilateral Non-Disclosure Agreement
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-white hover:underline text-left cursor-pointer">
                  SIAC Final Arbitral Award Excerpt
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('documents')} className="hover:text-white hover:underline text-left cursor-pointer">
                  Foreign Investment Legal Opinion
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedTab('vocabulary')} className="hover:text-white hover:underline text-left cursor-pointer">
                  50+ Legal Terminology Dictionary
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Academic Integrity Notice */}
          <div className="space-y-3 border-l md:border-l border-zinc-800 pl-0 md:pl-6">
            <h4 className="text-xs font-mono tracking-widest uppercase text-zinc-200 font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-zinc-300" />
              Academic Standards
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              LEXA materials are curated in alignment with the Harvard Bluebook citation standard, modern Plain Legal English conventions (Bryan Garner / Kenneth Adams), and Indonesian Civil Law jurisprudence.
            </p>
            <div className="pt-2 text-[10px] font-mono text-zinc-400">
              Designed for serious study • Jakarta • Singapore
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} LEXA Platform. For educational and professional development purposes.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setSelectedTab('comparative')} className="hover:text-white underline cursor-pointer">
              Same Concept Disclaimers
            </button>
            <button onClick={() => setSelectedTab('insights')} className="hover:text-white underline cursor-pointer">
              Legal Insights Journal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
