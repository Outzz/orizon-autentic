import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_LABEL, goToForm } from "./cta";
import { cn } from "@/lib/utils";

export function CtaButton({ className, size = "xl" }: { className?: string; size?: "default" | "xl" }) {
  return (
    <Button variant="cta" size={size} className={cn("group", className)} onClick={() => goToForm()}>
      {CTA_LABEL}
      <ArrowRight className="transition-transform group-hover:translate-x-1" />
    </Button>
  );
}
