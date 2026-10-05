import {
  IndicatorsBreakdown,
  EscalationIndexResult,
  StrategicImportanceResult,
  IndicatorRating,
} from '../types';

export const INDICATOR_WEIGHTS = {
  military: 30,
  political: 20,
  diplomatic: 20,
  economic: 20,
  technological: 10,
} as const;

export const RATING_DEFINITIONS: Record<number, string> = {
  0: 'Routine activity or de-escalation supported by evidence',
  1: 'Limited increase in tension',
  2: 'Sustained tension with meaningful consequences',
  3: 'Major deterioration or confrontation',
  4: 'Acute crisis or direct escalation',
};

/**
 * Calculates the Escalation Risk Index in application code.
 * Formula: sum of each weight multiplied by its rating, divided by 4.
 *
 * Missing evidence must remain unknown: if any category cannot be assessed
 * (null or undefined), display "Insufficient evidence for a complete index"
 * rather than substituting zero.
 */
export function calculateEscalationIndex(
  indicators?: IndicatorsBreakdown
): EscalationIndexResult {
  if (!indicators) {
    return {
      isComplete: false,
      score: null,
      label: 'Escalation risk index',
      explanationText: 'Insufficient evidence for a complete index',
    };
  }

  const categories: (keyof typeof INDICATOR_WEIGHTS)[] = [
    'military',
    'political',
    'diplomatic',
    'economic',
    'technological',
  ];

  const missingCategories: string[] = [];
  let weightedSum = 0;

  for (const cat of categories) {
    const item = indicators[cat];
    const r: IndicatorRating = item ? item.rating : null;

    if (r === null || r === undefined || typeof r !== 'number' || r < 0 || r > 4) {
      missingCategories.push(cat);
    } else {
      weightedSum += INDICATOR_WEIGHTS[cat] * r;
    }
  }

  if (missingCategories.length > 0) {
    const missingList = missingCategories
      .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
      .join(', ');
    return {
      isComplete: false,
      score: null,
      label: 'Escalation risk index',
      explanationText: 'Insufficient evidence for a complete index',
      missingCategories,
    };
  }

  // Calculate: sum(weight * rating) / 4. Range is 0 to (100 * 4) / 4 = 100.
  const score = Math.round((weightedSum / 4) * 10) / 10;

  let riskTier = 'Low Tension';
  if (score >= 75) riskTier = 'Acute Crisis / Direct Confrontation Risk';
  else if (score >= 50) riskTier = 'Substantial Deterioration & Disruption Risk';
  else if (score >= 25) riskTier = 'Sustained Regional Friction';

  return {
    isComplete: true,
    score,
    label: 'Escalation risk index',
    explanationText: `${score}/100 · ${riskTier} (Calculated from weighted 5-pillar indicators: Military 30%, Political 20%, Diplomatic 20%, Economic 20%, Tech 10%)`,
  };
}

/**
 * Categorizes the Strategic Importance Score according to specification:
 * 0–24: Limited implications for the intended user
 * 25–49: Meaningful but localized consequences
 * 50–74: Significant regional or sectoral implications
 * 75–100: Potentially major international or systemic consequences
 */
export function getStrategicImportanceTier(
  score: number,
  explanation: string
): StrategicImportanceResult {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));

  if (clampedScore <= 24) {
    return {
      score: clampedScore,
      tierLabel: 'Limited',
      tierDescription: '0–24: Limited implications for the intended user.',
      explanation,
    };
  } else if (clampedScore <= 49) {
    return {
      score: clampedScore,
      tierLabel: 'Localized',
      tierDescription: '25–49: Meaningful but localized consequences.',
      explanation,
    };
  } else if (clampedScore <= 74) {
    return {
      score: clampedScore,
      tierLabel: 'Significant',
      tierDescription: '50–74: Significant regional or sectoral implications.',
      explanation,
    };
  } else {
    return {
      score: clampedScore,
      tierLabel: 'Systemic',
      tierDescription: '75–100: Potentially major international or systemic consequences.',
      explanation,
    };
  }
}
