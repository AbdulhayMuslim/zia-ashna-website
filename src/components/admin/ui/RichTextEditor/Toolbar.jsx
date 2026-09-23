"use client";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Paperclip,
} from "lucide-react";

import { useRef, useState } from "react";
import MenuButton from "./MenuButton";

export default function Toolbar({ editor }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl || "");

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
      })
      .run();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      window.alert("Please select an image, PDF, or DOCX file.");
      event.target.value = "";
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      window.alert("File size must not exceed 10MB.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("purpose", "blog-attachment");

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      const fileUrl = result.data.url;

      if (file.type.startsWith("image/")) {
        editor
          .chain()
          .focus()
          .setImage({
            src: fileUrl,
          })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "text",
            text: file.name,
            marks: [
              {
                type: "link",
                attrs: {
                  href: fileUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            ],
          })
          .run();
      }
    } catch (error) {
      window.alert(error.message || "Unable to upload file.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 rounded-t-xl border-b border-border bg-card p-3 dark:border-border-dark dark:bg-card-dark">
      <MenuButton
        icon={Bold}
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <MenuButton
        icon={Italic}
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <MenuButton
        icon={UnderlineIcon}
        label="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />

      <MenuButton
        icon={Link2}
        label="Link"
        active={editor.isActive("link")}
        onClick={setLink}
      />

      <MenuButton
        icon={Heading2}
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <MenuButton
        icon={Heading3}
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />

      <MenuButton
        icon={List}
        label="Bullet List"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />

      <MenuButton
        icon={ListOrdered}
        label="Ordered List"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />

      <MenuButton
        icon={AlignLeft}
        label="Align Left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      />

      <MenuButton
        icon={AlignCenter}
        label="Align Center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      />

      <MenuButton
        icon={AlignRight}
        label="Align Right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      />

      <MenuButton
        icon={Undo2}
        label="Undo"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      />

      <MenuButton
        icon={Redo2}
        label="Redo"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      />

      <MenuButton
        icon={Paperclip}
        label={uploading ? "Uploading..." : "Attach File"}
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileSelect}
        disabled={uploading}
      />
    </div>
  );
}
