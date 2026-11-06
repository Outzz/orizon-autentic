import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./CtaButton";

const steps = [
  { n: "01", title: "Briefing", text: "Entendemos seu negócio, seus objetivos e o que precisa ser resolvido. Sem custo." },
  { n: "02", title: "Desenvolvimento", text: "Construímos sob medida, com você acompanhando e validando cada etapa." },
  { n: "03", title: "Testes", text: "Revisamos desempenho, segurança e funcionamento em todos os dispositivos." },
  { n: "04", title: "Entrega", text: "Colocamos no ar, treinamos sua equipe e seguimos com suporte." },
];

export function Process() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Como funciona"
        title="Um processo claro, do briefing à entrega."
        sub="Você recebe uma proposta com escopo e cronograma antes de começar. Sem surpresas."
      />
      <ol className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 100}>
            <li className="glass-card h-full p-6">
              <span className="text-gradient text-4xl font-extrabold">{s.n}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="mt-12 flex justify-center">
        <CtaButton />
      </div>
    </section>
  );
}
