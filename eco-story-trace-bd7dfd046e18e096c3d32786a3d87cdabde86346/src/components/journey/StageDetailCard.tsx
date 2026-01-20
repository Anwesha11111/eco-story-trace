import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JourneyStage } from '@/types/food';
import { 
  MapPin, 
  Clock, 
  Shield, 
  Copy, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface StageDetailCardProps {
  stage: JourneyStage;
}

export const StageDetailCard: React.FC<StageDetailCardProps> = ({ stage }) => {
  const copyHash = () => {
    navigator.clipboard.writeText(stage.blockchainHash);
    toast({
      title: "Hash Copied!",
      description: "Blockchain hash copied to clipboard.",
    });
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card variant="glass" className="overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                {stage.name}
              </h3>
              <p className="text-white/80 text-sm mt-1">
                {stage.description}
              </p>
            </div>
            {stage.verified && (
              <div className="verified-badge">
                <CheckCircle className="w-4 h-4" />
                Verified
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Location</p>
              <p className="text-sm text-muted-foreground">{stage.location}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {stage.coordinates[0].toFixed(4)}, {stage.coordinates[1].toFixed(4)}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Timestamp</p>
              <p className="text-sm text-muted-foreground">
                {new Date(stage.timestamp).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* Blockchain Hash */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Blockchain Hash</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                  {truncateHash(stage.blockchainHash)}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={copyHash}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
