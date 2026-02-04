import { mockEquivalencies, mockSchneiderProducts, mockCompetitorProducts } from '@/data/mockData';
import { ConfidenceBadge } from './ConfidenceBadge';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig = {
  approved: { icon: CheckCircle2, label: 'Approved', className: 'text-success' },
  pending: { icon: Clock, label: 'Pending', className: 'text-warning' },
  rejected: { icon: AlertTriangle, label: 'Rejected', className: 'text-destructive' },
  flagged: { icon: AlertTriangle, label: 'Flagged', className: 'text-destructive' },
};

export function RecentEquivalencies() {
  const getProduct = (id: string) => {
    return [...mockSchneiderProducts, ...mockCompetitorProducts].find(p => p.id === id);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Equivalencies</h3>
      
      <div className="space-y-4">
        {mockEquivalencies.slice(0, 5).map((eq) => {
          const schneiderProduct = getProduct(eq.schneiderProductId);
          const competitorProduct = getProduct(eq.competitorProductId);
          const status = statusConfig[eq.validationStatus];
          const StatusIcon = status.icon;

          return (
            <div
              key={eq.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground truncate">
                    {schneiderProduct?.name}
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-muted-foreground truncate">
                    {competitorProduct?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="text-xs">
                    {eq.equivalencyType.replace('_', ' ')}
                  </Badge>
                  <span className="text-muted-foreground">
                    {competitorProduct?.manufacturer}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ConfidenceBadge score={eq.confidenceScore} size="sm" />
                <div className={cn('flex items-center gap-1', status.className)}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-xs font-medium">{status.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
