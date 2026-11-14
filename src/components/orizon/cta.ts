export const CTA_LABEL = "Solicitar orçamento";

export const WHATSAPP_NUMBER = "5513996419033";
export const WHATSAPP_MESSAGE = "Olá, quero saber mais sobre os orçamentos da Orizon";
export const whatsappUrl = (text = WHATSAPP_MESSAGE) =>
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
