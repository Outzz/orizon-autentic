import { Link, useRouterState } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { workspaceNavigation } from "./WorkspaceSidebar";

export function WorkspaceHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const currentItem = workspaceNavigation.find((item) => item.url === pathname);

  return (
    <header className="glass-header sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-border px-4 sm:px-6">
      <SidebarTrigger aria-label="Recolher ou expandir menu" className="h-9 w-9" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{currentItem?.title ?? "Área de trabalho"}</p>
        <p className="hidden text-xs text-muted-foreground sm:block">Plataforma privada Orizon</p>
      </div>
      <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
        <Link to="/site"><ExternalLink />Ver site</Link>
      </Button>
      <ThemeToggle />
    </header>
  );
}
