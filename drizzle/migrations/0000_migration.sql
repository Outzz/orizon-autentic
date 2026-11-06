CREATE TABLE public.orcamento_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  empresa text,
  tipo_projeto text NOT NULL,
  mensagem text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.orcamento_requests TO service_role;
ALTER TABLE public.orcamento_requests ENABLE ROW LEVEL SECURITY;