import React from 'react';
import { motion } from 'framer-motion';
import { JourneyStage } from '@/types/food';
import { MapPin, Navigation } from 'lucide-react';

interface TraceabilityMapProps {
  stages: JourneyStage[];
  className?: string;
}

export const TraceabilityMap: React.FC<TraceabilityMapProps> = ({ stages, className }) => {
  // Generate static map URL using OpenStreetMap tiles via an iframe
  const center = React.useMemo(() => {
    if (stages.length === 0) return { lat: 37.0, lng: -122.0 };
    const lats = stages.map(s => s.coordinates[0]);
    const lngs = stages.map(s => s.coordinates[1]);
    return {
      lat: (Math.max(...lats) + Math.min(...lats)) / 2,
      lng: (Math.max(...lngs) + Math.min(...lngs)) / 2,
    };
  }, [stages]);

  // Create markers for OpenStreetMap embed
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 2}%2C${center.lat - 1}%2C${center.lng + 2}%2C${center.lat + 1}&layer=mapnik&marker=${center.lat}%2C${center.lng}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 ${className}`} style={{ minHeight: '400px' }}>
      {/* Map Background */}
      <iframe
        src={osmEmbedUrl}
        className="absolute inset-0 w-full h-full border-0"
        style={{ filter: 'saturate(0.8) contrast(1.1)' }}
        title="Product Journey Map"
        loading="lazy"
      />
      
      {/* Overlay with Route Visualization */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        
        {/* Route Info Card */}
        <div className="absolute bottom-4 left-4 right-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 pointer-events-auto"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Journey Route</p>
                <p className="text-xs text-muted-foreground">
                  {stages.length} checkpoints tracked
                </p>
              </div>
            </div>
            
            {/* Mini route visualization */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hidden py-2">
              {stages.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center min-w-[60px]"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      stage.verified 
                        ? 'bg-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <MapPin className="w-3 h-3" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 text-center truncate max-w-[60px]">
                      {stage.name}
                    </p>
                  </motion.div>
                  {index < stages.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.05 }}
                      className="h-0.5 w-4 bg-gradient-to-r from-primary to-secondary origin-left flex-shrink-0"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
