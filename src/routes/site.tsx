import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/orizon/Header";
import { Hero } from "@/components/orizon/Hero";
import { TrustBar } from "@/components/orizon/TrustBar";
import { Problem } from "@/components/orizon/Problem";
import { Solutions } from "@/components/orizon/Solutions";
import { Process } from "@/components/orizon/Process";
import { Faq } from "@/components/orizon/Faq";
import { ContactSection } from "@/components/orizon/ContactSection";
import { Footer } from "@/components/orizon/Footer";

const title = "Orizon — Sites, CRMs e automações sob medida";
const description =
  "Conheça as soluções da Orizon em sites, landing pages, CRMs e automações e fale diretamente com a equipe pelo WhatsApp.";

export const Route = createFileRoute("/site")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <div className="section-divider" />
        <Problem />
        <Solutions />
        <Process />
        <Faq />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
