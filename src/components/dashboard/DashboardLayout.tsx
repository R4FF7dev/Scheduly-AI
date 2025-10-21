import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="h-full overflow-y-auto">
            <Sidebar />
          </div>
        )}
        
        {/* Mobile Sidebar */}
        {isMobile && (
          <>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar onNavigate={() => setSidebarOpen(false)} />
              </SheetContent>
            </Sheet>
            
            {/* Mobile Header with Menu Button */}
            <div className="fixed top-12 left-0 right-0 z-40 bg-background border-b h-14 flex items-center justify-between px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <span className="absolute left-1/2 -translate-x-1/2 text-lg font-bold">Scheduly AI</span>
              <div className="w-10" /> {/* Spacer for balance */}
            </div>
          </>
        )}
        
        <main className={`flex-1 overflow-y-auto bg-background ${isMobile ? 'pt-14' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};
