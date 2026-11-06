import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <p>Sites, landing pages, CRMs e automações sob medida.</p>
        <p>© {new Date().getFullYear()} Orizon</p>
      </div>
    </footer>
  );
}
