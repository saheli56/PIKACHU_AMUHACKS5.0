import { Metrics, WorldState } from "@/lib/types";

interface MetricsPanelProps {
  metrics: Metrics;
  worldState: WorldState;
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-sm text-gray-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function MetricsPanel({ metrics, worldState }: MetricsPanelProps) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Your Metrics
      </h3>
      <MetricBar label="Civic Awareness" value={metrics.civicAwareness} />
      <MetricBar label="Empathy" value={metrics.empathy} />
      <MetricBar label="Social Trust" value={metrics.socialTrust} />
      <MetricBar label="Personal Convenience" value={metrics.personalConvenience} />

      <h3 className="mb-4 mt-6 text-lg font-semibold text-gray-900">
        World State
      </h3>
      <MetricBar label="Public Patience" value={worldState.publicPatience} />
      <MetricBar label="Cleanliness Level" value={worldState.cleanlinessLevel} />
      <MetricBar label="Cooperation Level" value={worldState.cooperationLevel} />
    </div>
  );
}
