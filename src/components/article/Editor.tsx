import React, { useState, useEffect, useRef } from "react";
import UploadAdapter from "../../UploadAdapter";
import dynamic from "next/dynamic";


interface EditorProps {
  content: any;
  setContent: Function;
}

const Editor = ({ content, setContent }: EditorProps) => {
  const editorRef = useRef({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor}: any = editorRef.current || {};
  //   const DecoupledEditor = dynamic<{ children: any }>(() =>
  //     import("@ckeditor/ckeditor5-build-decoupled-document").then(
  //       ({ DecoupledEditor }: any) => DecoupledEditor
  //     )
  //   );
  const CustomUploadAdapterPlugin = (editor:any) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (
    loader: any
   ) => {
      loader.onUpload = editor.onUpload;
      loader.accessToken = editor.accessToken;
      return new UploadAdapter(loader);
   }
  }

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    //  FileRepository: require("@ckeditor/ckeditor5-upload"),

    };

    // @ts-ignore
    // DecoupledEditor.create("<p>Hello world!</p>")
    //   .then((editor: any) => {
    //     console.log("Editor was initialized", editor);

    //     // Append the toolbar to the <body> element.
    //     document.body.appendChild(editor.ui.view.toolbar.element);

    //     // Initial data was provided so the editor UI element needs to be added manually to the DOM.
    //     document.body.appendChild(editor.ui.getEditableElement());
    //   })
    //   .catch((err: any) => {
    //     console.error(err.stack);
    //   });
    // editorRef.current.DecoupledEditor
    //   // @ts-ignore
    //   .create(document.querySelector("#editor"))
    //   .then((editor: any) => {
    //     console.log("Editor was initialized", editor);
    //     // @ts-ignore
    //     // Append the toolbar to the <body> element.
    //     document.body.appendChild(editor.ui.view.toolbar.element);
    //   })
    //   .catch((err: any) => {
    //     console.error(err.stack);
    //   });
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <>
      {console.log(ClassicEditor)}
      <CKEditor
        style={{ minHeight: "100px" }}
        editor={ClassicEditor}
        config={{ extraPlugins: [CustomUploadAdapterPlugin]}}
        data={content.length > 0 ? content : ""}
        onInit={(editor:any) => {
          editor.onUpload = this.onUpload; //append event
          editor.accessToken = this.accessToken;
        }}
        onReady={(editor: any) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(evt: any, editor: any) => {
          const data = editor.getData();

          console.log("DATA is: ", data);
          setContent(data);
        }}
      />
    </>
  ) : (
    <div>Editor loading</div>
  );
};

export default Editor;
