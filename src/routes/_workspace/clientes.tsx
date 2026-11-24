import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_workspace/clientes")({
  head: () => privateWorkspaceHead("Clientes | Orizon", "Gestão privada de clientes e seus projetos na Orizon."),
  component: ClientsPage,
});

function ClientsPage() {
  return <ModulePage eyebrow="Relacionamento" title="Clientes" description="Centralize contatos, observações e todos os projetos vinculados a cada cliente." icon={Users} emptyTitle="Nenhum cliente cadastrado" emptyDescription="O cadastro completo e o vínculo com vários projetos serão implementados na entrega de clientes e CRM." />;
}
