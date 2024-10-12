import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import React from "react";

const API = import.meta.env.VITE_TinyMCE_API;

const MyEditor = () => {
  
  // the function change event check  
  const handleEditorChange = (content) => {
    // console.log("content was updated", content);
  };

  // the function tag formatting
  const handleSanitizeWithFormatting = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ["b", "strong", "i", "em", "ul", "li", "ol"],
      ALLOWED_ATTR: [],
    });
  };

  //the function for clean content
  const handleCleanContent = (content) => {
    return DOMPurify.sanitize(content, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  };
  return (
    <div>
      <Editor

      //the add api for .env file
        apiKey={API}
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

            //check the fragment
            if (content.includes("<!--StartFragment-->")) {
              alert("the content form MS Office/Google Docs Detected");
              const keepFormatting = window.confirm(
                "Do You want to keep the formation?"
              );

              if (!keepFormatting) {
                args.content = handleCleanContent(content);
              }

              //check the data:image 
            } else if (content.includes("data:image/")) {
              alert("content from google docs detected");
              const keepFormatting = window.confirm(
                "Do You want to keep the formation?"
              );

              if (!keepFormatting) {
                args.content = handleCleanContent(content);
              }

              //check the excel file content
            } else if (
              content.includes("<table") &&
              content.includes("mso-cellspacing")
            ) {
              alert("content from Excel detected");
              const keepFormatting = window.confirm(
                "Do You want to keep the formation?"
              );

              //the handle clean function
              if (!keepFormatting) {
                args.content = handleCleanContent(content);
              }

            // the basic formatting
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
