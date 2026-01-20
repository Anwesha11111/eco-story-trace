import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Certification } from '@/types/food';
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VerificationCenterProps {
  certifications: Certification[];
  trustScore: number;
}

export const VerificationCenter: React.FC<VerificationCenterProps> = ({
  certifications,
  trustScore,
}) => {
  const isExpiringSoon = (date: string) => {
    const expiry = new Date(date);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  };

  return (
    <div className="space-y-6">
      {/* Trust Score Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold gradient-text">
          Verification Center
        </h2>
        <p className="text-muted-foreground mt-2">
          Blockchain-verified certifications and trust metrics
        </p>
      </div>

      {/* Trust Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card variant="verified" className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Overall Trust Score</p>
                  <p className="text-4xl font-bold text-white font-display">
                    {trustScore}/100
                  </p>
                </div>
              </div>
              <div className="verified-badge text-base px-4 py-2">
                <CheckCircle className="w-5 h-5" />
                Verified
              </div>
            </div>
          </div>
          
          {/* Trust Bar */}
          <div className="p-6">
            <div className="trust-bar">
              <motion.div
                className="trust-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${trustScore}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>0</span>
              <span>Excellent Trust Rating</span>
              <span>100</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`h-full ${cert.verified ? 'border-primary/30' : 'border-destructive/30'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${cert.verified ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                    {cert.verified ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    cert.verified ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {cert.verified ? 'Active' : 'Expired'}
                  </span>
                </div>
                <CardTitle className="text-lg mt-3">{cert.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Issued by {cert.issuer}
                </p>
                <div className={`flex items-center gap-2 text-sm ${
                  isExpiringSoon(cert.validUntil) ? 'text-amber-600' : 'text-muted-foreground'
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>
                    Valid until {new Date(cert.validUntil).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                {isExpiringSoon(cert.validUntil) && cert.verified && (
                  <p className="text-xs text-amber-600 mt-2">
                    ⚠️ Expiring soon
                  </p>
                )}
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Certificate
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
