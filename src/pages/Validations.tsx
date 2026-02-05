import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Filter,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EquivalencyCard } from '@/components/products/EquivalencyCard';
import { 
  mockEquivalencies, 
  mockSchneiderProducts, 
  mockCompetitorProducts 
} from '@/data/mockData';
import { Equivalency, ValidationStatus } from '@/types';
import { toast } from 'sonner';

type FilterStatus = 'all' | ValidationStatus;

export default function Validations() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('pending');
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [selectedEquivalency, setSelectedEquivalency] = useState<Equivalency | null>(null);
  const [validationNote, setValidationNote] = useState('');

  const filteredEquivalencies = mockEquivalencies.filter(eq => 
    filterStatus === 'all' || eq.validationStatus === filterStatus
  );

  const getProduct = (id: string) => 
    [...mockSchneiderProducts, ...mockCompetitorProducts].find(p => p.id === id);

  const handleApprove = (eq: Equivalency) => {
    setSelectedEquivalency(eq);
    setNoteDialogOpen(true);
  };

  const handleReject = (eq: Equivalency) => {
    toast.error(`Equivalency ${eq.id} rejected`);
  };

  const handleFlag = (eq: Equivalency) => {
    setSelectedEquivalency(eq);
    setNoteDialogOpen(true);
  };

  const submitValidation = () => {
    if (selectedEquivalency) {
      toast.success('Validation submitted with notes');
      setNoteDialogOpen(false);
      setValidationNote('');
      setSelectedEquivalency(null);
    }
  };

  const statusCounts = {
    all: mockEquivalencies.length,
    pending: mockEquivalencies.filter(e => e.validationStatus === 'pending').length,
    approved: mockEquivalencies.filter(e => e.validationStatus === 'approved').length,
    rejected: mockEquivalencies.filter(e => e.validationStatus === 'rejected').length,
    flagged: mockEquivalencies.filter(e => e.validationStatus === 'flagged').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Engineer Validations</h1>
          <p className="text-muted-foreground">
            Review and validate AI-generated equivalency suggestions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 text-warning border-warning/30">
            <Clock className="w-3 h-3" />
            {statusCounts.pending} pending
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-muted rounded-lg w-fit">
        {(['all', 'pending', 'approved', 'rejected', 'flagged'] as FilterStatus[]).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilterStatus(status)}
            className="capitalize"
          >
            {status}
            <Badge variant="secondary" className="ml-2 bg-background/50">
              {statusCounts[status]}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Info Banner for Engineers */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-info/10 border border-info/20">
        <MessageSquare className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Engineer Validation Guidelines</p>
          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
            <li>• <strong>Approve</strong> equivalencies that are technically accurate and safe to recommend</li>
            <li>• <strong>Reject</strong> incorrect matches that could mislead customers</li>
            <li>• <strong>Flag</strong> potentially dangerous or misleading comparisons for review</li>
            <li>• Add notes to provide context for future reference</li>
          </ul>
        </div>
      </div>

      {/* Equivalencies List */}
      <div className="space-y-4">
        {filteredEquivalencies.map((eq) => {
          const schneiderProduct = getProduct(eq.schneiderProductId);
          const competitorProduct = getProduct(eq.competitorProductId);
          
          if (!schneiderProduct || !competitorProduct) return null;

          return (
            <EquivalencyCard
              key={eq.id}
              equivalency={eq}
              schneiderProduct={schneiderProduct}
              competitorProduct={competitorProduct}
              showActions={eq.validationStatus === 'pending'}
              onApprove={() => handleApprove(eq)}
              onReject={() => handleReject(eq)}
              onFlag={() => handleFlag(eq)}
            />
          );
        })}
      </div>

      {filteredEquivalencies.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-border">
          <CheckCircle2 className="w-12 h-12 mx-auto text-success mb-4" />
          <p className="text-lg font-medium text-foreground">All caught up!</p>
          <p className="text-muted-foreground">
            No {filterStatus === 'all' ? '' : filterStatus} validations to review
          </p>
        </div>
      )}

      {/* Validation Note Dialog */}
      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Validation Note</DialogTitle>
            <DialogDescription>
              Provide additional context or observations about this equivalency.
              This note will be visible to other engineers and managers.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Enter your validation notes here..."
            value={validationNote}
            onChange={(e) => setValidationNote(e.target.value)}
            rows={4}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitValidation}>
              Submit Validation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
