import { Metrics, WorldState, ChoiceImpact } from "./types";

function clamp(value: number, min: number = 0, max: number = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function applyImpact(
  currentMetrics: Metrics,
  currentWorldState: WorldState,
  impact: ChoiceImpact
): { metrics: Metrics; worldState: WorldState } {
  const metrics: Metrics = {
    civicAwareness: clamp(
      currentMetrics.civicAwareness + (impact.civicAwareness ?? 0)
    ),
    empathy: clamp(currentMetrics.empathy + (impact.empathy ?? 0)),
    socialTrust: clamp(currentMetrics.socialTrust + (impact.socialTrust ?? 0)),
    personalConvenience: clamp(
      currentMetrics.personalConvenience + (impact.personalConvenience ?? 0)
    ),
  };

  const worldState: WorldState = {
    publicPatience: clamp(
      currentWorldState.publicPatience + (impact.publicPatience ?? 0)
    ),
    cleanlinessLevel: clamp(
      currentWorldState.cleanlinessLevel + (impact.cleanlinessLevel ?? 0)
    ),
    cooperationLevel: clamp(
      currentWorldState.cooperationLevel + (impact.cooperationLevel ?? 0)
    ),
  };

  return { metrics, worldState };
}
