type WorkspaceMeta = Array<
  { title: string } | { name: string; content: string } | { property: string; content: string }
>;

export function privateWorkspaceHead(title: string, description: string) {
  const meta: WorkspaceMeta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex, nofollow" },
  ];
  return { meta };
}
