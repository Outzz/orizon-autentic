import type { LucideIcon } from "lucide-react";

interface ModulePageProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
}

export function ModulePage({
  eyebrow,
  title,
  description,
  icon: Icon,
  emptyTitle,
  emptyDescription,
}: ModulePageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>

      <section className="glass-card mt-10 flex min-h-72 flex-col items-center justify-center p-8 text-center hover:shadow-none">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-highlight">
          <Icon className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-xl font-semibold">{emptyTitle}</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{emptyDescription}</p>
      </section>
    </main>
  );
}
