'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '@/lib/types';
import { PRIORITY_LABELS, PRIORITY_COLORS, STATUS_LABELS, STATUS_COLORS } from './TaskControls';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isOverdue = task.status !== 'done' && new Date(task.dueDate) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border border-[var(--border)] bg-[var(--card)] border-l-4 ${STATUS_COLORS[task.status]} cursor-default group transition-shadow hover:shadow-sm`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 cursor-grab active:cursor-grabbing text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            title="拖拽排序"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/>
              <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>
              <circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/>
            </svg>
          </button>

          <div className="flex-1 min-w-0" onDoubleClick={() => onEdit(task)}>
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through text-[var(--muted-foreground)]' : ''}`}>
                {task.title}
              </h3>
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${PRIORITY_COLORS[task.priority]}`}>
                {PRIORITY_LABELS[task.priority]}
              </span>
            </div>
            {task.description && (
              <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mb-2">{task.description}</p>
            )}
            <div className="flex items-center gap-3 text-[10px] text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-1 rounded bg-[var(--muted)] px-1.5 py-0.5">
                {STATUS_LABELS[task.status]}
              </span>
              <span className={isOverdue ? 'text-red-500' : ''}>
                {task.dueDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-[var(--muted)] transition-colors"
              title="编辑"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="h-7 w-7 flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
              title="删除"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
