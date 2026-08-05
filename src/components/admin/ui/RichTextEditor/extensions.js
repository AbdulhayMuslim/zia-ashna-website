import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),

  Placeholder.configure({
    placeholder: "Start writing...",
  }),

  Underline,

  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),

  Image.configure({
    inline: false,
    allowBase64: false,
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right"],
  }),
];

export default extensions;
