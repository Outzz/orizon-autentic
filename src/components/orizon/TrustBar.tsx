import { Code2, LifeBuoy, ListChecks, ShieldCheck } from "lucide-react";

const items = [
  { icon: Code2, label: "Desenvolvimento sob medida" },
  { icon: ListChecks, label: "Entregas validadas por etapa" },
  { icon: ShieldCheck, label: "Segurança desde o projeto" },
  { icon: LifeBuoy, label: "Suporte após a entrega" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-surface">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-7 sm:px-6 lg:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm font-medium">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-navy">
              <Icon className="h-4 w-4 text-primary-light" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
