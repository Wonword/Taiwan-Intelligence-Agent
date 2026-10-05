import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { DevelopmentCard } from './components/DevelopmentCard';
import { BriefingSummary } from './components/BriefingSummary';
import { FollowUpQuestionSection } from './components/FollowUpQuestionSection';
import { MethodologyModal } from './components/MethodologyModal';
import { ErrorBanner } from './components/ErrorBanner';
import { IntelligenceBrief, FollowUpQuestionAnswer } from './types';
import { sampleIntelligenceBrief } from './data/initialBrief';
import { Shield, BookOpen, AlertCircle } from 'lucide-react';

// Helper to safely execute /api/analyze requests and parse errors even if non-JSON (e.g. Vercel 500/504)
async function postAnalyzeApi(payload: any): Promise<any> {
  let response: Response;
  try {
    response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (netErr: any) {
    throw new Error(
      `Network connection error: ${netErr.message || 'Unable to connect to intelligence API endpoint.'}`
    );
  }

  const contentType = response.headers.get('content-type') || '';
  let data: any = null;

  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      // fallback to text reading
    }
  }

  if (!data) {
    const rawText = await response.text();
    if (!response.ok) {
      if (response.status === 500 && (rawText.includes('server error') || rawText.includes('Serverless Function'))) {
        throw new Error(
          'Server Error (HTTP 500): The serverless function failed. Please verify that GEMINI_API_KEY is configured in your Vercel Project Environment Variables.'
        );
      }
      if (response.status === 504 || rawText.includes('timed out')) {
        throw new Error(
          'Gateway Timeout (HTTP 504): The intelligence analysis exceeded the execution limit. Please retry.'
        );
      }
      throw new Error(`Server returned HTTP ${response.status}: ${rawText || response.statusText}`);
    }
    try {
      data = JSON.parse(rawText);
    } catch {
      throw new Error(`Server returned non-JSON response: ${rawText.slice(0, 150)}`);
    }
  }

  if (!response.ok) {
    throw new Error(
      data.error || `Server responded with HTTP ${response.status}: ${response.statusText}`
    );
  }

  return data;
}

export default function App() {
  const [brief, setBrief] = useState<IntelligenceBrief>(sampleIntelligenceBrief);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  // Generate Intelligence Brief for selected date range
  const handleGenerateBrief = async (startDate: string, endDate: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep('Grounding recent cross-Strait developments via Google Search...');

    try {
      const stepTimer1 = setTimeout(() => {
        setLoadingStep('Evaluating 5-pillar escalation indicators and strategic importance...');
      }, 3500);

      const stepTimer2 = setTimeout(() => {
        setLoadingStep('Calculating escalation risk index and synthesizing European trade impacts...');
      }, 7000);

      const data = await postAnalyzeApi({
        mode: 'brief',
        startDate,
        endDate,
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (!data.brief) {
        throw new Error('Received incomplete briefing data from intelligence service.');
      }

      setBrief(data.brief);
    } catch (err: any) {
      console.error('Failed to generate brief:', err);
      setError(err.message || 'An unexpected error occurred during intelligence analysis.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // Analyze a specific event or article excerpt
  const handleAnalyzeEvent = async (eventText: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep('Verifying event claims against Google Search sources...');

    try {
      const stepTimer = setTimeout(() => {
        setLoadingStep('Calculating escalation risk index and European supply chain exposure...');
      }, 4000);

      const data = await postAnalyzeApi({
        mode: 'event',
        eventText,
      });

      clearTimeout(stepTimer);

      if (!data.brief) {
        throw new Error('Received incomplete event analysis data from intelligence service.');
      }

      setBrief(data.brief);
    } catch (err: any) {
      console.error('Failed to analyze event:', err);
      setError(err.message || 'An unexpected error occurred while analyzing the event.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // Follow-up question handler
  const handleAskQuestion = async (
    question: string
  ): Promise<FollowUpQuestionAnswer> => {
    const data = await postAnalyzeApi({
      mode: 'question',
      question,
      contextBrief: {
        summary: brief.executiveSummary,
        developments: brief.developments.map((d) => ({
          title: d.eventTitle,
          fact: d.fact,
          analysis: d.analysis,
        })),
      },
    });

    if (!data.answer) {
      throw new Error('No answer received from intelligence service.');
    }

    return data.answer;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col selection:bg-slate-800 selection:text-white">
      {/* Top Navigation & App Identity */}
      <Header onOpenMethodology={() => setIsMethodologyOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error notification if applicable */}
        <ErrorBanner
          error={error}
          onDismiss={() => setError(null)}
          onRetry={() => {
            const today = new Date().toISOString().split('T')[0];
            const past7 = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
            handleGenerateBrief(past7, today);
          }}
        />

        {/* Intelligence Query & Control Panel */}
        <ControlPanel
          onGenerateBrief={handleGenerateBrief}
          onAnalyzeEvent={handleAnalyzeEvent}
          isLoading={isLoading}
          loadingStep={loadingStep}
        />

        {/* Current Briefing Overview / Macro Summary */}
        <BriefingSummary brief={brief} />

        {/* Geopolitical Developments (Up to 3 significant developments) */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900 tracking-tight">
                Significant Geopolitical Developments ({brief.developments.length})
              </h2>
              <p className="text-xs text-slate-500">
                Each development is independently scored across 5 escalation pillars with Fact, Analysis, and Speculation segregated.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Coverage: {brief.coveragePeriod.label}
            </div>
          </div>

          {brief.developments.length === 0 ? (
            <div className="p-8 bg-white border border-slate-200 text-center text-slate-500 text-sm">
              No significant developments recorded for this specific period.
            </div>
          ) : (
            brief.developments.map((development, idx) => (
              <DevelopmentCard
                key={development.id || idx}
                development={development}
                index={idx}
              />
            ))
          )}
        </div>

        {/* Follow-up Questions & Deep Dives */}
        <FollowUpQuestionSection
          onAskQuestion={handleAskQuestion}
          hasBriefContext={Boolean(brief)}
        />
      </main>

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-800">
              Taiwan Intelligence Agent
            </span>
            <span>·</span>
            <span>Educational Geopolitical Advisory for European Industry</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="hover:text-slate-900 underline decoration-slate-300 cursor-pointer"
            >
              Scoring Methodology
            </button>
            <span>·</span>
            <span>Grounding via Google Search</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
