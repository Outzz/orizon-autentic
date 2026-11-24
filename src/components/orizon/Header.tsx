import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "./Logo";
import { CtaButton } from "./CtaButton";

export function Header() {
  return (
    <header className="glass-header sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6">
        <a href="#topo" aria-label="Orizon, início">
          <Logo />
        </a>
        <div className="flex items-center gap-1 sm:gap-3">
          <Link to="/equipe" className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">
            Área da equipe
          </Link>
          <ThemeToggle />
          <CtaButton size="default" className="h-10 px-3 text-xs sm:px-5 sm:text-sm" />
        </div>
      </div>
    </header>
  );
}
