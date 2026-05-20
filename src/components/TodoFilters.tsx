import React from 'react';
import { FilterType } from '@/types';
import { cn } from '@/lib/utils';

type TodoFiltersProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  remainingCount: number;
  onClearCompleted: () => void;
};

export default function TodoFilters({
  activeFilter,
  onFilterChange,
  remainingCount,
  onClearCompleted
}: TodoFiltersProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
      <span className="text-sm text-slate-500 font-medium">
        {remainingCount} {remainingCount === 1 ? 'item' : 'items'} left
      </span>
      
      <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-lg">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
              activeFilter === f.value
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        className="text-sm text-slate-500 hover:text-rose-500 transition-colors font-medium"
      >
        Clear completed
      </button>
    </div>
  );
}