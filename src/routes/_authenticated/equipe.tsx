import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, CalendarDays, LogOut, Mail, MessageCircle } from "lucide-react";
import { listarOrcamentos } from "@/lib/equipe.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/orizon/Logo";
import { ResponseAssistant } from "@/components/orizon/ResponseAssistant";
import { ThemeToggle } from "@/components/ThemeToggle";

const title = "Pedidos de orçamento | Equipe Orizon";
const description = "Área protegida da equipe Orizon para consultar pedidos e preparar respostas personalizadas.";

const teamQueryOptions = queryOptions({
  queryKey: ["equipe", "orcamentos"],
  queryFn: () => listarOrcamentos(),
});

export const Route = createFileRoute("/_authenticated/equipe")({
  validateSearch: (search: Record<string, unknown>) => ({
    ...(typeof search["pedido"] === "string" ? { pedido: search["pedido"] } : {}),
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(teamQueryOptions),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { data } = useSuspenseQuery(teamQueryOptions);
  const { pedido: pedidoId } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const selected = data.pedidos.find((pedido) => pedido.id === pedidoId) ?? data.pedidos[0];

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" aria-label="Ir para o site da Orizon"><Logo /></Link>
          <div className="flex items-center gap-1"><ThemeToggle /><Button variant="ghost" size="sm" onClick={handleSignOut}><LogOut />Sair</Button></div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="eyebrow">Área da equipe</p>
        <h1 className="mt-3 text-3xl font-bold">Pedidos de orçamento</h1>
        <p className="mt-2 text-muted-foreground">Consulte as solicitações e prepare o próximo contato.</p>

        {!data.authorized ? (
          <section className="glass-card mt-10 max-w-2xl p-6 hover:shadow-none"><h2 className="text-xl font-semibold">Autorização necessária</h2><p className="mt-3 text-muted-foreground">Sua conta foi reconhecida, mas ainda não tem permissão de equipe. Peça a liberação à pessoa responsável pela Orizon.</p></section>
        ) : data.pedidos.length === 0 ? (
          <section className="glass-card mt-10 p-8 text-center hover:shadow-none"><p className="text-muted-foreground">Nenhum pedido de orçamento recebido até agora.</p><div className="mx-auto mt-8 max-w-xl text-left"><ResponseAssistant /></div></section>
        ) : (
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="glass-card overflow-hidden hover:shadow-none" aria-label="Lista de pedidos">
              <div className="border-b border-border px-5 py-4 text-sm font-medium">{data.pedidos.length} {data.pedidos.length === 1 ? "pedido" : "pedidos"}</div>
              <ul className="max-h-[38rem] overflow-y-auto p-2">
                {data.pedidos.map((pedido) => (
                  <li key={pedido.id}>
                    <Link to="/equipe" search={{ pedido: pedido.id }} className={`block rounded-lg px-3 py-3 transition-colors ${selected?.id === pedido.id ? "bg-accent" : "hover:bg-accent/60"}`}>
                      <span className="block font-medium">{pedido.nome}</span>
                      <span className="mt-1 block text-sm text-highlight">{pedido.tipo_projeto}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(pedido.created_at))}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="grid gap-6">
              {selected && (
                <section className="glass-card p-5 hover:shadow-none sm:p-6" aria-labelledby="pedido-title">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div><p className="text-sm text-highlight">{selected.tipo_projeto}</p><h2 id="pedido-title" className="mt-1 text-2xl font-semibold">{selected.nome}</h2></div>
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(selected.created_at))}</span>
                  </div>
                  <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><div><dt className="text-muted-foreground">E-mail</dt><dd className="mt-1 break-all"><a className="hover:text-highlight" href={`mailto:${selected.email}`}>{selected.email}</a></dd></div></div>
                    <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-muted-foreground" /><div><dt className="text-muted-foreground">WhatsApp</dt><dd className="mt-1">{selected.whatsapp}</dd></div></div>
                    {selected.empresa && <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" /><div><dt className="text-muted-foreground">Empresa</dt><dd className="mt-1">{selected.empresa}</dd></div></div>}
                  </dl>
                  <div className="mt-6 rounded-lg bg-background p-4"><h3 className="text-sm font-medium">Solicitação</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{selected.mensagem || "Nenhuma descrição adicional informada."}</p></div>
                </section>
              )}
              <ResponseAssistant pedido={selected} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
