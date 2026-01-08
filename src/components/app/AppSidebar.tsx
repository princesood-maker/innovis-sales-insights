import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  Kanban,
  TrendingUp,
  HardHat,
  LogOut,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import innovisLogo from '@/assets/innovis-logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navItems = [
  { title: 'Dashboard', url: '/app/dashboard', icon: LayoutDashboard },
  { title: 'Opportunities', url: '/app/opportunities', icon: Target },
  { title: 'Pipeline', url: '/app/pipeline', icon: Kanban },
  { title: 'Forecast', url: '/app/forecast', icon: TrendingUp },
  { title: 'Delivery', url: '/app/delivery', icon: HardHat },
];

export const AppSidebar = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="p-4 border-b border-border">
        <img src={innovisLogo} alt="Innovis" className="h-8" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
