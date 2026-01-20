import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  X, 
  FlashlightOff, 
  Flashlight,
  QrCode
} from 'lucide-react';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setScanning(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setScanning(false);
  };

  const simulateScan = () => {
    // Simulate scanning a product
    onScan('PRODUCT-001-ORGANIC-TOMATOES');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>
          <h2 className="text-white font-semibold">Scan Product</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFlashEnabled(!flashEnabled)}
            className="text-white hover:bg-white/20"
          >
            {flashEnabled ? (
              <Flashlight className="w-6 h-6" />
            ) : (
              <FlashlightOff className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Camera View */}
        <div className="relative w-full h-full">
          {hasPermission === false ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <Camera className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-center text-lg mb-4">Camera access required</p>
              <p className="text-center text-sm text-white/60 mb-6">
                Please enable camera permissions to scan QR codes
              </p>
              <Button variant="hero" onClick={startCamera}>
                Enable Camera
              </Button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* AR Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Scanning Frame */}
                <div className="relative w-64 h-64">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-primary rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-primary rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-primary rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-primary rounded-br-xl" />

                  {/* Scanning Line */}
                  {scanning && (
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }}
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-24 left-0 right-0 text-center">
                <Card variant="glass" className="mx-6 py-4 px-6">
                  <div className="flex items-center justify-center gap-3">
                    <QrCode className="w-5 h-5 text-primary" />
                    <p className="text-sm">
                      Align QR code within the frame to scan
                    </p>
                  </div>
                </Card>
              </div>

              {/* Demo Scan Button */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <Button variant="hero" size="lg" onClick={simulateScan}>
                  <QrCode className="w-5 h-5 mr-2" />
                  Demo Scan
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
