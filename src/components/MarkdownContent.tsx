import Link from "next/link";

// Lightweight markdown renderer for authored content (blog posts, comparison
// pages): headings, lists, tables, blockquotes, bold, links, inline code.
// No dependencies. Extracted from app/blog/[slug]/page.tsx so both routes
// share one renderer.
export function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: React.ReactNode[] = [];
  let table: string[][] = [];

  const inline = (text: string): React.ReactNode[] =>
    text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link)
        return link[2].startsWith("/") ? (
          <Link key={i} href={link[2]} className="text-[var(--color-pine)] font-medium hover:underline">
            {link[1]}
          </Link>
        ) : (
          <a key={i} href={link[2]} className="text-[var(--color-pine)] font-medium hover:underline" target="_blank" rel="noopener noreferrer">
            {link[1]}
          </a>
        );
      if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="px-1.5 py-0.5 bg-[var(--color-paper)] rounded text-sm">{part.slice(1, -1)}</code>;
      return part;
    });

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="list-disc pl-6 mb-4 space-y-1.5 text-[var(--color-ink-soft)] leading-relaxed">
          {list}
        </ul>
      );
      list = [];
    }
  };
  const flushTable = () => {
    if (table.length) {
      const [head, ...rows] = table;
      blocks.push(
        <div key={`tbl-${blocks.length}`} className="overflow-x-auto mb-4 rounded-lg border border-[var(--color-line)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-paper)]">
                {head.map((cell, i) => (
                  <th key={i} className="text-left px-4 py-2.5 font-semibold text-[var(--color-ink)]">{inline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-t border-[var(--color-line)]">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-2.5 text-[var(--color-ink-soft)]">{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      table = [];
    }
  };

  lines.forEach((line, idx) => {
    const t = line.trim();
    if (t.startsWith("| ") && t.endsWith("|")) {
      const cells = t.slice(1, -1).split("|").map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c))) return; // separator row
      table.push(cells);
      return;
    }
    flushTable();

    if (t.startsWith("- ") || t.startsWith("* ")) {
      list.push(<li key={idx}>{inline(t.slice(2))}</li>);
      return;
    }
    flushList();

    if (t.startsWith("### ")) {
      blocks.push(<h3 key={idx} className="text-xl font-bold text-[var(--color-ink)] mt-8 mb-3">{inline(t.slice(4))}</h3>);
    } else if (t.startsWith("## ")) {
      blocks.push(<h2 key={idx} className="text-2xl font-bold text-[var(--color-ink)] mt-10 mb-4">{inline(t.slice(3))}</h2>);
    } else if (t.startsWith("> ")) {
      blocks.push(<blockquote key={idx} className="border-l-4 border-[var(--color-accent)] pl-4 py-1 mb-4 text-[var(--color-ink-soft)] italic">{inline(t.slice(2))}</blockquote>);
    } else if (t === "") {
      // paragraph spacing handled by margins
    } else {
      blocks.push(<p key={idx} className="text-[var(--color-ink-soft)] leading-relaxed mb-4">{inline(t)}</p>);
    }
  });
  flushList();
  flushTable();

  return blocks;
}

/** Component wrapper around renderMarkdown for JSX content areas. */
export function MarkdownContent({ content }: { content: string }) {
  return <>{renderMarkdown(content)}</>;
}
