import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  Columns3,
  FileSignature,
  FileText,
  FolderKanban,
  FolderOpen,
  History,
  LayoutDashboard,
  LayoutTemplate,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/orizon/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

export const workspaceNavigation = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Criar projeto", url: "/projetos/novo", icon: Plus },
  { title: "Meus projetos", url: "/projetos", icon: FolderKanban },
  { title: "Templates", url: "/templates", icon: LayoutTemplate },
  { title: "Assistente IA", url: "/assistente", icon: Bot },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Prospecção", url: "/prospeccao", icon: Search },
  { title: "CRM", url: "/crm", icon: Columns3 },
  { title: "Propostas", url: "/propostas", icon: FileText },
  { title: "Contratos", url: "/contratos", icon: FileSignature },
  { title: "Arquivos", url: "/arquivos", icon: FolderOpen },
  { title: "Histórico", url: "/historico", icon: History },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
] as const;

export function WorkspaceSidebar() {
  const currentPath = useRouterState({ select: (state) => state.location.pathname });
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="h-16 justify-center border-b border-sidebar-border px-4 group-data-[collapsible=icon]:px-2">
        <Link to="/" aria-label="Orizon — Dashboard" onClick={() => setOpenMobile(false)}>
          <span className="group-data-[collapsible=icon]:hidden"><Logo /></span>
          <span className="hidden group-data-[collapsible=icon]:block"><LogoMark className="h-7 w-7" /></span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Área de trabalho</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceNavigation.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === item.url}
                    tooltip={item.title}
                    className="h-9"
                  >
                    <Link to={item.url} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
