import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_workspace/propostas")({
  head: () => privateWorkspaceHead("Propostas | Orizon", "Preparação privada de propostas comerciais na Orizon."),
  component: ProposalsPage,
});

function ProposalsPage() {
  return <ModulePage eyebrow="Documentos comerciais" title="Propostas" description="Prepare documentos vinculados aos seus clientes e projetos." icon={FileText} emptyTitle="Nenhuma proposta criada" emptyDescription="A edição de propostas e a exportação em PDF serão adicionadas na etapa de documentos." />;
}
