import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Dashboard } from "@/components/workspace/Dashboard";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";
import { workspaceDashboardQueryOptions } from "@/lib/workspace/queries";

export const Route = createFileRoute("/_authenticated/_workspace/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(workspaceDashboardQueryOptions),
  head: () => privateWorkspaceHead(
    "Dashboard | Orizon",
    "Painel privado para organizar projetos, clientes e atividades da Orizon.",
  ),
  component: DashboardRoute,
});

function DashboardRoute() {
  const { data } = useSuspenseQuery(workspaceDashboardQueryOptions);
  return <Dashboard data={data} />;
}
