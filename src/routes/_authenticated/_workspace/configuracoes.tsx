import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_authenticated/_workspace/configuracoes")({
  head: () => privateWorkspaceHead("Configurações | Orizon", "Preferências e backups da plataforma privada Orizon."),
  component: SettingsPage,
});

function SettingsPage() {
  return <ModulePage eyebrow="Preferências" title="Configurações" description="Gerencie as preferências e a segurança dos seus dados locais." icon={Settings} emptyTitle="Configurações avançadas em uma próxima etapa" emptyDescription="A importação e a exportação de backups serão reunidas aqui. A preferência da sidebar já fica salva neste navegador." />;
}
