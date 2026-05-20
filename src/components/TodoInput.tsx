import React, { useState } from 'react';
import { Plus } from 'lucide-react';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <input
        type="text"
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-slate-700"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        <Plus size={20} />
      </button>
    </form>
  );
}