import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Minus } from 'lucide-react';

interface ComparisonTableProps {
  products: Product[];
  highlightDifferences?: boolean;
}

export function ComparisonTable({ products, highlightDifferences = true }: ComparisonTableProps) {
  if (products.length === 0) return null;

  // Collect all unique spec keys
  const allSpecs = new Set<string>();
  products.forEach(p => Object.keys(p.specs).forEach(k => allSpecs.add(k)));

  // Collect all unique certifications
  const allCerts = new Set<string>();
  products.forEach(p => p.certifications.forEach(c => allCerts.add(c)));

  const formatSpecKey = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  const compareValues = (values: (string | number | undefined)[]) => {
    const defined = values.filter(v => v !== undefined);
    if (defined.length <= 1) return 'neutral';
    
    // Simple comparison - check if all values are the same
    const first = String(defined[0]);
    const allSame = defined.every(v => String(v) === first);
    return allSame ? 'equal' : 'different';
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold text-foreground min-w-[200px]">
                Specification
              </th>
              {products.map((product) => (
                <th 
                  key={product.id} 
                  className={cn(
                    'text-left p-4 font-semibold min-w-[180px]',
                    product.manufacturer === 'Schneider Electric' 
                      ? 'text-primary bg-primary/5' 
                      : 'text-foreground'
                  )}
                >
                  <div>
                    <p className="text-sm text-muted-foreground font-normal">
                      {product.manufacturer}
                    </p>
                    <p>{product.name}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Basic Info */}
            <tr className="data-table-row">
              <td className="p-4 font-medium text-muted-foreground">Product Family</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-foreground">
                  {product.family}
                </td>
              ))}
            </tr>
            <tr className="data-table-row">
              <td className="p-4 font-medium text-muted-foreground">Category</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-foreground">
                  {product.category}
                </td>
              ))}
            </tr>

            {/* Specs */}
            {Array.from(allSpecs).map((specKey) => {
              const values = products.map(p => p.specs[specKey]);
              const comparison = highlightDifferences ? compareValues(values) : 'neutral';

              return (
                <tr key={specKey} className="data-table-row">
                  <td className="p-4 font-medium text-muted-foreground capitalize">
                    {formatSpecKey(specKey)}
                  </td>
                  {products.map((product, idx) => {
                    const value = product.specs[specKey];
                    return (
                      <td 
                        key={product.id} 
                        className={cn(
                          'p-4',
                          comparison === 'different' && value !== undefined && 'bg-warning/5'
                        )}
                      >
                        {value !== undefined ? (
                          <span className="text-foreground">{String(value)}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Certifications */}
            <tr className="border-t-2 border-border">
              <td className="p-4 font-semibold text-foreground" colSpan={products.length + 1}>
                Certifications
              </td>
            </tr>
            {Array.from(allCerts).map((cert) => (
              <tr key={cert} className="data-table-row">
                <td className="p-4 font-medium text-muted-foreground">{cert}</td>
                {products.map((product) => {
                  const hasCert = product.certifications.includes(cert);
                  return (
                    <td key={product.id} className="p-4">
                      {hasCert ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground/40" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
