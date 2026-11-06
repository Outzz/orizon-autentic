import { Check } from "lucide-react";
import heroImg from "@/assets/hero-building.jpg";
import { Button } from "@/components/ui/button";
import { CtaButton } from "./CtaButton";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <img
          src={heroImg}
          alt="Prédio corporativo de vidro iluminado à noite com horizonte azul"
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-center opacity-50 lg:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="deco-arc absolute -right-40 -top-56 h-[28rem] w-[28rem]" />
      <div className="radial-glow absolute -left-20 top-24 h-80 w-80" />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Sites · Landing pages · CRM · Automações</p>
          <h1 className="mt-5 text-[clamp(2.5rem,6vw,3.75rem)] font-extrabold leading-[1.05]">
            Sites, CRMs e automações que fazem seu negócio
            <span className="block text-highlight">vender mais.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Da landing page que gera contatos ao CRM que organiza suas vendas e às automações que economizam seu
            tempo. Tudo sob medida para a sua empresa.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaButton />
            <Button variant="ghostBlue" size="xl" asChild>
              <a href="#solucoes">Ver soluções</a>
            </Button>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-highlight" />Briefing inicial gratuito</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-highlight" />Sem compromisso</span>
          </p>
        </div>
      </div>
    </section>
  );
}
