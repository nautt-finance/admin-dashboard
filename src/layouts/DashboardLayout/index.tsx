import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export { DashboardLayout };
