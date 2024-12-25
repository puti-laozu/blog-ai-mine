import { useEffect, useRef } from 'react';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<EasyMDE | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    editorRef.current = new EasyMDE({
      element: textareaRef.current,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: 'blog-post-editor',
      },
      status: false,
      minHeight: '300px',
    });

    editorRef.current.value(value);
    editorRef.current.codemirror.on('change', () => {
      if (editorRef.current) {
        onChange(editorRef.current.value());
      }
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className={className}>
      <textarea ref={textareaRef} style={{ display: 'none' }} />
    </div>
  );
} 