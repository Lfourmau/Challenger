"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  activity: {
    label: "Activity",
    color: "#2563eb",
  },
  numberOfVideos: {
    label: "Number of videos",
    color: "black",
  },
} satisfies ChartConfig

export function VideosPerActivityChart({statArray}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-1/2">
      <BarChart accessibilityLayer data={statArray}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="activity"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 12)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="numberOfVideos" fill="var(--color-numberOfVideos)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
