import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { editorialArticlesList } from '../data/articlesData';
import { Clock, Calendar, ArrowRight, Feather, CheckCircle2 } from 'lucide-react';

export const InsightsView: React.FC = () => {
  const { activeArticleId, setSelectedTab } = useStudy();
  
  const [selectedArticleId, setSelectedArticleId] = useState<string>(activeArticleId || editorialArticlesList[0].id);

  const activeArticle = editorialArticlesList.find(a => a.id === selectedArticleId) || editorialArticlesList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Feather className="w-4 h-4 text-[#4F83B8]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#4F83B8] font-semibold">
            LEXA EDITORIAL JOURNAL
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
          Legal English Insights & Articles
        </h1>
        <p className="text-sm sm:text-base text-[#9BAABC] font-sans mt-2 max-w-3xl leading-relaxed">
          Scholarly essays, linguistic analyses, and drafting guides exploring the philosophy, traps, and precision demands of transnational law practice.
        </p>
      </div>

      {/* Main Grid: Articles Menu (4 cols) + Editorial Article Reader (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Article List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-sans uppercase tracking-wider text-[#9BAABC] block mb-1 px-1 font-semibold">
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
                      ? 'bg-[#132B46] border-[#294766] shadow-[0_10px_25px_rgba(2,6,12,0.4)] font-medium'
                      : 'lexa-card hover:border-[#294766]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-sans text-[#9BAABC] mb-1.5 font-medium">
                    <span className="uppercase px-2 py-0.5 badge-navy rounded-full font-semibold">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F3F5F7] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#9BAABC] font-sans italic mt-1 line-clamp-2">
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
          <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-sans text-[#9BAABC] font-medium">
              <span className="uppercase px-2.5 py-0.5 badge-accent rounded-full font-medium">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#4F83B8]" /> {activeArticle.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#4F83B8]" /> {activeArticle.publishDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] leading-tight tracking-tight">
              {activeArticle.title}
            </h1>

            <p className="text-base font-sans italic text-[#9BAABC]">
              {activeArticle.titleId}
            </p>

            <div className="text-xs font-sans text-[#9BAABC] pt-2 font-medium">
              <strong className="text-[#F3F5F7] font-semibold">By:</strong> {activeArticle.author}
            </div>

            <div className="p-4 rounded-2xl lexa-surface-subtle text-xs sm:text-sm font-sans text-[#9BAABC] leading-relaxed">
              <strong className="text-[#F3F5F7] font-semibold">Abstract:</strong> {activeArticle.summary}
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 rounded-2xl bg-[#112239]/60 dark:bg-[#112239]/60 bg-[#E0EDFA] border border-[#1D3552] dark:border-[#1D3552] border-[#B4CDEB] space-y-3">
            <span className="text-xs font-sans uppercase tracking-wider text-[#F3F5F7] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4F83B8]" />
              Key Jurisprudential Takeaways
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-[#9BAABC]">
              {activeArticle.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#4F83B8] font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Markdown Rendered Body */}
          <div className="font-serif text-sm sm:text-base leading-[1.75] text-[#F3F5F7] space-y-6">
            {activeArticle.contentMarkdown.split('\n\n').map((para, pIdx) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="font-sans font-extrabold text-xl sm:text-2xl text-[#F3F5F7] pt-4 border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-2 tracking-tight">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('* ')) {
                return (
                  <div key={pIdx} className="pl-4 border-l-2 border-[#4F83B8] space-y-1 text-sm text-[#9BAABC] font-sans">
                    {para.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>{line.replace('* ', '')}</p>
                    ))}
                  </div>
                );
              }
              if (para.startsWith('---')) {
                return <hr key={pIdx} className="border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] my-4" />;
              }
              return (
                <p key={pIdx} className="leading-[1.75] text-[#F3F5F7]">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Footer of Article */}
          <div className="pt-8 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-[#9BAABC]">
              Published in <em className="text-[#F3F5F7]">LEXA Journal of International &amp; Comparative Legal Studies</em>
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

    </div>
  );
};
