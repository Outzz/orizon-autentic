import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ListChecks, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { privateWorkspaceHead } from "@/lib/workspace/metadata";

export const Route = createFileRoute("/_workspace/projetos/novo")({
  validateSearch: (search: Record<string, unknown>) => ({
    ...(typeof search["descricao"] === "string"
      ? { descricao: search["descricao"].slice(0, 2000) }
      : {}),
  }),
  head: () => privateWorkspaceHead(
    "Criar projeto | Orizon",
    "Início de um novo projeto na plataforma privada Orizon.",
  ),
  component: NewProjectPage,
});

function NewProjectPage() {
  const { descricao } = Route.useSearch();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to="/"><ArrowLeft />Voltar ao dashboard</Link>
      </Button>
      <p className="eyebrow mt-8">Novo projeto</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Comece pela sua ideia</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">A descrição informada no dashboard já está preservada nesta etapa.</p>

      <section className="glass-card mt-8 p-5 hover:shadow-none sm:p-7" aria-labelledby="idea-title">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-highlight"><PencilRuler className="h-5 w-5" /></span>
          <h2 id="idea-title" className="text-xl font-semibold">Sua ideia</h2>
        </div>
        {descricao ? (
          <p className="mt-5 whitespace-pre-wrap rounded-lg border border-border bg-background p-4 text-sm leading-6">{descricao}</p>
        ) : (
          <p className="mt-5 rounded-lg border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">Nenhuma descrição informada. Volte ao dashboard para escrever sua ideia.</p>
        )}
      </section>

      <section className="glass-card mt-6 p-5 hover:shadow-none sm:p-7" aria-labelledby="next-stage-title">
        <div className="flex items-start gap-3">
          <ListChecks className="mt-1 h-5 w-5 shrink-0 text-highlight" />
          <div>
            <h2 id="next-stage-title" className="font-semibold">O criador guiado vem na próxima etapa</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Tipo de projeto, requisitos, personalização visual, páginas e funcionalidades serão configurados aqui. Nenhum projeto é criado antes de esse fluxo estar pronto.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
