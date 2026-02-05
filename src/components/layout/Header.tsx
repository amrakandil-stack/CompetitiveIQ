import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  currentRole: UserRole;
}

const roleLabels: Record<UserRole, string> = {
  sales_engineer: 'Sales Engineer',
  manager: 'Manager',
  executive: 'Executive',
};

const roleBadgeVariants: Record<UserRole, 'default' | 'secondary' | 'outline'> = {
  sales_engineer: 'default',
  manager: 'secondary',
  executive: 'outline',
};

export function Header({ currentRole }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products, competitors, equivalencies..."
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Badge variant={roleBadgeVariants[currentRole]} className="text-xs">
          {roleLabels[currentRole]}
        </Badge>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
