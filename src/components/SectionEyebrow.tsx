export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3 font-mono-caps text-xs text-primary">
      <span className="h-px w-8 bg-gradient-industrial" />
      <span>{children}</span>
    </div>
  );
}