import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/orizon/Logo";

const title = "Redefinir senha | Orizon";
const description = "Defina uma nova senha para acessar a área da equipe Orizon.";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [validRecovery, setValidRecovery] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValidRecovery(new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery");
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (password !== confirmation) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível redefinir a senha. Abra novamente o link recebido.");
      return;
    }
    toast.success("Senha redefinida com sucesso.");
    navigate({ to: "/equipe", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <section className="glass-card w-full max-w-md p-6 hover:shadow-none sm:p-8">
        <Logo />
        <h1 className="mt-8 text-2xl font-bold">Redefinir senha</h1>
        {validRecovery ? (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-2"><Label htmlFor="new-password">Nova senha</Label><Input id="new-password" type="password" autoComplete="new-password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" /></div>
            <div className="grid gap-2"><Label htmlFor="confirm-password">Confirme a nova senha</Label><Input id="confirm-password" type="password" autoComplete="new-password" minLength={6} required value={confirmation} onChange={(e) => setConfirmation(e.target.value)} className="h-11" /></div>
            <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading && <Loader2 className="animate-spin" />}Salvar nova senha</Button>
          </form>
        ) : (
          <div className="mt-5"><p className="text-muted-foreground">Abra esta página pelo link de recuperação enviado ao seu e-mail.</p><Button asChild variant="outline" className="mt-6"><Link to="/auth">Voltar para o acesso</Link></Button></div>
        )}
      </section>
    </main>
  );
}
