import { Equivalency, Product } from '@/types';
import { ConfidenceBadge } from '@/components/dashboard/ConfidenceBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MessageSquare,
  ExternalLink,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EquivalencyCardProps {
  equivalency: Equivalency;
  schneiderProduct: Product;
  competitorProduct: Product;
  onApprove?: () => void;
  onReject?: () => void;
  onFlag?: () => void;
  showActions?: boolean;
}

const equivalencyTypeLabels = {
  direct: 'Direct Equivalent',
  close_alternative: 'Close Alternative',
  use_case_alternative: 'Use-Case Alternative',
};

const equivalencyTypeColors = {
  direct: 'bg-success/10 text-success border-success/20',
  close_alternative: 'bg-info/10 text-info border-info/20',
  use_case_alternative: 'bg-warning/10 text-warning border-warning/20',
};

export function EquivalencyCard({
  equivalency,
  schneiderProduct,
  competitorProduct,
  onApprove,
  onReject,
  onFlag,
  showActions = true,
}: EquivalencyCardProps) {
  const isApproved = equivalency.validationStatus === 'approved';
  const isPending = equivalency.validationStatus === 'pending';
  const isFlagged = equivalency.validationStatus === 'flagged';

  return (
    <div className={cn(
      'bg-card border rounded-xl overflow-hidden transition-all hover:shadow-lg',
      isApproved && 'border-success/30',
      isPending && 'border-warning/30',
      isFlagged && 'border-destructive/30'
    )}>
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={cn(equivalencyTypeColors[equivalency.equivalencyType])}
            >
              {equivalencyTypeLabels[equivalency.equivalencyType]}
            </Badge>
            <ConfidenceBadge score={equivalency.confidenceScore} />
          </div>
          {equivalency.validationStatus === 'approved' && (
            <div className="flex items-center gap-1 text-success text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Validated</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Schneider Product */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary font-medium mb-1">Schneider Electric</p>
            <p className="font-semibold text-foreground">{schneiderProduct.name}</p>
            <p className="text-sm text-muted-foreground">{schneiderProduct.family}</p>
          </div>

          {/* Competitor Product */}
          <div className="p-3 rounded-lg bg-muted border border-border">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              {competitorProduct.manufacturer}
            </p>
            <p className="font-semibold text-foreground">{competitorProduct.name}</p>
            <p className="text-sm text-muted-foreground">{competitorProduct.family}</p>
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="p-5 border-b border-border bg-muted/30">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">AI Reasoning</p>
            <p className="text-sm text-muted-foreground">{equivalency.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Validation Notes */}
      {equivalency.validationNotes && (
        <div className="p-5 border-b border-border">
          <div className="flex items-start gap-2">
            <MessageSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Engineer Notes
                {equivalency.validatedBy && (
                  <span className="text-muted-foreground font-normal">
                    {' '}by {equivalency.validatedBy}
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{equivalency.validationNotes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {showActions && isPending && (
        <div className="p-4 flex items-center justify-between bg-muted/20">
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-success border-success/30 hover:bg-success/10"
                  onClick={onApprove}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </TooltipTrigger>
              <TooltipContent>Confirm this equivalency is accurate</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={onReject}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </TooltipTrigger>
              <TooltipContent>This equivalency is incorrect</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-warning border-warning/30 hover:bg-warning/10"
                  onClick={onFlag}
                >
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Flag
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as potentially misleading</TooltipContent>
            </Tooltip>
          </div>

          <div className="text-xs text-muted-foreground">
            Updated {equivalency.updatedAt}
          </div>
        </div>
      )}
    </div>
  );
}
