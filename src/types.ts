export type IndicatorRating = 0 | 1 | 2 | 3 | 4 | null;

export interface CategoryIndicator {
  rating: IndicatorRating;
  explanation: string;
}

export interface IndicatorsBreakdown {
  military: CategoryIndicator; // weight 30
  political: CategoryIndicator; // weight 20
  diplomatic: CategoryIndicator; // weight 20
  economic: CategoryIndicator; // weight 20
  technological: CategoryIndicator; // weight 10
}

export interface EscalationIndexResult {
  isComplete: boolean;
  score: number | null; // 0 to 100
  label: string; // "Escalation risk index"
  explanationText: string;
  missingCategories?: string[];
}

export interface StrategicImportanceResult {
  score: number; // 0 to 100
  tierLabel: 'Limited' | 'Localized' | 'Significant' | 'Systemic';
  tierDescription: string;
  explanation: string;
}

export interface ConfidenceAssessment {
  overall: 'Low' | 'Medium' | 'High';
  occurrenceConfidence: 'Low' | 'Medium' | 'High';
  predictionConfidence: 'Low' | 'Medium' | 'High';
  justification: string;
}

export interface ActorImpact {
  name: string;
  outcome: 'beneficiary' | 'impacted' | 'mixed';
  explanation: string;
}

export interface CitationItem {
  id: number;
  title: string;
  url: string;
  publisher?: string;
  date?: string;
}

export interface GeopoliticalDevelopment {
  id: string;
  eventTitle: string;
  eventDate: string;
  sourcePublicationDates?: string;
  fact: string; // What the sources establish
  analysis: string; // Strategic implications for European business manager
  speculation: string; // Possible future developments (clearly labeled)
  indicators: IndicatorsBreakdown;
  escalationIndex: EscalationIndexResult;
  strategicImportance: StrategicImportanceResult;
  confidence: ConfidenceAssessment;
  actors: ActorImpact[];
  alternativeInterpretation: string;
  evidenceToChangeAssessment: string;
  citations: CitationItem[];
}

export interface IntelligenceBrief {
  id: string;
  generatedAt: string;
  coveragePeriod: {
    startDate: string;
    endDate: string;
    label: string;
  };
  executiveSummary: string;
  developments: GeopoliticalDevelopment[];
  threeIndicatorsToMonitor: string[];
  implications: {
    semiconductorSupply: string;
    internationalTrade: string;
    europeanBusinessImpact: string;
  };
  importantUncertainties: string[];
  groundingQueries: string[];
  searchEntryPointHtml?: string;
  allSources: CitationItem[];
  researchLimitation?: string | null;
}

export interface EventAnalysisResponse {
  brief: IntelligenceBrief;
}

export interface FollowUpQuestionAnswer {
  question: string;
  fact: string;
  analysis: string;
  speculation: string;
  citations: CitationItem[];
  keyTakeawayForBusiness: string;
}

export type AnalysisMode = 'brief' | 'event' | 'question';

export interface AnalyzeRequestBody {
  mode: AnalysisMode;
  startDate?: string;
  endDate?: string;
  eventText?: string;
  question?: string;
  contextBrief?: {
    summary: string;
    developments: Array<{
      title: string;
      fact: string;
      analysis: string;
    }>;
  };
}
