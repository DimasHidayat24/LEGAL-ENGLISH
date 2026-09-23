import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { editorialArticlesList } from '../data/articlesData';
import { Clock, Calendar, ArrowRight, Feather, CheckCircle2, Globe, BookOpen } from 'lucide-react';
import { GroundedLegalSearch } from './GroundedLegalSearch';

export const InsightsView: React.FC = () => {
  const { activeArticleId, setSelectedTab } = useStudy();
  
  const [selectedArticleId, setSelectedArticleId] = useState<string>(activeArticleId || editorialArticlesList[0].id);
  const [activeTabMode, setActiveTabMode] = useState<'essays' | 'searchGrounding'>('essays');

  const activeArticle = editorialArticlesList.find(a => a.id === selectedArticleId) || editorialArticlesList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Feather className="w-4 h-4 text-white" />
              <span className="text-[11px] font-sans tracking-widest uppercase text-white font-semibold">
                LEXA EDITORIAL &amp; RESEARCH JOURNAL
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F2F2F2] tracking-tight">
              Legal English Insights &amp; Live Research
            </h1>
            <p className="text-sm sm:text-base text-[#A8A8A8] font-sans mt-2 max-w-3xl leading-relaxed">
              Scholarly essays, linguistic analyses, and live legal research grounded in Indonesian statutory frameworks and Mahkamah Agung jurisprudence.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-[#121212] p-1.5 rounded-full border border-white/[0.08] shrink-0">
            <button
              onClick={() => setActiveTabMode('essays')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTabMode === 'essays'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-[#A8A8A8] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Essays</span>
            </button>
            <button
              onClick={() => setActiveTabMode('searchGrounding')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTabMode === 'searchGrounding'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[#A8A8A8] hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#93C5FD]" />
              <span>Live Legal Research</span>
            </button>
          </div>
        </div>
      </div>

      {activeTabMode === 'searchGrounding' ? (
        <div className="space-y-6">
          <GroundedLegalSearch
            title="Transnational Legal Intelligence Terminal"
            subtitle="Explore real-time Indonesian Supreme Court (Mahkamah Agung) jurisprudence, regulatory frameworks, SIAC international arbitration awards, and comparative contract doctrine."
            category="Indonesian & Transnational Commercial Law"
          />
        </div>
      ) : (
      /* Main Grid: Articles Menu (4 cols) + Editorial Article Reader (8 cols) */
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Article List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] block mb-1 px-1 font-semibold">
            Featured Essays ({editorialArticlesList.length})
          </span>

          <div className="space-y-3">
            {editorialArticlesList.map((article) => {
              const isSelected = article.id === activeArticle.id;
              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className={`p-4.5 border transition-all cursor-pointer rounded-2xl ${
                    isSelected
                      ? 'bg-[#1C1C1C] border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.5)] font-medium'
                      : 'lexa-card hover:border-white/[0.14]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-sans text-[#A8A8A8] mb-1.5 font-medium">
                    <span className="uppercase px-2 py-0.5 badge-navy rounded-full font-semibold">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F2F2F2] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#A8A8A8] font-sans italic mt-1 line-clamp-2">
                    {article.titleId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editorial Reading Layout */}
        <div className="lg:col-span-8 p-6 sm:p-12 rounded-3xl glass-panel-deep liquid-lens space-y-8">
          
          {/* Article Header */}
          <div className="border-b border-white/[0.08] pb-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-sans text-[#A8A8A8] font-medium">
              <span className="uppercase px-2.5 py-0.5 badge-accent rounded-full font-medium">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-white" /> {activeArticle.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-white" /> {activeArticle.publishDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F2F2F2] leading-tight tracking-tight">
              {activeArticle.title}
            </h1>

            <p className="text-base font-sans italic text-[#A8A8A8]">
              {activeArticle.titleId}
            </p>

            <div className="text-xs font-sans text-[#A8A8A8] pt-2 font-medium">
              <strong className="text-[#F2F2F2] font-semibold">By:</strong> {activeArticle.author}
            </div>

            <div className="p-4 rounded-2xl lexa-surface-subtle text-xs sm:text-sm font-sans text-[#A8A8A8] leading-relaxed">
              <strong className="text-[#F2F2F2] font-semibold">Abstract:</strong> {activeArticle.summary}
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 rounded-2xl bg-[#151515]/60 border border-white/[0.08] space-y-3">
            <span className="text-xs font-sans uppercase tracking-wider text-[#F2F2F2] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Key Jurisprudential Takeaways
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-[#A8A8A8]">
              {activeArticle.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-white font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Markdown Rendered Body */}
          <div className="font-serif text-sm sm:text-base leading-[1.75] text-[#F2F2F2] space-y-6">
            {activeArticle.contentMarkdown.split('\n\n').map((para, pIdx) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="font-sans font-extrabold text-xl sm:text-2xl text-[#F2F2F2] pt-4 border-b border-white/[0.08] pb-2 tracking-tight">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('* ')) {
                return (
                  <div key={pIdx} className="pl-4 border-l-2 border-white/40 space-y-1 text-sm text-[#A8A8A8] font-sans">
                    {para.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>{line.replace('* ', '')}</p>
                    ))}
                  </div>
                );
              }
              if (para.startsWith('---')) {
                return <hr key={pIdx} className="border-white/[0.08] my-4" />;
              }
              return (
                <p key={pIdx} className="leading-[1.75] text-[#F2F2F2]">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Article-Specific Legal Research Grounding */}
          <div className="pt-6 border-t border-white/[0.08]">
            <GroundedLegalSearch
              initialQuery={`What are the recent Indonesian Supreme Court decisions and contemporary legal practice regarding: "${activeArticle.title}"?`}
              category={activeArticle.category}
              compact={true}
              title={`Live Research: ${activeArticle.title}`}
              subtitle="Query Indonesian case law, commentary, and statutory references matching this essay."
            />
          </div>

          {/* Footer of Article */}
          <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-[#A8A8A8]">
              Published in <em className="text-[#F2F2F2]">LEXA Journal of International &amp; Comparative Legal Studies</em>
            </div>
            <button
              onClick={() => setSelectedTab('learn')}
              className="btn-primary px-5 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 font-semibold"
            >
              <span>Explore Related Curriculum Lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
      )}

    </div>
  );
};
