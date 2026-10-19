import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { editorialArticlesList } from '../data/articlesData';
import { Clock, Calendar, ArrowRight, Feather, CheckCircle2, BookOpen } from 'lucide-react';

export const InsightsView: React.FC = () => {
  const { activeArticleId, setSelectedTab } = useStudy();
  
  const [selectedArticleId, setSelectedArticleId] = useState<string>(activeArticleId || editorialArticlesList[0].id);

  const activeArticle = editorialArticlesList.find(a => a.id === selectedArticleId) || editorialArticlesList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-line pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Feather className="w-4 h-4 text-ink" />
              <span className="text-[11px] font-sans tracking-widest uppercase text-ink font-semibold">
                Lexa Insights
              </span>
            </div>
            <h1 className="text-3xl sm:text-[44px] font-medium text-ink tracking-[-0.035em] leading-[1.1]">
              Legal English Insights
            </h1>
            <p className="text-sm sm:text-base text-muted font-sans mt-2 max-w-3xl leading-relaxed">
              Short essays on legal language, grounded in Indonesian statutes and Mahkamah Agung decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Articles Menu (4 cols) + Editorial Article Reader (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Article List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-sans text-muted block mb-1 px-1 font-semibold">
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
                      ? 'bg-surface-3 border-line-strong font-medium'
                      : 'lexa-card hover:border-line-strong'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-sans text-muted mb-1.5 font-medium">
                    <span className="uppercase px-2 py-0.5 badge-navy rounded-full font-semibold">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif font-semibold text-sm text-ink leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted font-sans italic mt-1 line-clamp-2">
                    {article.titleId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editorial Reading Layout */}
        <div className="lg:col-span-8 p-6 sm:p-12 rounded-2xl glass-panel-deep liquid-lens space-y-8">
          
          {/* Article Header */}
          <div className="border-b border-line pb-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-sans text-muted font-medium">
              <span className="uppercase px-2.5 py-0.5 badge-accent rounded-full font-medium">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-ink" /> {activeArticle.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-ink" /> {activeArticle.publishDate}
              </span>
            </div>

            <h1 className="text-3xl sm:text-[44px] font-medium text-ink tracking-[-0.035em] leading-[1.1]">
              {activeArticle.title}
            </h1>

            <p className="text-base font-sans italic text-muted">
              {activeArticle.titleId}
            </p>

            <div className="text-xs font-sans text-muted pt-2 font-medium">
              <strong className="text-ink font-semibold">By:</strong> {activeArticle.author}
            </div>

            <div className="p-4 rounded-2xl lexa-surface-subtle text-xs sm:text-sm font-sans text-muted leading-relaxed">
              <strong className="text-ink font-semibold">Abstract:</strong> {activeArticle.summary}
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 rounded-2xl bg-surface/60 border border-line space-y-3">
            <span className="text-xs font-sans uppercase tracking-wider text-ink font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-ink" />
              Key Jurisprudential Takeaways
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-muted">
              {activeArticle.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-ink font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Markdown Rendered Body */}
          <div className="font-legal text-sm sm:text-base leading-[1.75] text-ink space-y-6">
            {activeArticle.contentMarkdown.split('\n\n').map((para, pIdx) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="font-sans font-semibold text-xl sm:text-2xl text-ink pt-4 border-b border-line pb-2 tracking-tight">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('* ')) {
                return (
                  <div key={pIdx} className="pl-4 border-l-2 border-accent space-y-1 text-sm text-muted font-sans">
                    {para.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>{line.replace('* ', '')}</p>
                    ))}
                  </div>
                );
              }
              if (para.startsWith('---')) {
                return <hr key={pIdx} className="border-line my-4" />;
              }
              return (
                <p key={pIdx} className="leading-[1.75] text-ink">
                  {para}
                </p>
              );
            })}
          </div>


          {/* Footer of Article */}
          <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-muted">
              Published in <em className="text-ink">Lexa Insights</em>
            </div>
            <button
              onClick={() => setSelectedTab('learn')}
              className="btn-primary px-5 py-2.5 text-xs flex items-center gap-1.5 font-medium"
            >
              <span>Related lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
