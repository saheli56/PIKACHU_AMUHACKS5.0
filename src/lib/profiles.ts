import { Metrics, WorldState, CivicProfile, ChoiceRecord } from "./types";

interface ProfileArchetype {
  id: string;
  title: string;
  description: string;
  condition: (metrics: Metrics, worldState: WorldState) => boolean;
}

const archetypes: ProfileArchetype[] = [
  {
    id: "civic-champion",
    title: "The Civic Champion",
    description:
      "You consistently chose community over convenience. Your decisions reflect a deep understanding that civic life is a shared responsibility. You're the person who makes public spaces better simply by being present. The world needs more people like you.",
    condition: (m) =>
      m.civicAwareness >= 70 && m.empathy >= 60 && m.socialTrust >= 60,
  },
  {
    id: "empathetic-soul",
    title: "The Empathetic Soul",
    description:
      "Your choices reveal someone who feels deeply for others. You may not always take the boldest action, but you never look away from human vulnerability. Your empathy is your compass — it points you toward what matters most: people.",
    condition: (m) => m.empathy >= 70 && m.socialTrust >= 55,
  },
  {
    id: "community-builder",
    title: "The Community Builder",
    description:
      "You see solutions where others see problems. Your instinct is to bring people together, to find the middle ground, to build systems that work for everyone. You're not just a participant in civic life — you're an architect of it.",
    condition: (m, w) => w.cooperationLevel >= 65 && m.civicAwareness >= 60,
  },
  {
    id: "quiet-contributor",
    title: "The Quiet Contributor",
    description:
      "You may not make grand gestures, but your steady, thoughtful choices add up. You do what's right when it's convenient and sometimes even when it's not. You're the backbone of society — reliable, decent, and often underappreciated.",
    condition: (m) =>
      m.civicAwareness >= 50 &&
      m.empathy >= 50 &&
      m.personalConvenience <= 60,
  },
  {
    id: "pragmatic-individual",
    title: "The Pragmatic Individual",
    description:
      "You're practical and self-aware. You know the 'right' thing to do, but you also know the cost. Your choices lean toward personal efficiency, and there's honesty in that. The question is whether convenience is a choice — or a habit.",
    condition: (m) => m.personalConvenience >= 60,
  },
  {
    id: "reluctant-citizen",
    title: "The Reluctant Citizen",
    description:
      "You're not indifferent — you're cautious. You watch, assess, and sometimes hesitate a moment too long. Your civic instincts are there, just underused. The gap between knowing the right thing and doing it is where your growth lies.",
    condition: (m) => m.civicAwareness < 50 && m.empathy >= 40,
  },
  {
    id: "silent-observer",
    title: "The Silent Observer",
    description:
      "You tend to stand at the edges, watching civic life unfold without stepping in. There may be many reasons — conflict avoidance, time pressure, or a belief that someone else will act. But your choices reveal a pattern of disengagement that, over time, shapes the world you live in.",
    condition: () => true, // fallback archetype
  },
];

export function determineProfile(
  metrics: Metrics,
  worldState: WorldState,
  _choices: ChoiceRecord[]
): CivicProfile {
  const archetype = archetypes.find((a) => a.condition(metrics, worldState))!;

  const strengths: string[] = [];
  const improvements: string[] = [];
  const criticalInsights: string[] = [];

  // Strengths — metrics >= 65
  if (metrics.civicAwareness >= 65)
    strengths.push(
      "Strong civic awareness — you understand that public life requires active participation."
    );
  if (metrics.empathy >= 65)
    strengths.push(
      "High empathy — you notice how situations affect others, not just yourself."
    );
  if (metrics.socialTrust >= 65)
    strengths.push(
      "You build social trust through your actions, reinforcing faith in community."
    );
  if (worldState.cooperationLevel >= 65)
    strengths.push(
      "You foster cooperation — your presence makes collective action more likely."
    );
  if (worldState.cleanlinessLevel >= 65)
    strengths.push(
      "You contribute to cleaner, more pleasant shared environments."
    );
  if (worldState.publicPatience >= 65)
    strengths.push(
      "Your behavior promotes patience and calm in public spaces."
    );

  // Improvements — metrics between 35 and 50
  if (metrics.civicAwareness > 35 && metrics.civicAwareness < 50)
    improvements.push(
      "Your civic awareness has room to grow — small actions in public spaces can build the habit."
    );
  if (metrics.empathy > 35 && metrics.empathy < 50)
    improvements.push(
      "You sometimes overlook how your choices affect others emotionally."
    );
  if (metrics.socialTrust > 35 && metrics.socialTrust < 50)
    improvements.push(
      "Your actions occasionally undermine trust — consider how your choices appear to others."
    );
  if (metrics.personalConvenience >= 65)
    improvements.push(
      "You lean heavily toward personal convenience — consider what's lost when everyone does the same."
    );
  if (worldState.cooperationLevel > 35 && worldState.cooperationLevel < 50)
    improvements.push(
      "Cooperation around you could be stronger — try engaging with others instead of going solo."
    );

  // Critical insights — metrics <= 35
  if (metrics.civicAwareness <= 35)
    criticalInsights.push(
      "Your civic awareness is critically low. Public spaces need active, engaged citizens — not spectators."
    );
  if (metrics.empathy <= 35)
    criticalInsights.push(
      "Empathy was largely absent in your choices. People around you were hurting, and you looked away."
    );
  if (metrics.socialTrust <= 35)
    criticalInsights.push(
      "Your actions eroded social trust significantly. Communities can't function without mutual confidence."
    );
  if (worldState.cleanlinessLevel <= 35)
    criticalInsights.push(
      "Public spaces deteriorated due to choices like yours. Shared environments need shared responsibility."
    );
  if (worldState.publicPatience <= 35)
    criticalInsights.push(
      "Public patience collapsed. When confrontation replaces dialogue, everyone suffers."
    );

  // Ensure at least one item in each category
  if (strengths.length === 0)
    strengths.push(
      "You completed the simulation — self-awareness is the first step toward civic growth."
    );
  if (improvements.length === 0)
    improvements.push(
      "With strong foundations, focus on consistency — being civic in difficult moments, not just easy ones."
    );
  if (criticalInsights.length === 0)
    criticalInsights.push(
      "No critical concerns — your civic behavior is generally positive. Keep building on it."
    );

  return {
    archetype: archetype.id,
    title: archetype.title,
    description: archetype.description,
    strengths,
    improvements,
    criticalInsights,
  };
}
