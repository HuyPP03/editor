"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import "katex/dist/katex.min.css";
// Extentions
// 1. textAlign căn chỉnh
// 2. StarterKit ...
// 3. History tiến lùi
// 4. FontFamily font
// 5. Color màu chữ
// 6. CharacterCount đếm chữ
// 7. Blockquote thêm phần phía trước |
// 8. BulletList, ListItem tạo thêm chấm phía trước
// 9. CodeBlockLowLight viết code
// 10. Emoji dùng icon
// 11. Heading cỡ chữ
// 12. HorizontalRule tạo border
// 13. Image
// 14. Table => ít dùng
// 15. Youtube

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "right", "center"],
      }),
      FontFamily,
      TextStyle,
      Color,
      Highlight,
      CodeBlock,
      HorizontalRule,
      Image,
      Youtube,
      Mathematics,
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
