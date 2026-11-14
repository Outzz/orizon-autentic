import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listarOrcamentos = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) {
      console.error("team role check failed", roleError.message);
      throw new Error("Não foi possível verificar sua permissão.");
    }
    if (!isAdmin) return { authorized: false as const, pedidos: [] };

    const { data: pedidos, error } = await context.supabase
      .from("orcamento_requests")
      .select("id, created_at, nome, email, whatsapp, empresa, tipo_projeto, mensagem")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      console.error("team quote list failed", error.message);
      throw new Error("Não foi possível carregar os pedidos.");
    }
    return { authorized: true as const, pedidos };
  });

export const respostaOrcamentoSchema = z.object({
  nome: z.string().trim().max(100).optional().or(z.literal("")),
  tipo_projeto: z.string().trim().max(60).optional().or(z.literal("")),
  descricao: z.string().trim().min(10, "Descreva a solicitação em pelo menos 10 caracteres").max(4000),
});

export type RespostaOrcamentoInput = z.infer<typeof respostaOrcamentoSchema>;

export const sugerirRespostaOrcamento = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => respostaOrcamentoSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Sua conta não tem permissão para usar este recurso.");

    const { gerarRespostaPersonalizada } = await import("@/lib/resposta-ai.server");
    return gerarRespostaPersonalizada(data);
  });
