import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_authenticated/_workspace/projetos/")({
  head: () => privateWorkspaceHead("Meus projetos | Orizon", "Projetos criados e organizados na plataforma privada Orizon."),
  component: ProjectsPage,
});

function ProjectsPage() {
  return <ModulePage eyebrow="Gestão de projetos" title="Meus projetos" description="Acompanhe seus sites, sistemas e aplicativos em um único lugar." icon={FolderKanban} emptyTitle="Nenhum projeto criado" emptyDescription="A listagem será preenchida pelos projetos gravados no armazenamento local quando o criador de projetos for implementado." />;
}
