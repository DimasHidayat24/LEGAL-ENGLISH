import React, { useState, useEffect } from 'react';
import { LegalTerm } from '../types';

interface LegalWordProps {
  term: LegalTerm;
  displayText: string;
  isSelected: boolean;
  onSelect: (term: LegalTerm) => void;
  className?: string;
}

export const LegalWord: React.FC<LegalWordProps> = ({
  term,
  displayText,
  isSelected,
  onSelect,
  className = ''
}) => {
  const [justActivated, setJustActivated] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setJustActivated(true);
      const timer = setTimeout(() => setJustActivated(false), 450);
      return () => clearTimeout(timer);
    }
  }, [isSelected]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJustActivated(true);
    onSelect(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setJustActivated(true);
      onSelect(term);
    }
  };

  return (
    <button
      type="button"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Inspect legal term: ${term.term}. Meaning: ${term.indonesianMeaning}`}
      aria-pressed={isSelected}
      title={`Click to inspect in Assistant: "${term.term}" — ${term.indonesianMeaning}`}
      className={`legal-word-btn doc-term-highlight inline cursor-pointer select-text text-inherit font-inherit ${
        isSelected ? 'is-selected active' : ''
      } ${justActivated ? 'just-activated' : ''} ${className}`}
    >
      {displayText}
    </button>
  );
};
