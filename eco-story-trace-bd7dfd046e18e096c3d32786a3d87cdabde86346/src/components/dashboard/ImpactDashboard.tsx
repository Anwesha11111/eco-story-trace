import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserImpact } from '@/types/food';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { 
  Leaf, 
  Droplets, 
  ShieldCheck, 
  Users,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ImpactDashboardProps {
  impact: UserImpact;
}

// Mock monthly data
const monthlyData = [
  { month: 'Aug', carbon: 8, water: 380 },
  { month: 'Sep', carbon: 12, water: 520 },
  { month: 'Oct', carbon: 15, water: 680 },
  { month: 'Nov', carbon: 18, water: 820 },
  { month: 'Dec', carbon: 22, water: 950 },
  { month: 'Jan', carbon: 28, water: 1170 },
];

const achievements = [
  { name: 'Eco Starter', unlocked: true, icon: '🌱' },
  { name: 'Water Saver', unlocked: true, icon: '💧' },
  { name: 'Carbon Crusher', unlocked: true, icon: '🌍' },
  { name: 'Farm Friend', unlocked: true, icon: '👨‍🌾' },
  { name: 'Eco Champion', unlocked: false, icon: '🏆' },
  { name: 'Planet Hero', unlocked: false, icon: '🦸' },
];

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ impact }) => {
  const impactCards = [
    {
      icon: Leaf,
      label: 'Carbon Saved',
      value: `${impact.carbonSaved} kg`,
      progress: Math.min((impact.carbonSaved / 100) * 100, 100),
      goal: '100 kg',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500',
    },
    {
      icon: Droplets,
      label: 'Water Saved',
      value: `${impact.waterSaved} L`,
      progress: Math.min((impact.waterSaved / 5000) * 100, 100),
      goal: '5,000 L',
      color: 'text-sky-500',
      bgColor: 'bg-sky-500',
    },
    {
      icon: ShieldCheck,
      label: 'Pesticides Avoided',
      value: `${impact.pesticideAvoided} kg`,
      progress: Math.min((impact.pesticideAvoided / 5) * 100, 100),
      goal: '5 kg',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500',
    },
    {
      icon: Users,
      label: 'Farmers Supported',
      value: impact.farmersSupported.toString(),
      progress: Math.min((impact.farmersSupported / 50) * 100, 100),
      goal: '50 farmers',
      color: 'text-rose-500',
      bgColor: 'bg-rose-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Trust Points */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold gradient-text">
            Your Eco Impact
          </h2>
          <p className="text-muted-foreground mt-1">
            {impact.totalProducts} organic products traced
          </p>
        </div>
        <Card variant="verified" className="px-6 py-3">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-sm text-muted-foreground">Trust Points</p>
              <p className="text-2xl font-bold">{impact.trustPoints.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                  <span className="text-xs text-muted-foreground">
                    Goal: {card.goal}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold font-display mt-1">{card.value}</p>
                <div className="mt-3">
                  <Progress value={card.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Progress Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 76%, 36%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152, 76%, 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="carbon"
                  stroke="hsl(152, 76%, 36%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCarbon)"
                  name="Carbon Saved (kg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.name}
                  whileHover={{ scale: 1.1 }}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                    achievement.unlocked
                      ? 'bg-primary/10'
                      : 'bg-muted opacity-50'
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <p className="text-xs text-center mt-1 font-medium">
                    {achievement.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
