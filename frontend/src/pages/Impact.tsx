import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ImpactDashboard } from '@/components/dashboard/ImpactDashboard';
import { QRScanner } from '@/components/scanner/QRScanner';
import { mockUserImpact } from '@/data/mockData';

const Impact = () => {
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleScan = (data: string) => {
    console.log('Scanned:', data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onScanClick={() => setScannerOpen(true)} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <ImpactDashboard impact={mockUserImpact} />
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

export default Impact;
