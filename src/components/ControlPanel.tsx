import React, { useState } from 'react';
import { Calendar, Search, FileText, Loader2, ArrowRight, Sparkles } from 'lucide-react';

interface ControlPanelProps {
  onGenerateBrief: (startDate: string, endDate: string) => void;
  onAnalyzeEvent: (eventText: string) => void;
  isLoading: boolean;
  loadingStep: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onGenerateBrief,
  onAnalyzeEvent,
  isLoading,
  loadingStep,
}) => {
  // Mode: 'period' or 'event'
  const [activeTab, setActiveTab] = useState<'period' | 'event'>('period');

  // Date range state (defaults to past 7 days)
  const getPastDaysString = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(getPastDaysString(7));
  const [endDate, setEndDate] = useState(todayStr);
  const [selectedPreset, setSelectedPreset] = useState<number>(7);

  // Event description or pasted article excerpt
  const [eventInput, setEventInput] = useState('');

  const handlePresetClick = (days: number) => {
    setSelectedPreset(days);
    setStartDate(getPastDaysString(days));
    setEndDate(todayStr);
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    onGenerateBrief(startDate, endDate);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !eventInput.trim()) return;
    onAnalyzeEvent(eventInput.trim());
  };

  return (
    <div className="bg-white border border-slate-200 shadow-xs mb-8">
      {/* Brief explanation strip */}
      <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p>
          <strong className="text-slate-800">Analytical Mandate:</strong> Generates real-time research grounded via Google Search. Separates established empirical facts from analytical implications and speculative contingencies.
        </p>
        <span className="text-slate-400 font-mono text-[11px] shrink-0">
          Target: European Enterprise & Supply Chains
        </span>
      </div>

      {/* Segmented Control Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-100/60 p-1.5 gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('period')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
            activeTab === 'period'
              ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Period Intelligence Briefing</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('event')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
            activeTab === 'event'
              ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Analyze Specific Event / Excerpt</span>
        </button>
      </div>

      {/* Tab 1: Period Briefing */}
      {activeTab === 'period' && (
        <form onSubmit={handleBriefSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Coverage Window
                </label>
                {/* Presets */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 mr-1">Presets:</span>
                  {[
                    { label: 'Past 7 days (Default)', days: 7 },
                    { label: 'Past 14 days', days: 14 },
                    { label: 'Past 30 days', days: 30 },
                  ].map((preset) => (
                    <button
                      key={preset.days}
                      type="button"
                      onClick={() => handlePresetClick(preset.days)}
                      className={`text-xs px-2.5 py-1 transition-colors cursor-pointer ${
                        selectedPreset === preset.days
                          ? 'bg-slate-900 text-white font-medium'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    max={endDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setSelectedPreset(0);
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    max={todayStr}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setSelectedPreset(0);
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Searches live reporting for up to three significant cross-Strait developments within the timeframe, evaluating military, diplomatic, technological, and economic indicators.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wider uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                    <span>Researching Developments...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-slate-300" />
                    <span>Generate Intelligence Brief</span>
                  </>
                )}
              </button>

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                  <span>{loadingStep || 'Connecting to intelligence feeds...'}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Specific Event / Excerpt */}
      {activeTab === 'event' && (
        <form onSubmit={handleEventSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Event Description or Article Excerpt
                </label>
                <span className="text-[11px] text-slate-400">
                  {eventInput.length} characters
                </span>
              </div>
              <textarea
                rows={4}
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
                placeholder="Example: 'Taiwan Ministry of National Defense detected 32 Chinese aircraft crossing the median line today...' or paste an excerpt from Reuters, FT, Bloomberg, or CNA."
                className="w-full p-3 text-xs border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800 leading-relaxed font-sans"
                disabled={isLoading}
                required
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Pasted text is treated as unverified source material. The analyst verifies factual accuracy via Google Search grounding and evaluates supply chain implications.
              </p>
            </div>

            {/* Quick Sample Prompts */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
              <span className="text-slate-400 text-[11px]">Load example:</span>
              <button
                type="button"
                onClick={() =>
                  setEventInput(
                    'Reports suggest new customs clearance scrutiny by Chinese coast guard around Kinmen and Matsu islands affecting commercial shipping lanes.'
                  )
                }
                className="text-[11px] text-slate-600 hover:text-slate-900 underline decoration-slate-300 cursor-pointer"
              >
                Kinmen shipping checks
              </button>
              <span className="text-slate-300">·</span>
              <button
                type="button"
                onClick={() =>
                  setEventInput(
                    'TSMC announces updated timeline and capex for its European semiconductor fab in Dresden, Germany, amid discussions on supply chain sovereignty.'
                  )
                }
                className="text-[11px] text-slate-600 hover:text-slate-900 underline decoration-slate-300 cursor-pointer"
              >
                TSMC Dresden Fab expansion
              </button>
              <span className="text-slate-300">·</span>
              <button
                type="button"
                onClick={() =>
                  setEventInput(
                    'China announces export restrictions on rare earth elements and gallium/germanium compounds critical to European advanced power semiconductors.'
                  )
                }
                className="text-[11px] text-slate-600 hover:text-slate-900 underline decoration-slate-300 cursor-pointer"
              >
                Gallium/Germanium export limits
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isLoading || !eventInput.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wider uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                    <span>Analyzing Event Grounding...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                    <span>Analyze This Event</span>
                  </>
                )}
              </button>

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                  <span>{loadingStep || 'Verifying sources and calculating indicators...'}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
