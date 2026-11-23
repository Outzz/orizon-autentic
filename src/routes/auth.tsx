import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/orizon/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import "@lovable.dev/cloud-auth-js/styles.css";

const title = "Acesso da equipe | Orizon";
const description = "Acesso protegido à área de orçamentos da equipe Orizon.";
const REDIRECT_KEY = "orizon:auth-redirect";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    ...(typeof search["redirect"] === "string" ? { redirect: search["redirect"] } : {}),
  }),
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
  component: AuthPage,
});

function safeRedirect(value?: string) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign_in" | "sign_up">("sign_in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const destination = safeRedirect(redirect);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const saved = sessionStorage.getItem(REDIRECT_KEY);
      sessionStorage.removeItem(REDIRECT_KEY);
      navigate({ to: safeRedirect(saved || destination), replace: true });
    });
  }, [destination, navigate]);

  async function handleEmail(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    if (mode === "sign_up") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Confirme seu e-mail para concluir o cadastro. Depois, entre na área da equipe.");
      setMode("sign_in");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("E-mail ou senha incorretos.");
      return;
    }
    navigate({ to: destination, replace: true });
  }

  async function handleOAuth(provider: "google" | "lovable") {
    setLoading(true);
    sessionStorage.setItem(REDIRECT_KEY, destination);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/auth`,
    });
    if (result.error) {
      setLoading(false);
      sessionStorage.removeItem(REDIRECT_KEY);
      toast.error("Não foi possível entrar agora. Tente novamente.");
      return;
    }
    if (result.redirected) return;
    setLoading(false);
    sessionStorage.removeItem(REDIRECT_KEY);
    navigate({ to: destination, replace: true });
  }

  async function handleForgotPassword() {
    if (!email.includes("@")) {
      toast.error("Informe seu e-mail para recuperar a senha.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível enviar a recuperação agora.");
      return;
    }
    toast.success("Enviamos as instruções de recuperação para seu e-mail.");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/site" aria-label="Voltar ao site da Orizon"><Logo /></Link>
        <ThemeToggle />
      </div>
      <section className="mx-auto mt-16 max-w-md sm:mt-24">
        <Link to="/site" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar ao site
        </Link>
        <div className="glass-card mt-6 p-6 hover:shadow-none sm:p-8">
          <p className="eyebrow">Área da equipe</p>
          <h1 className="mt-3 text-2xl font-bold">{mode === "sign_in" ? "Entre na sua conta" : "Crie sua conta"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">O acesso aos pedidos também exige autorização da Orizon.</p>

          <div className="mt-7 grid gap-3">
            <Button type="button" variant="outline" className="google-auth-button h-12 w-full font-medium" disabled={loading} onClick={() => handleOAuth("google")}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
              Continuar com Google
            </Button>
            <button type="button" className="lovable-auth-button h-12 w-full" disabled={loading} onClick={() => handleOAuth("lovable")}>
              Continuar com Lovable
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou use seu e-mail<span className="h-px flex-1 bg-border" /></div>

          <form onSubmit={handleEmail} className="grid gap-4">
            <div className="grid gap-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" /></div>
            <div className="grid gap-2"><Label htmlFor="password">Senha</Label><Input id="password" type="password" autoComplete={mode === "sign_in" ? "current-password" : "new-password"} minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" /></div>
            <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>{loading && <Loader2 className="animate-spin" />}{mode === "sign_in" ? "Entrar" : "Criar conta"}</Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => setMode(mode === "sign_in" ? "sign_up" : "sign_in")}>
              {mode === "sign_in" ? "Criar uma conta" : "Já tenho uma conta"}
            </button>
            <button type="button" className="text-highlight hover:underline" onClick={handleForgotPassword}>Esqueci a senha</button>
          </div>
        </div>
      </section>
    </main>
  );
}
