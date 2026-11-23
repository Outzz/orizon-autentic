import { buildDashboardData } from "./dashboard";
import { loadIndexedDBSnapshot } from "./indexeddb";
import type { WorkspaceSnapshot } from "./types";

export interface WorkspaceStorage {
  loadSnapshot(): Promise<WorkspaceSnapshot>;
}

export const indexedDBWorkspaceStorage: WorkspaceStorage = {
  loadSnapshot: loadIndexedDBSnapshot,
};

export class WorkspaceService {
  constructor(private readonly storage: WorkspaceStorage) {}

  async getDashboard() {
    return buildDashboardData(await this.storage.loadSnapshot());
  }
}

export const workspaceService = new WorkspaceService(indexedDBWorkspaceStorage);
