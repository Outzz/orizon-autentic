import { describe, expect, it } from "vitest";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER, whatsappUrl } from "@/components/orizon/cta";

describe("WhatsApp quote link", () => {
  it("uses the real Orizon number and the exact requested prefilled message", () => {
    expect(WHATSAPP_NUMBER).toBe("5513996419033");
    expect(WHATSAPP_MESSAGE).toBe("Olá, quero saber mais sobre os orçamentos da Orizon");
    expect(whatsappUrl()).toBe(
      "https://wa.me/5513996419033?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20os%20or%C3%A7amentos%20da%20Orizon",
    );
  });
});
