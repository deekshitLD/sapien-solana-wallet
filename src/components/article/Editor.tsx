import React, { useState, useEffect, useRef } from "react";

interface EditorProps {
  content: any;
  setContent: Function;
}
const Editor = ({ content, setContent }: EditorProps) => {
  const editorRef = useRef({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  return editorLoaded ? (
    <CKEditor
      style={{ minHeight: "100px" }}
      editor={ClassicEditor}
      data={content.length > 0 ? content : "<p>Start writing</p>"}
      onInit={(editor: any) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        setContent(data);
      }}
    />
  ) : (
    <div>Editor loading</div>
  );
};

export default Editor;
