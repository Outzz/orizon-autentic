import { describe, expect, it } from "vitest";
import { buildDashboardData, calculateDashboardMetrics } from "@/lib/workspace/dashboard";
import type { WorkspaceProject, WorkspaceSnapshot } from "@/lib/workspace/types";

function project(id: string, status: WorkspaceProject["status"], updatedAt: string): WorkspaceProject {
  return {
    id,
    name: `Projeto ${id}`,
    description: "Descrição",
    type: "Site institucional",
    status,
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt,
  };
}

describe("workspace dashboard metrics", () => {
  it("counts every project and each requested status from the stored records", () => {
    const projects = [
      project("1", "development", "2026-01-02T10:00:00.000Z"),
      project("2", "development", "2026-01-03T10:00:00.000Z"),
      project("3", "completed", "2026-01-04T10:00:00.000Z"),
      project("4", "published", "2026-01-05T10:00:00.000Z"),
      project("5", "draft", "2026-01-06T10:00:00.000Z"),
    ];
    const clients = [
      { id: "c1", name: "Cliente 1", createdAt: "2026-01-01T10:00:00.000Z", updatedAt: "2026-01-01T10:00:00.000Z" },
      { id: "c2", name: "Cliente 2", createdAt: "2026-01-01T10:00:00.000Z", updatedAt: "2026-01-01T10:00:00.000Z" },
    ];

    expect(calculateDashboardMetrics(projects, clients)).toEqual({
      totalProjects: 5,
      developmentProjects: 2,
      completedProjects: 1,
      publishedProjects: 1,
      totalClients: 2,
    });
  });

  it("uses zero values when no local records exist", () => {
    expect(calculateDashboardMetrics([], [])).toEqual({
      totalProjects: 0,
      developmentProjects: 0,
      completedProjects: 0,
      publishedProjects: 0,
      totalClients: 0,
    });
  });
});

describe("workspace dashboard ordering", () => {
  it("shows the five most recently updated projects and newest activity first", () => {
    const snapshot: WorkspaceSnapshot = {
      projects: [1, 2, 3, 4, 5, 6].map((day) =>
        project(String(day), "development", `2026-01-0${day}T10:00:00.000Z`),
      ),
      clients: [],
      activities: [
        { id: "old", kind: "project_created", description: "Antiga", createdAt: "2026-01-01T10:00:00.000Z" },
        { id: "new", kind: "project_updated", description: "Recente", createdAt: "2026-01-03T10:00:00.000Z" },
      ],
    };

    const dashboard = buildDashboardData(snapshot);

    expect(dashboard.recentProjects.map((item) => item.id)).toEqual(["6", "5", "4", "3", "2"]);
    expect(dashboard.recentActivities.map((item) => item.id)).toEqual(["new", "old"]);
  });
});
