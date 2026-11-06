import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const faqs = [
  { q: "Quanto custa um projeto?", a: "Cada projeto é sob medida. Depois do briefing gratuito, você recebe uma proposta com escopo, cronograma e investimento, sem compromisso." },
  { q: "Quanto tempo leva para ficar pronto?", a: "Depende do tamanho do projeto. O prazo exato vem na proposta, dividido por etapas." },
  { q: "Eu acompanho o desenvolvimento?", a: "Sim. Cada etapa é validada com você antes de seguirmos para a próxima." },
  { q: "Vocês dão suporte depois da entrega?", a: "Sim. Continuamos ao seu lado para ajustes, dúvidas e evolução do projeto." },
  { q: "Preciso entender de tecnologia?", a: "Não. Explicamos tudo de forma simples e cuidamos da parte técnica por você." },
];

export function Faq() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas que você pode ter." />
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="glass-card border px-5 hover:translate-y-0">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
