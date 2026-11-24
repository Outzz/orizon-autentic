import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_LABEL, whatsappUrl } from "./cta";
import { cn } from "@/lib/utils";

export function CtaButton({ className, size = "xl" }: { className?: string; size?: "default" | "xl" }) {
  return (
    <Button variant="cta" size={size} className={cn("group", className)} asChild>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.__lovableEvents?.track?.("project.whatsapp_clicked", { location: "cta" })}
      >
        {CTA_LABEL}
        <ArrowRight className="transition-transform group-hover:translate-x-1" />
      </a>
    </Button>
  );
}
