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
import React from "react";

interface RenderMathProps {
  content: string; // Kiểu dữ liệu của content là một chuỗi HTML
}

const RenderMath: React.FC<RenderMathProps> = ({ content }) => {
  const content2 = String.raw`<h1>
This editor supports $\LaTeX$ math expressions.
  </h1>
  <p>
    Did you know that $3 * 3 = 9$? Isn't that crazy? Also Pythagoras' theorem is $a^2 + b^2 = c^2$.<br />
    Also the square root of 2 is $\sqrt{2}$. If you want to know more about $\LaTeX$ visit <a href="https://katex.org/docs/supported.html" target="_blank">katex.org</a>.
  </p>
  <code>
    <pre>$\LaTeX$</pre>
  </code>
  <p>
    Do you want go deeper? Here is a list of all supported functions:
  </p>
  <ul>
    <li>$\sin(x)$</li>
    <li>$\cos(x)$</li>
    <li>$\tan(x)$</li>
    <li>$\log(x)$</li>
    <li>$\ln(x)$</li>
    <li>$\sqrt{x}$</li>
    <li>$\sum_{i=0}^n x_i$</li>
    <li>$\int_a^b x^2 dx$</li>
    <li>$\frac{1}{x}$</li>
    <li>$\binom{n}{k}$</li>
    <li>$\sqrt[n]{x}$</li>
    <li>$\left(\frac{1}{x}\right)$</li>
    <li>$\left\{\begin{matrix}x&\text{if }x>0\\0&\text{otherwise}\end{matrix}\right.$</li>
  </ul>`;

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
    content: `${content2}`,
  });
  editor?.setEditable(false);
  return (
    <div>
      <EditorContent editor={editor} disabled />
    </div>
  );
};

export default RenderMath;
