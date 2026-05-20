import React from 'react';
import { Check, Trash2, Square } from 'lucide-react';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center justify-between p-4 bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors duration-200">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className="focus:outline-none transition-transform active:scale-90"
        >
          {todo.completed ? (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white">
              <Check size={14} strokeWidth={3} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-300 hover:border-primary">
              <Square size={0} />
            </div>
          )}
        </button>
        <span
          className={cn(
            "text-slate-700 transition-all duration-200",
            todo.completed && "text-slate-400 line-through"
          )}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-500 transition-all duration-200"
        title="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}