"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface RichTextEditorProps {
  value: string; // controlled value
  onChange: (data: string) => void;
  placeholder?: string
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm p-2">
      <style jsx global>{`
        .ck-editor__editable {
          min-height: 200px;
          max-height: 600px;
        }
      `}</style>
      <CKEditor
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        editor={ClassicEditor as any}
        data={value}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
