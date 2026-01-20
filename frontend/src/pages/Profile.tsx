import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QRScanner } from '@/components/scanner/QRScanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUserImpact, mockFarmer } from '@/data/mockData';
import { 
  User,
  Settings,
  Bell,
  Shield,
  Award,
  Leaf,
  LogOut,
  ChevronRight,
  Camera
} from 'lucide-react';

const Profile = () => {
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleScan = (data: string) => {
    console.log('Scanned:', data);
  };

  const menuItems = [
    { icon: User, label: 'Personal Information', description: 'Update your profile details' },
    { icon: Bell, label: 'Notifications', description: 'Manage your alerts and updates' },
    { icon: Shield, label: 'Privacy & Security', description: 'Control your data and access' },
    { icon: Award, label: 'Achievements', description: 'View your eco badges and rewards' },
    { icon: Settings, label: 'App Settings', description: 'Customize your experience' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onScanClick={() => setScannerOpen(true)} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="verified" className="overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-primary to-secondary p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 p-2 rounded-full bg-white shadow-soft">
                      <Camera className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl font-display font-bold">Eco Enthusiast</h2>
                    <p className="text-white/80">eco.user@foodfound.com</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold gradient-text">{mockUserImpact.totalProducts}</p>
                    <p className="text-xs text-muted-foreground">Products Traced</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold gradient-text">{mockUserImpact.trustPoints}</p>
                    <p className="text-xs text-muted-foreground">Trust Points</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold gradient-text">{mockUserImpact.farmersSupported}</p>
                    <p className="text-xs text-muted-foreground">Farmers Supported</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Eco Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-8">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Current Badge</p>
                    <p className="text-xl font-display font-bold">Eco Champion</p>
                    <p className="text-sm text-muted-foreground">
                      {78.4} kg carbon saved
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Menu Items */}
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              ))}
            </CardContent>
          </Card>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="ghost" className="w-full mt-6 text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />

      <QRScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={handleScan}
      />
    </div>
  );
};

export default Profile;
