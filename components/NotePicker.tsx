"use client";

import React, { useState } from "react";
import Tiptap from "./Tiptap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import RenderMath from "./RenderMath";
const Todo = () => {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  return (
    <div className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10">
      <div className="text-3xl text-center text-sky-300 mb-10">
        Notes Picker
      </div>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
      {/* <ResponsiveMasonry className="w-full px-4">
        <div className="">
          <div className="px-4 py-3 font-bold text-slate-950">Note</div>
          <div
            className="ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg bg-white"
            // style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </ResponsiveMasonry> */}
      <RenderMath content={content} />
    </div>
  );
};

export default Todo;
