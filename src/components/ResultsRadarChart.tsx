"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import { Metrics, WorldState } from "@/lib/types";

interface ResultsRadarChartProps {
  metrics: Metrics;
  worldState: WorldState;
}

export default function ResultsRadarChart({
  metrics,
  worldState,
}: ResultsRadarChartProps) {
  const data = [
    { subject: "Civic Awareness", value: metrics.civicAwareness },
    { subject: "Empathy", value: metrics.empathy },
    { subject: "Social Trust", value: metrics.socialTrust },
    { subject: "Cooperation", value: worldState.cooperationLevel },
    { subject: "Cleanliness", value: worldState.cleanlinessLevel },
    { subject: "Public Patience", value: worldState.publicPatience },
    { subject: "Convenience", value: metrics.personalConvenience },
  ];

  return (
    <div className="flex w-full items-center justify-center">
      <ResponsiveContainer width="100%" height={340}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e7e5e4" strokeWidth={0.5} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#78716c", fontSize: 11, fontWeight: 500 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Profile"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
