import { Logo } from "./Logo";
import { CtaButton } from "./CtaButton";

export function Header() {
  return (
    <header className="glass-header sticky top-0 z-50 border-b border-border/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#topo" aria-label="Orizon, início">
          <Logo />
        </a>
        <CtaButton size="default" className="h-10 px-4 text-sm sm:px-5" />
      </div>
    </header>
  );
}
