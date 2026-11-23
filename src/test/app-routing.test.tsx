import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

function matchesFor(path: string) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  return router.matchRoutes(path);
}

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("places the private dashboard at / behind the authenticated layout", () => {
    const matches = matchesFor("/");

    expect(matches.some((match) => match.routeId === "/_authenticated")).toBe(true);
    expect(matches.at(-1)?.routeId).toBe("/_authenticated/_workspace/");
  });

  it("keeps the institutional site public at /site", () => {
    const matches = matchesFor("/site");

    expect(matches.at(-1)?.routeId).toBe("/site");
    expect(matches.some((match) => match.routeId === "/_authenticated")).toBe(false);
  });

  it("places the team quotes page behind the authenticated layout", () => {
    const matches = matchesFor("/equipe");

    expect(matches.some((match) => match.routeId === "/_authenticated")).toBe(true);
    expect(matches.at(-1)?.routeId).toBe("/_authenticated/equipe");
  });

  it.each([
    "/projetos/novo",
    "/projetos",
    "/templates",
    "/assistente",
    "/clientes",
    "/prospeccao",
    "/crm",
    "/propostas",
    "/contratos",
    "/arquivos",
    "/historico",
    "/configuracoes",
  ])("provides an authenticated page for %s", (path) => {
    const matches = matchesFor(path);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.some((match) => match.routeId === "/_authenticated")).toBe(true);
  });
});
