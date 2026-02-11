export interface Metrics {
  civicAwareness: number;
  empathy: number;
  socialTrust: number;
  personalConvenience: number;
}

export interface WorldState {
  publicPatience: number;
  cleanlinessLevel: number;
  cooperationLevel: number;
}

export interface ChoiceImpact {
  civicAwareness?: number;
  empathy?: number;
  socialTrust?: number;
  personalConvenience?: number;
  publicPatience?: number;
  cleanlinessLevel?: number;
  cooperationLevel?: number;
}

export interface Choice {
  id: string;
  text: string;
  impact: ChoiceImpact;
  consequence: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  choices: Choice[];
}

export interface ChoiceRecord {
  scenarioId: string;
  scenarioTitle: string;
  choiceId: string;
  choiceText: string;
  consequence: string;
  impact: ChoiceImpact;
}

export interface CivicProfile {
  archetype: string;
  title: string;
  description: string;
  strengths: string[];
  improvements: string[];
  criticalInsights: string[];
}
