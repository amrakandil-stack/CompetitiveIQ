import { 
  Package, 
  GitCompare, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentEquivalencies } from '@/components/dashboard/RecentEquivalencies';
import { CompetitorBreakdown } from '@/components/dashboard/CompetitorBreakdown';
import { mockDashboardStats } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Competitive intelligence overview for Schneider Electric
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Sync Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={mockDashboardStats.totalProducts.toLocaleString()}
          change="+47 this week"
          changeType="positive"
          icon={Package}
        />
        <StatCard
          title="Equivalencies"
          value={mockDashboardStats.totalEquivalencies.toLocaleString()}
          change="+156 new matches"
          changeType="positive"
          icon={GitCompare}
        />
        <StatCard
          title="Pending Validations"
          value={mockDashboardStats.pendingValidations}
          change="12 urgent"
          changeType="negative"
          icon={Clock}
          iconColor="bg-warning/10 text-warning"
        />
        <StatCard
          title="Avg. Confidence"
          value={`${mockDashboardStats.averageConfidence}%`}
          change="+2.3% improvement"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-success/10 text-success"
        />
      </div>

      {/* Alert Banner */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            12 equivalencies require urgent validation
          </p>
          <p className="text-sm text-muted-foreground">
            Low confidence matches detected in MCCB category. Review recommended before tender submissions.
          </p>
        </div>
        <Button size="sm" variant="outline" className="border-warning/30 text-warning hover:bg-warning/10">
          Review Now
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentEquivalencies />
        </div>
        <div>
          <CompetitorBreakdown />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <GitCompare className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">New Comparison</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Start a side-by-side product comparison with AI-powered insights
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Validate Queue</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Review and approve pending equivalency suggestions
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-info/10">
              <Package className="w-5 h-5 text-info" />
            </div>
            <h3 className="font-semibold text-foreground">Browse Products</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Explore the full product catalog with advanced filters
          </p>
        </div>
      </div>
    </div>
  );
}
