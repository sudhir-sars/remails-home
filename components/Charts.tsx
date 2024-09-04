'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Chart description
export const description = 'An interactive area chart showing live data';

const initialChartData = [
  { time: new Date().toLocaleTimeString('en-IN'), online: 200, offline: 100 },
  { time: new Date().toLocaleTimeString('en-IN'), online: 180, offline: 150 },
  { time: new Date().toLocaleTimeString('en-IN'), online: 220, offline: 130 },
];

const chartConfig = {
  online: {
    label: 'Online',
    color: 'hsl(var(--chart-1))',
  },
  offline: {
    label: 'Offline',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function Charts() {
  const [chartData, setChartData] = React.useState(initialChartData);
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString('en-IN');
      const newOnline = Math.floor(Math.random() * 1500);
      const newOffline = Math.floor(Math.random() * 300);

      const newChartData = [
        ...chartData,
        { time: newTime, online: newOnline, offline: newOffline },
      ];
      if (newChartData.length > 10) {
        newChartData.shift(); // Keep the last 10 data points
      }

      setChartData(newChartData);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId);
  }, [chartData]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Live Area Chart - Online vs Offline</CardTitle>
          <CardDescription>
            Showing live online and offline data with a 2-second update interval
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-online)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-online)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOffline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-offline)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-offline)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="offline"
              type="natural"
              fill="url(#fillOffline)"
              stroke="var(--color-offline)"
              stackId="a"
            />
            <Area
              dataKey="online"
              type="natural"
              fill="url(#fillOnline)"
              stroke="var(--color-online)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
