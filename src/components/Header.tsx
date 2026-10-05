import React from 'react';
import { Scale, Globe2, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenMethodology: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMethodology }) => {
  return (
    <header className="border-b border-slate-200 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-slate-300" />
              <h1 className="text-xl sm:text-2xl font-serif tracking-tight font-semibold text-white">
                Taiwan Intelligence Agent
              </h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Educational geopolitical intelligence specializing in Taiwan and cross-Strait relations.
              Designed for European business leadership assessing semiconductor supply chains, maritime trade, and escalation risks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Search Grounded</span>
            </div>
            <span className="text-slate-600">·</span>
            <button
              onClick={onOpenMethodology}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>Scoring Methodology</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
