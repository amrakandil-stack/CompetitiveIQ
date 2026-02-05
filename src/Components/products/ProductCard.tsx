import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitCompare, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onCompare?: () => void;
  isSelected?: boolean;
  variant?: 'default' | 'compact';
}

const manufacturerColors: Record<string, string> = {
  'Schneider Electric': 'bg-primary/10 text-primary border-primary/20',
  'ABB': 'bg-red-500/10 text-red-600 border-red-500/20',
  'Siemens': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Eaton': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Rockwell': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Mitsubishi': 'bg-pink-500/10 text-pink-600 border-pink-500/20',
};

export function ProductCard({ product, onCompare, isSelected, variant = 'default' }: ProductCardProps) {
  const manufacturerClass = manufacturerColors[product.manufacturer] || 'bg-muted text-muted-foreground';

  if (variant === 'compact') {
    return (
      <div className={cn(
        'p-4 rounded-lg border transition-all cursor-pointer',
        isSelected 
          ? 'border-primary bg-primary/5' 
          : 'border-border bg-card hover:border-primary/50'
      )}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.manufacturer}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-card border rounded-xl p-5 transition-all hover:shadow-lg',
      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge variant="outline" className={cn('mb-2', manufacturerClass)}>
            {product.manufacturer}
          </Badge>
          <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.family}</p>
        </div>
        <Badge variant="secondary">{product.category}</Badge>
      </div>

      {/* Specs Preview */}
      <div className="space-y-2 mb-4">
        {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-muted-foreground capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="font-medium text-foreground">{String(value)}</span>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="flex flex-wrap gap-1 mb-4">
        {product.certifications.slice(0, 3).map((cert) => (
          <Badge key={cert} variant="outline" className="text-xs">
            {cert}
          </Badge>
        ))}
        {product.certifications.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{product.certifications.length - 3}
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {onCompare && (
          <Button
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={onCompare}
          >
            <GitCompare className="w-4 h-4 mr-2" />
            {isSelected ? 'Selected' : 'Compare'}
          </Button>
        )}
        <Button variant="ghost" size="sm" asChild>
          <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
