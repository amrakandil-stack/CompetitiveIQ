import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const recentReports = [
  {
    id: 1,
    title: 'MCCB Competitive Analysis - Q1 2025',
    type: 'comparison',
    date: '2025-02-01',
    products: 12,
    status: 'ready',
  },
  {
    id: 2,
    title: 'VFD Market Position Report',
    type: 'market',
    date: '2025-01-28',
    products: 8,
    status: 'ready',
  },
  {
    id: 3,
    title: 'Oil & Gas Industry Analysis',
    type: 'industry',
    date: '2025-01-25',
    products: 24,
    status: 'processing',
  },
  {
    id: 4,
    title: 'ABB vs Schneider - PLC Comparison',
    type: 'comparison',
    date: '2025-01-20',
    products: 6,
    status: 'ready',
  },
];

const reportTypeColors = {
  comparison: 'bg-primary/10 text-primary border-primary/20',
  market: 'bg-info/10 text-info border-info/20',
  industry: 'bg-warning/10 text-warning border-warning/20',
};

export default function Reports() {
  const handleDownload = (reportId: number) => {
    toast.success('Report download started');
  };

  const handleGenerate = () => {
    toast.info('Report generation wizard opening...');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Exports</h1>
          <p className="text-muted-foreground">
            Generate and download tender-ready comparison documents
          </p>
        </div>
        <Button onClick={handleGenerate} className="gap-2">
          <FileText className="w-4 h-4" />
          Generate New Report
        </Button>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Product Comparison PDF</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Side-by-side comparison with specs, confidence scores, and validation notes
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Create Report
          </Button>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-3 rounded-lg bg-info/10 w-fit mb-4">
            <FileText className="w-6 h-6 text-info" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Market Analysis</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Competitive landscape overview with price positioning and market share
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Create Report
          </Button>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-3 rounded-lg bg-warning/10 w-fit mb-4">
            <FileText className="w-6 h-6 text-warning" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Industry Brief</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Industry-specific competitive intelligence with regional insights
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Create Report
          </Button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Reports</h2>
          <Button variant="ghost" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="divide-y divide-border">
          {recentReports.map((report) => (
            <div 
              key={report.id}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{report.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className={reportTypeColors[report.type as keyof typeof reportTypeColors]}
                    >
                      {report.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {report.products} products
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {report.status === 'processing' ? (
                  <Badge variant="secondary" className="animate-pulse">
                    Processing...
                  </Badge>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(report.id)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Settings Notice */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> All exported PDFs include internal disclaimers, confidence levels, 
          and source references. Reports with equivalencies below 60% confidence are blocked from export.
        </p>
      </div>
    </div>
  );
}
