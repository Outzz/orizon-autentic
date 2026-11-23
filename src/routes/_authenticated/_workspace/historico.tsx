import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_authenticated/_workspace/historico")({
  head: () => privateWorkspaceHead("Histórico | Orizon", "Histórico local de alterações da plataforma privada Orizon."),
  component: HistoryPage,
});

function HistoryPage() {
  return <ModulePage eyebrow="Rastreabilidade" title="Histórico" description="Consulte as atividades registradas durante a evolução dos seus projetos." icon={History} emptyTitle="Nenhuma atividade registrada" emptyDescription="O histórico detalhado será preenchido pelas operações reais realizadas nos projetos e arquivos." />;
}
