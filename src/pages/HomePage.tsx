import React, { useState } from 'react';
import { Todo, FilterType } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import TodoFilters from '@/components/TodoFilters';
import { CheckCircle2, ListTodo } from 'lucide-react';

export default function HomePage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos-v1', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
              <CheckCircle2 size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Tasks
          </h1>
          <p className="text-slate-500">
            Stay organized and get things done.
          </p>
        </div>

        {/* Main App Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <TodoInput onAdd={addTodo} />
          
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-slate-400">
                <ListTodo size={48} className="mb-3 opacity-20" />
                <p className="text-sm font-medium">No tasks found</p>
              </div>
            )}
          </div>

          <TodoFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            remainingCount={activeCount}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Local Storage Powered • Client Only
          </p>
        </footer>
      </div>
    </div>
  );
}