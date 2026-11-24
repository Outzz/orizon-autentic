import { useEffect, useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { loadWorkspacePreferences, saveWorkspacePreferences } from "@/lib/workspace/preferences";

export const Route = createFileRoute("/_authenticated/_workspace")({
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setSidebarOpen(loadWorkspacePreferences().sidebarOpen);
  }, []);

  function handleSidebarChange(open: boolean) {
    setSidebarOpen(open);
    saveWorkspacePreferences({ sidebarOpen: open });
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={handleSidebarChange} className="w-full">
      <WorkspaceSidebar />
      <div className="relative flex min-w-0 w-full flex-1 flex-col bg-background">
        <WorkspaceHeader />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
