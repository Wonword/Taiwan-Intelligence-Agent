import { IntelligenceBrief } from '../types';
import {
  calculateEscalationIndex,
  getStrategicImportanceTier,
} from '../utils/scoring';

const dev1Indicators = {
  military: {
    rating: 2 as const,
    explanation:
      'Sustained PLA naval patrol activity and median line sorties in the southwestern ADIZ without kinetic escalation.',
  },
  political: {
    rating: 2 as const,
    explanation:
      'Beijing diplomatic friction following European parliamentary delegation visits to Taipei; official protests lodged in Brussels.',
  },
  diplomatic: {
    rating: 1 as const,
    explanation:
      'Maintenance of bilateral de-escalation channels; European capitals reiterate one-China policy alongside status quo preservation.',
  },
  economic: {
    rating: 2 as const,
    explanation:
      'Targeted customs audits on Taiwanese agricultural and component exporters; no disruption to core advanced semiconductor trade.',
  },
  technological: {
    rating: 2 as const,
    explanation:
      'Tightened export documentation on dual-use semiconductor equipment; European lithography suppliers navigating broadened compliance scopes.',
  },
};

const dev2Indicators = {
  military: {
    rating: 1 as const,
    explanation:
      'Routine freedom of navigation transits by allied naval vessels monitored by PLA Southern Theater command.',
  },
  political: {
    rating: 2 as const,
    explanation:
      'Taipei legislative debates regarding defense procurement budgets and critical infrastructure cybersecurity mandates.',
  },
  diplomatic: {
    rating: 2 as const,
    explanation:
      'Deepened EU-Taiwan trade and investment dialogues regarding joint ventures in green energy and semiconductor testing.',
  },
  economic: {
    rating: 2 as const,
    explanation:
      'European automotive OEMs expanding buffer stock agreements with Taiwanese tier-1 chip vendors from 6 weeks to 14 weeks.',
  },
  technological: {
    rating: 3 as const,
    explanation:
      'Accelerated deployment of TSMC Fab 23 in Dresden, Germany, to localize automotive microcontroller fabrication and mitigate Strait transit risks.',
  },
};

export const sampleIntelligenceBrief: IntelligenceBrief = {
  id: 'brief-baseline-sample',
  generatedAt: new Date().toISOString(),
  coveragePeriod: {
    startDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    label: 'Past 7 Days (Baseline Reference)',
  },
  executiveSummary:
    'Cross-Strait military posturing remains elevated within established grey-zone parameters without near-term operational signs of kinetic confrontation. For European enterprise leaders, the primary exposure lies in dual-use export control compliance, maritime freight insurance adjustments for Strait navigation, and tier-2 semiconductor packaging dependencies. European automotive and industrial procurement should prioritize monitoring lead-times for legacy automotive microcontrollers and tracking TSMC European fab milestones.',
  developments: [
    {
      id: 'dev-sample-1',
      eventTitle:
        'PLA Grey-Zone Activity in Southwestern ADIZ & Maritime Inspection Mandates',
      eventDate: 'Recent 7-Day Window',
      sourcePublicationDates: 'Reported by CNA, Reuters, and MND Press Releases',
      fact:
        'Taiwan’s Ministry of National Defense (MND) recorded regular sorties of PLA aircraft and naval vessels operating across the median line into the southwestern ADIZ. Concurrently, the China Maritime Safety Administration reaffirmed its assertion of jurisdiction over Taiwan Strait maritime law enforcement, conducting localized inspection drills.',
      analysis:
        'For European supply chain managers, the primary operational risk is administrative shipping delays rather than direct naval interdiction. Container freight routed between Shanghai, Ningbo, Kaohsiung, and Rotterdam could experience lengthened documentation verifications or insurance premium surcharges if maritime authorities enact selective boardings.',
      speculation:
        'Beijing may incrementally test international shipping reactions by conducting selective customs boardings of non-allied commercial cargo vessels carrying dual-use electronics, aiming to normalize legal jurisdiction without crossing military tripwires.',
      indicators: dev1Indicators,
      escalationIndex: calculateEscalationIndex(dev1Indicators),
      strategicImportance: getStrategicImportanceTier(
        62,
        'Directly affects maritime shipping risk premiums and supply chain buffer calculations for European manufacturers importing Taiwanese assemblies.'
      ),
      confidence: {
        overall: 'High',
        occurrenceConfidence: 'High',
        predictionConfidence: 'Medium',
        justification:
          'Flight tracks and vessel sightings are independently verified by Taiwan MND and open-source AIS tracking data. Long-term political intention remains subject to leadership decision-making volatility.',
      },
      actors: [
        {
          name: 'European Container Carriers (Maersk, Hapag-Lloyd)',
          outcome: 'impacted',
          explanation:
            'Increased hull insurance premiums and contingency route planning around eastern Taiwan.',
        },
        {
          name: 'PRC Maritime Law Enforcement',
          outcome: 'beneficiary',
          explanation:
            'Gradual normalization of domestic jurisdiction claims over international sea lanes.',
        },
      ],
      alternativeInterpretation:
        'Sorties represent standard cyclic training maneuvers timed to political calendar events rather than an escalated phase of coercive blockade rehearsals.',
      evidenceToChangeAssessment:
        'A documented boarding and seizure of a commercial merchant vessel transiting the Taiwan Strait international channel.',
      citations: [
        {
          id: 1,
          title: 'Taiwan MND Daily Defense Update on Cross-Strait Military Movements',
          url: 'https://www.mnd.gov.tw/english/',
          publisher: 'mnd.gov.tw',
        },
        {
          id: 2,
          title: 'Strait Navigation and Commercial Marine Insurance Risk Briefing',
          url: 'https://www.reuters.com',
          publisher: 'reuters.com',
        },
      ],
    },
    {
      id: 'dev-sample-2',
      eventTitle:
        'European Semiconductor De-risking & TSMC Dresden Fab Acceleration',
      eventDate: 'Recent 7-Day Window',
      sourcePublicationDates: 'Reported by Financial Times and Bloomberg',
      fact:
        'European Commission officials and German federal authorities confirmed progressing milestone disbursements for ESMC (European Semiconductor Manufacturing Company), the joint venture between TSMC, Bosch, Infineon, and NXP in Dresden. Concurrently, Taiwanese economic authorities reported high-capacity utilization for automotive-grade wafers.',
      analysis:
        'European industrial and automotive leaders benefit from long-term localized wafer capacity. However, leading-edge logic (sub-3nm) will remain concentrated in Hsinchu and Tainan for the foreseeable decade. Near-term strategy must focus on dual-sourcing back-end packaging and substrate materials.',
      speculation:
        'Potential tightening of bilateral investment screening could accelerate European OEM equity co-investments in Taiwanese testing and packaging sub-contractors to secure guaranteed wafer allocation rights.',
      indicators: dev2Indicators,
      escalationIndex: calculateEscalationIndex(dev2Indicators),
      strategicImportance: getStrategicImportanceTier(
        68,
        'Directly dictates future resilience of European automotive power semiconductor supply and EU Chips Act implementation.'
      ),
      confidence: {
        overall: 'High',
        occurrenceConfidence: 'High',
        predictionConfidence: 'High',
        justification:
          'Joint venture contractual agreements, corporate announcements, and regulatory state aid approvals are fully public and verified.',
      },
      actors: [
        {
          name: 'European Automotive OEMs (Infineon, NXP, Bosch)',
          outcome: 'beneficiary',
          explanation:
            'Secured localized capacity for 28/22nm planar and 16/12nm FinFET automotive microcontrollers.',
        },
        {
          name: 'TSMC Global Operations',
          outcome: 'beneficiary',
          explanation:
            'Diversification of geopolitical exposure while anchoring sticky European industrial customer relationships.',
        },
      ],
      alternativeInterpretation:
        'Construction delays and specialized engineering labor shortages in Saxony could postpone initial production output beyond projected commercial schedules.',
      evidenceToChangeAssessment:
        'Substantive regulatory delays in EU state aid approval or major capex reallocation by founding partners.',
      citations: [
        {
          id: 3,
          title: 'European Chips Act Implementation and Foundry Capacity Projections',
          url: 'https://ec.europa.eu',
          publisher: 'ec.europa.eu',
        },
        {
          id: 4,
          title: 'TSMC Global Fab Expansion and Dresden Facility Progress',
          url: 'https://www.ft.com',
          publisher: 'ft.com',
        },
      ],
    },
  ],
  threeIndicatorsToMonitor: [
    'PLA Eastern Theater Command sortie density and maritime exclusion zone declarations',
    'Commercial container freight insurance war-risk surcharge notices for Strait transits',
    'EU-Taiwan bilateral investment treaty and supply chain consultation proceedings',
  ],
  implications: {
    semiconductorSupply:
      'Wafer availability for European automotive and industrial customers is stable. High-risk bottlenecks remain concentrated in advanced packaging (CoWoS) and specialized quartz/photoresist materials.',
    internationalTrade:
      'Taiwan Strait shipping routes remain open and functioning normally. Cargo tracking and alternative transit routes through the Luzon Strait or eastern Taiwan waters should remain modeled in contingency plans.',
    europeanBusinessImpact:
      'Enterprise leaders should verify tier-2 and tier-3 supplier mapping, auditing whether critical component assemblies rely on single-source Taiwanese packaging houses without mirrored capacity.',
  },
  importantUncertainties: [
    'US export control regulatory updates regarding AI accelerator wafer thresholds and third-country transshipment rules',
    'Scale of bilateral economic retaliatory measures by Beijing against European clean-tech and agricultural goods',
  ],
  groundingQueries: [
    'Taiwan Strait military sorties recent',
    'TSMC Dresden fab European auto semiconductor supply',
    'China maritime safety administration Taiwan Strait commercial shipping',
  ],
  allSources: [
    {
      id: 1,
      title: 'Taiwan MND Daily Defense Update on Cross-Strait Military Movements',
      url: 'https://www.mnd.gov.tw/english/',
    },
    {
      id: 2,
      title: 'Strait Navigation and Commercial Marine Insurance Risk Briefing',
      url: 'https://www.reuters.com',
    },
    {
      id: 3,
      title: 'European Chips Act Implementation and Foundry Capacity Projections',
      url: 'https://ec.europa.eu',
    },
    {
      id: 4,
      title: 'TSMC Global Fab Expansion and Dresden Facility Progress',
      url: 'https://www.ft.com',
    },
  ],
  researchLimitation: null,
};
