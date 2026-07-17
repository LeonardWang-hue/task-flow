'use client';

import { useState } from 'react';
import { PRIORITY_LABELS, PRIORITY_COLORS, STATUS_LABELS, STATUS_COLORS, TAG_LABELS } from '@/lib/constants';
import type { TaskFilter, TaskPriority, TaskSort, TaskSortField, TaskStatus } from '@/lib/types';

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="搜索任务..."
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
      />
      {query && (
        <button
          onClick={() => onQueryChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      )}
    </div>
  );
}

interface FilterPanelProps {
  filter: TaskFilter;
  onFilterChange: (f: TaskFilter) => void;
}

export function FilterPanel({ filter, onFilterChange }: FilterPanelProps) {
  const statuses: (TaskStatus | 'all')[] = ['all', 'todo', 'in-progress', 'done'];
  const priorities: (TaskPriority | 'all')[] = ['all', 'high', 'medium', 'low'];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => onFilterChange({ ...filter, status: s })}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
            filter.status === s
              ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
              : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
          }`}
        >
          {s === 'all' ? '全部状态' : STATUS_LABELS[s]}
        </button>
      ))}
      <span className="w-px h-5 bg-[var(--border)]" />
      {priorities.map((p) => (
        <button
          key={p}
          onClick={() => onFilterChange({ ...filter, priority: p })}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
            filter.priority === p
              ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
              : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
          }`}
        >
          {p === 'all' ? '全部优先级' : PRIORITY_LABELS[p]}
        </button>
      ))}
    </div>
  );
}

interface SortControlsProps {
  sort: TaskSort;
  onSortChange: (s: TaskSort) => void;
}

export function SortControls({ sort, onSortChange }: SortControlsProps) {
  const fields: { value: TaskSortField; label: string }[] = [
    { value: 'createdAt', label: '创建时间' },
    { value: 'dueDate', label: '截止日期' },
    { value: 'priority', label: '优先级' },
    { value: 'title', label: '标题' },
  ];

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-[var(--muted-foreground)] mr-1">排序:</span>
      <select
        value={sort.field}
        onChange={(e) => onSortChange({ ...sort, field: e.target.value as TaskSortField })}
        className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-xs outline-none"
      >
        {fields.map((f) => (<option key={f.value} value={f.value}>{f.label}</option>))}
      </select>
      <button
        onClick={() => onSortChange({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
        title={sort.direction === 'asc' ? '升序' : '降序'}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${sort.direction === 'desc' ? 'rotate-180' : ''}`}>
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
}

export { PRIORITY_LABELS, PRIORITY_COLORS, STATUS_LABELS, STATUS_COLORS, TAG_LABELS };
