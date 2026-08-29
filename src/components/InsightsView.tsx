import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { editorialArticlesList } from '../data/articlesData';
import { Clock, Calendar, ArrowRight, Feather, CheckCircle2 } from 'lucide-react';

export const InsightsView: React.FC = () => {
  const { activeArticleId, setSelectedTab } = useStudy();
  
  const [selectedArticleId, setSelectedArticleId] = useState<string>(activeArticleId || editorialArticlesList[0].id);

  const activeArticle = editorialArticlesList.find(a => a.id === selectedArticleId) || editorialArticlesList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#26344A] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Feather className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#C9A45C] font-bold">
            LEXA EDITORIAL JOURNAL
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
          Legal English Insights & Articles
        </h1>
        <p className="text-sm sm:text-base text-[#AAB4C3] font-sans mt-2 max-w-3xl leading-relaxed">
          Scholarly essays, linguistic analyses, and drafting guides exploring the philosophy, traps, and precision demands of transnational law practice.
        </p>
      </div>

      {/* Main Grid: Articles Menu (4 cols) + Editorial Article Reader (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Article List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-sans uppercase tracking-wider text-[#AAB4C3] block mb-1 px-1 font-bold">
            Featured Essays ({editorialArticlesList.length})
          </span>

          <div className="space-y-3">
            {editorialArticlesList.map((article) => {
              const isSelected = article.id === activeArticle.id;
              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className={`p-4 border transition-all cursor-pointer rounded-xs ${
                    isSelected
                      ? 'bg-[#172235] border-2 border-[#C9A45C] shadow-xs'
                      : 'bg-[#111A2B] border-[#26344A] hover:border-[#C9A45C]/40 hover:bg-[#172235]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-sans text-[#AAB4C3] mb-1.5 font-medium">
                    <span className="uppercase px-1.5 py-0.5 badge-navy rounded-xs font-semibold">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F5F3EE] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#AAB4C3] font-sans italic mt-1 line-clamp-2">
                    {article.titleId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editorial Reading Layout */}
        <div className="lg:col-span-8 lexa-card p-6 sm:p-12 space-y-8 shadow-xl rounded-xs">
          
          {/* Article Header */}
          <div className="border-b border-[#26344A] pb-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-sans text-[#AAB4C3] font-medium">
              <span className="uppercase px-2 py-0.5 badge-gold rounded-xs font-bold">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C9A45C]" /> {activeArticle.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" /> {activeArticle.publishDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] leading-tight tracking-tight">
              {activeArticle.title}
            </h1>

            <p className="text-base font-sans italic text-[#AAB4C3]">
              {activeArticle.titleId}
            </p>

            <div className="text-xs font-sans text-[#C5CBD5] pt-2 font-medium">
              <strong className="text-[#F5F3EE] font-bold">By:</strong> {activeArticle.author}
            </div>

            <div className="p-4 bg-[#111A2B] border-l-3 border-[#C9A45C] text-xs sm:text-sm font-sans text-[#C5CBD5] leading-relaxed rounded-xs">
              <strong className="text-[#F5F3EE] font-bold">Abstract:</strong> {activeArticle.summary}
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 bg-[#111A2B] border border-[#26344A] space-y-3 rounded-xs">
            <span className="text-xs font-sans uppercase tracking-wider text-[#F5F3EE] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8FAF9B]" />
              Key Jurisprudential Takeaways
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-[#C5CBD5]">
              {activeArticle.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#C9A45C] font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Markdown Rendered Body (Source Serif 4 for scholarly long-form essay) */}
          <div className="font-serif text-sm sm:text-base leading-[1.75] text-[#F5F3EE] space-y-6">
            {activeArticle.contentMarkdown.split('\n\n').map((para, pIdx) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="font-sans font-extrabold text-xl sm:text-2xl text-[#F5F3EE] pt-4 border-b border-[#26344A] pb-2 tracking-tight">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('* ')) {
                return (
                  <div key={pIdx} className="pl-4 border-l-2 border-[#C9A45C] space-y-1 text-sm text-[#C5CBD5] font-sans">
                    {para.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>{line.replace('* ', '')}</p>
                    ))}
                  </div>
                );
              }
              if (para.startsWith('---')) {
                return <hr key={pIdx} className="border-[#26344A] my-4" />;
              }
              return (
                <p key={pIdx} className="leading-[1.75]">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Footer of Article */}
          <div className="pt-8 border-t border-[#26344A] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-[#AAB4C3]">
              Published in <em className="text-[#F5F3EE]">LEXA Journal of International &amp; Comparative Legal Studies</em>
            </div>
            <button
              onClick={() => setSelectedTab('learn')}
              className="btn-primary px-4 py-2 text-xs rounded-xs uppercase tracking-wider flex items-center gap-1.5"
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
