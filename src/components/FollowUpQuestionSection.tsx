import React, { useState } from 'react';
import { FollowUpQuestionAnswer, CitationItem } from '../types';
import {
  MessageSquare,
  Send,
  Loader2,
  ExternalLink,
  HelpCircle,
  Briefcase,
} from 'lucide-react';

interface FollowUpQuestionSectionProps {
  onAskQuestion: (question: string) => Promise<FollowUpQuestionAnswer>;
  hasBriefContext: boolean;
}

export const FollowUpQuestionSection: React.FC<FollowUpQuestionSectionProps> = ({
  onAskQuestion,
  hasBriefContext,
}) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<FollowUpQuestionAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sampleQuestions = [
    'How would a blockade in the Taiwan Strait impact European automotive wafer supplies?',
    'What are the legal implications of Chinese coast guard boardings for EU-flagged vessels?',
    'How does TSMC’s Dresden fab expansion affect European strategic autonomy in semiconductors?',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const q = question.trim();
    setIsLoading(true);
    setError(null);

    try {
      const answer = await onAskQuestion(q);
      setHistory((prev) => [answer, ...prev]);
      setQuestion('');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze follow-up question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white border border-slate-200 shadow-xs mb-8">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="w-4 h-4 text-slate-700" />
          <h3 className="text-base font-serif font-bold text-slate-900 tracking-tight">
            Analyst Inquiries & Follow-up Questions
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          Query specific cross-Strait supply chain, regulatory, or operational contingencies.
          All inquiries strictly segment Fact, Strategic Analysis, and Speculation.
        </p>
      </div>

      <div className="p-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask an intelligence question (e.g. 'What is the risk of dual-use export sanctions on European lithography parts?')"
              className="flex-1 px-3 py-2.5 text-xs border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wider uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-300" />
                  <span>Researching...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-slate-300" />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </div>

          {/* Preset Inquiries */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-slate-500">
            <span className="text-[11px] text-slate-400">Suggested:</span>
            {sampleQuestions.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuestion(sq)}
                disabled={isLoading}
                className="text-[11px] text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-700 text-left cursor-pointer"
              >
                {sq}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border-l-2 border-rose-600 text-xs text-rose-800">
              {error}
            </div>
          )}
        </form>

        {/* Answers List */}
        {history.length > 0 && (
          <div className="mt-8 space-y-6 divide-y divide-slate-200">
            {history.map((ans, idx) => (
              <article key={idx} className="pt-6 first:pt-0 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 mt-0.5">
                    Q:
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900 font-sans">
                    {ans.question}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                  {/* FACT */}
                  <div className="p-3 bg-slate-50 border-l-2 border-slate-800">
                    <span className="font-bold text-slate-900 block mb-1">
                      FACT
                    </span>
                    <p className="text-slate-700 leading-relaxed font-sans">
                      {ans.fact}
                    </p>
                  </div>

                  {/* ANALYSIS */}
                  <div className="p-3 bg-slate-50 border-l-2 border-blue-900">
                    <span className="font-bold text-blue-950 block mb-1">
                      ANALYSIS
                    </span>
                    <p className="text-slate-700 leading-relaxed font-sans">
                      {ans.analysis}
                    </p>
                  </div>

                  {/* SPECULATION */}
                  <div className="p-3 bg-slate-50 border-l-2 border-amber-600">
                    <span className="font-bold text-amber-900 block mb-1">
                      SPECULATION
                    </span>
                    <p className="text-slate-700 leading-relaxed italic font-sans">
                      {ans.speculation}
                    </p>
                  </div>
                </div>

                {/* Bottom line for business */}
                {ans.keyTakeawayForBusiness && (
                  <div className="p-3 bg-slate-100 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Managerial Takeaway: </strong>
                      <span>{ans.keyTakeawayForBusiness}</span>
                    </div>
                  </div>
                )}

                {/* Citations */}
                {ans.citations && ans.citations.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 pt-1">
                    <span className="font-semibold text-slate-400">Sources:</span>
                    {ans.citations.map((c) => (
                      <a
                        key={c.id}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-950 underline decoration-slate-300"
                      >
                        <span className="font-mono">[{c.id}]</span>
                        <span className="truncate max-w-[180px]">{c.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
