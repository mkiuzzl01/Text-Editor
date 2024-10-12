import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import React from "react";

const MyEditor = () => {
  const handleEditorChange = (content) => {
    console.log("content was updated", content);
  };

  const handleSanitizeWithFormatting = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ["b", "strong", "i", "em", "ul", "li", "ol"],
      ALLOWED_ATTR: [],
    });
  };
  const handleCleanContent = (content) => {
    return DOMPurify.sanitize(content, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  };
  return (
    <div>
      <Editor
        apiKey={import.meta.env.VITE_TinyMCE_API}
        init={{
          height: 600,
          menubar: false,
          plugins: [
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

          paste_data_images: true,

          paste_preprocess: function (plugins, args) {
            const content = args.content;

            if (content.includes("<!--StartFragment-->")) {
              alert("the content form MS Office/Google Docs Detected");
              const keepFormatting = window.confirm(
                "Do You want to keep the formation?"
              );

              if (!keepFormatting) {
                args.content = handleCleanContent(content);
              }
            } else if (content.includes("data:image/")) {
              alert("content from google docs detected");
              const keepFormatting = window.confirm(
                "Do You want to keep the formation?"
              );

              if (!keepFormatting) {
                args.content = handleCleanContent(content);
              }
            } else if (
              content.includes("<table") &&
              content.includes("mso-cellspacing")
            ) {
              alert("content from Excel detected");
              const keepFormatting = window.confirm(
                "Do You want to keep the formation?"
              );

              if (!keepFormatting) {
                args.content = handleCleanContent(content);
              }
            } else {
              const keepFormatting = window.confirm(
                "Do you want basic formatting?"
              );
              if (!keepFormatting) {
                args.content = handleSanitizeWithFormatting(content);
              }
            }
          },
          paste_postprocess: function (plugins, args) {
            console.log("After Posted Processing");
          },
        }}
        onEditorChange={handleEditorChange}
      ></Editor>
    </div>
  );
};

export default MyEditor;
