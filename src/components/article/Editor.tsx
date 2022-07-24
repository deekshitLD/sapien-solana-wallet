import React, { useState, useEffect, useRef } from "react";
import {uploadMediaFile} from "../../upload.js";
import dynamic from "next/dynamic";


interface EditorProps {
  content: any;
  setContent: Function;
}

const Editor = ({ content, setContent }: EditorProps) => {
  const editorRef = useRef({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, CKFinder}: any = editorRef.current || {};
  //   const DecoupledEditor = dynamic<{ children: any }>(() =>
  //     import("@ckeditor/ckeditor5-build-decoupled-document").then(
  //       ({ DecoupledEditor }: any) => DecoupledEditor
  //     )
  //   );
  var S3FS = require('s3fs');
  var s3fsImpl = new S3FS('sapien/image/uploads',{
    accessKeyId:process.argv[2],
    secretAccessKey:process.argv[3]
  });

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor5-build-classic"),
      CKFinder: require("@ckeditor/ckeditor5-ckfinder/src/ckfinder"),
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
        config={{extraPlugins: [CKFinder]}}
        style={{ minHeight: "100px" }}
        editor={ClassicEditor}
        data={content.length > 0 ? content : ""}
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          editor.on( 'fileUploadRequest', function( evt ):void {
            var fileLoader = evt.data.fileLoader,
                formData = new FormData();
      
            formData.append( 'upload', fileLoader.file, fileLoader.fileName );
            body.append("files", file);
            s3fsImpl.writeFile(file, stream, {"ContentType":"file"})
            uploadMediaFile(body);

            // Prevented the default behavior.
            evt.stop();
        }, null, null, 4 );
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event: any, editor: any) => {
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
