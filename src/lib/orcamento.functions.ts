import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const orcamentoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{10,20}$/, "Informe um WhatsApp válido com DDD"),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  tipo_projeto: z.string().trim().min(1, "Escolha o tipo de projeto").max(60),
  mensagem: z.string().trim().max(1500).optional().or(z.literal("")),
  consentimento: z.literal(true, { errorMap: () => ({ message: "Necessário para entrarmos em contato" }) }),
});

export type OrcamentoInput = z.infer<typeof orcamentoSchema>;

export const enviarOrcamento = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orcamentoSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: pedido, error } = await supabaseAdmin.from("orcamento_requests").insert({
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      empresa: data.empresa || null,
      tipo_projeto: data.tipo_projeto,
      mensagem: data.mensagem || null,
    }).select("id").single();
    if (error) {
      console.error("orcamento insert failed", error.message);
      throw new Error("Não foi possível enviar agora. Tente novamente.");
    }
    return { ok: true, id: pedido.id };
  });
