import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "./cta";
import { Reveal } from "./Reveal";
import heroGlow from "@/assets/horizon-glow.jpg";

export function ContactSection() {
  return (
    <section id="contato" className="relative scroll-mt-16 overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <img src={heroGlow} alt="" aria-hidden="true" loading="lazy" width={1920} height={832} className="absolute inset-0 h-full w-full object-cover object-right opacity-20 dark:opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <MessageCircle className="mx-auto h-10 w-10 text-highlight" />
        <p className="eyebrow mt-6">Fale com a Orizon</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
          Conte sua ideia. <span className="text-highlight">A conversa começa no WhatsApp.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Tire dúvidas e converse diretamente com a Orizon sobre as soluções para o seu negócio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {["Contato direto", "Sem formulário", "Sem cadastro"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-highlight" />{item}</span>
          ))}
        </div>
        <Button variant="cta" size="xl" asChild className="group mt-8">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.__lovableEvents?.track?.("project.whatsapp_clicked", { location: "contact_section" })}
          >
            Falar com a Orizon
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
