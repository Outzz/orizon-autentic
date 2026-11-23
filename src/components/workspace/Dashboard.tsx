import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  FolderKanban,
  Globe2,
  History,
  Plus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { projectStatusLabels, type WorkspaceDashboardData } from "@/lib/workspace/dashboard";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

export function Dashboard({ data }: { data: WorkspaceDashboardData }) {
  const [idea, setIdea] = useState("");
  const navigate = useNavigate();

  const metrics = [
    { label: "Total de projetos", value: data.metrics.totalProjects, icon: FolderKanban },
    { label: "Em desenvolvimento", value: data.metrics.developmentProjects, icon: CircleDashed },
    { label: "Concluídos", value: data.metrics.completedProjects, icon: CheckCircle2 },
    { label: "Publicados", value: data.metrics.publishedProjects, icon: Globe2 },
    { label: "Clientes cadastrados", value: data.metrics.totalClients, icon: Users },
  ];

  function handleStart(event: FormEvent) {
    event.preventDefault();
    const description = idea.trim();
    void navigate({
      to: "/projetos/novo",
      search: description ? { descricao: description } : {},
    });
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Seu espaço de criação</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Olá. Vamos construir algo novo?</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Organize projetos e clientes em um só lugar, no seu ritmo e sem limites artificiais.</p>
        </div>
        <Button asChild variant="cta" size="lg">
          <Link to="/projetos/novo"><Plus />Novo projeto</Link>
        </Button>
      </div>

      <section className="glass-card mt-8 p-5 hover:shadow-none sm:p-7" aria-labelledby="create-title">
        <h2 id="create-title" className="text-xl font-semibold">O que vamos criar hoje?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Descreva sua ideia. Ela será levada para o início do novo projeto.</p>
        <form onSubmit={handleStart} className="mt-5">
          <Textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            maxLength={2000}
            rows={4}
            aria-label="Descrição da ideia do projeto"
            placeholder="Ex.: Quero criar um site para uma clínica, com apresentação dos serviços e agendamento pelo WhatsApp..."
            className="resize-none bg-background"
          />
          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="cta" size="lg">Começar projeto<ArrowRight /></Button>
          </div>
        </form>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5" aria-label="Resumo da plataforma">
        {metrics.map((metric) => (
          <article key={metric.label} className="glass-card p-4 hover:shadow-none sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs leading-5 text-muted-foreground sm:text-sm">{metric.label}</p>
              <metric.icon className="hidden h-4 w-4 shrink-0 text-highlight sm:block" />
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums">{metric.value}</p>
          </article>
        ))}
      </section>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <section className="glass-card overflow-hidden hover:shadow-none" aria-labelledby="recent-projects-title">
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <h2 id="recent-projects-title" className="font-semibold">Projetos recentes</h2>
          </div>
          {data.recentProjects.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center p-7 text-center">
              <FolderKanban className="h-8 w-8 text-muted-foreground" />
              <h3 className="mt-4 font-medium">Nenhum projeto por aqui ainda</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Quando você criar o primeiro projeto, ele aparecerá nesta lista automaticamente.</p>
              <Button asChild variant="outline" className="mt-5"><Link to="/projetos/novo"><Plus />Iniciar primeiro projeto</Link></Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {data.recentProjects.map((project) => (
                <li key={project.id} className="px-5 py-4 sm:px-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-medium">{project.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{project.type}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs text-highlight">{projectStatusLabels[project.status]}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Atualizado em {dateFormatter.format(new Date(project.updatedAt))}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="glass-card overflow-hidden hover:shadow-none" aria-labelledby="activities-title">
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <h2 id="activities-title" className="font-semibold">Atividades recentes</h2>
          </div>
          {data.recentActivities.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center p-7 text-center">
              <History className="h-8 w-8 text-muted-foreground" />
              <h3 className="mt-4 font-medium">Nenhuma atividade registrada</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Criações e alterações dos seus projetos formarão seu histórico de trabalho.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {data.recentActivities.map((activity) => (
                <li key={activity.id} className="px-5 py-4 sm:px-6">
                  <p className="text-sm">{activity.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{dateFormatter.format(new Date(activity.createdAt))}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
