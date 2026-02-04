import { useState } from 'react';
import { 
  GitCompare, 
  FileDown, 
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from '@/components/products/ProductCard';
import { EquivalencyCard } from '@/components/products/EquivalencyCard';
import { ComparisonTable } from '@/components/comparison/ComparisonTable';
import { 
  mockSchneiderProducts, 
  mockCompetitorProducts, 
  mockEquivalencies 
} from '@/data/mockData';
import { Product } from '@/types';
import { toast } from 'sonner';

export default function Comparisons() {
  const [selectedSchneider, setSelectedSchneider] = useState<Product | null>(
    mockSchneiderProducts[0]
  );
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [showTable, setShowTable] = useState(false);

  // Get equivalencies for selected Schneider product
  const relevantEquivalencies = selectedSchneider
    ? mockEquivalencies.filter(eq => eq.schneiderProductId === selectedSchneider.id)
    : [];

  const getCompetitorProduct = (id: string) => 
    mockCompetitorProducts.find(p => p.id === id);

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length >= 3) {
      toast.error('Maximum 3 competitors can be compared at once');
      return;
    }
    if (!comparisonProducts.find(p => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(comparisonProducts.filter(p => p.id !== productId));
  };

  const exportPDF = () => {
    toast.success('PDF export started. Download will begin shortly.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Comparisons</h1>
          <p className="text-muted-foreground">
            Compare Schneider Electric products with competitor alternatives
          </p>
        </div>
        {comparisonProducts.length > 0 && (
          <Button onClick={exportPDF} className="gap-2">
            <FileDown className="w-4 h-4" />
            Export PDF
          </Button>
        )}
      </div>

      {/* Schneider Product Selector */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Select Schneider Electric Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockSchneiderProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedSchneider(product);
                setComparisonProducts([]);
              }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedSchneider?.id === product.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                {product.category}
              </Badge>
              <p className="font-medium text-foreground">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.family}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Selection */}
      {selectedSchneider && (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-3 rounded-lg bg-primary text-primary-foreground">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedSchneider.name}</p>
              <p className="text-sm text-muted-foreground">Schneider Electric</p>
            </div>
          </div>
          
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          
          <div className="flex items-center gap-2 flex-1">
            {comparisonProducts.length === 0 ? (
              <p className="text-muted-foreground">Select competitors from suggestions below</p>
            ) : (
              comparisonProducts.map((p) => (
                <Badge key={p.id} variant="secondary" className="gap-1">
                  {p.name}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeFromComparison(p.id)}
                  />
                </Badge>
              ))
            )}
          </div>

          {comparisonProducts.length > 0 && (
            <Button onClick={() => setShowTable(!showTable)}>
              {showTable ? 'Hide Table' : 'View Comparison'}
            </Button>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {showTable && selectedSchneider && comparisonProducts.length > 0 && (
        <ComparisonTable 
          products={[selectedSchneider, ...comparisonProducts]} 
        />
      )}

      {/* AI-Suggested Equivalencies */}
      {selectedSchneider && relevantEquivalencies.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            AI-Suggested Equivalencies
            <Badge variant="outline" className="ml-2">
              {relevantEquivalencies.length} matches
            </Badge>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {relevantEquivalencies.map((eq) => {
              const competitorProduct = getCompetitorProduct(eq.competitorProductId);
              if (!competitorProduct) return null;
              
              const isInComparison = comparisonProducts.find(p => p.id === competitorProduct.id);
              
              return (
                <div key={eq.id} className="relative">
                  <EquivalencyCard
                    equivalency={eq}
                    schneiderProduct={selectedSchneider}
                    competitorProduct={competitorProduct}
                    showActions={eq.validationStatus === 'pending'}
                    onApprove={() => toast.success('Equivalency approved')}
                    onReject={() => toast.error('Equivalency rejected')}
                    onFlag={() => toast.warning('Equivalency flagged for review')}
                  />
                  {!isInComparison && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-4 right-4"
                      onClick={() => addToComparison(competitorProduct)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Compare
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedSchneider && relevantEquivalencies.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-border">
          <GitCompare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-foreground">No equivalencies found</p>
          <p className="text-muted-foreground">
            AI is still analyzing competitors for this product
          </p>
        </div>
      )}
    </div>
  );
}
