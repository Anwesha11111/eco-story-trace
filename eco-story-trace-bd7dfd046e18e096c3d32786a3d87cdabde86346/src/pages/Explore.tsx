import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QRScanner } from '@/components/scanner/QRScanner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProducts, mockProduct } from '@/data/mockData';
import { 
  Search, 
  Filter, 
  Award,
  Leaf,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Vegetables', 'Fruits', 'Leafy Greens', 'Root Vegetables', 'Berries'];

const Explore = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleScan = (data: string) => {
    console.log('Scanned:', data);
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onScanClick={() => setScannerOpen(true)} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              Explore <span className="gradient-text">Products</span>
            </h1>
            <p className="text-muted-foreground">
              Discover verified organic products from trusted farms
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden mb-8 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/product/${product.id}`}>
                  <Card className="h-full hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold">
                        <Award className="w-4 h-4 text-amber-500" />
                        {product.trustScore}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="text-xs text-primary font-medium">{product.category}</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {product.origin}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.certifications.slice(0, 2).map((cert) => (
                          <span
                            key={cert.id}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                          >
                            {cert.name}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No products found matching your criteria</p>
            </div>
          )}
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

export default Explore;
