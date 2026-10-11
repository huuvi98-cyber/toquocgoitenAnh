export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  summary: string;
  details: string;
  imageUrl?: string;
  imageCaption?: string;
  imageSource?: string;
  quote?: {
    text: string;
    author: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  accentColor: string;
}

export interface PartnerCountry {
  id: string;
  name: string;
  flag: string;
  tier: 'CSP' | 'SP' | 'CP' | 'FTA';
  tierLabel: string;
  establishedYear: number;
  partnershipYear: number;
  highlight: string;
  tradeVolume?: string;
  keyAreas: string[];
  description: string;
}

export interface DiplomaticQuote {
  id: string;
  author: string;
  title: string;
  quote: string;
  context: string;
  year: string;
}

export interface BambooPillar {
  id: 'goc' | 'than' | 'canh';
  title: string;
  subtitle: string;
  meaning: string;
  diplomaticExpression: string;
  corePrinciple: string;
  historicalExample: string;
  color: string;
}
