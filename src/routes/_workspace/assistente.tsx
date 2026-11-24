import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_workspace/assistente")({
  head: () => privateWorkspaceHead("Assistente IA | Orizon", "Área preparada para uma futura integração de inteligência artificial local."),
  component: AssistantPage,
});

function AssistantPage() {
  return <ModulePage eyebrow="Inteligência artificial" title="Assistente IA" description="Um espaço preparado para receber modelos locais por Ollama ou LM Studio no futuro." icon={Bot} emptyTitle="Nenhuma inteligência artificial conectada" emptyDescription="Esta área não gera respostas simuladas. A conversa e as ações de desenvolvimento serão ativadas somente após uma integração real." />;
}
