import { createFileRoute } from "@tanstack/react-router";
import { FolderOpen } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_workspace/arquivos")({
  head: () => privateWorkspaceHead("Arquivos | Orizon", "Biblioteca local de arquivos da plataforma privada Orizon."),
  component: FilesPage,
});

function FilesPage() {
  return <ModulePage eyebrow="Biblioteca local" title="Arquivos" description="Organize imagens e documentos dos seus projetos em pastas locais." icon={FolderOpen} emptyTitle="Nenhum arquivo importado" emptyDescription="A importação, organização em pastas e persistência em IndexedDB serão implementadas na entrega da biblioteca de arquivos." />;
}
