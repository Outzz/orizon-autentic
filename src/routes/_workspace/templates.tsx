import { createFileRoute } from "@tanstack/react-router";
import { LayoutTemplate } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_workspace/templates")({
  head: () => privateWorkspaceHead("Templates | Orizon", "Biblioteca privada de modelos para novos projetos Orizon."),
  component: TemplatesPage,
});

function TemplatesPage() {
  return <ModulePage eyebrow="Biblioteca inicial" title="Templates" description="Modelos por categoria para acelerar a criação sem limitar a personalização." icon={LayoutTemplate} emptyTitle="A biblioteca está preparada para receber modelos" emptyDescription="Os templates visualizáveis, duplicáveis e personalizáveis serão adicionados em uma próxima entrega." />;
}
