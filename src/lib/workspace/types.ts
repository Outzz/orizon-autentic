export type ProjectStatus = "draft" | "development" | "completed" | "published";

export interface WorkspaceProject {
  id: string;
  name: string;
  description: string;
  type: string;
  status: ProjectStatus;
  clientId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceClient {
  id: string;
  name: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  segment?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type WorkspaceActivityKind =
  | "project_created"
  | "project_updated"
  | "client_created"
  | "backup_imported";

export interface WorkspaceActivity {
  id: string;
  kind: WorkspaceActivityKind;
  description: string;
  projectId?: string;
  clientId?: string;
  createdAt: string;
}

export interface WorkspaceSnapshot {
  projects: WorkspaceProject[];
  clients: WorkspaceClient[];
  activities: WorkspaceActivity[];
}
