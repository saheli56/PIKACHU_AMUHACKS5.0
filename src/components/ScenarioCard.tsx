import { Scenario } from "@/lib/types";
import { ChoiceImpact } from "@/lib/types";
import ChoiceButton from "./ChoiceButton";

interface ScenarioCardProps {
  scenario: Scenario;
  onChoice: (impact: ChoiceImpact) => void;
}

export default function ScenarioCard({ scenario, onChoice }: ScenarioCardProps) {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        {scenario.title}
      </h2>
      <p className="mb-6 text-gray-600">{scenario.description}</p>
      <div className="flex flex-col gap-3">
        {scenario.choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            text={choice.text}
            onClick={() => onChoice(choice.impact)}
          />
        ))}
      </div>
    </div>
  );
}
