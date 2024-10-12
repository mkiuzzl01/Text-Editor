import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const MyEditor = () => {
  const handleEditorChange = (content, editor) => {
    console.log("content was updated", content);
  };
  const handleCleanContent = (content) => {
    return content.replace(/<[^>]+>/g, "");
  };
  return (
    <div>
      <Editor
        apiKey="q4usclgkum083qklupf4bu6gqik29bsod3y8h5zqsdlzu2m4"
        init={{
          height: 500,
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
            "undo redo | blocks | " +
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
            }else if (content.includes('data:image/') || content.includes('docs-internal-guide')){
                
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
