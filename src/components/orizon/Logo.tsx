import { useId } from "react";

export function LogoMark({ className = "h-8 w-8", withBg = false }: { className?: string; withBg?: boolean }) {
  const id = useId().replace(/:/g, "");
  const grad = `orizon-grad-${id}`;
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#006BFF" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      {withBg && <rect width="256" height="256" rx="48" fill="#0B1F44" />}
      <g>
        <path
          d="M128 26 A102 102 0 1 0 230 128 A102 102 0 0 0 128 26 M128 61 A67 67 0 1 1 61 128 A67 67 0 0 1 128 61"
          fill={`url(#${grad})`}
          fillRule="evenodd"
        />
        <path d="M38 190 L224 35 L192 96 L76 211 Z" fill={`url(#${grad})`} />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="wordmark text-lg text-foreground">ORIZON</span>
    </span>
  );
}
