import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SELECT_EVENT, WHATSAPP_MESSAGE, WHATSAPP_NUMBER, goToForm, whatsappUrl } from "@/components/orizon/cta";

describe("WhatsApp quote link", () => {
  it("uses the real Orizon number and the exact requested prefilled message", () => {
    expect(WHATSAPP_NUMBER).toBe("5513996419033");
    expect(WHATSAPP_MESSAGE).toBe("Olá, quero saber mais sobre os orçamentos da Orizon");
    expect(whatsappUrl()).toBe(
      "https://wa.me/5513996419033?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20os%20or%C3%A7amentos%20da%20Orizon",
    );
  });
});

describe("goToForm", () => {
  const rect = (top: number, bottom: number) => () =>
    ({ top, bottom, left: 0, right: 0, width: 0, height: bottom - top, x: 0, y: top, toJSON: () => ({}) }) as DOMRect;

  beforeEach(() => {
    document.body.innerHTML =
      '<section id="orcamento"><button role="combobox">Selecione</button></section>';
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("announces the chosen type so the form pre-selects it", () => {
    const seen: string[] = [];
    const h = (e: Event) => seen.push((e as CustomEvent<string>).detail);
    window.addEventListener(SELECT_EVENT, h);
    goToForm("CRM personalizado");
    window.removeEventListener(SELECT_EVENT, h);
    expect(seen).toEqual(["CRM personalizado"]);
  });

  it("scrolls the chosen type field into view when it would fall below the fold", () => {
    Object.defineProperty(window, "innerHeight", { value: 900, configurable: true });
    document.getElementById("orcamento")!.getBoundingClientRect = rect(0, 1400);
    document.querySelector('[role="combobox"]')!.getBoundingClientRect = rect(1060, 1104);

    goToForm("Landing page");

    // 1104 (fundo do campo) + 24 de folga - 900 de tela = 228
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 228, behavior: "smooth" });
  });

  it("leaves the form at the top when the field is already visible", () => {
    Object.defineProperty(window, "innerHeight", { value: 891, configurable: true });
    document.getElementById("orcamento")!.getBoundingClientRect = rect(0, 1400);
    document.querySelector('[role="combobox"]')!.getBoundingClientRect = rect(401, 441);

    goToForm("Automações");

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
