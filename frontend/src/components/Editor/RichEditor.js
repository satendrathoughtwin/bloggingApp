import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import "./RichEditor.css";
const RichEditor = ({description, setDescription }) => {
  const editor = useRef(null);
  return (
    <div className="editorDiv">
      <JoditEditor
        ref={editor}
        onChange={(content) => setDescription(content)}
        // onChange={(content) => setFormData({description : content})}
        value={description}
        tabIndex={1}
        onBlur={(newContent) => setDescription(newContent)}
      />
    </div>
  );
};

export default RichEditor;
