"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import extensions from "./extensions";
import Toolbar from "./Toolbar";
import "./styles.css";

export default function RichTextEditor({
  label,
  placeholder,
  value = "",
  onChange,
  error,
}) {
  const editor = useEditor({
    extensions,

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "ProseMirror min-h-[350px] focus:outline-none text-heading dark:text-heading-dark",
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-heading dark:text-heading-dark">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-card dark:border-border-dark dark:bg-card-dark">
        <Toolbar editor={editor} />

        <EditorContent editor={editor} className="min-h-87.5 p-4" />
        {error && (
          <p className="border-t border-border px-4 py-3 text-sm text-red-500 dark:border-border-dark">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
