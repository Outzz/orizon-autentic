export const CTA_LABEL = "Solicitar orçamento";

// TODO: substituir pelo número real da Orizon (formato internacional, só dígitos)
export const WHATSAPP_NUMBER = "5500000000000";
export const whatsappUrl = (text = "Olá! Quero solicitar um orçamento com a Orizon.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const PROJECT_TYPES = [
  "Site institucional",
  "Landing page",
  "CRM personalizado",
  "Automações",
  "Ainda não sei",
] as const;

export const SELECT_EVENT = "orizon:select-project";

export function goToForm(projectType?: string) {
  if (projectType) window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: projectType }));
  document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
