// Minimal WebMCP typings — W3C Web Machine Learning Community Group draft
// (https://webmachinelearning.github.io/webmcp/). Draft spec, not a standard;
// feature-detect before use. Entry point per current spec is
// `document.modelContext`; `navigator.modelContext` is the legacy alias.

export interface WebMcpAnnotations {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
  consequentialHint?: boolean;
  debugging?: boolean;
}

export interface WebMcpTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: WebMcpAnnotations;
  execute: (input: unknown, opts?: { signal?: AbortSignal }) => Promise<unknown>;
}

export interface ModelContext {
  registerTool: (
    tool: WebMcpTool,
    opts?: { signal?: AbortSignal; exposedTo?: string | string[] }
  ) => Promise<unknown>;
}

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

// Declarative WebMCP form attributes (Chrome-only explainer). Not in React's
// DOM typings yet, so declare them here for use on <form> and its controls.
declare module "react" {
  interface HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean;
    toolparamdescription?: string;
  }
}

export {};
