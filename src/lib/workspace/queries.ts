import { queryOptions } from "@tanstack/react-query";
import { workspaceService } from "./service";

export const workspaceDashboardQueryOptions = queryOptions({
  queryKey: ["workspace", "dashboard"],
  queryFn: () => workspaceService.getDashboard(),
  staleTime: 5_000,
});
