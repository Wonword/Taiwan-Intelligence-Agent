import React from 'react';
import { X, Scale, AlertCircle, ShieldAlert, Award, Compass } from 'lucide-react';
import { INDICATOR_WEIGHTS, RATING_DEFINITIONS } from '../utils/scoring';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white border border-slate-200 shadow-xl rounded-none text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-slate-300" />
            <h2 className="text-base font-semibold tracking-wide uppercase">
              Intelligence Scoring & Analytical Methodology
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 py-5 space-y-6 max-h-[75vh] overflow-y-auto text-sm leading-relaxed text-slate-700">
          {/* Core Mandate */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">
              01. Strict Categorical Segregation
            </h3>
            <p className="mb-2">
              Every briefing strictly isolates three levels of knowledge to prevent narrative conflation:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-slate-50 border-l-2 border-slate-700">
                <span className="font-semibold text-slate-900 block mb-1">FACT</span>
                <span className="text-xs text-slate-600">
                  Established by verified external sources or attributed to official originators. An actor&apos;s statement is evidence of the statement itself, not of its factual truth.
                </span>
              </div>
              <div className="p-3 bg-slate-50 border-l-2 border-blue-800">
                <span className="font-semibold text-slate-900 block mb-1">ANALYSIS</span>
                <span className="text-xs text-slate-600">
                  Strategic implications for European business operations, semiconductor fabrication lead-times, trade routing, export controls, and regulatory exposure.
                </span>
              </div>
              <div className="p-3 bg-slate-50 border-l-2 border-amber-600">
                <span className="font-semibold text-slate-900 block mb-1">SPECULATION</span>
                <span className="text-xs text-slate-600">
                  Hypothetical outcomes, retaliatory options, and projected scenarios, explicitly labeled to prevent false certainty.
                </span>
              </div>
            </div>
          </div>

          {/* Escalation Risk Index */}
          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-slate-800" />
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500">
                02. Escalation Risk Index Calculation
              </h3>
            </div>
            <p className="mb-3">
              The index is computed deterministically in application code based on a weighted 5-pillar framework. It is strictly labeled{' '}
              <strong className="text-slate-900">&ldquo;Escalation risk index&rdquo;</strong>, not &ldquo;Probability of war&rdquo;.
            </p>

            <div className="bg-slate-100 p-3 mb-3 border border-slate-200 font-mono text-xs text-slate-900">
              Formula: Escalation Index = [ (Military × 30) + (Political × 20) + (Diplomatic × 20) + (Economic × 20) + (Technological × 10) ] / 4
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block">Military</span>
                <span className="text-slate-500">Weight: 30%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block">Political</span>
                <span className="text-slate-500">Weight: 20%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block">Diplomatic</span>
                <span className="text-slate-500">Weight: 20%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block">Economic</span>
                <span className="text-slate-500">Weight: 20%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block">Technological</span>
                <span className="text-slate-500">Weight: 10%</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 mb-3">
              <p className="font-semibold text-slate-800">Category Rating Scale (0 to 4):</p>
              {Object.entries(RATING_DEFINITIONS).map(([rate, desc]) => (
                <div key={rate} className="flex gap-2">
                  <span className="font-mono font-bold text-slate-800 w-4">{rate}:</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50 border-l-2 border-amber-600 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <div>
                <strong>Missing Evidence Rule:</strong> If verifiable evidence is lacking for any pillar, the rating remains unknown. The system displays{' '}
                <em>&ldquo;Insufficient evidence for a complete index&rdquo;</em> rather than fabricating certainty or substituting zero.
              </div>
            </div>
          </div>

          {/* Strategic Importance */}
          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-slate-800" />
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500">
                03. Strategic Importance Scale (0–100)
              </h3>
            </div>
            <p className="mb-2 text-xs">
              Calibrated specifically for European enterprise risk managers evaluating supply disruptions and compliance:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">0–24 · Limited</span>
                <span className="text-slate-600">Limited implications for the intended European user.</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">25–49 · Localized</span>
                <span className="text-slate-600">Meaningful but localized consequences.</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">50–74 · Significant</span>
                <span className="text-slate-600">Significant regional or sectoral implications (e.g. semiconductor delivery slips).</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">75–100 · Systemic</span>
                <span className="text-slate-600">Potentially major international or systemic consequences (e.g. maritime embargo).</span>
              </div>
            </div>
          </div>

          {/* Confidence Assessment */}
          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-slate-800" />
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500">
                04. Confidence Differentiation
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Confidence is evaluated across two separate dimensions:
              <br />
              <strong>1. Occurrence Confidence:</strong> Quality of evidence, independent corroboration, and absence of conflicting accounts that the event physically occurred.
              <br />
              <strong>2. Prediction Confidence:</strong> Reliability of projecting consequences, policy responses, and downstream supply chain outcomes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Methodology
          </button>
        </div>
      </div>
    </div>
  );
};
