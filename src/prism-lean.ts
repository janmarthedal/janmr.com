// Minimal Lean 4 grammar for Prism, which ships without one.
export function addPrismLean(prism: { languages: Record<string, unknown> }) {
    prism.languages.lean = {
        comment: [/\/-[\s\S]*?-\//, /--.*/],
        string: { pattern: /"(?:\\.|[^\\"])*"/, greedy: true },
        command: { pattern: /#\w+/, alias: "keyword" },
        keyword:
            /\b(?:abbrev|axiom|by|calc|class|decreasing_by|def|deriving|do|else|example|extends|for|fun|have|if|import|in|inductive|instance|let|match|mutual|mut|namespace|noncomputable|open|partial|private|protected|return|section|show|structure|termination_by|then|theorem|universe|variable|where|with)\b/,
        builtin: /\b(?:Array|Bool|Char|Fin|Float|Int|IO|List|Nat|Option|Prop|Sort|String|Type|Unit)\b/,
        boolean: /\b(?:true|false)\b/,
        number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
        operator: /:=|=>|->|<-|[→←↔∀∃λ×∘≠≤≥¬∧∨]|[+\-*\/%=<>|&^!$@:]/,
        punctuation: /[()[\]{},⟨⟩]/,
    };
}
