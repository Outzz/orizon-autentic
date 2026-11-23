import { beforeEach, describe, expect, it } from "vitest";
import { loadWorkspacePreferences, saveWorkspacePreferences } from "@/lib/workspace/preferences";

describe("workspace preferences", () => {
  beforeEach(() => window.localStorage.clear());

  it("persists a collapsed sidebar in LocalStorage", () => {
    saveWorkspacePreferences({ sidebarOpen: false });

    expect(loadWorkspacePreferences().sidebarOpen).toBe(false);
    expect(window.localStorage.getItem("orizon:workspace-preferences")).toBe('{"sidebarOpen":false}');
  });

  it("keeps the sidebar expanded when stored preferences are invalid", () => {
    window.localStorage.setItem("orizon:workspace-preferences", "not-json");

    expect(loadWorkspacePreferences()).toEqual({ sidebarOpen: true });
  });
});
