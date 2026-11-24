import { describe, expect, it } from "vitest";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER, solutionWhatsappUrl, whatsappUrl } from "@/components/orizon/cta";

describe("WhatsApp contact link", () => {
  it("uses the Orizon number without requesting a quote", () => {
    expect(WHATSAPP_NUMBER).toBe("5513996419033");
    expect(WHATSAPP_MESSAGE).toBe("Olá, quero saber mais sobre as soluções da Orizon");
    expect(whatsappUrl()).toBe(
      "https://wa.me/5513996419033?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Orizon",
    );
  });

  it("carries the chosen solution into the WhatsApp conversation", () => {
    expect(solutionWhatsappUrl("CRM personalizado")).toBe(
      "https://wa.me/5513996419033?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20CRM%20personalizado%20da%20Orizon",
    );
  });
});
