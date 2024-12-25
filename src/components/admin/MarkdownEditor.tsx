import { useEffect, useRef, useState } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
  const [content, setContent] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    onChange(newValue);
  };

  return (
    <div className={className}>
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-96 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="在这里输入 Markdown 内容..."
      />
    </div>
  );
} 