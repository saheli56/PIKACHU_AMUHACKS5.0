"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  PolarRadiusAxis,
  Tooltip,
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
    { subject: "Civic Awareness", value: metrics.civicAwareness, fullMark: 100 },
    { subject: "Empathy", value: metrics.empathy, fullMark: 100 },
    { subject: "Social Trust", value: metrics.socialTrust, fullMark: 100 },
    { subject: "Cooperation", value: worldState.cooperationLevel, fullMark: 100 },
    { subject: "Cleanliness", value: worldState.cleanlinessLevel, fullMark: 100 },
    { subject: "Public Patience", value: worldState.publicPatience, fullMark: 100 },
    { subject: "Convenience", value: metrics.personalConvenience, fullMark: 100 },
  ];

  return (
    <div className="flex w-full items-center justify-center">
      <ResponsiveContainer width="100%" height={360}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="#e7e5e4" strokeWidth={0.5} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#78716c", fontSize: 11, fontWeight: 600 }}
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
            fill="url(#radarFill)"
            strokeWidth={2.5}
            dot={{
              r: 4,
              fill: "#6366f1",
              strokeWidth: 2,
              stroke: "#fff",
            }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid #e7e5e4",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(value) => [`${value ?? 0}`, "Score"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
