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

/** Quanto do campo "Tipo de projeto" deve sobrar visível abaixo dele, em px. */
const FIELD_MARGIN = 24;

export function goToForm(projectType?: string) {
  if (projectType) window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: projectType }));
  const form = document.getElementById("orcamento");
  if (!form) return;

  const scrollY = window.scrollY;
  let top = scrollY + form.getBoundingClientRect().top;

  // O tipo escolhido precisa aparecer na tela: se o campo ficar abaixo da dobra,
  // role mais um pouco para que ele fique visível.
  if (projectType) {
    const trigger = document.querySelector<HTMLElement>('#orcamento [role="combobox"]');
    if (trigger) {
      const triggerBottom = scrollY + trigger.getBoundingClientRect().bottom;
      top = Math.max(top, triggerBottom + FIELD_MARGIN - window.innerHeight);
    }
  }

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
