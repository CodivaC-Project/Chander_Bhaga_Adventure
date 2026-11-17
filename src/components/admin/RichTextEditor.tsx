"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Heading2, Eraser } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write here...",
  rows = 6,
  className = "",
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastHtml = useRef<string>("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only sync when external value actually differs to avoid caret jumps
    if (value !== lastHtml.current && value !== el.innerHTML) {
      el.innerHTML = value || "";
      lastHtml.current = value || "";
    }
  }, [value]);

  const emit = () => {
    const el = ref.current;
    if (!el) return;
    const html = el.innerHTML === "<br>" ? "" : el.innerHTML;
    lastHtml.current = html;
    onChange(html);
  };

  const cmd = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const minHeight = Math.max(120, rows * 24);

  return (
    <div className={`border border-[var(--color-line)] rounded-lg overflow-hidden bg-white ${className}`}>
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[var(--color-line)] bg-[var(--color-ivory)]">
        <ToolBtn title="Bold" onClick={() => cmd("bold")}><Bold className="w-4 h-4" /></ToolBtn>
        <ToolBtn title="Italic" onClick={() => cmd("italic")}><Italic className="w-4 h-4" /></ToolBtn>
        <ToolBtn title="Underline" onClick={() => cmd("underline")}><Underline className="w-4 h-4" /></ToolBtn>
        <span className="w-px h-5 bg-[var(--color-line)] mx-1" />
        <ToolBtn title="Heading" onClick={() => cmd("formatBlock", "H3")}><Heading2 className="w-4 h-4" /></ToolBtn>
        <ToolBtn title="Bulleted list" onClick={() => cmd("insertUnorderedList")}><List className="w-4 h-4" /></ToolBtn>
        <ToolBtn title="Numbered list" onClick={() => cmd("insertOrderedList")}><ListOrdered className="w-4 h-4" /></ToolBtn>
        <span className="w-px h-5 bg-[var(--color-line)] mx-1" />
        <ToolBtn title="Clear formatting" onClick={() => cmd("removeFormat")}><Eraser className="w-4 h-4" /></ToolBtn>
      </div>
      <div className="relative">
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={emit}
          onBlur={emit}
          data-placeholder={placeholder}
          className="w-full px-4 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-pine)] prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h3]:text-base [&_h3]:font-semibold [&_p]:my-1 empty:before:content-[attr(data-placeholder)] empty:before:text-[var(--color-ink-soft)]"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}

function ToolBtn({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault(); // keep selection in editor
        onClick();
      }}
      className="p-1.5 rounded text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-line)]/40 transition-colors"
    >
      {children}
    </button>
  );
}
