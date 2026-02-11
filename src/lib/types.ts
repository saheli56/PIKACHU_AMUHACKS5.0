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
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}
