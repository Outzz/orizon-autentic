import { ArrowRight, Check, Globe, Users, Workflow, Zap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { goToForm } from "./cta";

const solutions = [
  {
    icon: Globe, title: "Sites Institucionais", type: "Site institucional",
    text: "Sites modernos, rápidos e responsivos que passam credibilidade.",
    bullets: ["Design profissional e personalizado", "Rápido e otimizado para o Google (SEO)", "Funciona perfeitamente no celular"],
  },
  {
    icon: Zap, title: "Landing Pages", type: "Landing page",
    text: "Páginas estratégicas feitas para transformar visitantes em clientes.",
    bullets: ["Foco total em conversão", "Formulários e integração com WhatsApp", "Pronta para campanhas e anúncios"],
  },
  {
    icon: Users, title: "CRM Personalizado", type: "CRM personalizado",
    text: "Um sistema para organizar clientes, vendas e atendimento do seu jeito.",
    bullets: ["Funil de vendas visual", "Histórico completo de cada cliente", "Relatórios para decidir com clareza"],
  },
  {
    icon: Workflow, title: "Automações", type: "Automações",
    text: "Processos que rodam sozinhos para sua equipe focar no que importa.",
    bullets: ["Mensagens e follow-ups automáticos", "Integração entre suas ferramentas", "Menos erros e retrabalho"],
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="relative scroll-mt-16 overflow-hidden bg-surface px-4 py-20 sm:px-6 sm:py-28">
      <div className="radial-glow absolute -right-24 top-10 h-96 w-96" />
      <SectionHeading eyebrow="Nossas soluções" title="Tudo o que você precisa para crescer no digital." />
      <div className="relative mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2">
        {solutions.map(({ icon: Icon, title, text, bullets, type }, i) => (
          <Reveal key={title} delay={(i % 2) * 100}>
            <article className="glass-card flex h-full flex-col p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-brand)]">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
              <ul className="mt-5 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                    {b}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => goToForm(type)}
                className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-highlight hover:text-primary-light"
              >
                Quero essa solução <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
