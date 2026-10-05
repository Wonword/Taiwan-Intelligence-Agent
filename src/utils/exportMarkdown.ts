import { IntelligenceBrief } from '../types';

export function generateMarkdownReport(brief: IntelligenceBrief): string {
  const lines: string[] = [];

  lines.push('# TAIWAN INTELLIGENCE BRIEF');
  lines.push('### Cross-Strait Geopolitical & Supply Chain Assessment');
  lines.push('');
  lines.push(`**Generated:** ${new Date(brief.generatedAt).toUTCString()}`);
  lines.push(`**Coverage Window:** ${brief.coveragePeriod.label}`);
  lines.push('**Target Audience:** European Enterprise Leadership & Supply Chain Directors');
  lines.push('**Analysis Standard:** Rigorous FACT / ANALYSIS / SPECULATION segregation');
  lines.push('');
  lines.push('---');
  lines.push('');

  lines.push('## Executive Summary');
  lines.push('');
  lines.push(brief.executiveSummary);
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push('## Significant Geopolitical Developments');
  lines.push('');

  brief.developments.forEach((dev, idx) => {
    lines.push(`### Development ${idx + 1}: ${dev.eventTitle}`);
    lines.push(`*Event Date: ${dev.eventDate}${dev.sourcePublicationDates ? ` | Sources Published: ${dev.sourcePublicationDates}` : ''}*`);
    lines.push('');

    lines.push('#### 1. FACT (Established by Retrieved Sources)');
    lines.push(dev.fact);
    lines.push('');

    lines.push('#### 2. ANALYSIS (Strategic Implications for European Business)');
    lines.push(dev.analysis);
    lines.push('');

    lines.push('#### 3. SPECULATION (Projected Contingencies & Scenarios)');
    lines.push(dev.speculation);
    lines.push('');

    lines.push('#### 4. Quantitative & Pillar Assessment');
    lines.push('');
    lines.push(`- **Escalation Risk Index:** ${dev.escalationIndex.isComplete ? `${dev.escalationIndex.score}/100` : 'Insufficient evidence for a complete index'}`);
    lines.push(`  *Rationale:* ${dev.escalationIndex.explanationText}`);
    lines.push(`- **Strategic Importance Score:** ${dev.strategicImportance.score}/100 (${dev.strategicImportance.tierLabel})`);
    lines.push(`  *Rationale:* ${dev.strategicImportance.explanation}`);
    lines.push(`- **Confidence Assessment:** ${dev.confidence.overall}`);
    lines.push(`  *Occurrence Confidence:* ${dev.confidence.occurrenceConfidence}`);
    lines.push(`  *Prediction Confidence:* ${dev.confidence.predictionConfidence}`);
    lines.push(`  *Justification:* ${dev.confidence.justification}`);
    lines.push('');

    lines.push('##### Pillar Indicators:');
    const { military, political, diplomatic, economic, technological } = dev.indicators;
    lines.push(`- **Military (Weight 30):** Rating ${military.rating !== null ? `${military.rating}/4` : 'Unknown'} — ${military.explanation}`);
    lines.push(`- **Political (Weight 20):** Rating ${political.rating !== null ? `${political.rating}/4` : 'Unknown'} — ${political.explanation}`);
    lines.push(`- **Diplomatic (Weight 20):** Rating ${diplomatic.rating !== null ? `${diplomatic.rating}/4` : 'Unknown'} — ${diplomatic.explanation}`);
    lines.push(`- **Economic (Weight 20):** Rating ${economic.rating !== null ? `${economic.rating}/4` : 'Unknown'} — ${economic.explanation}`);
    lines.push(`- **Technological (Weight 10):** Rating ${technological.rating !== null ? `${technological.rating}/4` : 'Unknown'} — ${technological.explanation}`);
    lines.push('');

    if (dev.actors && dev.actors.length > 0) {
      lines.push('##### Actor Impact Dynamics:');
      dev.actors.forEach((act) => {
        lines.push(`- **${act.name}** [${act.outcome.toUpperCase()}]: ${act.explanation}`);
      });
      lines.push('');
    }

    lines.push('##### Alternative Interpretation & Pivots:');
    lines.push(`- **Alternative Thesis:** ${dev.alternativeInterpretation}`);
    lines.push(`- **Evidence That Would Change Assessment:** ${dev.evidenceToChangeAssessment}`);
    lines.push('');

    if (dev.citations && dev.citations.length > 0) {
      lines.push('##### Citations & Grounded Sources:');
      dev.citations.forEach((c) => {
        lines.push(`- [${c.id}] [${c.title}](${c.url})${c.publisher ? ` — ${c.publisher}` : ''}`);
      });
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  });

  lines.push('## Strategic Implications for European Industry');
  lines.push('');
  lines.push(`### Semiconductor Supply Chains\n${brief.implications.semiconductorSupply}\n`);
  lines.push(`### International Trade & Maritime Navigation\n${brief.implications.internationalTrade}\n`);
  lines.push(`### Actionable Guidance for European Enterprise Leadership\n${brief.implications.europeanBusinessImpact}\n`);

  lines.push('## Three Priority Indicators to Monitor Next');
  lines.push('');
  brief.threeIndicatorsToMonitor.forEach((ind, i) => {
    lines.push(`${i + 1}. ${ind}`);
  });
  lines.push('');

  lines.push('## Critical Uncertainties');
  lines.push('');
  brief.importantUncertainties.forEach((unc, i) => {
    lines.push(`- ${unc}`);
  });
  lines.push('');

  if (brief.allSources && brief.allSources.length > 0) {
    lines.push('## All Grounded Search References');
    lines.push('');
    brief.allSources.forEach((src, idx) => {
      lines.push(`${idx + 1}. [${src.title}](${src.url})`);
    });
    lines.push('');
  }

  if (brief.researchLimitation) {
    lines.push('## Research Limitation Note');
    lines.push('');
    lines.push(`> ${brief.researchLimitation}`);
    lines.push('');
  }

  lines.push('---');
  lines.push('*Report generated by Taiwan Intelligence Agent with Google Search Grounding. Strictly educational and strategic advisory.*');

  return lines.join('\n');
}

export function downloadMarkdownFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
