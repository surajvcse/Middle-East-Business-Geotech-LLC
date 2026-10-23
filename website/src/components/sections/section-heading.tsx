type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  summary,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? "section-heading--centered" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {summary ? <p className="section-heading__summary">{summary}</p> : null}
    </div>
  );
}
