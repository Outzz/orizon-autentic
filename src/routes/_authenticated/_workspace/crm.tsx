import { createFileRoute } from "@tanstack/react-router";
import { Columns3 } from "lucide-react";
import { ModulePage } from "@/components/workspace/ModulePage";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_authenticated/_workspace/crm")({
  head: () => privateWorkspaceHead("CRM | Orizon", "Funil comercial privado para acompanhar oportunidades na Orizon."),
  component: CrmPage,
});

function CrmPage() {
  return <ModulePage eyebrow="Funil comercial" title="CRM" description="Acompanhe cada oportunidade do primeiro contato ao fechamento." icon={Columns3} emptyTitle="Seu funil ainda não tem oportunidades" emptyDescription="O Kanban com novo contato, negociação, proposta, fechamento e perda será implementado junto ao módulo comercial." />;
}
