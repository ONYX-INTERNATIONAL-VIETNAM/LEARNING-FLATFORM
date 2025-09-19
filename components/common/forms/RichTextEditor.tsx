"use client";

import { useState, useEffect } from 'react';

interface RichTextEditorProps {
  value: string; // controlled value
  onChange: (data: string) => void;
  placeholder?: string
}

function RichTextEditorInner({ value, onChange }: RichTextEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [CKEditor, setCKEditor] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  useEffect(() => {
    // Dynamically import CKEditor components only on client side
    Promise.all([
      import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor),
      import('@ckeditor/ckeditor5-build-classic').then(mod => mod.default)
    ]).then(([CKEditorComponent, ClassicEditorComponent]) => {
      setCKEditor(() => CKEditorComponent);
      setClassicEditor(() => ClassicEditorComponent);
    });
  }, []);

  if (!CKEditor || !ClassicEditor) {
    return (
      <div className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm p-2 min-h-[200px] flex items-center justify-center">
        <span className="text-gray-500">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm p-2">
      <style jsx global>{`
        .ck-editor__editable {
          min-height: 200px;
          max-height: 600px;
        }
      `}</style>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(_: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}

export default function RichTextEditor(props: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm p-2 min-h-[200px] flex items-center justify-center">
        <span className="text-gray-500">Loading editor...</span>
      </div>
    );
  }

  return <RichTextEditorInner {...props} />;
}
