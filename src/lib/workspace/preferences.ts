export interface WorkspacePreferences {
  sidebarOpen: boolean;
}

const PREFERENCES_KEY = "orizon:workspace-preferences";
const defaultPreferences: WorkspacePreferences = { sidebarOpen: true };

export function loadWorkspacePreferences(): WorkspacePreferences {
  if (typeof window === "undefined") return defaultPreferences;

  try {
    const stored = window.localStorage.getItem(PREFERENCES_KEY);
    if (!stored) return defaultPreferences;
    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "sidebarOpen" in parsed &&
      typeof parsed.sidebarOpen === "boolean"
    ) {
      return { sidebarOpen: parsed.sidebarOpen };
    }
  } catch {
    // A corrupted or unavailable preference must never block the workspace.
  }

  return defaultPreferences;
}

export function saveWorkspacePreferences(patch: Partial<WorkspacePreferences>) {
  const next = { ...loadWorkspacePreferences(), ...patch };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
    } catch {
      // The in-memory React state still applies when storage is unavailable.
    }
  }
  return next;
}
