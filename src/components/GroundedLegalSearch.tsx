import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Scale, 
  Copy, 
  Check, 
  Loader2, 
  AlertCircle, 
  Globe, 
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';

interface GroundedSource {
  title: string;
  uri: string;
}

interface GroundedSearchResponse {
  success: boolean;
  analysis: string;
  sources: GroundedSource[];
  searchQueries?: string[];
  fallbackUsed?: boolean;
  engine?: string;
  error?: string;
}

interface GroundedLegalSearchProps {
  initialTerm?: string;
  initialQuery?: string;
  category?: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
}

export const GroundedLegalSearch: React.FC<GroundedLegalSearchProps> = ({
  initialTerm,
  initialQuery = '',
  category = 'Indonesian & Common Law',
  compact = false,
  title = 'Live Legal Research & Jurisprudence',
  subtitle = 'Grounded in Indonesian statutory updates, Supreme Court (Mahkamah Agung) jurisprudence, and cross-border commercial precedents.',
}) => {
  const [query, setQuery] = useState<string>(
    initialQuery || (initialTerm ? `How is "${initialTerm}" applied in Indonesian Supreme Court (Mahkamah Agung) decisions and transnational commercial contracts?` : '')
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GroundedSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showSources, setShowSources] = useState<boolean>(true);

  const presetTopics = [
    {
      label: 'Exoneration Clauses (Art. 1320/1337)',
      query: 'What is the Indonesian Supreme Court (Mahkamah Agung) jurisprudence on the enforceability of Hold Harmless and Exoneration clauses under Article 1320 and 1337 KUHPerdata?',
    },
    {
      label: 'Arbitration Enforcement (BANI & SIAC)',
      query: 'Indonesian court procedure and jurisprudence for the execution of international arbitral awards (SIAC / ICC) in Central Jakarta District Court under Law No. 30 of 1999.',
    },
    {
      label: 'Liquidated Damages (Art. 1249 KUHPerdata)',
      query: 'How do Indonesian courts distinguish between Liquidated Damages and Penalty clauses (Denda Keterlambatan) under Article 1249 KUHPerdata?',
    },
    {
      label: 'Termination Waiver (Art. 1266 KUHPerdata)',
      query: 'Mahkamah Agung rulings regarding express waiver of Article 1266 KUHPerdata (Ketentuan Pengesampingan Pengadilan dalam Pemutusan Kontrak).',
    },
  ];

  const handleExecuteSearch = async (searchPrompt?: string) => {
    const promptToUse = searchPrompt || query;
    if (!promptToUse.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/grounded-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: promptToUse,
          term: initialTerm,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      setResult(data);
    } catch (err: any) {
      console.error('Legal research error:', err);
      setError(err.message || 'Failed to complete legal research. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.analysis) return;
    navigator.clipboard.writeText(result.analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-3xl border transition-all ${
      compact 
        ? 'p-5 bg-[#0C0C0C]/90 dark:bg-[#0C0C0C]/90 bg-white/90 border-white/[0.08] dark:border-white/[0.08] border-black/[0.08]' 
        : 'p-6 sm:p-8 lexa-card'
    }`}>
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.08] dark:border-white/[0.08] border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#181818] dark:bg-[#181818] bg-black/[0.06] text-white dark:text-white text-black border border-white/[0.12] dark:border-white/[0.12] border-black/[0.1]">
              <Globe className="w-3 h-3 text-[#5A9EFE]" />
              Legal Grounding
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60">
              <Cpu className="w-3 h-3 text-emerald-400" />
              gemini-3.8-flash
            </span>
            {result?.fallbackUsed && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                Resilient Jurisprudence Engine
              </span>
            )}
          </div>
          <h3 className="font-sans font-bold text-lg sm:text-xl text-white dark:text-white text-black">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#A8A8A8] dark:text-[#A8A8A8] text-black/70 mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {initialTerm && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 font-medium">Focused Term:</span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1C1C1C] dark:bg-[#1C1C1C] bg-black/[0.08] text-white dark:text-white text-black border border-white/20 dark:border-white/20 border-black/15">
              {initialTerm}
            </span>
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={compact ? 2 : 3}
            placeholder="Ask an Indonesian law or comparative legal question (e.g., Mahkamah Agung precedents, CISG applicability, arbitration clauses, or statutory compliance)..."
            className="w-full px-4 py-3 rounded-2xl bg-[#101010] dark:bg-[#101010] bg-black/[0.03] border border-white/[0.12] dark:border-white/[0.12] border-black/[0.1] text-xs sm:text-sm font-sans text-white dark:text-white text-black placeholder:text-[#707070] focus:outline-none focus:border-white/30 dark:focus:border-white/30 focus:border-black/30 transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Action Bar: Presets & Submit */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {!compact && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-sans text-[#707070] dark:text-[#707070] text-black/50 font-medium mr-1">
                Suggested Inquiries:
              </span>
              {presetTopics.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(preset.query);
                    handleExecuteSearch(preset.query);
                  }}
                  className="px-2.5 py-1 rounded-full text-[11px] font-sans bg-[#141414] dark:bg-[#141414] bg-black/[0.04] text-[#A8A8A8] dark:text-[#A8A8A8] text-black/75 border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] hover:text-white dark:hover:text-white hover:text-black hover:border-white/20 transition-all cursor-pointer truncate max-w-[220px]"
                  title={preset.query}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {result && (
              <button
                type="button"
                onClick={() => handleExecuteSearch()}
                disabled={loading}
                className="p-2 rounded-full border border-white/[0.08] text-[#A8A8A8] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer disabled:opacity-50"
                title="Refresh research"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}

            <button
              type="button"
              onClick={() => handleExecuteSearch()}
              disabled={loading || !query.trim()}
              className="px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide bg-white text-black dark:bg-white dark:text-black hover:bg-[#EAEAEA] active:scale-[0.98] transition-all cursor-pointer shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Researching Jurisprudence...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Research & Ground</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/20 text-red-200 text-xs flex items-start gap-3 my-4">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Research Notice</p>
            <p className="text-red-300/80 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Search Grounding Results View */}
      {result && (
        <div className="space-y-5 pt-4 border-t border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] animate-fadeIn">
          {/* Verified Web / Institutional Sources */}
          {result.sources && result.sources.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#101010] dark:bg-[#101010] bg-black/[0.03] border border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5A9EFE]" />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-white dark:text-white text-black">
                    Verified Legal Sources & Citations ({result.sources.length})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSources(prev => !prev)}
                  className="text-[11px] font-sans text-[#A8A8A8] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {showSources ? (
                    <>Hide Sources <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Show Sources <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              </div>

              {showSources && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                  {result.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#181818] dark:bg-[#181818] bg-black/[0.04] border border-white/[0.06] dark:border-white/[0.06] border-black/[0.06] hover:border-white/20 transition-all flex items-start justify-between gap-2 group cursor-pointer"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-sans font-semibold text-white dark:text-white text-black group-hover:text-[#5A9EFE] transition-colors truncate">
                          {source.title}
                        </p>
                        <p className="text-[10px] font-mono text-[#707070] dark:text-[#707070] text-black/50 truncate mt-0.5">
                          {source.uri.replace(/^https?:\/\//, '')}
                        </p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#A8A8A8] group-hover:text-white shrink-0 mt-1" />
                    </a>
                  ))}
                </div>
              )}

              {result.searchQueries && result.searchQueries.length > 0 && (
                <div className="text-[10px] font-sans text-[#707070] dark:text-[#707070] text-black/50 pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold">Research Focus:</span>
                  {result.searchQueries.map((sq, i) => (
                    <span key={i} className="italic bg-[#161616] dark:bg-[#161616] bg-black/[0.04] px-2 py-0.5 rounded-md text-[#A8A8A8] dark:text-[#A8A8A8] text-black/70">
                      &quot;{sq}&quot;
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Analysis Content View */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0C0C0C] dark:bg-[#0C0C0C] bg-black/[0.02] border border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-white dark:text-white text-black" />
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-white dark:text-white text-black">
                  Grounded Jurisprudence & Legal Memo
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 rounded-full text-xs font-sans font-medium bg-[#1C1C1C] dark:bg-[#1C1C1C] bg-black/[0.06] border border-white/[0.12] dark:border-white/[0.12] border-black/[0.1] text-white dark:text-white text-black hover:bg-[#242424] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied Memo</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Analysis</span>
                  </>
                )}
              </button>
            </div>

            {/* Formatted Markdown Output */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm font-sans leading-relaxed text-[#DCDCDC] dark:text-[#DCDCDC] text-black/85 space-y-3">
              {result.analysis.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h5 key={pIdx} className="text-xs sm:text-sm font-bold font-sans text-white dark:text-white text-black pt-2">
                      {paragraph.replace('#### ', '')}
                    </h5>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={pIdx} className="text-sm sm:text-base font-bold font-sans text-white dark:text-white text-black pt-3 pb-1 border-b border-white/[0.06] dark:border-white/[0.06] border-black/[0.06]">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h3 key={pIdx} className="text-base sm:text-lg font-extrabold font-sans text-white dark:text-white text-black pt-4 pb-1">
                      {paragraph.replace('## ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('# ')) {
                  return (
                    <h2 key={pIdx} className="text-lg sm:text-xl font-extrabold font-sans text-white dark:text-white text-black pt-4 pb-1">
                      {paragraph.replace('# ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={pIdx} className="list-disc pl-5 space-y-1 my-2">
                      {items.map((it, itIdx) => (
                        <li key={itIdx} className="text-xs sm:text-[13px] leading-relaxed">
                          {it.replace(/^[-*]\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={pIdx} className="leading-relaxed text-xs sm:text-[13px]">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
