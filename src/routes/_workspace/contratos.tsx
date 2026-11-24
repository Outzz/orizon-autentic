import { createFileRoute } from "@tanstack/react-router";
import { FileSignature } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_workspace/contratos")({
  head: () => privateWorkspaceHead("Contratos | Orizon", "Organização privada de contratos vinculados a clientes Orizon."),
  component: ContractsPage,
});

function ContractsPage() {
  return <ModulePage eyebrow="Documentos jurídicos" title="Contratos" description="Organize contratos e informações vinculadas a cada cliente." icon={FileSignature} emptyTitle="Nenhum contrato criado" emptyDescription="A criação, edição e exportação de contratos será entregue junto ao módulo de propostas." />;
}
