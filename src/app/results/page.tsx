"use client";

import { useRouter } from "next/navigation";
import { useSimulation } from "@/context/SimulationContext";
import MetricsPanel from "@/components/MetricsPanel";

export default function ResultsPage() {
  const { metrics, worldState, resetSimulation } = useSimulation();
  const router = useRouter();

  const handleRestart = () => {
    resetSimulation();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Your Results</h1>
      <p className="mb-8 text-gray-600">
        Your civic behavior profile will appear here.
      </p>
      <div className="w-full max-w-2xl">
        <MetricsPanel metrics={metrics} worldState={worldState} />
      </div>
      <button
        onClick={handleRestart}
        className="mt-8 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Restart
      </button>
    </div>
  );
}
