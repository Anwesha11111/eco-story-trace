import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JourneyTimeline } from '@/components/journey/JourneyTimeline';
import { StageDetailCard } from '@/components/journey/StageDetailCard';
import { TraceabilityMap } from '@/components/map/TraceabilityMap';
import { SustainabilityDashboard } from '@/components/dashboard/SustainabilityDashboard';
import { VerificationCenter } from '@/components/verification/VerificationCenter';
import { StoryMode } from '@/components/story/StoryMode';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QRScanner } from '@/components/scanner/QRScanner';
import { mockProduct, mockUserImpact } from '@/data/mockData';
import { JourneyStage } from '@/types/food';
import heroFarm from '@/assets/hero-farm.jpg';
import { 
  ArrowRight, 
  QrCode, 
  Shield, 
  Leaf, 
  Users,
  Map,
  BarChart3,
  Award,
  Play
} from 'lucide-react';

const Index = () => {
  const [activeStage, setActiveStage] = useState<JourneyStage | null>(mockProduct.journey[0]);
  const [storyModeOpen, setStoryModeOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleStageClick = (stage: JourneyStage) => {
    setActiveStage(stage);
  };

  const handleScan = (data: string) => {
    console.log('Scanned:', data);
  };

  const features = [
    {
      icon: QrCode,
      title: 'Instant Scanning',
      description: 'Scan any product QR code to reveal its complete journey from farm to table.',
    },
    {
      icon: Shield,
      title: 'Blockchain Verified',
      description: 'Every step is immutably recorded on the blockchain for complete transparency.',
    },
    {
      icon: Leaf,
      title: 'Sustainability Metrics',
      description: 'Track carbon footprint, water usage, and environmental impact in real-time.',
    },
    {
      icon: Users,
      title: 'Meet Your Farmers',
      description: 'Connect with the people who grow your food through immersive stories.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onScanClick={() => setScannerOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroFarm}
            alt="Organic farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Blockchain-Powered Food Traceability
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6">
              Know Your Food,
              <span className="gradient-text block mt-2">Trust Your Source</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the complete journey of your organic food—from seed to table. 
              Verify certifications, track sustainability, and connect with farmers who care.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" onClick={() => setScannerOpen(true)}>
                <QrCode className="w-5 h-5 mr-2" />
                Scan Product
              </Button>
              <Button variant="outline" size="xl">
                Explore Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto"
            >
              {[
                { value: '10K+', label: 'Products Traced' },
                { value: '500+', label: 'Verified Farms' },
                { value: '98%', label: 'Trust Score' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 eco-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Complete <span className="gradient-text">Transparency</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every product tells a story. Our platform reveals the complete journey 
              with verified data you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-elevated transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Journey Demo */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Track the <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow {mockProduct.name} from Green Valley Farm to your local store
            </p>
          </div>

          {/* Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-8"
          >
            <Card variant="verified" className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-64 h-48 md:h-auto">
                  <img
                    src={mockProduct.imageUrl}
                    alt={mockProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setStoryModeOpen(true)}
                    className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-sm font-medium hover:bg-white transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Watch Story
                  </button>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{mockProduct.category}</p>
                      <h3 className="text-2xl font-display font-bold">{mockProduct.name}</h3>
                      <p className="text-muted-foreground">{mockProduct.origin}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="text-2xl font-bold">{mockProduct.trustScore}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockProduct.certifications.slice(0, 3).map((cert) => (
                      <span
                        key={cert.id}
                        className="verified-badge"
                      >
                        {cert.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Journey Timeline */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <JourneyTimeline
                stages={mockProduct.journey}
                activeStage={activeStage?.id}
                onStageClick={handleStageClick}
              />
            </CardContent>
          </Card>

          {/* Stage Detail and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeStage && <StageDetailCard stage={activeStage} />}
            <Card className="overflow-hidden">
              <TraceabilityMap stages={mockProduct.journey} className="h-full min-h-[400px]" />
            </Card>
          </div>
        </div>
      </section>

      {/* Sustainability Dashboard */}
      <section className="py-20 eco-gradient">
        <div className="container mx-auto px-4">
          <SustainabilityDashboard metrics={mockProduct.sustainability} />
        </div>
      </section>

      {/* Verification Center */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <VerificationCenter
            certifications={mockProduct.certifications}
            trustScore={mockProduct.trustScore}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Ready to Know Your Food?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of conscious consumers making informed choices about their food.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="glass"
                size="xl"
                onClick={() => setScannerOpen(true)}
                className="bg-white text-primary hover:bg-white/90"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Start Scanning
              </Button>
              <Link to="/impact">
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View My Impact
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Story Mode */}
      <StoryMode
        farmer={mockProduct.farmer}
        isOpen={storyModeOpen}
        onClose={() => setStoryModeOpen(false)}
      />

      {/* QR Scanner */}
      <QRScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={handleScan}
      />
    </div>
  );
};

export default Index;
