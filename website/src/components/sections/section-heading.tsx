import { MaskedTextReveal } from "@/components/ui/masked-text-reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  centered?: boolean;
  animateTitle?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  summary,
  centered = false,
  animateTitle = true,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? "section-heading--centered" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {animateTitle ? (
        <MaskedTextReveal
          as="h2"
          type="lines"
          stagger={0.09}
          trigger="scroll"
          scrollStart="top 85%"
        >
          {title}
        </MaskedTextReveal>
      ) : (
        <h2>{title}</h2>
      )}
      {summary ? <p className="section-heading__summary">{summary}</p> : null}
    </div>
  );
}
