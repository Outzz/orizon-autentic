import { MonitorX, Repeat, Users2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const cards = [
  { icon: MonitorX, title: "Seu site não gera contatos", text: "Visual desatualizado, lento ou sem uma chamada clara. O visitante entra e vai embora." },
  { icon: Users2, title: "Seus clientes estão espalhados", text: "Contatos em planilhas, WhatsApp e cadernos. Oportunidades de venda se perdem no caminho." },
  { icon: Repeat, title: "Sua equipe repete tarefas manuais", text: "Tempo gasto copiando dados, enviando mensagens e fazendo follow-up que poderia ser automático." },
];

export function Problem() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading eyebrow="Você se identifica?" title="Seu negócio pode estar perdendo oportunidades todos os dias." />
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 100}>
            <article className="glass-card h-full p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-navy">
                <Icon className="h-6 w-6 text-primary-light" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-muted-foreground">{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
