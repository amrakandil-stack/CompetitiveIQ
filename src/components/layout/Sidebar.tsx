import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Search, 
  GitCompare, 
  CheckCircle2, 
  FileText, 
  Settings,
  Building2,
  Factory,
  Droplets,
  Zap,
  ChevronDown,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Industry, UserRole } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SidebarProps {
  currentRole: UserRole;
  currentIndustry: Industry;
  onIndustryChange: (industry: Industry) => void;
  onRoleChange: (role: UserRole) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Search, label: 'Product Search', path: '/search' },
  { icon: GitCompare, label: 'Comparisons', path: '/compare' },
  { icon: CheckCircle2, label: 'Validations', path: '/validations' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
];

const industryIcons = {
  buildings: Building2,
  industry: Factory,
  oil_gas: Droplets,
  utilities: Zap,
};

const industryLabels: Record<Industry, string> = {
  buildings: 'Buildings',
  industry: 'Industry',
  oil_gas: 'Oil & Gas',
  utilities: 'Utilities',
};

const roleLabels: Record<UserRole, string> = {
  sales_engineer: 'Sales Engineer',
  manager: 'Manager',
  executive: 'Executive',
};

export function Sidebar({ currentRole, currentIndustry, onIndustryChange, onRoleChange }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">CompetitiveIQ</h1>
            <p className="text-xs text-sidebar-foreground/60">Schneider Electric</p>
          </div>
        </div>
      </div>

      {/* Industry Selector */}
      <div className="p-4 border-b border-sidebar-border">
        <label className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2 block">
          Industry Focus
        </label>
        <Select value={currentIndustry} onValueChange={(v) => onIndustryChange(v as Industry)}>
          <SelectTrigger className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(industryLabels).map(([key, label]) => {
              const Icon = industryIcons[key as Industry];
              return (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'sidebar-link',
                isActive && 'sidebar-link-active'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Role Selector (for demo) */}
      <div className="p-4 border-t border-sidebar-border">
        <label className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2 block">
          View As (Demo)
        </label>
        <Select value={currentRole} onValueChange={(v) => onRoleChange(v as UserRole)}>
          <SelectTrigger className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(roleLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-sidebar-border">
        <Link to="/settings" className="sidebar-link">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
