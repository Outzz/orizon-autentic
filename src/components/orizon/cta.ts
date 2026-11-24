export const CTA_LABEL = "Falar com a Orizon";

export const WHATSAPP_NUMBER = "5513996419033";
export const WHATSAPP_MESSAGE = "Olá, quero saber mais sobre as soluções da Orizon";

export const whatsappUrl = (text = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const solutionWhatsappUrl = (solution: string) =>
  whatsappUrl(`Olá, quero saber mais sobre ${solution} da Orizon`);
