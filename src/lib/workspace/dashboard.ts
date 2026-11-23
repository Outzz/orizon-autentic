import type {
  ProjectStatus,
  WorkspaceActivity,
  WorkspaceClient,
  WorkspaceProject,
  WorkspaceSnapshot,
} from "./types";

export const projectStatusLabels: Record<ProjectStatus, string> = {
  draft: "Rascunho",
  development: "Em desenvolvimento",
  completed: "Concluído",
  published: "Publicado",
};

export function calculateDashboardMetrics(
  projects: WorkspaceProject[],
  clients: WorkspaceClient[],
) {
  return {
    totalProjects: projects.length,
    developmentProjects: projects.filter((project) => project.status === "development").length,
    completedProjects: projects.filter((project) => project.status === "completed").length,
    publishedProjects: projects.filter((project) => project.status === "published").length,
    totalClients: clients.length,
  };
}

function newestFirst<T extends { updatedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

function newestActivitiesFirst(items: WorkspaceActivity[]) {
  return [...items].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function buildDashboardData(snapshot: WorkspaceSnapshot) {
  return {
    metrics: calculateDashboardMetrics(snapshot.projects, snapshot.clients),
    recentProjects: newestFirst(snapshot.projects).slice(0, 5),
    recentActivities: newestActivitiesFirst(snapshot.activities).slice(0, 8),
  };
}

export type WorkspaceDashboardData = ReturnType<typeof buildDashboardData>;
