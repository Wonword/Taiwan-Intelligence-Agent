import React from 'react';
import { IntelligenceBrief } from '../types';
import {
  Download,
  Clock,
  Compass,
  Cpu,
  Ship,
  Briefcase,
  AlertCircle,
  ExternalLink,
  Search,
  CheckCircle2,
} from 'lucide-react';
import {
  generateMarkdownReport,
  downloadMarkdownFile,
} from '../utils/exportMarkdown';

interface BriefingSummaryProps {
  brief: IntelligenceBrief;
}

export const BriefingSummary: React.FC<BriefingSummaryProps> = ({ brief }) => {
  const handleDownload = () => {
    const md = generateMarkdownReport(brief);
    const dateStamp = brief.generatedAt.split('T')[0];
    const filename = `taiwan-intelligence-brief-${dateStamp}.md`;
    downloadMarkdownFile(md, filename);
  };

  const formattedDate = new Date(brief.generatedAt).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  });

  return (
    <section className="bg-white border border-slate-200 shadow-xs mb-8">
      {/* Header bar */}
      <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
            Intelligence Synthesis
          </span>
          <h2 className="text-xl font-serif font-bold text-white tracking-tight">
            Strategic Assessment & Macro Implications
          </h2>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Generated: {formattedDate} UTC</span>
            <span aria-hidden="true">·</span>
            <span>Coverage: {brief.coveragePeriod.label}</span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-700" />
          <span>Download Briefing (.md)</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Executive Summary */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Executive Summary
          </h3>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-normal border-l-2 border-slate-800 pl-4 py-1 bg-slate-50/60">
            {brief.executiveSummary}
          </p>
        </div>

        {/* Strategic Implications Grid: Semiconductor, Trade, European Business */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Implications for Semiconductor Supply & International Trade
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Semiconductor Supply */}
            <div className="p-4 border border-slate-200 bg-slate-50/40 flex flex-col">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold">
                <Cpu className="w-4 h-4 text-slate-700" />
                <span>Semiconductor Supply</span>
              </div>
              <p className="text-slate-700 leading-relaxed flex-1">
                {brief.implications.semiconductorSupply}
              </p>
            </div>

            {/* International Trade */}
            <div className="p-4 border border-slate-200 bg-slate-50/40 flex flex-col">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold">
                <Ship className="w-4 h-4 text-slate-700" />
                <span>Maritime Trade & Logistics</span>
              </div>
              <p className="text-slate-700 leading-relaxed flex-1">
                {brief.implications.internationalTrade}
              </p>
            </div>

            {/* European Business Actionable Guidance */}
            <div className="p-4 border border-slate-200 bg-slate-50/40 flex flex-col">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold">
                <Briefcase className="w-4 h-4 text-slate-700" />
                <span>European Enterprise Advisory</span>
              </div>
              <p className="text-slate-700 leading-relaxed flex-1">
                {brief.implications.europeanBusinessImpact}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Indicators to Monitor Next */}
        <div className="pt-2 border-t border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Three Priority Indicators to Monitor Next
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {brief.threeIndicatorsToMonitor.map((indicator, idx) => (
              <div
                key={idx}
                className="p-3.5 border border-slate-200 bg-white flex items-start gap-2.5"
              >
                <span className="font-mono font-bold text-slate-900 text-sm shrink-0">
                  0{idx + 1}.
                </span>
                <span className="text-slate-800 leading-snug">{indicator}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Uncertainties */}
        <div className="pt-2 border-t border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Important Uncertainties & Blind Spots
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {brief.importantUncertainties.map((unc, uIdx) => (
              <li key={uIdx} className="flex items-start gap-2">
                <span className="text-slate-400 font-bold select-none">•</span>
                <span>{unc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Grounded Source List */}
        {brief.allSources && brief.allSources.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Retrieved Google Search Sources ({brief.allSources.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {brief.allSources.map((source, sIdx) => (
                <a
                  key={sIdx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-between gap-2 text-slate-700 hover:text-slate-900 group transition-colors"
                >
                  <div className="truncate">
                    <span className="font-mono text-slate-400 mr-1.5">[{sIdx + 1}]</span>
                    <span className="font-medium group-hover:underline">{source.title}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 shrink-0 text-slate-400 group-hover:text-slate-700" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Search queries executed & Google Attribution Entry Point */}
        {brief.groundingQueries && brief.groundingQueries.length > 0 && (
          <div className="p-3 bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Grounded Queries Executed:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-slate-500 font-mono text-[11px]">
              {brief.groundingQueries.map((q, qi) => (
                <span key={qi} className="bg-white px-2 py-0.5 border border-slate-200">
                  &ldquo;{q}&rdquo;
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Search Entry Point HTML (Google Grounding Attribution) */}
        {brief.searchEntryPointHtml && (
          <div
            className="p-3 bg-white border border-slate-200 text-xs"
            dangerouslySetInnerHTML={{ __html: brief.searchEntryPointHtml }}
          />
        )}

        {/* Research Limitation Note */}
        {brief.researchLimitation && (
          <div className="p-3 bg-amber-50 border-l-2 border-amber-600 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            <div>
              <strong>Research Limitation:</strong> {brief.researchLimitation}
            </div>
          </div>
        )}

        {/* Disclaimer / Non-continuous monitoring notice */}
        <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p>
            Briefings represent a point-in-time assessment executed upon user request. This application does not conduct continuous automated surveillance.
          </p>
          <span className="font-mono shrink-0">Analysis standard: FACT / ANALYSIS / SPECULATION</span>
        </div>
      </div>
    </section>
  );
};
