import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sugerirRespostaOrcamento } from "@/lib/equipe.functions";

type PedidoParaResposta = {
  nome: string;
  tipo_projeto: string;
  mensagem: string | null;
};

export function ResponseAssistant({ pedido }: { pedido?: PedidoParaResposta | undefined }) {
  const gerarResposta = useServerFn(sugerirRespostaOrcamento);
  const [nome, setNome] = useState("");
  const [tipoProjeto, setTipoProjeto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!pedido) return;
    setNome(pedido.nome);
    setTipoProjeto(pedido.tipo_projeto);
    setDescricao(pedido.mensagem || `${pedido.nome} solicitou um orçamento para ${pedido.tipo_projeto}.`);
    setResposta("");
  }, [pedido]);

  async function handleGenerate() {
    if (descricao.trim().length < 10) {
      toast.error("Descreva a solicitação em pelo menos 10 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const result = await gerarResposta({ data: { nome, tipo_projeto: tipoProjeto, descricao } });
      setResposta(result.resposta);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível gerar a sugestão agora.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(resposta);
    setCopied(true);
    toast.success("Resposta copiada.");
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="glass-card p-5 hover:shadow-none sm:p-6" aria-labelledby="assistente-title">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-highlight"><Sparkles className="h-5 w-5" /></span>
        <div><h2 id="assistente-title" className="text-lg font-semibold">Sugestão de resposta</h2><p className="mt-1 text-sm text-muted-foreground">Gere uma minuta personalizada para revisar antes de responder.</p></div>
      </div>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2"><Label htmlFor="reply-name">Nome</Label><Input id="reply-name" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={100} /></div>
          <div className="grid gap-2"><Label htmlFor="reply-type">Tipo de projeto</Label><Input id="reply-type" value={tipoProjeto} onChange={(e) => setTipoProjeto(e.target.value)} maxLength={60} /></div>
        </div>
        <div className="grid gap-2"><Label htmlFor="reply-description">Descreva a solicitação *</Label><Textarea id="reply-description" rows={6} value={descricao} onChange={(e) => setDescricao(e.target.value)} maxLength={4000} placeholder="Ex.: A empresa precisa organizar leads recebidos pelo site e automatizar o acompanhamento comercial..." /></div>
        <Button type="button" variant="cta" onClick={handleGenerate} disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : <Sparkles />}Gerar sugestão</Button>
        {resposta && (
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between gap-3"><span className="text-sm font-medium">Minuta para revisão</span><Button type="button" variant="ghost" size="sm" onClick={handleCopy}>{copied ? <Check /> : <Copy />}{copied ? "Copiada" : "Copiar"}</Button></div>
            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{resposta}</p>
          </div>
        )}
      </div>
    </section>
  );
}
