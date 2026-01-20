import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Farmer } from '@/types/food';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  MapPin,
  Award,
  Package,
  Clock
} from 'lucide-react';

interface StoryModeProps {
  farmer: Farmer;
  isOpen: boolean;
  onClose: () => void;
}

const storySlides = [
  {
    title: "Meet the Farmer",
    content: "farm",
  },
  {
    title: "Our Story",
    content: "story",
  },
  {
    title: "Certifications",
    content: "certifications",
  },
];

export const StoryMode: React.FC<StoryModeProps> = ({ farmer, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % storySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + storySlides.length) % storySlides.length);
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute top-4 left-4 right-16 flex gap-1 z-50">
          {storySlides.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 rounded-full overflow-hidden bg-white/30"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{
                  width: index < currentSlide ? '100%' : index === currentSlide ? '100%' : '0%',
                }}
                transition={{
                  duration: index === currentSlide ? 5 : 0.3,
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Zones */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/3 z-40 cursor-pointer"
          onClick={prevSlide}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 z-40 cursor-pointer"
          onClick={nextSlide}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            {/* Background Image */}
            <img
              src={farmer.imageUrl}
              alt={farmer.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 text-white">
              {storySlides[currentSlide].content === 'farm' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(farmer.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/80">{farmer.rating}</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold">{farmer.name}</h2>
                  <p className="text-xl text-white/80">{farmer.farmName}</p>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4" />
                    <span>{farmer.location}</span>
                  </div>
                </motion.div>
              )}

              {storySlides[currentSlide].content === 'story' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-display font-bold">Our Story</h2>
                  <p className="text-white/90 leading-relaxed">{farmer.bio}</p>
                  <div className="flex gap-6 pt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-white/60">Experience</p>
                        <p className="font-semibold">{farmer.yearsExperience} Years</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm text-white/60">Products</p>
                        <p className="font-semibold">{farmer.productsCount}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {storySlides[currentSlide].content === 'certifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-display font-bold">Certifications</h2>
                  <div className="flex flex-wrap gap-2">
                    {farmer.certifications.map((cert, index) => (
                      <motion.div
                        key={cert}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                      >
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-medium">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
