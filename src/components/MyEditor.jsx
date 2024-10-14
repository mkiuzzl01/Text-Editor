import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";

const MyEditor = () => {
  const [content, setContent] = useState("");

  //the function for clean content
  const handleCleanContent = (pastedContent) => {
    const element = document.createElement("html");
    element.innerHTML = pastedContent;
    return element.innerText || element.textContent || "";
  };

  //detection the source content
  const detectContentSource = (pastedContent) => {
    if (
      pastedContent.includes("mso-cellspacing") ||
      pastedContent.includes("<table")
    ) {
      return "Excel";
    }

    if (pastedContent.includes("mso-") || pastedContent.includes("MsoNormal")) {
      return "MS Office";
    }

    return null;
  };

  return (
    <div>
      <Editor
        //the add api for .env file
        apiKey={import.meta.env.VITE_TinyMCE_API}
        value={content}
        init={{
          height: 600,
          menubar: false,
          plugins: [
            "paste",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | blocks |" +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",

          statusbar: false,

          paste_preprocess: function (plugins, args) {
            const pastedContent = args.content;
            const contentSource = detectContentSource(pastedContent);

            //check the source of content
            if (contentSource) {
              alert(`Content From ${contentSource} Detected`);
              const keepFormatting = window.confirm(
                `Do you want to keep the original formatting from ${contentSource}?`
              );
              if (!keepFormatting) {
                args.content = handleCleanContent(pastedContent);
              }

              //otherwise basic formatting
            } else {
              const keepFormatting = window.confirm(
                "Do you want to keep basic format?"
              );
              if (!keepFormatting) {
                args.content = handleCleanContent(pastedContent);
              }
            }
          },
        }}
        onEditorChange={(newContent) => {
          setContent(newContent);
        }}
      ></Editor>
    </div>
  );
};

export default MyEditor;
