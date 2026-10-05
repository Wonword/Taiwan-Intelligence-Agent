import React, { useState } from 'react';
import {
  GeopoliticalDevelopment,
  CategoryIndicator,
  ActorImpact,
} from '../types';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Award,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Layers,
} from 'lucide-react';

interface DevelopmentCardProps {
  development: GeopoliticalDevelopment;
  index: number;
}

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({
  development,
  index,
}) => {
  const [showPillars, setShowPillars] = useState(true);
  const [showActors, setShowActors] = useState(false);

  const {
    eventTitle,
    eventDate,
    sourcePublicationDates,
    fact,
    analysis,
    speculation,
    indicators,
    escalationIndex,
    strategicImportance,
    confidence,
    actors,
    alternativeInterpretation,
    evidenceToChangeAssessment,
    citations,
  } = development;

  // Escalation score text styling
  const getEscalationStyle = (score: number | null) => {
    if (score === null) return 'text-slate-500 border-slate-300';
    if (score >= 75) return 'text-rose-700 border-rose-600 bg-rose-50/50';
    if (score >= 50) return 'text-amber-700 border-amber-600 bg-amber-50/50';
    if (score >= 25) return 'text-slate-800 border-slate-600 bg-slate-50';
    return 'text-emerald-800 border-emerald-600 bg-emerald-50/40';
  };

  const getConfidenceStyle = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-emerald-800 font-semibold';
      case 'Medium':
        return 'text-blue-900 font-semibold';
      default:
        return 'text-amber-800 font-semibold';
    }
  };

  return (
    <article className="bg-white border border-slate-200 shadow-xs mb-8 transition-shadow">
      {/* Top Banner / Editorial Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
          <span className="font-semibold text-slate-900 tracking-wider uppercase">
            Development {index + 1}
          </span>
          <span aria-hidden="true">·</span>
          <span>Event Date: {eventDate}</span>
          {sourcePublicationDates && (
            <>
              <span aria-hidden="true">·</span>
              <span>Published: {sourcePublicationDates}</span>
            </>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug tracking-tight">
          {eventTitle}
        </h3>

        {/* Metric Bar (No pills: clean unboxed metrics with typographic separators) */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
          {/* Escalation Risk Index */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Escalation risk index:</span>
            {escalationIndex.isComplete && escalationIndex.score !== null ? (
              <span
                className={`font-mono font-bold px-1.5 py-0.5 border ${getEscalationStyle(
                  escalationIndex.score
                )}`}
              >
                {escalationIndex.score}/100
              </span>
            ) : (
              <span className="font-mono text-amber-700 italic">
                Insufficient evidence for a complete index
              </span>
            )}
          </div>

          <span className="text-slate-300" aria-hidden="true">
            /
          </span>

          {/* Strategic Importance */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Strategic Importance:</span>
            <span className="font-mono font-bold text-slate-900">
              {strategicImportance.score}/100
            </span>
            <span className="text-slate-500">({strategicImportance.tierLabel})</span>
          </div>

          <span className="text-slate-300" aria-hidden="true">
            /
          </span>

          {/* Confidence */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Confidence:</span>
            <span className={getConfidenceStyle(confidence.overall)}>
              {confidence.overall}
            </span>
            <span className="text-slate-400 text-[11px]">
              (Occurrence: {confidence.occurrenceConfidence} · Prediction: {confidence.predictionConfidence})
            </span>
          </div>
        </div>
      </div>

      {/* Triad Content Sections: FACT, ANALYSIS, SPECULATION */}
      <div className="p-6 space-y-6">
        {/* 1. FACT Section */}
        <section className="border-l-3 border-slate-900 pl-4 py-0.5">
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Fact
            </h4>
            <span className="text-[11px] text-slate-400">
              — Verified through retrieved reporting & attributed official statements
            </span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
            {fact}
          </p>

          {/* Inline citations */}
          {citations && citations.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Sources:
              </span>
              {citations.map((c) => (
                <a
                  key={c.id}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-950 underline decoration-slate-300 hover:decoration-slate-800"
                >
                  <span className="font-mono text-[10px]">[{c.id}]</span>
                  <span className="truncate max-w-[200px]">{c.title}</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                </a>
              ))}
            </div>
          )}
        </section>

        {/* 2. ANALYSIS Section */}
        <section className="border-l-3 border-blue-900 pl-4 py-0.5 bg-slate-50/50 p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950">
              Analysis
            </h4>
            <span className="text-[11px] text-blue-800">
              — Strategic implications for European business, semiconductor chains & trade
            </span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
            {analysis}
          </p>
        </section>

        {/* 3. SPECULATION Section */}
        <section className="border-l-3 border-amber-600 pl-4 py-0.5">
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Speculation
            </h4>
            <span className="text-[11px] text-amber-700">
              — Possible future developments & secondary responses (explicitly hypothetical)
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-sans italic whitespace-pre-line">
            {speculation}
          </p>
        </section>

        {/* 4. 5-Pillar Indicator Breakdown Drawer */}
        <div className="border border-slate-200 bg-slate-50/40">
          <button
            type="button"
            onClick={() => setShowPillars(!showPillars)}
            className="w-full flex items-center justify-between p-3.5 text-xs font-semibold text-slate-800 hover:bg-slate-100/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-600" />
              <span>5-Pillar Escalation Indicator Breakdown & Rationale</span>
            </div>
            {showPillars ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showPillars && (
            <div className="p-4 pt-0 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3">
                <PillarItem
                  category="Military"
                  weight={30}
                  indicator={indicators.military}
                />
                <PillarItem
                  category="Political"
                  weight={20}
                  indicator={indicators.political}
                />
                <PillarItem
                  category="Diplomatic"
                  weight={20}
                  indicator={indicators.diplomatic}
                />
                <PillarItem
                  category="Economic"
                  weight={20}
                  indicator={indicators.economic}
                />
                <PillarItem
                  category="Technological"
                  weight={10}
                  indicator={indicators.technological}
                />
              </div>

              {/* Rationale explanation text */}
              <div className="mt-3 p-3 bg-white border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Index Assessment: </span>
                <span>{escalationIndex.explanationText}</span>
              </div>
            </div>
          )}
        </div>

        {/* 5. Strategic Importance & Confidence Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Strategic Importance Card */}
          <div className="p-4 border border-slate-200 bg-slate-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold uppercase tracking-wider text-slate-700">
                Strategic Importance Rationale
              </span>
              <span className="font-mono font-bold text-slate-900">
                {strategicImportance.score}/100 · {strategicImportance.tierLabel}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {strategicImportance.explanation}
            </p>
            <p className="mt-2 text-[11px] text-slate-500 italic">
              Scale definition: {strategicImportance.tierDescription}
            </p>
          </div>

          {/* Confidence Assessment Card */}
          <div className="p-4 border border-slate-200 bg-slate-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold uppercase tracking-wider text-slate-700">
                Confidence Justification
              </span>
              <span className={getConfidenceStyle(confidence.overall)}>
                {confidence.overall} Confidence
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-2">
              {confidence.justification}
            </p>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Event Occurrence: <strong>{confidence.occurrenceConfidence}</strong></span>
              <span>Predicting Consequences: <strong>{confidence.predictionConfidence}</strong></span>
            </div>
          </div>
        </div>

        {/* 6. Beneficiaries & Impacted Actors (collapsible/toggle) */}
        {actors && actors.length > 0 && (
          <div className="border border-slate-200">
            <button
              type="button"
              onClick={() => setShowActors(!showActors)}
              className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
                <span>Stakeholder & Industry Impact ({actors.length} actors assessed)</span>
              </div>
              {showActors ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {showActors && (
              <div className="p-4 pt-1 border-t border-slate-200 divide-y divide-slate-100 text-xs">
                {actors.map((actor, aIdx) => (
                  <div key={aIdx} className="py-2.5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{actor.name}</span>
                      <span
                        className={`text-[10px] font-mono uppercase px-1.5 py-0.2 border ${
                          actor.outcome === 'beneficiary'
                            ? 'text-emerald-800 border-emerald-300 bg-emerald-50'
                            : actor.outcome === 'impacted'
                            ? 'text-rose-800 border-rose-300 bg-rose-50'
                            : 'text-slate-700 border-slate-300 bg-slate-100'
                        }`}
                      >
                        {actor.outcome}
                      </span>
                    </div>
                    <p className="text-slate-600 sm:max-w-lg">{actor.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 7. Counter-Hypothesis & Pivot Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-3 border-l-2 border-slate-400 bg-slate-50">
            <span className="font-semibold text-slate-800 block mb-1">
              Alternative Interpretation
            </span>
            <p className="text-slate-600 leading-relaxed">
              {alternativeInterpretation}
            </p>
          </div>

          <div className="p-3 border-l-2 border-slate-400 bg-slate-50">
            <span className="font-semibold text-slate-800 block mb-1">
              Evidence That Would Change Assessment
            </span>
            <p className="text-slate-600 leading-relaxed">
              {evidenceToChangeAssessment}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

interface PillarItemProps {
  category: string;
  weight: number;
  indicator: CategoryIndicator;
}

const PillarItem: React.FC<PillarItemProps> = ({
  category,
  weight,
  indicator,
}) => {
  const rating = indicator?.rating;
  const hasRating = rating !== null && rating !== undefined;

  const getPillarColor = (val: number) => {
    if (val === 0) return 'text-slate-600 bg-slate-100';
    if (val === 1) return 'text-emerald-800 bg-emerald-50';
    if (val === 2) return 'text-blue-900 bg-blue-50';
    if (val === 3) return 'text-amber-800 bg-amber-50';
    return 'text-rose-800 bg-rose-50';
  };

  return (
    <div className="p-2.5 bg-white border border-slate-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            {category}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Wt: {weight}%
          </span>
        </div>

        <div className="my-1.5">
          {hasRating ? (
            <div
              className={`inline-block font-mono font-bold text-xs px-2 py-0.5 ${getPillarColor(
                rating
              )}`}
            >
              Rating: {rating}/4
            </div>
          ) : (
            <div className="inline-block text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 italic">
              Unknown
            </div>
          )}
        </div>
      </div>

      <p className="mt-1 text-[11px] text-slate-600 leading-snug line-clamp-4">
        {indicator?.explanation || 'No rationale recorded.'}
      </p>
    </div>
  );
};
