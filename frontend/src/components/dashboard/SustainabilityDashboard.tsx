import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SustainabilityMetrics } from '@/types/food';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { 
  Leaf, 
  Droplets, 
  Footprints, 
  Recycle,
  TrendingDown,
  Award
} from 'lucide-react';

interface SustainabilityDashboardProps {
  metrics: SustainabilityMetrics;
}

export const SustainabilityDashboard: React.FC<SustainabilityDashboardProps> = ({
  metrics,
}) => {
  const comparisonData = [
    {
      name: 'Carbon',
      organic: 100 - metrics.comparisonToConventional.carbonSaved,
      conventional: 100,
      unit: 'kg CO₂',
    },
    {
      name: 'Water',
      organic: 100 - metrics.comparisonToConventional.waterSaved,
      conventional: 100,
      unit: 'L',
    },
    {
      name: 'Chemicals',
      organic: 100 - metrics.comparisonToConventional.chemicalsAvoided,
      conventional: 100,
      unit: 'g',
    },
  ];

  const scoreData = [
    { name: 'Organic Score', value: metrics.organicScore, color: 'hsl(152, 76%, 36%)' },
    { name: 'Remaining', value: 100 - metrics.organicScore, color: 'hsl(var(--muted))' },
  ];

  const statCards = [
    {
      icon: Footprints,
      label: 'Carbon Footprint',
      value: `${metrics.carbonFootprint} kg`,
      description: `${metrics.comparisonToConventional.carbonSaved}% less than conventional`,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Droplets,
      label: 'Water Usage',
      value: `${metrics.waterUsage} L`,
      description: `${metrics.comparisonToConventional.waterSaved}% less than conventional`,
      color: 'from-sky-500 to-blue-500',
    },
    {
      icon: Leaf,
      label: 'Pesticide Free',
      value: metrics.pesticideFree ? 'Yes' : 'No',
      description: '100% natural growing methods',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Recycle,
      label: 'Eco Packaging',
      value: metrics.packagingRecyclable ? '100%' : 'Partial',
      description: 'Fully recyclable materials',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold gradient-text">
          Sustainability Impact
        </h2>
        <p className="text-muted-foreground mt-2">
          Real environmental metrics for your product
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="glass" className="h-full">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold font-display mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Chart */}
        <Card variant="default">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Organic vs Conventional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={60} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="conventional" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="Conventional" />
                <Bar dataKey="organic" fill="hsl(152, 76%, 36%)" radius={[0, 4, 4, 0]} name="Organic" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Organic Score */}
        <Card variant="verified">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Organic Certification Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={scoreData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold font-display gradient-text">
                    {metrics.organicScore}
                  </p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {metrics.localSourcing}% locally sourced ingredients
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
