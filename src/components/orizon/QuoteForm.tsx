import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { enviarOrcamento, orcamentoSchema, type OrcamentoInput } from "@/lib/orcamento.functions";
import { CTA_LABEL, PROJECT_TYPES, SELECT_EVENT, whatsappUrl } from "./cta";
import { Reveal } from "./Reveal";
import heroGlow from "@/assets/horizon-glow.jpg";

const fieldCls = "h-11 bg-background/60 border-border";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<OrcamentoInput>({
    resolver: zodResolver(orcamentoSchema),
    defaultValues: { nome: "", email: "", whatsapp: "", empresa: "", tipo_projeto: "", mensagem: "", consentimento: false as unknown as true },
  });

  useEffect(() => {
    const h = (e: Event) => form.setValue("tipo_projeto", (e as CustomEvent<string>).detail, { shouldValidate: true });
    window.addEventListener(SELECT_EVENT, h);
    return () => window.removeEventListener(SELECT_EVENT, h);
  }, [form]);

  const onSubmit = async (values: OrcamentoInput) => {
    try {
      await enviarOrcamento({ data: values });
      setSent(true);
      form.reset();
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
    }
  };

  return (
    <section id="orcamento" className="relative scroll-mt-16 overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <img src={heroGlow} alt="" aria-hidden="true" loading="lazy" width={1920} height={832} className="absolute inset-0 h-full w-full object-cover object-right opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">Solicite seu orçamento</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Conte o que você precisa. <span className="text-highlight">A gente monta a proposta.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Preencha o formulário e marcamos um briefing gratuito. Depois você recebe uma proposta com escopo e
            cronograma, sem compromisso.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Briefing inicial gratuito", "Proposta com escopo e cronograma", "Sem compromisso"].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><CheckCircle2 className="h-5 w-5 text-highlight" />{t}</li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-sm text-muted-foreground">Prefere conversar agora?</p>
            <Button variant="ghostBlue" size="xl" asChild className="mt-3">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-card p-6 hover:translate-y-0 sm:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-highlight" />
                <h3 className="mt-5 text-2xl font-bold">Pedido recebido!</h3>
                <p className="mt-3 text-muted-foreground">Em breve entraremos em contato para agendar seu briefing.</p>
                <Button variant="ghostBlue" className="mt-6" onClick={() => setSent(false)}>Enviar outro pedido</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2" noValidate>
                  <FormField control={form.control} name="nome" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Nome *</FormLabel><FormControl><Input className={fieldCls} autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>E-mail *</FormLabel><FormControl><Input type="email" className={fieldCls} autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="whatsapp" render={({ field }) => (
                    <FormItem><FormLabel>WhatsApp *</FormLabel><FormControl><Input type="tel" placeholder="(11) 99999-9999" className={fieldCls} autoComplete="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="empresa" render={({ field }) => (
                    <FormItem><FormLabel>Empresa</FormLabel><FormControl><Input className={fieldCls} autoComplete="organization" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="tipo_projeto" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de projeto *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className={fieldCls}><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                        <SelectContent>{PROJECT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="mensagem" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Conte um pouco sobre o projeto</FormLabel><FormControl><Textarea rows={4} className="bg-background/60" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="consentimento" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex items-start gap-3">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-0.5" /></FormControl>
                        <FormLabel className="text-sm font-normal leading-snug text-muted-foreground">Autorizo a Orizon a entrar em contato comigo sobre este orçamento.</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" variant="cta" size="xl" disabled={form.formState.isSubmitting} className="group w-full sm:col-span-2">
                    {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : null}
                    {CTA_LABEL}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
