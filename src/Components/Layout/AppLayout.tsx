import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Industry, UserRole } from '@/types';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>('sales_engineer');
  const [currentIndustry, setCurrentIndustry] = useState<Industry>('buildings');

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        currentRole={currentRole}
        currentIndustry={currentIndustry}
        onIndustryChange={setCurrentIndustry}
        onRoleChange={setCurrentRole}
      />
      
      <div className="ml-64">
        <Header currentRole={currentRole} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
