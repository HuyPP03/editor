"use client";

import React, { useCallback, useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Baseline,
  Highlighter,
  Heading,
  Heading1,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  AlignEndHorizontal,
  Image,
  FileVideo,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/lib/firebase";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  const [linkYoutube, setLinkYoutube] = useState("");
  if (!editor) {
    return null;
  }
  const addImage = (e: any) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      new Promise(async (resolve, reject) => {
        // Upload avatar to Firebase Storage immediately
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);

        const url = await getDownloadURL(storageRef);
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        } else {
          alert("Error downloading image!");
          reject();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addYoutubeVideo = (e: any) => {
    e.preventDefault();
    const url = linkYoutube;

    if (url !== "") {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
      setLinkYoutube("");
    } else {
      alert("Please enter a valid youtube link");
    }
  };
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full flex-wrap ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Type className="w-5 h-5 text-sky-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setFontFamily("Inter").run();
              }}
              className={
                editor.isActive("textStyle", { fontFamily: "Inter" })
                  ? "bg-gray-300"
                  : ""
              }
            >
              Inter
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setFontFamily("Roboto").run();
              }}
              className={
                editor.isActive("textStyle", { fontFamily: "Roboto" })
                  ? "bg-gray-300"
                  : ""
              }
            >
              Roboto
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                editor
                  .chain()
                  .focus()
                  .setFontFamily("Comic Sans MS, Comic Sans")
                  .run();
              }}
              className={
                editor.isActive("textStyle", {
                  fontFamily: "Comic Sans MS, Comic Sans",
                })
                  ? "bg-gray-300"
                  : ""
              }
            >
              Comic Sans
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              <Baseline className="w-5 h-5 text-sky-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <div className="pt-2 border-b">
              <input
                type="color"
                onChange={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
                value={editor.getAttributes("textStyle").color}
                data-testid="setColor"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                onClick={() => editor.chain().focus().setColor("#958DF1").run()}
                className={
                  editor.isActive("textStyle", { color: "#958DF1" })
                    ? "w-4 h-4 bg-[#958DF1] border"
                    : "w-4 h-4 bg-[#958DF1]"
                }
                data-testid="setPurple"
              ></button>
              <button
                onClick={() => editor.chain().focus().setColor("#F98181").run()}
                className={
                  editor.isActive("textStyle", { color: "#F98181" })
                    ? "w-4 h-4 bg-[#F98181] border"
                    : "w-4 h-4 bg-[#F98181]"
                }
                data-testid="setRed"
              ></button>
              <button
                onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
                className={
                  editor.isActive("textStyle", { color: "#FBBC88" })
                    ? "w-4 h-4 bg-[#FBBC88] border"
                    : "w-4 h-4 bg-[#FBBC88]"
                }
                data-testid="setOrange"
              ></button>
              <button
                onClick={() => editor.chain().focus().setColor("#FAF594").run()}
                className={
                  editor.isActive("textStyle", { color: "#FAF594" })
                    ? "w-4 h-4 bg-[#FAF594] border"
                    : "w-4 h-4 bg-[#FAF594]"
                }
                data-testid="setYellow"
              ></button>
              <button
                onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
                className={
                  editor.isActive("textStyle", { color: "#70CFF8" })
                    ? "w-4 h-4 bg-[#70CFF8] border"
                    : "w-4 h-4 bg-[#70CFF8]"
                }
                data-testid="setBlue"
              ></button>
              <button
                onClick={() => editor.chain().focus().setColor("#94FADB").run()}
                className={
                  editor.isActive("textStyle", { color: "#94FADB" })
                    ? "w-4 h-4 bg-[#94FADB] border"
                    : "w-4 h-4 bg-[#94FADB]"
                }
                data-testid="setTeal"
              ></button>
              <button
                onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
                className={
                  editor.isActive("textStyle", { color: "#B9F18D" })
                    ? "w-4 h-4 bg-[#B9F18D] border"
                    : "w-4 h-4 bg-[#B9F18D]"
                }
                data-testid="setGreen"
              ></button>
              <button
                onClick={() => editor.chain().focus().unsetColor().run()}
                data-testid="unsetColor"
                className="w-4 h-4 bg-black"
              ></button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              <Highlighter className="w-5 h-5 text-sky-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <div className="grid grid-cols-4 gap-4 mt-4">
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#ffc078" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#ffc078" })
                    ? "w-4 h-4 bg-[#ffc078] border"
                    : "w-4 h-4 bg-[#ffc078]"
                }
              ></button>
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: "#8ce99a" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#8ce99a" })
                    ? "w-4 h-4 bg-[#8ce99a] border"
                    : "w-4 h-4 bg-[#8ce99a]"
                }
              ></button>
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: "#74c0fc" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#74c0fc" })
                    ? "w-4 h-4 bg-[#74c0fc] border"
                    : "w-4 h-4 bg-[#74c0fc]"
                }
              ></button>
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: "#b197fc" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#b197fc" })
                    ? "w-4 h-4 bg-[#b197fc] border"
                    : "w-4 h-4 bg-[#b197fc]"
                }
              ></button>
              <button
                onClick={() =>
                  editor.chain().focus().setHighlight({ color: "red" }).run()
                }
                className={
                  editor.isActive("highlight", { color: "red" })
                    ? "w-4 h-4 bg-[red] border"
                    : "w-4 h-4 bg-[red]"
                }
              ></button>
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: "#ffa8a8" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#ffa8a8" })
                    ? "w-4 h-4 bg-[#ffa8a8] border"
                    : "w-4 h-4 bg-[#ffa8a8]"
                }
              ></button>
              <button
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                disabled={!editor.isActive("highlight")}
                className="h-4 w-4 bg-black"
              ></button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              <Heading className="w-5 h-5 text-sky-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 })
                    ? "bg-sky-700 p-2 rounded-lg"
                    : "text-sky-400"
                }
              >
                <Heading1 className="w-5 h-5 text-sky-400" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 })
                    ? "bg-sky-700 p-2 rounded-lg"
                    : "text-sky-400"
                }
              >
                <Heading2 className="w-5 h-5 text-sky-400" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 })
                    ? "bg-sky-700 p-2 rounded-lg"
                    : "text-sky-400"
                }
              >
                <Heading3 className="w-5 h-5 text-sky-400" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 })
                    ? "bg-sky-700 p-2 rounded-lg"
                    : "text-sky-400"
                }
              >
                <Heading4 className="w-5 h-5 text-sky-400" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={
                  editor.isActive("heading", { level: 5 })
                    ? "bg-sky-700 p-2 rounded-lg"
                    : "text-sky-400"
                }
              >
                <Heading5 className="w-5 h-5 text-sky-400" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={
                  editor.isActive("heading", { level: 6 })
                    ? "bg-sky-700 p-2 rounded-lg"
                    : "text-sky-400"
                }
              >
                <Heading6 className="w-5 h-5 text-sky-400" />
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("left;").run();
          }}
          className={
            editor.isActive({ textAlign: "left" })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <AlignLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("center").run();
          }}
          className={
            editor.isActive({ textAlign: "center" })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <AlignCenter className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("right").run();
          }}
          className={
            editor.isActive({ textAlign: "right;" })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <AlignRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <AlignEndHorizontal className="w-5 h-5 text-sky-400" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              <Image className="w-5 h-5 text-sky-400" type="button" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <input type="file" className="" onChange={(e) => addImage(e)} />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              <FileVideo className="w-5 h-5 text-sky-400" type="button" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52">
            <input
              type="text"
              className="w-full"
              onChange={(e) => setLinkYoutube(e.target.value)}
              placeholder="Link..."
            />
            <button
              type="button"
              onClick={addYoutubeVideo}
              className="px-4 py-2 bg-sky-400 mt-4 rounded-md"
            >
              Chọn
            </button>
          </PopoverContent>
        </Popover>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {/* {content && (
        <button
          type="submit"
          className="px-4 bg-sky-700 text-white py-2 rounded-md"
        >
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;
