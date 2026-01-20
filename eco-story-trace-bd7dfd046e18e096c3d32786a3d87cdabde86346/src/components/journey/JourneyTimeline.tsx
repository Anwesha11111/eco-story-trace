import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Sprout, 
  Sun, 
  Package, 
  TestTube, 
  Factory, 
  Truck, 
  Store,
  CheckCircle,
  Clock
} from 'lucide-react';
import { JourneyStage } from '@/types/food';

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Sun,
  Package,
  TestTube,
  Factory,
  Truck,
  Store,
};

interface JourneyTimelineProps {
  stages: JourneyStage[];
  activeStage?: string;
  onStageClick?: (stage: JourneyStage) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  stages,
  activeStage,
  onStageClick,
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hidden">
      <div className="flex items-center gap-2 min-w-max px-4 py-8">
        {stages.map((stage, index) => {
          const Icon = iconMap[stage.icon] || Package;
          const isActive = activeStage === stage.id;
          const isCompleted = stage.verified;

          return (
            <React.Fragment key={stage.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Node */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStageClick?.(stage)}
                  className={cn(
                    "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-primary to-secondary shadow-glow"
                      : isCompleted
                      ? "bg-primary shadow-soft"
                      : "bg-muted"
                  )}
                >
                  <Icon className={cn(
                    "w-6 h-6",
                    isActive || isCompleted ? "text-white" : "text-muted-foreground"
                  )} />
                  
                  {/* Verification Badge */}
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-soft"
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </motion.button>

                {/* Stage Info */}
                <div className={cn(
                  "mt-3 text-center max-w-[100px]",
                  isActive ? "opacity-100" : "opacity-70"
                )}>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {stage.name}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {new Date(stage.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                  className={cn(
                    "h-1 w-12 rounded-full origin-left",
                    stages[index + 1].verified
                      ? "bg-gradient-to-r from-primary to-secondary"
                      : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
