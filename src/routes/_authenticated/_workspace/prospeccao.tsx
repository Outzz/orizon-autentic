import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_authenticated/_workspace/prospeccao")({
  head: () => privateWorkspaceHead("Prospecção | Orizon", "Organização privada de oportunidades comerciais na Orizon."),
  component: ProspectingPage,
});

function ProspectingPage() {
  return <ModulePage eyebrow="Oportunidades" title="Prospecção" description="Organize futuros contatos comerciais com uma estrutura pronta para integrações autorizadas." icon={Search} emptyTitle="Nenhuma fonte de prospecção conectada" emptyDescription="Nenhuma busca externa é simulada. Futuras fontes serão integradas somente quando forem autorizadas." />;
}
