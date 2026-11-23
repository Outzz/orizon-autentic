import { useEffect, useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
      <SidebarInset className="min-w-0">
        <WorkspaceHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
